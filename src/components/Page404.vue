<style scoped>
.title404{
    font-size: 102px;
    color: #082559;
    font-weight: bold;
}

.message404{
    font-size: 22px;
    color: #082559;
    font-weight: bold;
}
</style>
<template>
    <div class="container-fluid d-flex justify-content-center">
        <template>
            <div class="card w-50">
                <div class="card-body">
                    <div class="row mt-2 mb-2 p-2 justify-content-around">
                        <img height="40" class="margin-auto" src="/static/public/img/logo.png" alt="Latécoère" title="Latécoère"/>
                    </div>
                    <div class="row mt-2 mb-2 p-2 justify-content-around">
                        <h1 class="title404">404</h1>
                    </div>
                    <hr/>
                    <div class="row mt-2 mb-2 p-2 justify-content-center">
                        <h1 class="message404 text-uppercase">{{$t("message.message404")}}</h1>
                   </div>
                    <div class="row mt-2 mb-2 p-2 justify-content-center">
                        <router-link to="/" class="btn btn-primary" >{{$t("message.button404")}}</router-link>
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>
<script>
export default {
    name:"Page404",
    mounted: function(){
        document.title = '404 - ' + this.$t("message.message404");
    }

}
</script>