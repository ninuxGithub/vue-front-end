<template>
    <div>
		<div class="wrapper">
			<db-filterinput></db-filterinput>
		</div>
        <el-table :data="tableData" border style="width: 100%" class="table">
            <el-table-column fixed prop="id" label="item_id" width="100"></el-table-column>
            <el-table-column prop="username" label="username" width="120"></el-table-column>
            <el-table-column prop="email" label="email" width="180"></el-table-column>
            <el-table-column prop="phone" label="phone" width="130"></el-table-column>
            <el-table-column prop="sex" label="sex" width="100"></el-table-column>
            <el-table-column prop="zone" label="zone" width="100"></el-table-column>
            <el-table-column  prop="create_datetime" label="create_datetime"  width="260" :formatter="formatter"></el-table-column>
            <el-table-column fixed="right" label="Operation" width="100">
                <template slot-scope="scope">
                    <el-button @click="editItem(scope.$index, tableData)" 
                    type="button" size="small" icon="edit">Edit</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination class="pagination" layout="prev, pager, next" 
        	:total="total" 
        	:page-size="pageSize"
            v-on:current-change="changePage">
        </el-pagination>
        <db-modal :dialogFormVisible="dialogFormVisible" :form="form" v-on:canclemodal="dialogVisible"></db-modal>
    </div>

</template>

<script>
    import Bus from '../../eventBus'
    import DbModal from './DbModal.vue'
    import DbFilterinput from './DbFilterinput.vue'
    import ElRow from "element-ui/packages/row/src/row";

    export default {
        data(){
            return {
                tableData: [],
                apiUrl: 'http://127.0.0.1:8000/api/persons',
                total: 0,
                pageSize: 10,
                currentPage: 1,
                sex: '',
                email: '',
                dialogFormVisible: false,
                form: '',
            }
        },
        components: {
            DbModal,DbFilterinput,ElRow
        },
        mounted () {
            this.getCustomers();
            Bus.$on('filterResultData', (data) => {
            	console.dir("Bus.$on")
                this.tableData = data.content;
                this.total = data.totalElements;
                this.pageSize = data.size;
                this.email = data.email;
                this.sex = data.sex;

            });
        },

        methods: {
            dialogVisible: function () {
                this.dialogFormVisible = false;
            },

            getCustomers: function () {
                this.$axios.get(this.apiUrl, {
                    params: {
                        page: this.currentPage,
                        sex: this.sex,
                        email: this.email
                    }
                }).then((response) => {
                	console.dir(response.data)
                    this.tableData = response.data.content;
                    this.total = response.data.totalElements;
                    this.pageSize = response.data.size;
                }).catch(function (response) {
                    console.log(response)
                });
            },
            changePage: function (currentPage) {
            	console.dir("yes")
                this.currentPage = currentPage;
                this.getCustomers()
            },
            editItem: function (index, rows) {
                this.dialogFormVisible = true;
                const itemId = rows[index].id;
                const idurl = 'http://127.0.0.1:8000/api/persons/detail/' + itemId;
                this.$axios.get(idurl).then((response) => {
                    this.form = response.data;
                }).catch(function (response) {
                    console.log(response)
                });
            },

            formatter(row, column) {
                let data = this.$moment(row.create_datetime, this.$moment.ISO_8601);
                return data.format('YYYY-MM-DD')
            },
        }
    }
</script>

<style>
    .table {
        margin-top: 30px;
    }

    .pagination {
        margin-top: 10px;
        float: right;
    }

</style>