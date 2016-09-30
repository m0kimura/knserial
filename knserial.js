var Ks=require('knuty');
Ks.extend({
  openSerial: function(op){
    var me=Ks; op=op||{}; op.port=op.port||'/dev/ttyUSB0'; op.rate=op.rate||9600; op.bit=op.bit||8;
    op.parity=op.parity||'none'; op.stop=op.stop||1; op.control=op.control||false;
    var wid=me.ready();
    me.Serial=require('serialport');
    me.Port=new me.Serial.SerialPort(op.port, {
      baudRate: op.rate, dataBits: op.bit, parity: op.parity, stopBits: op.stop,
      flowControl: op.control, parser: me.Serial.parsers.readline("\n")
    });
    me.Port.on('open', function(){me.post(wid);});
    me.wait();
  },
//
//
  readSerial: function(proc){
    var me=Ks; me.Port.on('data', function(input){proc(input);});
  },
//
//
  writeSerial: function(data){
    var me=Ks; var wid=me.ready();
    me.Port.write(data, function(err, results){me.post(wid);});
    me.wait();
  },
//
//
  listSerial: function(){
    var me=this; var wid=me.ready();
    me.Serial.list(function (err, ports){me.post(me.wid, ports);});
    me.wait();
  }
});
module.exports=Ks;
