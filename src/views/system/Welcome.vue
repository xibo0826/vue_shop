<template>
  <div>
    <calendar
      :events="events"
      @saveEvent="saveEvent"
      @removeEvent="removeEvent"
    ></calendar>
  </div>
</template>
<script>
import calendar from 'components/Calendar.vue'

export default {
  data() {
    return {
      events: null,
    }
  },
  created() {
    // 数据取得
    this.events = [
      {
        title: '会议',
        start: '2021-05-10T12:00:00',
        end: '2021-05-10T13:00:00',
        allDay: false,
        status: 'finished',
        location: '第二会议室',
      },
      {
        title: '会议',
        start: '2021-05-20T12:00:00',
        end: '2021-05-20T13:00:00',
        allDay: false,
        status: 'finished',
        location: '第二会议室',
      },
      { title: '外出', date: '2021-05-11', allDay: true },
      {
        title: '休假',
        date: '2021-05-20',
        allDay: true,
        overlap: false,
        color: '#ff9f89',
        location: '第二会议室',
      },
    ]
    // local
    let calendarEvents = localStorage.getItem('calendarEvents')
    if(calendarEvents) {
      this.events.push(...JSON.parse(calendarEvents))
    }
  },
  methods: {
    saveEvent(event) {
      console.log(111);
      let calendarEvents = localStorage.getItem('calendarEvents')
      if (calendarEvents) {
        let events = JSON.parse(calendarEvents)
        const targets = events.filter((p) => p.id !== event.id)
        targets.push(event)
        localStorage.setItem('calendarEvents', JSON.stringify(targets))
      } else {
        let events = []
        events.push(event)
        localStorage.setItem('calendarEvents', JSON.stringify(events))
      }
    },
    removeEvent(event) {
      let calendarEvents = localStorage.getItem('calendarEvents')
      if (calendarEvents) {
        let events = JSON.parse(calendarEvents)
        const target = events.filter((p) => p.id !== event.id)
        localStorage.setItem('calendarEvents', JSON.stringify(target))
      }
    },
  },
  components: {
    calendar,
  },
}
</script>
<style>
</style>
