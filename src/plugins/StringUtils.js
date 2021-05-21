export default {
  isEmpty: function (input) {
    return input == null || input == ''
  },
  isNotEmpty: function (input) {
    return !this.isEmpty(input)
  },
  isBlank: function (input) {
    return input == null || /^\s*$/.test(input)
  },
  isNotBlank: function (input) {
    return !this.isBlank(input)
  },
  trim: function (input) {
    return input.replace(/^\s+|\s+$/, '')
  },
  createGuid: () => {
    let uuid = ''
    let random = ''
    for (let i = 0; i < 32; i++) {
      random = (Math.random() * 16) | 0
      if (i == 8 || i == 12 || i == 16 || i == 20) {
        uuid += '-'
      }
      uuid += (i == 12 ? 4 : i == 16 ? (random & 3) | 8 : random).toString(16)
    }
    return uuid
  },
}
