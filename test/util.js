export default {
//  each: $.each,
//  bind: $.proxy,
    random16: function (length, min, max) {
        var Min = min || this.int(["0x1", this.repeat(0, length - 1)].join("")),
            Range = (max - min) || this.int(["0xe", this.repeat("f", length - 1)].join("")),
            Rand = Math.random();
        return (Min + Math.round(Rand * Range)).toString(16);
    },
    uuid: function () {
        return [
            this.random16(8),
            this.random16(4),
            this.random16(4),
            this.random16(4),
            this.random16(12)
        ].join("-");
    },
    repeat: function (str, length) {
        return length > 0 ? new Array(length).map(function () {
            return str;
        }).join("") : "";
    },
//  map: $.map,
    int: window.parseInt
}