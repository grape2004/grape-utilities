/*----------------------------------------------------------
  TEST xxxx.js
----------------------------------------------------------*/

/*--------------------------------------
Test code
--------------------------------------*/
$(function(){

  var jsunit = new JsUnit();
  var errorFragments = []
  
    jsunit.initialize( {
      asserted: function( commect, testNo, assertNo, type, ans, res, output, isSuccess ){
        output = output.replace( "&", "&amp;" ).replace( "<", "&lt;" ).replace( ">", "&gt;" ).replace( '"', "&quot;" ).replace( "'", "&#039;" );
        if ( !isSuccess ) {
          output = "<a name='"+testNo+"-"+assertNo+"'><span style='color:red'>"+output+"</span></a>";
          errorFragments[errorFragments.length] = testNo+"-"+assertNo;
        }
        return output;
      }
    } );
  
  /*--------------------------------------
  // 試験開始
  --------------------------------------*/
  /*
  jsunit.execTest(
    function(){
      jsunit.assertEqual(
        $ustr.xxx( "" ),
        0,
        ""
      );
    },
    "xxx"
  );
  */

  /*--------------------------------------
  // 試験結果
  --------------------------------------*/
  $(".log").append( "\n\n・test-name-xxxx\n\n" );
  $(".log").append( jsunit.getOutput() );
  if ( false == jsunit.getResult() ) {
    $(".result").append("test-name-xxxx : 失敗");
  }
  else {
    $(".result").append("test-name-xxxx : 成功");    
  }

  if ( 0 < errorFragments.length ) {
    $(".result").append("<br/><br/><br/><span style='color:red'>Jump to error results.</span><br/><br/>")
    for ( var i=0; i<errorFragments.length; i++ ) {
      $(".result").append( $("<a href='#" + errorFragments[i] + "'>"+errorFragments[i]+"</a><br/>") );
    }

    $(".log").append("<br/><br/><br/><span style='color:red'>Jump to error results.</span><br/><br/>")
    for ( var i=0; i<errorFragments.length; i++ ) {
      $(".log").append( $("<a href='#" + errorFragments[i] + "'>"+errorFragments[i]+"</a><br/>") );
    }
  }
  
} );
