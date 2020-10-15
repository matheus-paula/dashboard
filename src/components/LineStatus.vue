<style>
.line-img{
   max-height: 300px;
}

.workplaces{
   min-height: 200px;
}

.dash-right-col{
   overflow-y: auto;
   height: 100%;
   position: absolute;
   right: 0;
   top:0;
   bottom:0;
}

.container-fluid{
   height: calc(100% - 4px);
}
</style>
<template>
   <div class="container-fluid">
      <template>
         <div class="row">
            <div class="col-3 p-0">
               <linenav/>
            </div>
            <div id="dash-items" class="dash-right-col col-9 pt-3">
               <!-- SETTINGS MODAL -->
               <div class="modal fade" id="settingsModal" tabindex="9" role="dialog" aria-labelledby="settingsModalLabel" aria-hidden="true">
                  <div class="modal-dialog" role="document">
                     <div class="modal-content">
                        <div class="modal-header">
                           <h5 class="modal-title" id="settingsModalLabel">{{$t("message.settingsModalTitle")}}</h5>
                           <button type="button" class="close" @click="resetTimeInterval" :title="$t('message.close')" data-dismiss="modal" :aria-label="$t('message.close')">
                              <span aria-hidden="true">&times;</span>
                           </button>
                        </div>
                        <div class="modal-body">
                           <label for="timeIntervalRange">{{ $t("message.intervalChangeLabel") }}</label>
                           <input v-model="tvModeInterval" type="range" min="10000" max="60000" value="30000" class="custom-range" id="timeIntervalRange">
                           <span>{{round(tvModeInterval/1000,0)}} {{$t("message.seconds")}}</span>
                           <hr>
                           <div class="custom-control custom-switch">
                              <input v-if="$workstationDetails.status" checked @click="toggleWorkstationDetailsVisibility" type="checkbox" class="custom-control-input" id="hideWorkspaceDetails">
                              <input v-if="!$workstationDetails.status" @click="toggleWorkstationDetailsVisibility" type="checkbox" class="custom-control-input" id="hideWorkspaceDetails">
                              <label class="custom-control-label" for="hideWorkspaceDetails">{{$t("message.hideWorkplaceDetails")}}</label>
                           </div>
                           <hr>
                           <label for="default-tv-mode-data">{{$t("message.defaultTvModeOptionLabel")}}</label>
                           <select v-model="$tvmode.defaultData" name="default-tv-mode-data" id="default-tv-mode-data" class="custom-select">
                              <option selected value="1">{{$t("message.defaultTvModeOption1")}}</option>
                              <option value="2">{{$t("message.defaultTvModeOption2")}}</option>
                              <option value="3">{{$t("message.defaultTvModeOption3")}}</option>
                           </select>
                        </div>
                        <div class="modal-footer">
                           <button type="button" class="btn btn-secondary" @click="resetTimeInterval" data-dismiss="modal">{{$t("message.closeSettingsModal")}}</button>
                           <button type="button" class="btn btn-primary" @click="saveSettings" data-dismiss="modal">{{$t("message.saveSettings")}}</button>
                        </div>
                     </div>
                  </div>
               </div>
               <lineworkplaces v-if="($tvmode.status == true && $tvmode.defaultData == 2) || $tvmode.status == false || $tvmode.defaultData == 3" :ranges="ranges" :data="linestatus" :linename="currentLinename" :rangename="''"/>
               <hr v-if="$tvmode.status == false"/>
               <lineworkplaces v-if="($tvmode.status == true && $tvmode.defaultData == 1) || $tvmode.status == false || $tvmode.defaultData == 3" @range-update="getUpdatedRange" :ranges="ranges" :data="linerangestatus" :linename="currentLinename" :rangename="currentrange"/>
            </div>
         </div>
      </template>
   </div>
</template>
<script>
import LineWorkplaces from '@/components/LineWorkplaces.vue'
import LineNav from '@/components/LineNav.vue'

export default {
  name: 'LineStatus',
  data() {
      return {
         progressCounter: 0,
         progressIntervalCounter: null,
         intervalCounter: null,
         tvModeInterval: 30000,
         lines: [],
         currentLine: 0,
         tvModeSlides: [],
         linestatus: [],
         linerangestatus: [],
         ranges: [],
         currentrange: '',
         currentLinename: null,
      }
   },
   props:{
      linename: {
         type: String,
         default: null
      }
   },
   components: {
      linenav:LineNav,
      lineworkplaces: LineWorkplaces
   },
   mounted: function(){
      if(this.linename !== null){
         this.$tvmode.linename = this.linename;
         this.currentLinename = this.linename;
      }
      this.initialize(); 
   },
   watch: {
      '$route': function(to) {
         var ref = this;
         if(ref.linename !== null){
            ref.$tvmode.linename = ref.linename;
            ref.currentLinename = ref.linename;
         }
         ref.initialize();
      },
      '$tvmode.status':function(){
         var ref = this;
         if(ref.$tvmode.status == true){
            ref.slideInterval();
            ref.scollContent();
         }else{
            ref.stopProgressBar();
            clearTimeout(ref.intervalCounter);
            this.$toastr.i({
               name: "tvomodeoff",
               title: this.$t("message.tvModeOff"),
               msg:'',
               position: "toast-bottom-right",
               type: "info",
               timeout: 5000,
               progressbar: false
            });
            $("#dash-items").stop();
         }
      }
   },
   methods:{
      scollContent: function(){
         var ref = this;
         var dashItems = document.getElementById('dash-items');
         $('#dash-items').stop().animate({ scrollTop: 0 },"fast");
         if(ref.$tvmode.status == true && ref.linestatus.length >=18){
            setTimeout(function(){
               var timemout = ((ref.tvModeInterval * 3) - (dashItems.scrollHeight * 12));
               $('#dash-items').animate({ scrollTop:dashItems.scrollHeight  },timemout);
            },800);
         }else{
            $('#dash-items').animate({ scrollTop: 0 },"fast");
         }
      },
      toggleDefaultTvModeData: function(){
         var ref = this;
         (ref.$tvmode.defaultData == 1) ? ref.$tvmode.defaultData = 0 : ref.$tvmode.defaultData = 1;
      },
      toggleWorkstationDetailsVisibility: function(){
         var ref = this;
         (ref.$workstationDetails.status) ? ref.$workstationDetails.status = false : ref.$workstationDetails.status = true;
      },
      saveSettings: function(){
         var ref = this;
         ref.setSettings(null,this.tvModeInterval,this.$workstationDetails.status,this.$tvmode.defaultData);
         setTimeout(function(){
            ref.$toastr.s({
               name: ref.$t("message.settingsSaved"),
               title: ref.$t("message.settingsSaved"),
               msg: ref.$t("message.settingsSavedMsg"),
               position: "toast-bottom-right",
               type: "success",
               timeout: 4000,
               progressbar: true,
               onClicked: () => {window.location.reload()}
            });
         },1000)
         setTimeout(function(){
            window.location.reload()
         }, 5000);
      },
      getSavedTimeInterval: function(){
         return (localStorage.getItem("settings") !== null) ? JSON.parse(localStorage.getItem("settings")).timeInterval : 30000
      },
      resetTimeInterval: function(){
         this.tvModeInterval = this.getSavedTimeInterval();
      },
      round: function (n,r) {		
         return n.toFixed(r).replace(".",",");
      },
      getNextLine: function(){
         var ref = this;
         if(ref.currentLine < (ref.lines.length - 1) ){
            ref.currentLine++;
         }else{
            ref.currentLine = 0;
         }
         if((ref.lines[ref.currentLine].linha == ref.currentLinename) && (ref.currentLine < (ref.lines.length - 1))){
            ref.currentLine++;
         }
         if((ref.lines[ref.currentLine].linha == ref.currentLinename) && (ref.currentLine > (ref.lines.length - 1))){
            ref.currentLine = 0;
         }
         ref.$router.push('/'+ref.lines[ref.currentLine].linha);
      },
      initializeSettings: function(lang,timeInterval){
         var settings = {
            "lang": lang,
            "timeInterval": timeInterval,
            "workstationDetails": true,
            "defaultData":1,
            "alwaysShowTutorial":true
         }
         window.localStorage.setItem("settings", JSON.stringify(settings));
      },
      setSettings: function(lang,timeInterval,workstationDetails,defaultData){
         var settings = JSON.parse(localStorage.getItem("settings"));
         if(lang != null){
            settings.lang = lang;
         }
         if(timeInterval != null){
            settings.timeInterval = timeInterval;
         }
         if(workstationDetails != null){
            settings.workstationDetails = workstationDetails;
         }
         if(defaultData != null){
            settings.defaultData = defaultData;
         }
         window.localStorage.setItem("settings", JSON.stringify(settings));
      },
      stopProgressBar: function(){
         clearTimeout(this.progressIntervalCounter);
         $("#tvmode-progress .bar").css('width','0%');
         $("#tvmode-progress").removeClass("open-progress").addClass("close-progress");
      },
      startProgressBar: function(){
         var ref = this;
         ref.stopProgressBar();
         ref.progressCounter = 0;
         $("#tvmode-progress").removeClass("close-progress").addClass("open-progress");
         $("#tvmode-progress").removeClass("slide-out");
         ref.progressIntervalCounter = setInterval(function(){
            var totalInSeconds = ((ref.tvModeInterval/1000) - 2);
            var percentage = (Math.floor(ref.progressCounter/totalInSeconds*100));
            if(percentage >= 99.6){
               $("#tvmode-progress").addClass("slide-out");
               $("#tvmode-progress .bar").css('width','0%');
            }else{
               $("#tvmode-progress .bar").css('width',percentage+'%');
            }
            ref.progressCounter++;
         },1000);
      },
      slideInterval: function(){
         var ref = this;
         ref.startProgressBar();
         ref.intervalCounter = setInterval(function(){
            ref.startProgressBar();
            ref.getNextLine();
         }, ref.tvModeInterval);
      },
      initialize: function(){
         var ref = this;
         window.axios.get('/dlinha',{ headers: { Accept: 'application/json' } })
         .then(res => {
            if(ref.linename === null){
               ref.currentLinename = res.data[0].linha;
               ref.$tvmode.linename = res.data[0].linha;
            }
            ref.lines = res.data;
            ref.getLineStatus();
            ref.getRanges();
            ref.ranges = [];
            ref.currentrange = '';
            
         });
         if (window.localStorage.getItem("settings") === null) {
            ref.initializeSettings('br',30000);
         }else{
            ref.tvModeInterval = this.getSavedTimeInterval();
         }
         if(ref.currentLinename !== null){
            document.title = ref.currentLinename + ' | Logo Title';
         }else{
            document.title = 'Logo Title';
         }  
      },
      getLineImage: function(line){
         var image;
         switch(line){
            case "CF-1": image = "cf-1.png";break;
            case "CF-3": image = "cf-3.png";break;
            case "OW": image = "ow.png";break;
            case "Porta Bagag. Diant.E1": image = "fbd_e1_e2.png";break;
            case "Porta Bagag. Diant.E2": image = "fbd_e1_e2.png";break;
            case "Porta Bagag. Tras.E1": image = "abd_e1_e2.png";break;
            case "Porta Bagag. Tras.E2": image = "abd_e1_e2.png";break;
            case "Porta Pax Dian.": image = "fpd_e1_e2.png";break;
            case "Porta Pax Tras.": image = "apd_e1_e2.png";break;
            case "Porta Serv. Dian.": image = "fsd_e1_e2.png";break;
            case "Porta Serv.Tras.": image = "asd_e1_e2.png";break;
            case "Portas Legacy": image = "elp.png";break;
            default: image = "logo.png";break;
         }
         return '/static/public/'+image;
      },
      getUpdatedRange: function(range){
         this.currentrange = range;
         this.getLineRangeStatus(range);
      },
      getLineStatus: function(){
         var ref = this;
         /* alterar */
         window.axios.get('/closed/'+ref.currentLinename,{ headers: { Accept: 'application/json' } })
         .then(res => {
            ref.linestatus = res.data;
            if(ref.$tvmode.status == true){
               ref.scollContent();
            }else{
               setTimeout(function(){
                  $('#dash-items').animate({ scrollTop: 0 },"fast");
               },500);
            }
         });
      },
      getLineRangeStatus: function(range){
         var ref = this;
         window.axios.get('/group/'+ref.currentLinename+'/'+range,{ headers: { Accept: 'application/json' } })
         .then(res => {
            ref.linerangestatus = res.data;
         });
      },
      getRanges: function(){
         var ref = this;
         window.axios.get('/drange/'+ref.currentLinename, {headers: { Accept: 'application/json' }})
         .then(res => {
            ref.ranges = res.data;
            ref.currentrange = res.data[res.data.length - 1].range;
            ref.getLineRangeStatus(res.data[res.data.length - 1].range)
         });
      },
      getPostoStatus: function(posto){
         var ref = this;
         window.axios.get('/group/'+posto,
            { headers: { Accept: 'application/json' } })
         .then(res => {
            ref.lineWorkplaces.push(res.data[0]);
         })
      }
   }
}
</script>