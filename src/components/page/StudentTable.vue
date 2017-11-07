<template>
   <div class="">
   		<section class="main-content-wrapper wrapper">
   				<div class="row">
   					<!--查询-->
   					<!--
   					<ul class="btn-edit fl">
   						<li class="input-search">
   							<el-input :placeholder="placeholder" v-model="keywords" style="width:300px;">
   								<el-select v-model="select" @change="searchFieldChange" slot="prepend">
	   								<el-option label="姓名" value="name"></el-option>
	   								<el-option label="学号" value="number"></el-option>
   								</el-select>
   							</el-input>
   							<el-button type="danger" class="danger" slot="append" icon="search" @click="query"></el-button>
   						</li>
   					</ul>
   					-->
   					
   					<!--替换为查询的组件-->
   					<search-student></search-student>
   					
   					
   					<!--操作-->
   					<ul class="btn-edit fr">
   						<li>
   							<el-button type="primary" @click="dialogCreateVisible=true">添加学生</el-button>
   							<el-button type="primary" icon="delete" :disabled="selected.length==0" @click="removeStudents()">删除</el-button>
   						</li>
   					</ul>
   					<!--学生信息表-->
   					<el-table :data="students" stripe v-loading="loading" element-loading-text="拼命地加载中..."
   						style="width:100%" height="350"  
   						@sort-change="tableSortChange" 
   						@selection-change ="tableSelectionChange">
   						<!--
   						<el-table-column fixed type="selection" width="50"></el-table-column>
						-->   						
   						<el-table-column fixed type="selection" width="50"></el-table-column>
   						<el-table-column fixed sortable="custom" prop="name" label="姓名" width="120"></el-table-column>
   						<el-table-column sortable="custom" prop="number" label="学号" width="150"></el-table-column>
   						<el-table-column sortable="custom" prop="score" label="学分" width="150"></el-table-column>
   						<el-table-column sortable="custom" prop="createTime" label="创建时间" inline-template width="220">
   							<!--
   							<div>{{ row.createTime | moment('YYYY年MM月DD日 HH:mm:ss')}}</div>
   							-->
   							<div>{{ row.createTime | moment('YYYY年MM月DD日')}}</div>
   						</el-table-column>
   						<el-table-column sortable="custom" prop="hobby" label="爱好" width="150"></el-table-column>
   						<el-table-column sortable="custom" prop="active" label="激活" inline-template width="150">
   							<div>{{ row.active==1?'激活':'冻结'}}</div>
   						</el-table-column>
   						<el-table-column inline-template label="操作" width="150">
   							<span>
   								<el-button type="primary" size="mini" @click="removeStudent(row)">删除</el-button>
   								<el-button type="primary" size="mini" @click="setCurrent(row)">编辑</el-button>
   							</span>
   						</el-table-column>
   					</el-table>
   					<!--分页-->
   					<el-pagination class="tc mg" 
   						:current-page="filter.page" 
   						:page-sizes="[6,10,20,50,100]"
   						:page-size="filter.per_page" 
   						:total="total_rows"
   						layout="total,sizes,prev,pager,next,jumper"
   						@size-change="pageSizeChange" 
   						@current-change="pageCurrentChange">
   					</el-pagination>
   				</div>	
   		</section>
   		
   		
   		<!--创建学生-->
   		<el-dialog title="创建学生" v-model="dialogCreateVisible" :close-on-click-model="false" :close-on-press-escape="false" @close="reset">
   			<el-form id="#create" :model="create" :rules="rules" ref="create" label-width="100px">
   				<el-form-item label="姓名" prop="name">
   					<el-input v-model="create.name"></el-input>
   				</el-form-item>
   				<el-form-item label="学号" prop="number">
   					<el-input v-model="create.number"></el-input>
   				</el-form-item>
   				<el-form-item label="学分" prop="score">
   					<el-input v-model="create.score"></el-input>
   				</el-form-item>
   				<el-form-item label="创建时间" prop="createTime">
   					 <el-col :span="11">
				      <el-date-picker type="date" placeholder="选择日期" v-model="create.createTime" 
				      	@change="pickTime"  style="width: 100%;">
				      </el-date-picker>
				    </el-col>
   				</el-form-item>
   				<el-form-item label="爱好" prop="hobby">
   					<el-col :span="11">
	   					<el-select v-model="create.hobby" placeholder="请选择爱好">
						    <el-option v-for="item in options"
						      :key="item.value"
						      :label="item.label"
						      :value="item.value">
						    </el-option>
						  </el-select>
   					</el-col>
   				</el-form-item>
   				<el-form-item label="是否激活" prop="active">
   					<el-radio-group v-model="create.active" @change="changeActive">
   						<el-radio v-for="item in activeOptions"  :label="item.value" :key="item.value">{{item.label}}</el-radio>
   					</el-radio-group>
   					<!--
   						<el-radio v-for="(item, index) in activeOptions" :label="item.label" :key="index">
   						</el-radio>
   					 <el-radio v-model="create.active" label="1">激活</el-radio>
 					 <el-radio v-model="create.active" label="0">冻结</el-radio>
 					 -->
   				</el-form-item>
   			</el-form>
   			<div slot="footer" class="dialog-footer">
   				<el-button @click="dialogCreateVisible=false">取消</el-button>
   				<el-button type="primary" :loading="createLoading" @click="createStudent">确定</el-button>
   			</div>
   		</el-dialog>
   		
   		
   		<!--修改学生-->
   		<el-dialog title="修改学生" v-model="dialogUpdateVisible" :close-on-click-model="false" :close-on-press-escape="false">
   			<el-form id="#update" :model="update" ref="update" label-width="100px">
   				<el-form-item label="姓名" prop="name">
   					<el-input v-model="update.name"></el-input>
   				</el-form-item>
   				<el-form-item label="学号" prop="number">
   					<el-input v-model="update.number"></el-input>
   				</el-form-item>
   				<el-form-item label="学分" prop="score">
   					<el-input v-model="update.score"></el-input>
   				</el-form-item>
   				<el-form-item label="创建时间" prop="createTime">
   					 <el-col :span="11">
				      <el-date-picker type="date" placeholder="选择日期" v-model="update.createTime" 
				      	@change="pickTime"  style="width: 100%;">
				      </el-date-picker>
				    </el-col>
   				</el-form-item>
   				<el-form-item label="爱好" prop="hobby">
   					<el-col :span="11">
	   					<el-select v-model="update.hobby" placeholder="请选择爱好">
						    <el-option v-for="item in options"
						      :key="item.value"
						      :label="item.label"
						      :value="item.value">
						    </el-option>
						  </el-select>
   					</el-col>
   				</el-form-item>
   				<el-form-item label="是否激活" prop="active">
   					<el-radio-group v-model="update.active" @change="changeActive">
   						<el-radio v-for="item in activeOptions" :label="item.value" :key="item.value">{{item.label}}</el-radio>
   					</el-radio-group>
   				</el-form-item>
   			</el-form>
   			<div slot="footer" class="dialog-footer">
   				<el-button @click="dialogUpdateVisible=false">取消</el-button>
   				<el-button type="primary" :loading="updateLoading" @click="updateStudent">确定</el-button>
   			</div>
   		</el-dialog>
   </div>
</template>

<script>
	var placeholders={"name":"请输入查找姓名","username":"请输入查找用户名","phone":"请输入查找电话"};
	function getuuid(){
	    var uid = [];
	    var hexDigits = "0123456789abcdefghijklmnopqrst";
	    for (var i = 0; i < 32; i++) {
	        uid[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
	    }
	    uid[6] = "4";
	    uid[15] = hexDigits.substr((uid[15] & 0x3) | 0x8, 1);
	    var uuid = uid.join("");
	    return uuid;
	}
	
	import Bus from '../../eventBus'
	import SearchStudent from './SearchStudent.vue';
	import ElRow from "element-ui/packages/row/src/row";
	
    export default {
        data: function(){
            return {
               url:'http://localhost:8000/studentinfo',
               students:[],
               create:{
	               	id:'',
	               	name:'',
	               	number:'',
	               	score:'',
	               	createTime:'',
	               	hobby:'',
	               	active:'1'
               },
               options:[
	               		{value:'篮球',label:'篮球'},
	               		{value:'乒乓球',label:'乒乓球'},
	               		{value:'足球',label:'足球'},
	               		{value:'排球',label:'排球'}
	               	],
	               	
	           activeOptions:[
	           		{value:1,label:'激活'},
	           		{value:0,label:'冻结'}
	           ],
               currentId:'',
               update:{
               		id:'',
	               	name:'',
	               	number:'',
	               	score:'',
	               	createTime:'',
	               	hobby:'',
	               	active:'',
               },
               rules:{
               		name: [
               			{ required: true, message: '请输入姓名', trigger: 'blur' },
               			{min: 3, max: 15, message: '长度在 3 到 15 个字符'}
               		],
               		number: [
               			{required: true, message: '请输入学号', trigger: 'blur'},
               			{min: 0, max: 99999, message: '长度在 0 到 99999 个字符'}
               		],
               		score: [
               			{required: true, message: '请输入学分', trigger: 'blur'},
               			{validator:(rule,value,callback)=>{
               				if(/^\d+(\.{0,1}\d+){0,1}$/.test(value) || /^\d+$/.test(value)){
               					callback();
               				}else{
               					callback(new Error("学分只能输入数字"));
               				}
            			},trigger:'blur'}
               		]
               },
               filter:{
               		per_page:6,
               		page:1,
               		name:'',
               		number:'',
               		score:'',
               		sorts:''
               },
               total_rows:0,
               keywords:'',
               select:'name',
               loading:true,
               selected:[],
               dialogCreateVisible:false,
               dialogUpdateVisible:false,
               createLoading:false,
               updateLoading:false,
               placeholder:placeholders['name']
            }
        },
        
        components: {
            SearchStudent,ElRow
        },
        mounted:function(){
        	this.getStudents();
        	 Bus.$on('filterResultData', (data) => {
                this.students = data.content;
       			this.$message.success('loading success');
       			this.filter.per_page = data.size;
       			this.total_rows=data.totalElements;
       			this.filter.page = data.number;
                this.keywords=data.keywords;
            });
        },
        methods: {
        	tableSelectionChange(val){
        		this.selected = val;
        	},
        	tableSortChange(val){
	        	console.log(`排序属性: ${val.prop}`);
	          	console.log(`排序: ${val.order}`);
        		if(val.prop != null){
        			if(val.order == 'descending'){
	        			this.filter.sorts ="-"+val.prop;
        			}else{
	        			this.filter.sorts =""+val.prop;
        			}
        		}else{
        			this.filter.sorts = '';
        		}
        		this.getStudents();
        	},
        	searchFieldChange(val){
        		this.placeholder = placeholders[val];
        	},
        	pageSizeChange(val){
        		this.filter.per_page = val;
        		this.getStudents();
        	},
        	pageCurrentChange(val){
        		this.filter.page = val;
        		this.getStudents();
        	},
        	setCurrent(vo){
        		this.currentId = vo.id;
        		this.update = vo;
        		this.dialogUpdateVisible=true;
        		console.dir(this.update)
        	},
        	pickTime(time){
        		console.dir("pickTime:"+time)
        		this.create.createTime = time;
        		this.update.createTime = time;
        	},
        	changeActive(active){
        		this.create.active = active;
        		this.update.active = active;
        	},
        	reset(){
        		this.$refs.create.resetFields();
        	},
        	query(){
        		this.filter.name='';
        		this.filter.number='';
        		this.filter[this.select] = this.keywords;
        		this.getStudents();
        	},
        	getStudents(){
           		this.loading = true;
           		var resource = this.$resource(this.url);
           		resource.query(this.filter).then((response) =>{
           		    console.dir(response.data)//打印数据情况
           			this.students = response.data.content;
           			console.table(this.students)//table 可以以表格的方式呈现数据
           			this.$message.success('loading success');
           			this.filter.per_page = response.data.size;
           			this.total_rows=response.data.totalElements;
           			this.filter.page = response.data.number;
           			this.loading = false;
           			this.selected.splice(0, this.selected.length);
           		}).catch((response)=>{
           			this.$message.error('message');
           			this.loading = false;
           			alert('catch')
           		});
        	},
        	createStudent(){
        		this.$refs.create.validate((valid)=>{
        			if(valid){
        				this.create.id=getuuid();
        				this.createLoading=true;
        				var resource = this.$resource(this.url);
        				resource.save(this.create).then((resposne)=>{
        					this.$message.success('创建学生成功！');
        					this.dialogCreateVisible=false;
        					this.createLoading=false;
        					this.reset();
        					this.getStudents();
        				}).catch((response)=>{
        					var data = response.data;
        					if(data instanceof Array){
        						this.$message.error(data[0]['message']);
        					}else if(data instanceof Object){
        						this.$message.error(data['message']);
        					}
        					this.createLoading=false;
        				});
        			}else{
        				return false;
        			}
        		});
        	},
        	updateStudent(){
        		this.$refs.update.validate((valid) =>{
        			if(valid){
        				this.updateLoading = true;
        				var actions = {
        					update:{method:'patch'}
        				};
        				var resource = this.$resource(this.url, {}, actions);
        				resource.update({"ids":this.currentId}, this.update).then((resposne)=>{
        					this.$message.success("修改学生成功")
        					this.dialogUpdateVisible= false;
        					this.updateLoading = false;
        					this.getStudents();
        				}).catch((response) =>{
        					  var data=response.data;
			                  console.log(data);
			                  if(data instanceof Array){
			                      this.$message.error(data[0]["message"]);
			                  }
			                  else if(data instanceof Object){
			                      this.$message.error(data["message"]);
			                  }
			                  this.updateLoading=false;
        				});
        				
        			}else{
        				return fasle;
        			}
        		});
        	},
        	 //删除单个学生信息
	        removeStudent(student){
	        	this.$confirm('此操作将永久删除用户' + student.name +',是否继续？','提示',{type:'warning'}).then(()=>{
	        		var resource = this.$resource(this.url + "{/id}");
	        		resource.delete({id:student.id}).then((response)=>{
	        			this.$message.success('删除了学生'+student.name+'!');
	        			this.getStudents();
	        		}).catch((response)=>{
	        			this.$message.error('删除失败!');
	        		});
	        	}).catch(()=>{
	        		this.$message.info('已取消操作!');
	        	});
	        },
	        //批量删除
	        removeStudents(){
	        	this.$confirm('此操作将永久删除' + this.selected.length +'个学习信息,是否继续？','提示',{type:'warning'}).then(()=>{
	        		var ids =[];
	        		$.each(this.selected,(i, s)=>{
	        			ids.push(s.id);
	        		});
	        		var resource = this.$resource(this.url);
	        		resource.delete({ids: ids.join(",")}).then((response)=>{
	        			this.$message.success('删除了' + this.selected.length + '个学生信息!');
	        			this.getStudents();
	        		}).catch((response)=>{
	        			this.$message.error('删除失败!');
	        		});
	        	}).catch(()=>{
	        		this.$message.info('已取消操作!');
	        	});
	        }
        }
    }
</script>

<style>
    @import '../../assets/plugins/bootstrap/css/bootstrap.min.css';
    @import '../../assets/css/global.css';
    @import '../../assets/css/main.min.css';
</style>