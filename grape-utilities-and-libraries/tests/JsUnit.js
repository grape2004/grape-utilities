/*----------------------------------------------------------
  JsUnit.js
    License    : MIT
    Written by : S.Murakoshi( grape@nona.dti.ne.jp )
----------------------------------------------------------*/

function JsUnit(){
  var jsunit_ = {
    totalTest: 0,
    failedTest: 0,
    testCnt: 0,
    tmpCnt: 1,
    isFailed: false,
    testOutput: "",
    eachTestOutput: "",
    successEvent: function(){},
    failEvent: function(){},
    completeEvent: function(){},
    assetedEvent: function(){},
    initialize: function( opt ) {
      this.totalTest = 0;
      this.failedTest = 0;
      this.testOutput = "";
      this.eachTestOutput = "";
      this.testCnt = 1;

      opt = opt || {};
      this.successEvent   = opt.success || function(){};
      this.failEvent      = opt.fail || function(){};
      this.completeEvent  = opt.complete || function(){};
      this.assetedEvent   = opt.asserted || function(){};
      
    },
    execTest: function( fnc, comment ){
      this.eachTestOutput = "TEST No." + this.testCnt + ( comment ? " #" + comment : "" ) + " \n";
      this.tmpCnt = 1;
      this.isFailed = false;
      try {
        fnc.apply( this, arguments )
      }
      catch( e ) {
        this.eachTestOutput += "  exception occured\n";
        this.isFailed = true;
      }
      
      if ( this.isFailed ) {
        this.failedTest += 1;
        this.eachTestOutput += "NG\n\n";
        this.eachTestOutput = this.failEvent( comment, this.testCnt, this.eachTestOutput ) || this.eachTestOutput;
      }
      else {
        this.eachTestOutput += "OK\n\n";
        this.eachTestOutput = this.successEvent( comment, this.testCnt, this.eachTestOutput ) || this.eachTestOutput;
      }
      this.eachTestOutput = this.completeEvent( comment, this.testCnt, this.eachTestOutput ) || this.eachTestOutput;

      this.testOutput += this.eachTestOutput;
      this.totalTest += 1;
      this.testCnt += 1;
    },
    getResult: function() {
      return ( this.failedTest == 0 );
    },
    getOutput: function() {
      return this.testOutput + "\n" + ( this.getResult() ? "OK" : "NG" ) + " : " + this.getTotalTestCnt() + " test completed ( " + this.getFailedTestCnt() + " failed )\n";
    },
    getTotalTestCnt: function() {
      return this.totalTest;
    },
    getFailedTestCnt: function() {
      return this.failedTest;
    },
    assertTrue: function( val, comment ) {
      var resultOutput = "";
      var isSuccess = true;
      if ( true != val ) {
        this.isFailed = true;
        isSuccess = false
        resultOutput += "  NG ";
      }
      else {
        resultOutput += "  OK ";
      }
      resultOutput += "No." + this.testCnt + "-" + this.tmpCnt + ": ASSERT TRUE: " + val + ( comment ? " #" + comment : "" ) + "\n";
      resultOutput = this.assetedEvent( comment, this.testCnt, this.tmpCnt, "assertTrue", true.toString(), val.toString(), resultOutput, isSuccess ) || resultOutput;      
      this.eachTestOutput += resultOutput;
      this.tmpCnt += 1;
    },
    assertFalse: function( val, comment ) {
      var resultOutput = "";
      var isSuccess = true;
      if ( true == val ) {
        this.isFailed = true;
        isSuccess = false
        resultOutput += "  NG ";
      }
      else {
        resultOutput += "  OK ";
      }
      resultOutput += "No." + this.testCnt + "-" + this.tmpCnt + ": ASSERT FALSE: " + val + ( comment ? " #" + comment : "" ) + "\n";
      resultOutput = this.assetedEvent( comment, this.testCnt, this.tmpCnt, "assertFalse", false.toString(), val.toString(), resultOutput, isSuccess ) || resultOutput;
      this.eachTestOutput += resultOutput;
      this.tmpCnt += 1;
    },
    assertEqual: function( val1, val2, comment ) {
      var resultOutput = "";
      var isSuccess = true;
      val1 = JSON.stringify( val1 );
      val2 = JSON.stringify( val2 );
      if ( val1 != val2 ) {
        this.isFailed = true;
        isSuccess = false
        resultOutput += "  NG ";
      }
      else {
        resultOutput += "  OK ";
      }
      resultOutput += "No." + this.testCnt + "-" + this.tmpCnt + ": ASSERT EQUAL: " + val1 + " == " + val2 + ( comment ? " #" + comment : "" ) + "\n";
      resultOutput = this.assetedEvent( comment, this.testCnt, this.tmpCnt, "assertEqual", val1, val2, resultOutput, isSuccess ) || resultOutput;
      this.eachTestOutput += resultOutput;
      this.tmpCnt += 1;
    },
    assertNotEqual: function( val1, val2, comment ) {
      var resultOutput = "";
      var isSuccess = true;
      val1 = JSON.stringify( val1 );
      val2 = JSON.stringify( val2 );
      if ( val1 == val2 ) {
        this.isFailed = true;
        isSuccess = false
        resultOutput += "  NG ";
      }
      else {
        resultOutput += "  OK ";
      }
      resultOutput += "No." + this.testCnt + "-" + this.tmpCnt + ": ASSERT NOT EQUAL: " + val1 + " == " + val2 + ( comment ? " #" + comment : "" ) + "\n";
      resultOutput = this.assetedEvent( comment, this.testCnt, this.tmpCnt, "assertNotEqual", val1, val2, resultOutput, isSuccess ) || resultOutput;
      this.eachTestOutput += resultOutput;
      this.tmpCnt += 1;
    },
    assertException: function( fnc, comment ) {
      var resultOutput = "";
      var isSuccess = true;
      var expStr = "not occure";
      try {
        fnc.apply( this, arguments );
        
        this.isFailed = true;
        isSuccess = false
        resultOutput += "  NG ";
      }
      catch( e ) {
        expStr = e;
        resultOutput += "  OK ";
      }
      resultOutput += "No." + this.testCnt + "-" + this.tmpCnt + ": ASSERT EXCEPTION: " + expStr + ( comment ? " #" + comment : "" ) + "\n";
      resultOutput = this.assetedEvent( comment, this.testCnt, this.tmpCnt, "assertException", "", "", resultOutput, isSuccess ) || resultOutput;
      this.eachTestOutput += resultOutput;
      this.tmpCnt += 1;
    },
    assertNotException: function( fnc, comment ) {
      var resultOutput = "";
      var isSuccess = true;
      var expStr = "not occure";
      try {
        fnc.apply( this, arguments );
        resultOutput += "  OK ";
      }
      catch( e ) {
        expStr = e;
        this.isFailed = true;
        isSuccess = false
        resultOutput += "  NG ";
      }
      resultOutput += "No." + this.testCnt + "-" + this.tmpCnt + ": ASSERT NOT EXCEPTION: " + expStr + ( comment ? " #" + comment : "" ) + "\n";
      resultOutput = this.assetedEvent( comment, this.testCnt, this.tmpCnt, "assertNotException", "", "", resultOutput, isSuccess ) || resultOutput;
      this.eachTestOutput += resultOutput;
      this.tmpCnt += 1;
    },
    assertTime: function( fnc, msec, comment ) {
      var resultOutput = "";
      var isSuccess = true;
      try {
        var before = ( new Date() ).getTime();
        fnc.apply( this, arguments );
        var amsec = ( new Date() ).getTime() - before;
        
        if ( msec >= amsec ) {
          isSuccess = true
          resultOutput += "  OK ";
        }
        else {
          this.isFailed = true;
          isSuccess = false
          resultOutput += "  NG ";
        }
      }
      catch( e ) {
        this.isFailed = true;
        isSuccess = false
        resultOutput += "  NG ";
      }
      resultOutput += "No." + this.testCnt + "-" + this.tmpCnt + ": ASSERT TIME: " + amsec + "<=" + msec + "msec" + ( comment ? " #" + comment : "" ) + "\n";
      resultOutput = this.assetedEvent( comment, this.testCnt, this.tmpCnt, "assertTime", amsec.toString(), msec.toString(), resultOutput, isSuccess ) || resultOutput;
      this.eachTestOutput += resultOutput;
      this.tmpCnt += 1;
    },
  };
  for ( key in jsunit_ ) {
    JsUnit.prototype[key] = jsunit_[key];
  }
}
