<style>
#dashboard {
  font-family: 'Open Sans', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* TOASTR */
.toast-container > .toast-info,
.toast-container > .toast-success,
.toast-container > .toast-error,
.toast-container > .toast-warning{
  background-image: none !important
}

.toast-container > .toast-info::before,
.toast-container > .toast-success::before,
.toast-container > .toast-error::before,
.toast-container > .toast-warning::before{
  position: absolute;
  left:0;
  top:0;
  bottom:0;
  padding:10px;
  color: #fff;
  font: normal normal normal 34px/1 FontAwesome;
}

.toast-container > .toast-info::before {
  content: "\f05a";
}

.toast-container > .toast-error::before {
  content: "\f00d";
}

.toast-container > .toast-success::before {
  content: "\f00c";
}

.toast-container > .toast-warning::before {
  content: "\f071";
}

.fullscreen{
  background-color: #fff !important;
}

.loading-container{
  min-height: 200px;
}

/* SLIDE */
.slide-progress{
  position: absolute;
  width: 100%;
  height: 0px;
  bottom:0;
  overflow: hidden;
  background-color: aliceblue;
}

.slide-progress > .bar{
  height: 100%;
  width: 0%;
  transition:width 1s cubic-bezier(0, 0, 0.68, 0.59);
  -moz-transition:width 1s cubic-bezier(0, 0, 0.68, 0.59);
  -webkit-transition:width 1s cubic-bezier(0, 0, 0.68, 0.59);
  background-color: #082559;
}

.slide-progress.slide-out > .bar{
  -webkit-animation-name: slide-out;
  -webkit-animation-duration: .5s;
  -webkit-animation-fill-mode: forwards;
  -webkit-animation-timing-function: cubic-bezier(0, 0, 0.68, 0.59);
  -moz-animation-name: slide-out;
  -moz-animation-duration: .5s;
  -moz-animation-fill-mode: forwards;
  -moz-animation-timing-function: cubic-bezier(0, 0, 0.68, 0.59);
  animation-name: slide-out;
  animation-duration: .5s;
  animation-fill-mode: forwards;
  animation-timing-function: cubic-bezier(0, 0, 0.68, 0.59);
  float:right;
}

.slide-progress.close-progress{
  -webkit-animation-name: close-progress;
  -webkit-animation-duration: .3s;
  -webkit-animation-fill-mode: forwards;
  -moz-animation-name: close-progress;
  -moz-animation-duration: .3s;
  -moz-animation-fill-mode: forwards;
  animation-name: close-progress;
  animation-duration: .3s;
  animation-fill-mode: forwards;
}

.slide-progress.open-progress{
  -webkit-animation-name: open-progress;
  -webkit-animation-duration: .3s;
  -webkit-animation-fill-mode: forwards;
  -moz-animation-name: open-progress;
  -moz-animation-duration: .3s;
  -moz-animation-fill-mode: forwards;
  animation-name: open-progress;
  animation-duration: .3s;
  animation-fill-mode: forwards;
}
.sidebar{
  position: fixed;
}

/* WELCOME HIGHLIGHTS */
.tutorial-highlightable.highlighted{
  background: #fff;
  z-index: 9999999 !important;
  -webkit-box-shadow: 0 0 0 0.2rem rgba(38,143,255,.5) !important;
  box-shadow: 0 0 0 0.2rem rgba(38,143,255,.5) !important;
}
#tv-mode-switch.highlighted{
  border-radius: 50px;
}
#range-selector.highlighted{
  border-radius: 50px;
}
#credits-footer.highlighted{
  border-radius: 20px;
}
/* ANIMATIONS */
@-webkit-keyframes slide-out {
  0% {width: 94%}
  70%{opacity: 1;}
  100% {width: 0%;opacity: 0;}
}
@-moz-keyframes slide-out {
  0% {width: 94%}
  70%{opacity: 1;}
  100% {width: 0%;opacity: 0;}
}
@keyframes slide-out {
  0% {width: 94%}
  70%{opacity: 1;}
  100% {width: 0%;opacity: 0;}
}
@-webkit-keyframes close-progress {
  from {height: 4px;}
  to {height: 0px;}
}
@-moz-keyframes close-progress {
  from {height: 4px;}
  to {height: 0px;}
}
@keyframes close-progress {
  from {height: 4px;}
  to {height: 0px;}
}
@-webkit-keyframes open-progress {
  from {height: 0px;}
  to {height: 4px;}
}
@-moz-keyframes open-progress {
  from {height: 0px;}
  to {height: 4px;}
}
@keyframes open-progress {
  from {height: 0px;}
  to {height: 4px;}
}
</style>
<template>
  <fullscreen ref="fullscreen" @change="fullscreenChange">
    <div id="dashboard" class="h-100">
      <router-view class="pt-2"/>
      <div id="tvmode-progress" class="slide-progress">
        <div class="bar"></div>
      </div>
    </div>
    <div id="welcome">
      <!-- WELCOME MODAL -->
      <div class="modal fade" id="welcomeModal" tabindex="-1" role="dialog" aria-labelledby="welcomeModal" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <img height="30" class="margin-auto" :src="companyLogoUrl" alt="Logo Title" title="Logo Title"/>
              <button type="button" class="close" data-dismiss="modal" :aria-label="$t('message.close')">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <h5 class="card-title">{{$t("message.welcomeModalTitle")}}</h5>
              <p class="card-text">{{$t("message.welcomeModalP1")}}</p>
              <p class="card-text">{{$t("message.welcomeModalP2")}}</p>
              <p class="card-text">{{$t("message.welcomeModalP3")}}</p>
            </div>
            <div class="d-block modal-footer">
              <div class="float-left" style="line-height:28px;">
                <input v-model="$alwaysShowTutorial.enabled" id="alwaysShowTutorial" type="checkbox" :aria-label="$t('message.alwaysShowTutorial')">
                <label for="alwaysShowTutorial">{{$t("message.alwaysShowTutorial")}}</label>
              </div>
              <a href="javascript:void(0)" @click="nextStep('tv-mode-switch')" data-toggle="modal" data-dismiss="modal" data-target="#welcomeModalPart1" class="btn btn-primary float-right">{{$t("message.nextStep")}}</a>
              <button type="button" class="btn btn-secondary float-right" data-dismiss="modal">{{$t("message.skipTutorial")}}</button>
            </div>
          </div>
        </div>
      </div>

      <!-- WELCOME MODAL PART 1 -->
      <div class="modal fade" id="welcomeModalPart1" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false" aria-labelledby="welcomeModalPart1" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <img height="30" class="margin-auto" :src="companyLogoUrl" alt="Logo Title" title="Logo Title"/>
              <button type="button" class="close" data-dismiss="modal" :aria-label="$t('message.close')">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <h5 class="card-title">{{$t("message.welcomeModalPT1Title")}}</h5>
              <p class="card-text">{{$t("message.welcomeModalPT1P1")}}</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary"  data-toggle="modal" data-dismiss="modal" data-target="#welcomeModal">{{$t("message.prevStep")}}</button>
              <a href="javascript:void(0)" @click="nextStep('lines-links')" class="btn btn-primary float-right"  data-toggle="modal" data-dismiss="modal" data-target="#welcomeModalPart2">{{$t("message.nextStep")}}</a>
            </div>
          </div>
        </div>
      </div>

      <!-- WELCOME MODAL PART 2 -->
      <div class="modal fade" id="welcomeModalPart2" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false" aria-labelledby="welcomeModalPart2" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <img height="30" class="margin-auto" :src="companyLogoUrl" alt="Logo Title" title="Logo Title"/>
              <button type="button" class="close" data-dismiss="modal" :aria-label="$t('message.close')">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <h5 class="card-title">{{$t("message.welcomeModalPT2Title")}}</h5>
              <p class="card-text">{{$t("message.welcomeModalPT2P1")}}</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary"  data-toggle="modal" data-dismiss="modal" data-target="#welcomeModalPart1">{{$t("message.prevStep")}}</button>
              <a href="javascript:void(0)" @click="nextStep('credits-footer')" class="btn btn-primary float-right"   data-toggle="modal" data-dismiss="modal" data-target="#welcomeModalPart3">{{$t("message.nextStep")}}</a>
            </div>
          </div>
        </div>
      </div>

      <!-- WELCOME MODAL PART 3 -->
      <div class="modal fade" id="welcomeModalPart3" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false" aria-labelledby="welcomeModalPart3" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <img height="30" class="margin-auto" :src="companyLogoUrl" alt="Logo Title" title="Logo Title"/>
              <button type="button" class="close" data-dismiss="modal" :aria-label="$t('message.close')">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <h5 class="card-title">{{$t("message.welcomeModalPT3Title")}}</h5>
              <p class="card-text">{{$t("message.welcomeModalPT3P1")}}</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary"  data-toggle="modal" data-dismiss="modal" data-target="#welcomeModalPart2">{{$t("message.prevStep")}}</button>
              <a href="javascript:void(0)" @click="nextStep('range-selector')" class="btn btn-primary float-right" data-toggle="modal" data-dismiss="modal" data-target="#welcomeModalPart4">{{$t("message.nextStep")}}</a>
            </div>
          </div>
        </div>
      </div>

      <!-- WELCOME MODAL PART 4 -->
      <div class="modal fade" id="welcomeModalPart4" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false" aria-labelledby="welcomeModalPart4" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <img height="30" class="margin-auto" :src="companyLogoUrl" alt="Logo Title" title="Logo Title"/>
              <button type="button" class="close" data-dismiss="modal" :aria-label="$t('message.close')">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <h5 class="card-title">{{$t("message.welcomeModalPT4Title")}}</h5>
              <p class="card-text">{{$t("message.welcomeModalPT4P1")}}</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary"  data-toggle="modal" data-backdrop="static" data-keyboard="false" data-dismiss="modal" data-target="#welcomeModalPart3">{{$t("message.prevStep")}}</button>
              <a href="javascript:void(0)" @click="nextStep('current-line-card')" class="btn btn-primary float-right" data-toggle="modal" data-dismiss="modal" data-target="#welcomeModalPart5">{{$t("message.nextStep")}}</a>
            </div>
          </div>
        </div>
      </div>

      <!-- WELCOME MODAL PART 5 -->
      <div class="modal fade" id="welcomeModalPart5" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false" aria-labelledby="welcomeModalPart5" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <img height="30" class="margin-auto" :src="companyLogoUrl" alt="Logo Title" title="Logo Title"/>
              <button type="button" class="close" data-dismiss="modal" :aria-label="$t('message.close')">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <h5 class="card-title">{{$t("message.welcomeModalPT5Title")}}</h5>
              <p class="card-text">{{$t("message.welcomeModalPT5P1")}}</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary"  data-toggle="modal" data-dismiss="modal" data-target="#welcomeModalPart3">{{$t("message.prevStep")}}</button>
              <a href="javascript:void(0)" @click="nextStep('config-selectors')" class="btn btn-primary float-right"  data-toggle="modal" data-dismiss="modal" data-target="#welcomeModalPart6">{{$t("message.nextStep")}}</a>
            </div>
          </div>
        </div>
      </div>

      <!-- WELCOME MODAL PART 6 -->
      <div class="modal fade" id="welcomeModalPart6" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false" aria-labelledby="welcomeModalPart6" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <img height="30" class="margin-auto" :src="companyLogoUrl" alt="Logo Title" title="Logo Title"/>
              <button type="button" class="close" data-dismiss="modal" :aria-label="$t('message.close')">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <h5 class="card-title">{{$t("message.welcomeModalPT6Title")}}</h5>
              <p class="card-text">{{$t("message.welcomeModalPT6P1")}}</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary"  data-toggle="modal" data-dismiss="modal" data-target="#welcomeModalPart5">{{$t("message.prevStep")}}</button>
              <a href="javascript:void(0)" data-dismiss="modal" class="btn btn-primary float-right">{{$t("message.lastStep")}}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
   </fullscreen>
</template>
<script>
export default {
  name: 'Dashboard',
  data() {
    return {
      fullscreen: false,
      companyLogoUrl: "/static/public/img/logo.png"
    }
  },
  created: function(){
    document.title = this.$route.meta.title;
    this.pageTitle = this.$route.meta.title;
  },
  mounted: function(){
    this.$root.$on('toggleFullscreen', () => {
      if(this.$tvmode.status == true){
        this.toggleFullScreen();
      }
    });
    /* DISPLAY TUTORIAL AT STARTUP IF CHECKBOX IS MARKED */
    if(this.$alwaysShowTutorial.enabled){
      $('#welcomeModal').modal('show');
    }
  },
  methods:{
    showTutorialSaveSettings: function(){
      var settings = JSON.parse(localStorage.getItem("settings"));
      settings.alwaysShowTutorial = this.$alwaysShowTutorial.enabled;
      window.localStorage.setItem("settings", JSON.stringify(settings));
    },
    nextStep: function(highlightable){
      $(".tutorial-highlightable").removeClass("highlighted");
      $("#"+highlightable).addClass("highlighted");
    },  
    fullscreenChange: function(fullscreen) {
      this.fullscreen = fullscreen
    },
    toggleFullScreen: function() {
      this.$refs['fullscreen'].toggle()
    },
  },
  watch:{
    /* disable fullscreen if user turn off tv mode */
    '$tvmode.status':function(){
      if(this.$tvmode.status == false){
        this.$refs['fullscreen'].toggle()
      }
    },
    '$alwaysShowTutorial.enabled':function(){
      this.showTutorialSaveSettings();
    },
    /* disable tv mode if user escape from fullscreen */
    'fullscreen':function(){
      if(this.$tvmode.status == true && this.fullscreen == false){
        this.$tvmode.status = false
        $(".tvMode").removeClass("active");
      }else if(this.fullscreen == true && this.$tvmode.status == false){
        this.$refs['fullscreen'].toggle()
      }
    }
  }
}
</script>

