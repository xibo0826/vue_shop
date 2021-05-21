<template>
  <div class="container">
    <el-card>
      <el-row>
        <!-- <el-col :span="2">
          <label>假日</label>
          <el-switch
            v-model="showHoliday"
            :active-text="$t('lang.showHoliDayYes')"
            :inactive-text="$t('lang.showHoliDayNo')"
          >
          </el-switch>
        </el-col> -->
        <el-col :span="24">
          <FullCalendar
            ref="fullCalendar"
            :options="calendarOptions"
          />
        </el-col>
      </el-row>

    </el-card>
    <el-dialog
      :title=" isNewEvent ? '添加预定' : '编辑预定'"
      :visible.sync="showDailog"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="true"
    >
      <el-form
        :model="calendarForm"
        ref="calendarForm"
        label-width="80px"
        :rules="rules"
      >
        <el-form-item
          prop="title"
          label="标题"
        >
          <el-input v-model="calendarForm.title"></el-input>
        </el-form-item>
        <el-form-item
          prop="color"
          label="表示颜色"
        >
          <el-color-picker v-model="calendarForm.color"></el-color-picker>
        </el-form-item>
        <el-form-item
          prop="location"
          label="场所"
        >
          <el-input v-model="calendarForm.location"></el-input>
        </el-form-item>

        <el-form-item
          prop="allDay"
          label="类型"
        >
          <el-radio-group
            v-model="calendarForm.allDay"
            @change="toggleAllDay"
          >
            <el-radio-button :label="true">终日</el-radio-button>
            <el-radio-button :label="false">时间段</el-radio-button>
          </el-radio-group>
        </el-form-item>

        <el-form-item
          prop="startDate"
          label="起始"
        >
          <el-date-picker
            v-model="startDay"
            type="date"
            placeholder="选择日期"
            :editable="false"
            :clearable="false"
            @change="changeStartDate"
          >
          </el-date-picker>

          <el-time-select
            v-show="!calendarForm.allDay"
            placeholder="起始时间"
            v-model="startTime"
            :picker-options="{
              start: '08:30',
              step: '00:15',
            }"
            :editable="false"
            :clearable="false"
            @change="changeStartTime"
          >
          </el-time-select>
        </el-form-item>
        <el-form-item
          prop="endDate"
          label="结束"
        >
          <el-date-picker
            v-model="endDay"
            type="date"
            placeholder="结束日期"
            :editable="false"
            :clearable="false"
            :picker-options="endDateOpt"
          >
          </el-date-picker>
          <el-time-select
            v-show="!calendarForm.allDay"
            placeholder="结束时间"
            v-model="endTime"
            :picker-options="{
              start: '08:30',
              step: '00:15',
              minTime: calendarForm.startTime
            }"
            :clearable="false"
            :editable="false"
          >
          </el-time-select>
        </el-form-item>

        <el-form-item
          prop="remark"
          label="备注"
        >
          <el-input
            type="textarea"
            v-model="calendarForm.remark"
          ></el-input>
        </el-form-item>

        <el-form-item class="btn_area_right">
          <el-button
            type="primary"
            @click="saveEvent"
          >保存</el-button>
          <el-button
            v-show="!isNewEvent"
            type="danger"
            @click="removeEvent"
          >删除</el-button>
          <el-button
            type="info"
            @click="cancel"
          >取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import interactionPlugin from '@fullcalendar/interaction'
import enLocale from '@fullcalendar/core/locales/en-gb'
import jaLocale from '@fullcalendar/core/locales/ja'
import zhLocale from '@fullcalendar/core/locales/zh-cn'
import moment from 'moment'
import StringUtils from 'plugins/StringUtils.js'

export default {
  components: {
    FullCalendar,
  },
  props: {
    events: Array,
  },
  data() {
    return {
      isNewEvent: true,
      showDailog: false,
      currentEvent: null,

      calendarForm: {
        id: '',
        title: '',
        location: '',
        start: '',
        end: '',
        allDay: true,
        remark: '',
        color: '#ff9f89',
      },

      rules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' },
          { max: 40, message: '标题的长度在40个字符以内', trigger: 'blur' },
        ],
        location: [{ max: 40, message: '场所在40个字符以内', trigger: 'blur' }],
        remark: [{ max: 100, message: '备注在100个字符以内', trigger: 'blur' }],
      },

      holidayDatas: [],

      calendarOptions: {
        plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin],
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth',
        },
        initialView: 'dayGridMonth',
        editable: true,
        selectable: true,
        selectMirror: true,
        dayMaxEvents: true,
        weekends: true,
        businessHours: true, // 周末样式
        locales: [enLocale, jaLocale, zhLocale],
        locale: this.locale,
        events: [],
        eventSources: [
          {
            googleCalendarApiKey: 'ここにAPIキーが入ります',
            googleCalendarId: 'japanese__ja@holiday.calendar.google.com',
            display: 'background',
          },
        ],

        select: this.handleDateSelect,
        dateClick: this.handleDateClick,
        eventClick: this.handleEventClick,

        buttonText: {
          today: this.$t('lang.calendarToday'),
          month: this.$t('lang.calendarMonth'),
          week: this.$t('lang.calendarWeek'),
          day: this.$t('lang.calendarDay'),
          list: this.$t('lang.calendarTimeLine'),
        },
      },
    }
  },
  computed: {
    endDateOpt() {
      if (this.startDay === null) {
        return { disabledDate: (time) => false }
      }

      return {
        disabledDate: (time) => moment(time).isBefore(this.startDay),
      }
    },
    startDay: {
      get() {
        return moment(this.calendarForm.start).format('YYYY-MM-DD')
      },
      set(value) {
        if (this.calendarForm.allDay) {
          this.calendarForm.start = moment(value).format('YYYY-MM-DD')
        } else {
          this.calendarForm.start =
            moment(value).format('YYYY-MM-DD') + ' ' + this.startTime
        }
      },
    },
    endDay: {
      get() {
        return moment(this.calendarForm.end).format('YYYY-MM-DD')
      },
      set(value) {
        if (this.calendarForm.allDay) {
          this.calendarForm.end = moment(value).format('YYYY-MM-DD')
        } else {
          this.calendarForm.end =
            moment(value).format('YYYY-MM-DD') + ' ' + this.endTime
        }
      },
    },
    startTime: {
      get() {
        return moment(this.calendarForm.start).format('HH:mm')
      },
      set(value) {
        this.calendarForm.start = this.startDay + ' ' + value
      },
    },
    endTime: {
      get() {
        return moment(this.calendarForm.end).format('HH:mm')
      },
      set(value) {
        this.calendarForm.end = this.endDay + ' ' + value
      },
    },

    locale() {
      return this.$store.state.locale ? this.$store.state.locale : 'zh-CN'
    },
  },
  watch: {
    locale(val, old) {
      this.$refs.fullCalendar.getApi().setOption('locale', val)
      this.$refs.fullCalendar.getApi().setOption('buttonText', {
        today: this.$t('lang.calendarToday'),
        month: this.$t('lang.calendarMonth'),
        week: this.$t('lang.calendarWeek'),
        day: this.$t('lang.calendarDay'),
        list: this.$t('lang.calendarTimeLine'),
      })
    },
  },
  async created() {},
  mounted() {
    this.calendarOptions.events.push(...this.events)

    this.showHoliday(moment().format('YYYY'))
  },

  methods: {
    async showHoliday(year) {
      // 祝日API取得
      const { data: holidays } = await this.$http.get(
        `https://api.national-holidays.jp/${year}`
      )

      holidays.forEach((p) => {
        this.holidayDatas.push({
          id: StringUtils.createGuid(),
          title: p.name,
          start: p.date,
          end: p.date,
          isAllDay: true,
          color: '#ccc',
        })
      })

      this.calendarOptions.events.push(...this.holidayDatas)
    },

    toggleAllDay(isAllDay) {
      if (isAllDay) {
        this.startTime = ''
        this.endTime = ''
      } else {
        this.startTime = '08:30'
        this.endTime = '09:30'
      }
    },

    changeStartDate(value) {
      if (moment(value).isAfter(this.endDay)) {
        this.endDay = value
      }
    },

    changeStartTime(value) {
      const startDaytime = moment(this.startDay + ' ' + value)
      const endDaytime = moment(this.calendarForm.end)
      if (startDaytime.isAfter(endDaytime)) {
        this.calendarForm.end = startDaytime.add(1, 'h')
      }
    },

    saveEvent() {
      this.$refs.calendarForm.validate(async (valid) => {
        if (!valid) {
          this.$message.error('请先修改页面提示的错误!', true)
          return
        }
      })

      if (this.isNewEvent) {
        this.calendarForm.id = StringUtils.createGuid()
        this.$refs.fullCalendar.getApi().addEvent(this.calendarForm)
      } else {
        this.currentEvent.setProp('title', this.calendarForm.title)
        this.currentEvent.setDates(
          this.calendarForm.start,
          this.calendarForm.end,
          {
            allDay: this.calendarForm.allDay,
          }
        )
        this.currentEvent.setExtendedProp(
          'location',
          this.calendarForm.location
        )
        this.currentEvent.setExtendedProp('remark', this.calendarForm.remark)
        this.currentEvent.setProp('color', this.calendarForm.color)
      }
      this.$emit('saveEvent', this.calendarForm)
      this.$refs.calendarForm.resetFields()
      this.showDailog = false
      this.$message.success('保存成功!', true)
    },

    async removeEvent() {
      try {
        await this.$messagebox.confirm('删除预定?', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
      } catch {
        return
      }

      this.currentEvent.remove()
      this.$refs.calendarForm.resetFields()
      this.showDailog = false
      this.$emit('removeEvent', this.calendarForm)
      this.$message.success('删除成功!', true)
    },

    handleDateSelect(calendarArgs) {
      if (this.$refs.calendarForm) {
        this.$refs.calendarForm.resetFields()
      }

      this.calendarForm.start = calendarArgs.start
      this.calendarForm.end = calendarArgs.end
      this.isNewEvent = true
      this.showDailog = true
    },

    handleEventClick(info) {
      this.calendarForm.id = info.event.id
      this.calendarForm.title = info.event.title
      if (info.event.allDay) {
        this.calendarForm.start = moment(info.event.start).format('YYYY-MM-DD')
        this.calendarForm.end = moment(info.event.end).format('YYYY-MM-DD')
      } else {
        this.calendarForm.start = moment(info.event.start).format(
          'YYYY-MM-DD HH:mm'
        )
        this.calendarForm.end = moment(info.event.end).format(
          'YYYY-MM-DD HH:mm'
        )
      }

      this.calendarForm.allDay = info.event.allDay
      this.calendarForm.location = info.event.extendedProps.location
      this.calendarForm.remark = info.event.extendedProps.remark
      this.calendarForm.color = info.event.backgroundColor
      this.isNewEvent = false
      this.showDailog = true
      this.currentEvent = info.event
    },

    cancel() {
      this.showDailog = false
    },
  },
}
</script>
<style scoped>
.container {
  height: 500px;
}

.fc {
  max-width: 1300px;
  height: 800px;
  margin: 0 auto;
}
</style>
