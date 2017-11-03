<script>
// for Vue 2.0
import myDatepicker from 'vue-datepicker'
 
export default {
  data () {
    return {
      // for Vue 2.0 
      startTime: {
        time: '2017-11-01'
      },
      endtime: {
        time: ""
      }, 
      option: {
        type: 'day',
        //week: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
        //month: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        week: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'],
        month: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
        format: 'YYYY-MM-DD HH:mm:SSS',
        placeholder: '请选择日期?',
        inputStyle: {
          'display': 'inline-block',
          'padding': '6px',
          'line-height': '22px',
          'font-size': '14px',
          'border': '2px solid #fff',
          'box-shadow': '0 1px 3px 0 rgba(0, 0, 0, 0.2)',
          'border-radius': '2px',
          'color': '#5F5F5F'
        },
        color: {
          header: '#ccc',
          headerText: '#f00'
        },
        buttons: {
          ok: '是',
          cancel: '否'
        },
        overlayOpacity: 0.5, // 0.5 as default 
        dismissible: true // as true as default 
      },
      
      timeoption: {
        type: 'min',
        week: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'],
        month: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
        //week: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
        //month: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        format: 'YYYY-MM-DD HH:mm:SSS'
      },
      multiOption: {
        type: 'multi-day',
        week: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'],
        month: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
        //week: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
        //month: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        format:"YYYY-MM-DD HH:mm:SSS"
      },
      limit: [/*{
        type: 'weekday',
        available: [1, 2, 3, 4, 5]
      },
      {
        type: 'fromto',
        from: '2016-02-01',
        to: '2016-02-20'
      }*/]
    }
  },
  components: {
    'date-picker': myDatepicker
  }
}
</script> 
<template>
  <div class="card">
    <!-- for Vue 2.0 -->
    <div class="row">
      <span>选择日期：</span>
      <date-picker :date="startTime" :option="option" :limit="limit"></date-picker>
    </div>
 
  </div>
</template>