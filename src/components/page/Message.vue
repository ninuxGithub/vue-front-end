<template>
    <div class="container">
        <el-button type="info" @click="alertOpen">点击打开Alert Message Box</el-button>
        <el-button type="danger" @click="confirmOpen">点击打开Confirm Message Box</el-button>
        <el-button type="warning" @click="promptOpen">点击打开Prompt Message Box</el-button>
        <el-button type="success" @click="selfOpen">自定义 Message Box</el-button>
        <br/>
        <br/>

        <el-button :plain="true" @click="open2">成功center</el-button>
        <el-button :plain="true" @click="open3">警告</el-button>
        <el-button :plain="true" @click="open">消息</el-button>
        <el-button :plain="true" @click="open4">错误</el-button>

        <br/>
        <br/>

        <el-button plain @click="not1">可自动关闭</el-button>
        <el-button plain @click="not2">不会自动关闭</el-button>



        <br/>
        <div>带颜色的nofify</div>
        <el-button plain @click="not21">成功</el-button>
        <el-button plain @click="not22">警告</el-button>
        <el-button plain @click="not23">消息</el-button>
        <el-button plain @click="not24">错误</el-button>

        <br/>
        <div>loading</div>
        <el-button type="primary" @click="openFullScreen" v-loading.fullscreen.lock="fullscreenLoading">
            指令方式
        </el-button>
        <el-button type="primary" @click="openFullScreen2">
            服务方式
        </el-button>


    </div>
</template>

<script>

    var deepCopy= function(source) {
        var result={};
        for (var key in source) {
            result[key] = typeof source[key]==='object'? deepCoyp(source[key]): source[key];
        }
        return result;
    }
    export default {
        data: function () {
            return {
                fullscreenLoading: false
            }
        },
        methods: {
            alertOpen(){
                this.$alert('这是一段消息','标题名称',{
                    confirmButtonText:'确定',
                    callback:action =>{
                        this.$message({
                            type:'info',
                            message:`action:${action}`
                        });
                    }
                });
            },
            confirmOpen(){
                this.$confirm('此操作将永久删除该文件，是否继续？','提示',{
                  confirmButtonText:'确定',
                  cancelButtonText:'取消',
                  type:'warning'
                }).then(()=>{
                    this.$message({
                        type:'success',
                        message:'删除成功！'
                    });
                }).catch(()=>{
                    this.$message({
                        type:'info',
                        message:'已取消删除'
                    });
                });
            },
            promptOpen(){
                this.$prompt('请输入邮箱','提示',{
                    confirmButtonText:'',
                    cancelButtonText:'',
                    inputPattern:/[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
                    inputErrorMessage:'邮箱格式不正确'
                }).then(({value}) =>{
                    this.$message({
                        type:'success',
                        message:'你的邮箱是：'+value
                    });
                }).catch(()=>{
                    this.$message({
                       type:'info',
                       message:'取消输入'
                    });
                });
            },
            selfOpen(){
                const h = this.$createElement; //自定义的消息会修改createElement
                this.$msgbox({
                    title:'消息',
                    message:h('p',null,[
                        h('span',null,''),
                        h('i',{style:'color:teal'},'VNode')
                    ]),
                    showCancelButton:true,
                    confirmButtonText:'确定',
                    cancelButtonText:'取消',
                    beforeClose: (action,instance,done)=>{
                        if(action=='confirm'){
                            instance.confirmButtonLoading=true;
                            instance.confirmButtonText='执行中....';
                            setTimeout(()=>{
                               done();
                               setTimeout(()=>{
                                   instance.confirmButtonLoading=false;
                               },300)
                            },3000);
                        }else{
                            done();
                        }
                    }
                }).then(action =>{
                    this.$message({
                        type:'info',
                        message:'动作:'+( action=="confirm"?'确定':'取消')
                    })
                })
            },
            open() {
                this.$message('这是一条消息提示');
            },
            open2() {
                this.$message({
                    message: '恭喜你，这是一条成功消息 center',
                    type: 'success',
                    center: true
                });
            },

            open3() {
                this.$message({
                    message: '警告哦，这是一条警告消息',
                    type: 'warning'
                });
            },

            open4() {
                this.$message.error('错了哦，这是一条错误消息');
            },

            not1(){
                const h = this.$createElement;
                this.$notify({
                    title:'标题名称',
                    message: h('i', {style:'teal'},"这是notify")
                });
            },
            not2(){
                this.$notify({
                    title:'提示',
                    message:'不会自动关闭',
                    duration:0
                });

            },
            not21(){
                this.$notify({
                    title: '成功',
                    message: '这是一条成功的提示消息',
                    type: 'success'
                });
            },
            not22(){
                this.$notify({
                    title: '警告',
                    message: '这是一条警告的提示消息',
                    type: 'warning'
                });
            },
            not23(){
                this.$notify({
                    title: '提示',
                    message: '这是一条提示的提示消息',
                    type: 'info'
                });
            },
            not24(){
                this.$notify({
                    title: '错误',
                    message: '这是一条错误的提示消息',
                    type: 'error'
                });
            },
            openFullScreen() {
                this.fullscreenLoading = true;
                setTimeout(() => {
                    this.fullscreenLoading = false;
                }, 2000);
            },
            openFullScreen2() {
                const loading = this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                setTimeout(() => {
                    loading.close();
                }, 2000);
            }
        }
    }
</script>