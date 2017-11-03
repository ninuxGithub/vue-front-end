<template>
	<div style="width:800px;">
		<el-upload  class="upload-demo"
			  :action="uploadUrl"
			  :data="upLoadData"
			  :on-preview="handlePreview"
			  :on-remove="handleRemove"
			  :multiple="multiple"
			  :limit="limit"
			  :accept="accept"
			  :on-exceed="handleExceed"
			  :on-error="uploadError"
	          :on-success="uploadSuccess"
	          :before-upload="beforeAvatarUpload"
	          list-type="picture"
			  :file-list="fileList">
			  <el-button size="small" type="primary">点击上传</el-button>
			  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过50mb</div>
		</el-upload>
		
		<!--评分-->
		<el-rate v-model="rateValue" @change="changeRate" show-text style="margin-top:30px;"></el-rate>
		
		<el-rate
		  v-model="value5"
		  disabled
		  show-score
		  text-color="#ff9900"
		  score-template="{value}">
		</el-rate>
		
		<el-table :data="tableData3" style="width: 100%" height="250">
		    <el-table-column fixed prop="date" label="日期" width="150"></el-table-column> 
		    <el-table-column prop="name" label="姓名" width="120"></el-table-column>
		    <el-table-column  prop="province" label="省份" width="120"></el-table-column>
		    <el-table-column prop="city" label="市区" width="120"></el-table-column>
		    <el-table-column prop="address" label="地址" width="300"></el-table-column>
		    <el-table-column prop="zip"  label="邮编" width="120"></el-table-column>
		</el-table>
		
		<div id="box">
            <com-a></com-a>
            <com-b></com-b>
            <com-c></com-c>
        </div>
	</div>
	
</template>
<script>
  export default {
    data() {
      return {
      	uploadUrl:'http://localhost:8000/upload',
      	upLoadData:{
      		serialId:'1111-0000',
      		currentTime:'2017-1-1'
      	},
        fileList : [],
        limit:3,
        multiple:true,
        accept:"image/*",
        
        //评分
        rateValue:'',
        value5: 3.7,
        tableData3: [{
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-04',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-08',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-06',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-07',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }]
      };
    },
    methods: {
    	//获取到评分
		changeRate(s){
			this.$message.success(s+"分")
		},
      handleRemove(file, fileList) {
      	console.dir('handleRemove')
       	console.log(file, fileList);
      },
      
      handlePreview(file) {
      	console.dir('handlePreview')
       	console.log(file);
      },
      
      handleExceed(files, fileList) {
      	console.dir('handleExceed')
       	this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      
      
	    // 上传成功后的回调
	    uploadSuccess (response, file, fileList) {
	      console.log('上传文件', response)
	      if(response ==1){
	      	this.$message.success('上传成功')
	      }
	    },
	    
	    // 上传错误
	    uploadError (response, file, fileList) {
	      console.log('uploadError上传失败，请重试！')
	    },
	    
	    // 上传前对文件的大小的判断
	    beforeAvatarUpload (file) {
	      console.log('beforeAvatarUpload')
	      const extension = file.name.split('.')[1] === 'jpg'
	      const extension2 = file.name.split('.')[1] === 'gif'
	      const isLt2M = file.size / 1024 / 1024 < 10
	      if (!extension && !extension2) {
	        console.log('上传模板只能是jpg,gif 格式!')
	      }
	      if (!isLt2M) {
	        console.log('上传模板大小不能超过 10MB!')
	      }
	      return extension || extension2 && isLt2M
	    }
    }
  }
</script>

