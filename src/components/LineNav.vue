<style scoped>
.card-img{
   margin: auto;
   max-height:80px;
   max-width: 80px;
}
.flag{
   display: inline-block;
   width: 24px;
   height: 16px;
   margin-top: 4px;
   background-size: contain;
   background:url('/static/public/img/lang_flags.png') no-repeat;
}
.flag.br{
   background-position:0 -32px;
}
.flag.fr{
   background-position:0 -48px;
}
.flag.en{
   background-position:0 -16px;
}
.flag.es{
   background-position:0 0px;
}
.nav-items{
   max-height: 380px;
}

@media screen and ( max-width: 966px ){
   #lines-links{
      width: calc(100% - 16px);
   }
}
@media screen and ( max-width: 1350px ){
   .credits p{
      display: none !important;
   }
   #credits-footer > div{
      margin-left: 0 !important;
   }
   .nav-items{
      max-height: 320px;
   }
}
@media screen and ( max-width: 766px ){
   .nav-items{
      max-height: 240px;
   }
}
@media screen and ( min-width: 850px ) and ( min-height: 768px ){
   .nav-items{
      max-height: 500px;
   }
}

.credits{
  position: fixed;
  z-index: 1039;
  font-size: .9rem;
  bottom: 0;
  left: 0;
  padding: 0 10px;
}
.credits p{
  margin-bottom: 0px;
  line-height: 2.4rem;
  font-size: .8rem;
  min-width: 157px;
}

/* SLIDE-SHOW */
.slide-show-container {
   width: 258px;
   margin: 0 auto;
   -webkit-perspective: 800px;
   -moz-perspective: 800px;
   -o-perspective: 800px;
   perspective: 800px;
}
#slide-show,
.slide-show-container{
   position: relative;
   height: 280px;
}
#slide-show img {
   display: block;
   position: absolute;
   height: auto;
   width: 100%;
   line-height: 230px;
   -webkit-backface-visibility: hidden;
   -moz-backface-visibility: hidden;
   -o-backface-visibility: hidden;
   backface-visibility: hidden;
   -webkit-transform: rotateY(180deg);
   -moz-transform: rotateY(180deg);
   -o-transform: rotateY(180deg);
   transform: rotateY(180deg);
   -webkit-transition: -webkit-transform 1s;
   -moz-transition: -moz-transform 1s;
   -o-transition: -o-transform 1s;
   transition: transform 1s;
   -webkit-transform-style: preserve-3d;
   -moz-transform-style: preserve-3d;
   -o-transform-style: preserve-3d;
   transform-style: preserve-3d;
   image-rendering: -webkit-optimize-contrast;
   image-rendering: crisp-edges;
}
#slide-show .turnedLeft {
   -webkit-transform: rotateY(-180deg);
   -moz-transform: rotateY(-180deg);
   -o-transform: rotateY(-180deg);
   transform: rotateY(-180deg);
}
#slide-show .turnedRight {
   -webkit-transform: rotateY(180deg);
   -moz-transform: rotateY(180deg);
   -o-transform: rotateY(180deg);
   transform: rotateY(180deg);
}
#slide-show .active {
   -webkit-transform: rotateY(0deg);
   -moz-transform: rotateY(0deg);
   -o-transform: rotateY(0deg);
   transform: rotateY(0deg);
}

#tv-mode-switch{
   padding: 6px;
}


</style>
<template>
   <div class="container-fluid p-0">
      <!-- LOGO/TVMODE -->
      <div class="row mt-2 mb-2 p-2 justify-content-around">
         <img height="30" class="margin-auto" :src="companyLogoUrl" alt="Logo Title" title="Logo Title"/>
         <div id="tv-mode-switch" class="tutorial-highlightable">
            <div class="custom-control custom-switch">
            <!-- <input v-if="fullscreenSwitch" checked @click="toggleTVMode" type="checkbox" class="custom-control-input" id="tvModeSwitch">-->
               <input :checked="$tvmode.status" @click="toggleTVMode" type="checkbox" class="custom-control-input" id="tvModeSwitch">
               <label class="custom-control-label" for="tvModeSwitch">{{$t("message.tvmode")}}</label>
            </div>
         </div>
      </div>
      <!-- CURRENT-LINE-CARD -->
      <div id="current-line-card" v-if="$tvmode.status == false" class="tutorial-highlightable shadow-sm card mb-2 mr-2 ml-2 mt-2" style="max-width: 540px;">
         <div style="min-height:100px;" class="row no-gutters">
            <div class="col-md-4 d-flex pl-2 pr-2 text-center">
               <img :src="getLineImage($tvmode.linename,true)" :alt="$tvmode.linename" :title="$tvmode.linename" class="align-self-center card-img">
            </div>
            <div class="col-md-8">
               <div class="card-body h-100 d-flex">
                  <h5 class="card-title align-self-center ">{{$tvmode.linename}}</h5>
               </div>
            </div>
         </div>
      </div>
      <!-- LINES -->
      <div id="lines-links" v-if="$tvmode.status == false" class="position-absolute tutorial-highlightable shadow-sm nav-items mr-2 ml-2 row mt-2 d-flex justify-content-between overflow-auto dropdown-menu">
         <router-link :class="selectedItem(line.linha)" v-for="(line,index) in lines" :key="index" :to="'/'+line.linha">{{line.linha}}</router-link>
      </div>
      <!-- TV MODE - CURRENT LINE -->
      <div v-if="$tvmode.status == true" class="m-0 mr-2 ml-2  mt-3 card shadow-sm">
         <div class="card-body">
            <h4 style="min-height:58px" class="card-title text-uppercase">{{$tvmode.linename}}</h4>
            <hr/>
            <div class="text-center">
               <section class="slide-show-container">
                  <div id="slide-show" class="d-flex align-items-center">
                     <img :id="'slide-'+index" v-bind:class="{'line-img img-fluid active':(item.linha == $tvmode.linename),'line-img img-fluid':(item.linha != $tvmode.linename)}" :alt="item.linha" :title="item.linha" v-for="(item,index) in lines" :key="index" :src="getLineImage(item.linha,false)"/>
                  </div>
               </section>
            </div>
         </div>
      </div>
      <!-- CREDITS - FOOTER -->
      <div id="credits-footer" class="ml-2 mb-2 tutorial-highlightable credits d-flex p-2">
         <p class="mr-1">{{$t("message.by")}} <a href="https://github.com/matheuspaula19" target="_blank">Matheus de Paula</a></p>
         <div  class=" ml-3 btn-group" role="group" :aria-label="$t('message.settingsAndLanguage')">
            <a class="btn btn-light" :title="$t('message.settingsModalTitle')" href="javascript:void(0)" role="button" id="confBtn" data-toggle="modal" data-target="#settingsModal">
               <i class="fa fa-cog"></i>
            </a>
            <a class="btn btn-light" :title="$t('message.tutorial')" v-bind:class="{'btn btn-light':(!$tvmode.status), 'btn btn-light disabled':($tvmode.status)}" href="javascript:void(0)" role="button" id="confBtn" data-toggle="modal" data-target="#welcomeModal">
               <i class="fa fa-info-circle"></i>
            </a>
            <a class="btn btn-light dropdown-toggle" :title="$t('message.language')" href="javascript:void(0)" role="button" id="langDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
               <div id="selected-lang pr-1" :class="'flag '+$i18n.locale"></div>
            </a>
            <div class="dropdown-menu" aria-labelledby="langDropdown">
               <a @click="selectLanguage('br')" class="dropdown-item" href="javascript:void(0)"><span class="flag br"></span> Português</a>
               <a @click="selectLanguage('fr')" class="dropdown-item" href="javascript:void(0)"><span class="flag fr"></span> Français</a>
               <a @click="selectLanguage('en')" class="dropdown-item" href="javascript:void(0)"><span class="flag en"></span> English</a>
               <a @click="selectLanguage('es')" class="dropdown-item" href="javascript:void(0)"><span class="flag es "></span> Español</a>
            </div>
         </div>
      </div>
   </div>
</template>
<script>
export default {
   name: 'LineNav',
   data() {
      return {
         lines: [],
         fullscreen: false,
         companyLogoUrl: "/static/public/img/logo.png"
      }
   },
   mounted: function(){
      this.getLines();
      var ref = this;
      $(document).on("keydown", function(e){
         if(e.keyCode == 38 || 
            e.keyCode == 33 || 
            e.keyCode == 87){
            /* up */
            ref.alternateLines(true)
         }else if(e.keyCode == 40 || 
                  e.keyCode == 34 || 
                  e.keyCode == 83){
            /* down */
            ref.alternateLines();
         }
      });
   },
   watch:{
      '$tvmode.linename': function(){
         var activeSlide = $("#slide-show .active");
         activeSlide.addClass("turnedLeft");
         activeSlide.removeClass("active");
         activeSlide.removeClass("turnedRight");
      }
   },
   methods:{
      alternateLines: function(prev){
         var active = $("#lines-links a.active"),
            all = $("#lines-links a");
         if(prev != null){
            /* UP */
            if(active.prev().length == 0){
               all.get(all.length - 1).click();
            }else{
               active.prev().get(0).click();
            }
         }else{
            /* DOWN */
            if(active.next().length == 0){
               all.get(0).click();
            }else{
               active.next().get(0).click();
            }
         }
      },
      setSettings: function(lang,timeInterval,workstationDetails,defaultData){
         var settings = JSON.parse(localStorage.getItem("settings"));
         if(lang != null){
            settings.lang = lang;
         }
         if(timeInterval!= null){
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
      toggleTVMode: function(){
         var ref = this;
         (ref.$tvmode.status) ? ref.$tvmode.status = false : ref.$tvmode.status = true;
         if(ref.$tvmode.status){
            $(".tvMode").addClass("active");
         }else{
            $(".tvMode").removeClass("active");
         }
         this.$root.$emit('toggleFullscreen')
      },
      getLines: function(){
         var ref = this;
         window.axios.get('/dlinha', {headers:{Accept:'application/json'}})
         .then(res => {
            ref.lines = res.data;
         });
      },
      selectLanguage: function(lang){
         this.$i18n.locale = lang;
         this.setSettings(lang, null, null, null);
      },
      selectedItem: function(line) {
         return this.$route.path.replace("/","") == line  ? 'active dropdown-item' : 'dropdown-item';
      },
      getLineImage: function(line,small){
         var image;
         switch(line){
            case "CF-1": image = "cf-1.png";break;
            case "CF-3": image = "cf-3.png";break;
            case "OW": image = "ow.png";break;
            case "Porta Bagag. Diant.E1": image = "abd_e1_e2.png";break;
            case "Porta Bagag. Diant.E2": image = "abd_e1_e2.png";break;
            case "Porta Bagag. Tras.E1": image = "fbd_e1_e2.png";break;
            case "Porta Bagag. Tras.E2": image = "fbd_e1_e2.png";break;
            case "Porta Pax Dian.": image = "apd_e1_e2.png";break;
            case "Porta Pax Tras.": image = "fpd_e1_e2.png";break;
            case "Porta Serv. Dian.": image = "asd_e1_e2.png";break;
            case "Porta Serv.Tras.": image = "fsd_e1_e2.png";break;
            case "Portas Legacy": image = "elp.png";break;
            default: image = "logo.png";break;
         }
         if(small){
            return '/static/public/img/small_icons/'+image;
         }else{
            return '/static/public/img/large_icons/'+image;
         }
      }
   }
}
</script>