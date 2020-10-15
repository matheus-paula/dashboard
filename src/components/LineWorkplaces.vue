<style scoped>
.company-color{
    color: #082559;
}

.range-select-label{
    line-height: 2.3em;
    font-size: .9rem;
    white-space: nowrap;
}

.workplace{
    position: relative;
    width: 100%;
    white-space:pre-line;
    font-size: .9rem;
    font-size: 1vw;
    font-weight: 300;
    line-height: 1.2;
}

.workstation-details{
    border-top: 1px solid rgba(255, 255, 255, 0.21);
}

.card-body .card-subtitle:nth-last-child(1){
   margin-bottom: 0 !important
}

.info-container{
    bottom: 0;
    left: 0;
    right: 0;
}

.card-subtitle{
    font-size: .8rem;
    margin-bottom: 10px !important;
    border-bottom: 1px solid rgba(255, 255, 255, 0.21);
    padding-bottom: 5px;
}

.card-subtitle:last-child{
   margin-bottom: 0px !important;
   border-bottom: 0px !important;
   padding-bottom: 0px !important;
}

.force-black-text h6,
.force-black-text span{
    color:black !important
}

.days{
   font-size: .8rem;
   font-weight: 300;
   line-height: 1.2;
}

.finished-date {
    display: block;
    padding-top: 2px;
}
</style>
<template>
    <div class="row mb-3">
        <div class="col-12 m-0" >
            <div class="workplaces card-body p-0">
                <div class="row">
                    <h5 v-if="rangename != '' " class="mb-2 col-9 card-title">{{ $t("message.lineWorkplaces") }} <span class="font-weight-bold">"{{linename}}"</span> - {{ $t("message.range") }} <span class="font-weight-bold">"{{rangename}}"</span></h5>
                    <h5 v-if="rangename == '' " class="mb-2 col-9 card-title">{{ $t("message.lineWorkplaces") }} <span class="font-weight-bold">"{{linename}}"</span></h5>
                    <div id="range-selector" v-if="ranges.length > 0 && rangename != ''" class="tutorial-highlightable col-3 float-right">
                        <div class="form-group mb-0 pt-1 pb-1 d-flex justify-content-center">
                            <span class="range-select-label mr-2">{{ $t("message.range") }}:</span>
                            <select class="form-control" id="rangeSelect" v-model="rangeSelected" @change="onChange($event)">
                                <option v-for="(item,index) in ranges" :key="index">{{item.range}}</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="row pt-0 pb-2">
                    <div class="col-12">
                        <small class="text-muted">{{ $t("message.legend") }}</small>
                        <span class="badge badge-primary">{{ $t("message.advanced") }}</span>
                        <span class="badge badge-danger">{{ $t("message.delayed") }}</span>
                        <span class="badge badge-success">{{ $t("message.intime") }}</span>
                        <span class="badge badge-light">{{ $t("message.notStarted") }}</span>
                        <small class="text-muted"> - {{$t("message.lastUpdated")}}: {{getTimeStamp()}}</small>
                    </div>
                </div>
                <div class="row loading-container" v-if="data.length == 0" >
                    <div class="col-12 d-flex align-items-start justify-content-center">
                        <div class="align-self-center">
                            <div class="spinner-grow p4 company-color align-self-center" role="status">
                                <span class="sr-only">{{ $t("message.loading") }}</span>
                            </div>
                            <div class="spinner-grow p4 company-color align-self-center" role="status">
                                <span class="sr-only">{{ $t("message.loading") }}</span>
                            </div>
                            <div class="spinner-grow p4 company-color align-self-center" role="status">
                                <span class="sr-only">{{ $t("message.loading") }}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row d-flex m-0"  v-if="data.length > 0">
                    <div class="col-2 p-0 mb-2" v-for="(item,index) in data" :key="index">
                        <div class="card h-100 m-1" >
                            <div v-bind:class="{'d-flex align-items-end flex-column card-body align-content-end  pt-2 pl-2 pr-2 pb-0 bg-primary':(item.fimreal_fimplan > 0), 'd-flex align-items-end flex-column card-body pt-2 pl-2 pr-2 pb-0 bg-danger':(item.fimreal_fimplan < 0),'d-flex align-items-end flex-column card-body pt-2 pl-2 pr-2 pb-0 bg-success':(item.fimreal_fimplan == 0),'d-flex align-items-end flex-column card-body pt-2 pl-2 pr-2 pb-0 bg-light force-black-text':(isNaN(item.fimreal_fimplan)) }" v-if="item.max != null && item.max != undefined">
                                <h6 class="align-self-baseline workplace card-title text-white font-weight-bold text-uppercase mb-1"> {{item.posto}}</h6>
                                <div class="w-100 mt-auto mb-0 pt-2">
                                    <h6 v-if="item.range" class="card-subtitle mb-2 text-white">{{ $t("message.lastProduct") }}: <span class="font-weight-bolder">{{item.range}}</span></h6>
                                </div>
                                <div class="workstation-details w-100 mt-auto mb-2 pt-2" v-if="!$workstationDetails.status && !isNaN(item.fimreal_fimplan)">
                                    <h6 v-if="item.fimreal_fimplan < 0" class="card-subtitle mb-2 text-white">{{ $t("message.delayed") }}: <span class="days font-weight-bolder">{{item.fimreal_fimplan}} {{ (Math.abs(item.fimreal_fimplan) != 1) ? $t("message.days[0]") : $t("message.days[1]") }}</span></h6>
                                    <h6 v-if="item.fimreal_fimplan > 0" class="card-subtitle mb-2 text-white">{{ $t("message.advanced") }}: <span class="days font-weight-bolder">{{item.fimreal_fimplan}} {{ (Math.abs(item.fimreal_fimplan) != 1) ? $t("message.days[0]") : $t("message.days[1]") }}</span></h6>
                                    <h6 class="card-subtitle mb-2 text-white">{{ $t("message.finishedDate") }}: <span class="finished-date font-weight-bolder">{{getTimeStamp(item.max)}}</span></h6>
                                </div>
                                <div  class="mt-auto mb-2" v-else>
                                    <h6 v-if="isNaN(item.fimreal_fimplan)" class="card-subtitle mb-2 text-black-50">{{ $t("message.notStarted") }}</h6>
                                </div>
                            </div>
                            <div v-bind:class="{'d-flex align-items-end flex-column card-body pt-2 pl-2 pr-2 pb-0 bg-primary':(item.avg_fimreal_fimplan > 0), 'd-flex align-items-end flex-column card-body pt-2 pl-2 pr-2 pb-0 bg-danger':(item.avg_fimreal_fimplan < 0),'d-flex align-items-end flex-column card-body pt-2 pl-2 pr-2 pb-0 bg-success':(item.avg_fimreal_fimplan == 0),'d-flex align-items-end flex-column card-body pt-2 pl-2 pr-2 pb-0 bg-light force-black-text':(isNaN(item.avg_fimreal_fimplan)) }" v-else>
                                <h6 class="align-self-baseline workplace card-title text-white font-weight-bold text-uppercase mb-1"> {{item.posto}}</h6>
                                <div class="w-100 mt-auto mb-2" v-if="!$workstationDetails.status && !isNaN(item.sum_fimreal_fimplan)">
                                    <h6 v-if="item.sum_fimreal_fimplan < 0" class="card-subtitle mb-2 text-white">{{ $t("message.totalDelay") }}: <span class="days">{{round(item.sum_fimreal_fimplan,0)}} {{ (Math.abs(item.sum_fimreal_fimplan) != 1) ? $t("message.days[0]") : $t("message.days[1]") }}</span></h6>
                                    <h6 v-if="item.avg_fimreal_fimplan < 0" class="card-subtitle mb-2 text-white">{{ $t("message.average") }}: <span class="days">{{round(item.avg_fimreal_fimplan,0)}} {{ (Math.abs(item.avg_fimreal_fimplan) != 1) ? $t("message.days[0]") : $t("message.days[1]") }}</span></h6>
                                    <h6 v-if="item.avg_fimreal_fimplan > 0" class="card-subtitle mb-2 text-white">{{ $t("message.average") }}: <span class="days">{{round(item.avg_fimreal_fimplan,0)}} {{ (Math.abs(item.avg_fimreal_fimplan) != 1) ? $t("message.days[0]") : $t("message.days[1]") }}</span></h6>
                                    <h6 v-if="item.sum_fimreal_inicioreal < 0" class="card-subtitle mb-1 text-white">{{ $t("message.total") }}: <span class="days">{{round(item.sum_fimreal_inicioreal,0)}} {{ (Math.abs(item.sum_fimreal_inicioreal) != 1) ? $t("message.days[0]") : $t("message.days[1]") }}</span></h6>
                                    <h6 v-if="item.sum_fimreal_inicioreal > 0" class="card-subtitle mb-1 text-white">{{ $t("message.total") }}: <span class="days">{{round(item.sum_fimreal_inicioreal,0)}} {{ (Math.abs(item.sum_fimreal_inicioreal) != 1) ? $t("message.days[0]") : $t("message.days[1]") }}</span></h6>
                                    <h6 v-if="item.sum_fimreal_fimplan == 0" class="card-subtitle mb-2 text-white float-right">{{ $t("message.workstationOk") }}</h6>
                                </div>
                                <div  class="mt-auto mb-2" v-else>
                                    <h6 v-if="isNaN(item.sum_fimreal_fimplan)" class="card-subtitle mb-2 text-black-50">{{ $t("message.notStarted") }}</h6>
                                </div>
                            </div>
                        </div>
                    </div>            
                </div> 
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'LineWorkplaces',
    data() {
        return {
            rangeSelected: ""
        }
    },
    props: {
        linename: String,
        rangename: String,
        ranges: Array,
        data: Array
    },
    watch:{
        'rangename': function(){
            this.rangeSelected = this.rangename;
        }
    },
    methods:{
        parseDate: function(date){
            var d = new Date(date);
            return d.getDate()+"/"+(d.getMonth() + 1)+"/"+d.getFullYear()+" "+this.$t("message.timePreposition")+" "+d.getHours()+":"+d.getMinutes()
        },
        getTimeStamp: function(date){
            var a;
            if(date){
                a = new Date(date);
            }else{
                a = new Date();
            }
            if(this.$i18n.locale == "fr"){
                return  +a.getDate() + ' '+ this.$t("message.months")[a.getMonth()] + ', ' +a.getFullYear() + ' ' + this.$t('message.timePreposition')+' '+a.toLocaleString('fr', { hour: 'numeric', minute: 'numeric', hour12: false });
            }else if(this.$i18n.locale == "en"){
                return  this.$t("message.months")[a.getMonth()] + ' ' + a.getDate()  + ', ' +a.getFullYear() + ' ' + this.$t('message.timePreposition')+' '+ a.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
            }else if(this.$i18n.locale == "br"){
                return a.getDate() + ' de ' +  this.$t("message.months")[a.getMonth()] + ' de ' +a.getFullYear() + ' ' + this.$t('message.timePreposition')+' '+a.toLocaleString('pt-br', { hour: 'numeric', minute: 'numeric', hour12: false });
            }else if(this.$i18n.locale == "es"){
                return  a.getDate() + ' de ' +  this.$t("message.months")[a.getMonth()] + ' de ' +a.getFullYear() + ' ' + this.$t('message.timePreposition')+' '+a.toLocaleString('es', { hour: 'numeric', minute: 'numeric', hour12: false });
            }
        },
        round: function (n,r) {		
		   return n.toFixed(r).replace(".",",");
        },
        onChange: function(){
            this.$emit('range-update', this.rangeSelected)
        }
    }
}
</script>
