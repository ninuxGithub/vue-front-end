<template>
	<div class="table">
		<div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 表格</el-breadcrumb-item>
                <el-breadcrumb-item>学生信息表格</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
		 <div class="handle-box">
		 
		 	<ul class="btn-edit fl">
				<li class="input-search">
					<el-input :placeholder="placeholder"  v-model="keywords" style="width:300px;">
						<el-select v-model="select" @change="searchFieldChange" v-on:visible-change="querySearchField" slot="prepend">
							<el-option label="姓名" value="name"></el-option>
							<el-option label="学号" value="number"></el-option>
						</el-select>
					</el-input>
					<el-button type="danger" class="danger" slot="append" icon="search" @click="filterResultData"></el-button>
					
					<!--
				 	注释掉的代码
					<el-button type="danger" class="danger" slot="append" icon="search" @click="query"></el-button>
					-->
				</li>
			</ul>
		 	<!--
		 	注释掉的代码
		    <el-form :inline="true" :model="formInline">
		        <el-form-item label="Sex" class="bg-purple-dark">
		            <el-select v-model="formInline.sex" clearable placeholder="select sex"  v-on:visible-change="selectDemo">
		                <el-option
		                        v-for="item in type_options"
		                        :label="item.label"
		                        :value="item.value">
		                </el-option>
		            </el-select>
		        </el-form-item>
		
		        <el-form-item  v-if='formInline.sex' label="Description">
		            <el-input v-model="formInline.email" placeholder="Please input suffix of email"></el-input>
		        </el-form-item>
		
		        <el-form-item v-else='formInline.sex' label="Description">
		            <el-input v-model="formInline.email" disabled placeholder="Please input suffix of email"></el-input>
		        </el-form-item>
		    </el-form>
		    -->
	    </div>
	</div>
</template>

<script>
    import lodash from 'lodash'
    import Bus from '../../eventBus'

    export default {
        name: 'search-student',
        data() {
            return {
            	url:'http://localhost:8000/studentinfo',
                stu: {
                    name: '',
                    number: ''
                },
                keywords:'',
                select:'name',
                placeholder:'请输入姓名'
            }
        },
        watch: {
            'keywords': 'filterResultData'
        },

        methods: {
        	searchFieldChange(val){
        		if(val == "name"){
        			this.select ="name";
        			this.placeholder='请输入姓名';
        		}else{
        			this.select ="number";
        			this.placeholder='请输入学号';
        		}
        	},
        	
        	querySearchField:function(param){
        		if(param){
        			console.dir(param)
        		}
        	},
        	
            filterResultData: _.debounce(
                function () {
                    this.$axios.get(this.url, {
                        params: {
                            name: this.select=='name'?this.keywords:'',
                            number: this.select=='number'?this.keywords:''
                        }
                    }).then((response) => {
                        response.data['keywords'] = this.keywords;
                        Bus.$emit('filterResultData', response.data);
                    }).catch(function (response) {
                        console.log(response)
                    });
                }, 500
            ),
        }
    }
</script>