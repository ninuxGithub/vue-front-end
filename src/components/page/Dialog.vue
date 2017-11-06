<template>
    <div class="container">
        <el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button>
        <el-button type="text" @click="centerDialogVisible = true">点击打开 Dialog</el-button>


        <el-dialog title="提示" :visible.sync="dialogVisible"  width="10%"  :before-close="handleClose">
            <span>这是一段信息</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog title="提示" :visible.sync="centerDialogVisible"  width="30%" center>
            <span>需要注意的是内容是默认不居中的</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="centerDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>


        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="用户管理" name="first">用户管理
                <div class="block">
                    <span class="demonstration">默认</span>
                    <el-date-picker v-model="nowTime" type="datetime" placeholder="选择日期时间"/>
                </div>
            </el-tab-pane>
            <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
            <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
            <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
        </el-tabs>


    </div>
</template>

<script>
    export default {
        data: function () {
            return {
                dialogVisible: false,
                centerDialogVisible:false,
                activeName: 'first',
                nowTime:''
            }
        },
        methods: {
            handleClose(done){
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                        location.reload();
                    })
                    .catch(_ => { });
            },
            handleClick(tab, event) {
                console.log(tab);
                console.log(event);


            }
        }
    }
</script>