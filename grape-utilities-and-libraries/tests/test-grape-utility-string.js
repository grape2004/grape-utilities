/*----------------------------------------------------------
  TEST grape-utility-string.js
----------------------------------------------------------*/

/*--------------------------------------
Test code
--------------------------------------*/
$(function(){

  var jsunit = new JsUnit();
  var errorFragments = []

  jsunit.initialize( {
    asserted: function( commect, testNo, assertNo, type, ans, res, output, isSuccess ){
      output = output.replace( /&/g, "&amp;" ).replace( /</g, "&lt;" ).replace( />/g, "&gt;" ).replace( /"/g, "&quot;" ).replace( /'/g, "&#039;" );
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
  jsunit.execTest(
    function(){
      jsunit.assertEqual(
        $ustr.capitalize( "hello" ),
        "Hello",
        "自動生成グローバル変数"
      );
      jsunit.assertEqual(
        (new $UStr()).capitalize( "hello" ),
        "Hello",
        "任意インスタンスの生成"
      );
      jsunit.assertEqual(
        (new $UStr("hello")).capitalize().center(10,"-").toString(),
        "--Hello---",
        "初期化子に文字を指定してのメソッドチェーン呼び出し（ユーティリティオブジェクトの生成）"
      );
      jsunit.assertEqual(
        $ustr.capitalize( "hello" ),
        "Hello",
        "異なるインスタンスでのコンテキストの分離"
      );
      jsunit.assertEqual(
        (new $UStr("world")).capitalize().center(10,"-").toString(),
        "--World---",
        "異なるインスタンスでのコンテキストの分離2"
      );
    },
    "API呼び出し方法"
  );
  jsunit.execTest(
    function(){
      jsunit.assertEqual(
        $ustr.bin( "0101" ),
        5,
        "通常の2進数"
      );
      jsunit.assertEqual(
        $ustr.bin( "-0b1111" ),
        -15,
        "マイナス値で、2進数であることを示すプレフィックス付き"
      );
      jsunit.assertEqual(
        $ustr.bin( "12" ),
        0,
        "変換できない文字が指定された時"
      );
    },
    "bin"
  );
  jsunit.execTest(
    function(){
      jsunit.assertEqual(
        $ustr.byteSize( "" ),
        0,
        "空文字の試験"
      );
      jsunit.assertEqual(
        $ustr.byteSize( "abc" ),
        3,
        "asciiコードで3文字"
      );
      jsunit.assertEqual(
        $ustr.byteSize( "あいう" ),
        9,
        "UTF8のマルチバイト文字で3文字"
      );
      jsunit.assertEqual(
        $ustr.byteLength( "abc" ),
        3,
        "aliasのbyteLengthの試験"
      );
      jsunit.assertEqual(
        $ustr.size( "abc" ),
        3,
        "aliasのbyteLengthの試験2"
      );
    },
    "byteSize"
  );  
  jsunit.execTest(
    function(){
      jsunit.assertEqual(
        $ustr.capitalize( "hello" ),
        "Hello",
        "全部小文字"
      );
      jsunit.assertEqual(
        $ustr.capitalize( "HELLO" ),
        "Hello",
        "全部小文字"
      );
      jsunit.assertEqual(
        $ustr.capitalize( "Hello" ),
        "Hello",
        "最初から実行結果と一致"
      );
      jsunit.assertEqual(
        $ustr.capitalize( "" ),
        "",
        "空文字"
      );
      jsunit.assertEqual(
        $ustr.capitalize( "<hello>" ),
        "<hello>",
        "１文字目が英字ではない時"
      );
    },
    "capitalize"
  );
  jsunit.execTest(
    function(){
      jsunit.assertEqual(
        $ustr.casecmp( "abc", "Abc" ),
        0,
        "大文字小文字を無視すれば一致"
      );
      jsunit.assertEqual(
        $ustr.casecmp( "abc", "def" ),
        -1,
        "前方の値が前"
      );
      jsunit.assertEqual(
        $ustr.casecmp( "def", "abc" ),
        1,
        "後方の値が前"
      );
      jsunit.assertEqual(
        $ustr.casecmp( "abc", "Abcd" ),
        -1,
        "同じ内容なら文字数が多い方が後"
      );
      jsunit.assertEqual(
        $ustr.casecmp( "A", "" ),
        1,
        "空文字の方が前"
      );
    },
    "casecmp"
  );  
  jsunit.execTest(
    function(){
      jsunit.assertEqual(
        $ustr.center( "center", 10 ),
        "  center  ",
        "左右の余白が均等な時"
      );
      jsunit.assertEqual(
        $ustr.center( "center", 11 ),
        "  center   ",
        "左右の余白が均等ではない時"
      );
      jsunit.assertEqual(
        $ustr.center( "center", 15, "-*" ),
        "-*-*center-*-*-",
        "余白の文字が指定された場合"
      );
      jsunit.assertEqual(
        $ustr.center( "center", 6, "-*" ),
        "center",
        "1行のサイズが指定サイズと同じ時"
      );
      jsunit.assertEqual(
        $ustr.center( "center", 1, "-*" ),
        "center",
        "1行のサイズが指定サイズより小さい時"
      );
      jsunit.assertEqual(
        $ustr.center( "center", 7, "-*" ),
        "center-",
        "1行のサイズが指定サイズより1つ大きい時"
      );
    },
    "centerxxx"
  );  
  jsunit.execTest(
    function(){
      jsunit.assertEqual(
        $ustr.chomp( "a" ),
        "a",
        "改行コードが無い時"
      );
      jsunit.assertEqual(
        $ustr.chomp( "a\n" ),
        "a",
        "改行コードが¥nの時"
      );
      jsunit.assertEqual(
        $ustr.chomp( "a\r" ),
        "a",
        "改行コードが¥rの時"
      );
      jsunit.assertEqual(
        $ustr.chomp( "a\r\n" ),
        "a",
        "改行コードが¥r¥nの時"
      );
      jsunit.assertEqual(
        $ustr.chomp( "a\n\r\n" ),
        "a\n",
        "改行コードが複数の時"
      );
      jsunit.assertEqual(
        $ustr.chomp( "a\nb" ),
        "a\nb",
        "改行コードが末尾ではない時"
      );
    },
    "chomp"
  );  
  jsunit.execTest(
    function(){
      jsunit.assertEqual(
        $ustr.chop( "a\r" ),
        "a",
        "末尾が¥rの時"
      );
      jsunit.assertEqual(
        $ustr.chop( "a\n" ),
        "a",
        "末尾が¥nの時"
      );
      jsunit.assertEqual(
        $ustr.chop( "a\r\n" ),
        "a",
        "末尾が¥r¥nの時"
      );
      jsunit.assertEqual(
        $ustr.chop( "ab" ),
        "a",
        "末尾が通常の文字の時"
      );
      jsunit.assertEqual(
        $ustr.chop( "aあ" ),
        "a",
        "末尾がマルチバイト文字の時"
      );
      jsunit.assertEqual(
        $ustr.chop( "a" ),
        "",
        "1文字の時"
      );
      jsunit.assertEqual(
        $ustr.chop( " " ),
        "",
        "空白文字の時"
      );
      jsunit.assertEqual(
        $ustr.chop( "" ),
        "",
        "空文字の時"
      );
    },
    "chop"
  );  
  jsunit.execTest(
    function(){
      jsunit.assertEqual(
        $ustr.count( "hello world!", "l" ),
        3,
        "通常文字での指定"
      );
      jsunit.assertEqual(
        $ustr.count( "hello world!", "l[^l]" ),
        2,
        "正規表現文字での指定"
      );
      jsunit.assertEqual(
        $ustr.count( "hello world!", /l[^l]/ ),
        2,
        "正規表現での指定"
      );
      jsunit.assertEqual(
        $ustr.count( "hello world!", /[^ ]+/, "[a-z]+" ),
        2,
        "条件を複数指定"
      );
      jsunit.assertEqual(
        $ustr.count( "hello world!", /[^ ]+/, "[a-z]+", "hello" ),
        1,
        "条件を複数指定2"
      );
      jsunit.assertEqual(
        $ustr.count( "hello world!", /[^ ]+/, [ "[a-z]+", "hello" ] ),
        1,
        "条件を複数指定3"
      );
      jsunit.assertEqual(
        $ustr.count( "", "a" ),
        0,
        "空文字の指定"
      );
      jsunit.assertEqual(
        $ustr.count( "a", "" ),
        0,
        "空文字でのマッチング指定"
      );
    },
    "count"
  );  
  jsunit.execTest(
    function(){
      jsunit.assertEqual(
        $ustr.dec( "00100,321" ),
        100321,
        "カンマ付き数値"
      );
      jsunit.assertEqual(
        $ustr.dec( "¥-111,222.333" ),
        -111222,
        "符号付、¥マーク、カンマ、小数点以下のある値"
      );
      jsunit.assertEqual(
        $ustr.dec( "$01.333" ),
        1,
        "$マーク、小数点以下のある値"
      );
      jsunit.assertEqual(
        $ustr.dec( "0a0" ),
        0,
        "変換できない値"
      );
      jsunit.assertEqual(
        $ustr.dec( "" ),
        0,
        "空文字"
      );
      jsunit.assertEqual(
        $ustr.dec( "-¥,.1" ),
        0,
        "整数部の無い値"
      );
      jsunit.assertEqual(
        $ustr.toI( "¥-111,222.333" ),
        -111222,
        "decのalias"
      );
    },
    "dec"
  );  
  jsunit.execTest(
    function(){
      var tmp = [];
      $ustr.each( "abc\ndef", function(){ tmp[tmp.length] = this } );      
      jsunit.assertEqual(
        tmp,
        [ "abc", "def" ],
        "¥nによる改行"
      );
      tmp = [];
      $ustr.each( "abc\rdef", function(){ tmp[tmp.length] = this } );      
      jsunit.assertEqual(
        tmp,
        [ "abc", "def" ],
        "¥rによる改行"
      );
      tmp = [];
      $ustr.each( "abc\r\ndef", function(){ tmp[tmp.length] = this } );      
      jsunit.assertEqual(
        tmp,
        [ "abc", "def" ],
        "¥r¥nによる改行"
      );
      tmp = [];
      $ustr.each( "\n\r\r\n", function(){ tmp[tmp.length] = this } );      
      jsunit.assertEqual(
        tmp,
        [ "", "", "", "" ],
        "改行コードによる複合"
      );
      tmp = [];
      $ustr.each( "abc", function(){ tmp[tmp.length] = this } );      
      jsunit.assertEqual(
        tmp,
        ["abc"],
        "改行なし"
      );
      tmp = [];
      $ustr.each( "", function(){ tmp[tmp.length] = this } );      
      jsunit.assertEqual(
        tmp,
        [""],
        "空文字"
      );
      tmp = [];
      $ustr.eachLine( "a\rb", function(){ tmp[tmp.length] = this } );      
      jsunit.assertEqual(
        tmp,
        ["a","b"],
        "aliasのeachLine()"
      );
      tmp = [];
      $ustr.lines( "a\rb", function(){ tmp[tmp.length] = this } );      
      jsunit.assertEqual(
        tmp,
        ["a","b"],
        "aliasのlines()"
      );
    },
    "each"
  );
  jsunit.execTest(
    function(){
      var tmp = [];
      $ustr.eachByte( "abc", function(){ tmp[tmp.length] = this } );      
      jsunit.assertEqual(
        tmp,
        [ 0x61, 0x62, 0x63 ],
        "asciiコード"
      );
      tmp = [];
      $ustr.eachByte( "\n\r\n\r", function(){ tmp[tmp.length] = this } );      
      jsunit.assertEqual(
        tmp,
        [ 10, 13, 10, 13 ],
        "改行コード"
      );
      tmp = [];
      $ustr.eachByte( "あいう", function(){ tmp[tmp.length] = this } );      
      jsunit.assertEqual(
        tmp,
        [ 227, 129, 130, 227, 129, 132, 227, 129, 134 ],
        "マルチバイト文字"
      );
      tmp = [];
      $ustr.eachByte( "", function(){ tmp[tmp.length] = this } );      
      jsunit.assertEqual(
        tmp,
        [],
        "空文字"
      );
      tmp = [];
      $ustr.bytes( "abc", function(){ tmp[tmp.length] = this } );      
      jsunit.assertEqual(
        tmp,
        [ 0x61, 0x62, 0x63 ],
        "aliasのbytes()"
      );
    },
    "eachByte"
  );
  jsunit.execTest(
    function(){
      var tmp = [];
      $ustr.eachChar( "abc", function(){ tmp[tmp.length] = this } );      
      jsunit.assertEqual(
        tmp,
        [ "a", "b", "c" ],
        "asciiコード"
      );
      var tmp = [];
      $ustr.eachChar( "\r\r\n\n", function(){ tmp[tmp.length] = this } );      
      jsunit.assertEqual(
        tmp,
        [ "\r", "\r", "\n", "\n" ],
        "改行コード"
      );
      var tmp = [];
      $ustr.eachChar( "あいう", function(){ tmp[tmp.length] = this } );      
      jsunit.assertEqual(
        tmp,
        [ "あ", "い", "う" ],
        "マルチバイト文字"
      );
      var tmp = [];
      $ustr.eachChar( "", function(){ tmp[tmp.length] = this } );      
      jsunit.assertEqual(
        tmp,
        [],
        "空文字"
      );
    },
    "eachChar"
  );
  jsunit.execTest(
    function(){
      jsunit.assertEqual(
        $ustr.float( "00100,321.0" ),
        100321,
        "整数の時"
      );
      jsunit.assertEqual(
        $ustr.float( "¥-111,222.333" ),
        -111222.333,
        "符号付、¥付き、カンマ、小数"
      );
      jsunit.assertEqual(
        $ustr.float( "00.1.2" ),
        0,
        "小数のフォーマット不正"
      );
      jsunit.assertEqual(
        $ustr.float( "01..2" ),
        0,
        "小数のフォーマット不正2"
      );
      jsunit.assertEqual(
        $ustr.float( "00a0" ),
        0,
        "変換できない値"
      );
      jsunit.assertEqual(
        $ustr.float( "" ),
        0,
        "空文字"
      );
      jsunit.assertEqual(
        $ustr.toF( "¥-111,222.333" ),
        -111222.333,
        "floatのalias"
      );
    },
    "float"
  );
  jsunit.execTest(
    function(){
      jsunit.assertEqual(
        $ustr.getByte( "abc", 1 ),
        98,
        "2文字目"
      );
      jsunit.assertEqual(
        $ustr.getByte( "abc", -1 ),
        99,
        "最後の文字"
      );
      jsunit.assertEqual(
        $ustr.getByte( "abc", 0 ),
        97,
        "1文字目"
      );
      jsunit.assertEqual(
        $ustr.getByte( "あいう", 3 ),
        227,
        "マルチバイト文字1"
      );
      jsunit.assertEqual(
        $ustr.getByte( "あいう", 4 ),
        129,
        "マルチバイト文字2"
      );
      jsunit.assertEqual(
        $ustr.getByte( "あいう", 5 ),
        132,
        "マルチバイト文字3"
      );
      jsunit.assertEqual(
        $ustr.getByte( "abc", 3 ),
        0,
        "存在しない文字位置を指定"
      );
      jsunit.assertEqual(
        $ustr.getByte( "abc", -4 ),
        0,
        "存在しない文字位置を指定2"
      );
      jsunit.assertEqual(
        $ustr.getByte( "", 0 ),
        0,
        "空文字"
      );
    },
    "getByte"
  );
  jsunit.execTest(
    function(){
      jsunit.assertEqual(
        $ustr.hex( "0F" ),
        15,
        "16進数"
      );
      jsunit.assertEqual(
        $ustr.hex( "-F" ),
        -15,
        "符号付"
      );
      jsunit.assertEqual(
        $ustr.hex( "-0xFF" ),
        -255,
        "符号付、16進数を表すプレフィックス付"
      );
      jsunit.assertEqual(
        $ustr.hex( "xFF" ),
        0,
        "フォーマット不正"
      );
      jsunit.assertEqual(
        $ustr.hex( "" ),
        0,
        "空文字"
      );
    },
    "hex"
  );
  jsunit.execTest(
    function(){
      jsunit.assertEqual(
        $ustr.index( "abcdef", "bcd" ),
        1,
        "文中"
      );
      jsunit.assertEqual(
        $ustr.index( "abcdef", "abc" ),
        0,
        "行頭"
      );
      jsunit.assertEqual(
        $ustr.index( "abcdef", "def" ),
        3,
        "行末"
      );
      jsunit.assertEqual(
        $ustr.index( "abcdbcef", "bc" ),
        1,
        "複数一致"
      );
      jsunit.assertEqual(
        $ustr.index( "abcdef", "cbd" ),
        null,
        "一致しない"
      );
      jsunit.assertEqual(
        $ustr.index( "abcdef", "cDe" ),
        null,
        "一致しない2"
      );
      jsunit.assertEqual(
        $ustr.index( "abcdef", "[b-z]{2}" ),
        1,
        "正規表現文字列"
      );
      jsunit.assertEqual(
        $ustr.index( "abcdef", /e[a-z]/ ),
        4,
        "正規表現"
      );
      jsunit.assertEqual(
        $ustr.index( "abcdef", /f[a-z]/ ),
        null,
        "一致しない正規表現"
      );
      jsunit.assertEqual(
        $ustr.index( "abcdef", "d", 3 ),
        3,
        "オフセットあり"
      );
      jsunit.assertEqual(
        $ustr.index( "abcdcef", "c", 3 ),
        4,
        "オフセットあり2"
      );
      jsunit.assertEqual(
        $ustr.index( "abcdef", "a", 3 ),
        null,
        "オフセットにより一致なし"
      );
    },
    "index"
  );
  jsunit.execTest(
    function(){
      jsunit.assertEqual(
        $ustr.rindex( "abcdef", "bcd" ),
        1,
        "文中"
      );
      jsunit.assertEqual(
        $ustr.rindex( "abcdef", "abc" ),
        0,
        "行頭"
      );
      jsunit.assertEqual(
        $ustr.rindex( "abcdef", "def" ),
        3,
        "行末"
      );
      jsunit.assertEqual(
        $ustr.rindex( "abcdbcef", "bc" ),
        4,
        "複数一致"
      );
      jsunit.assertEqual(
        $ustr.rindex( "abcdef", "cbd" ),
        null,
        "一致しない"
      );
      jsunit.assertEqual(
        $ustr.rindex( "abcdef", "cDe" ),
        null,
        "一致しない2"
      );
      jsunit.assertEqual(
        $ustr.rindex( "abcdef", "[b-z]{2}" ),
        4,
        "正規表現文字列"
      );
      jsunit.assertEqual(
        $ustr.rindex( "abcdef", /e[a-z]/ ),
        4,
        "正規表現"
      );
      jsunit.assertEqual(
        $ustr.rindex( "abcdef", /f[a-z]/ ),
        null,
        "一致しない正規表現"
      );
      jsunit.assertEqual(
        $ustr.rindex( "abcdef", "d", 4 ),
        3,
        "オフセットあり"
      );
      jsunit.assertEqual(
        $ustr.rindex( "abcdcef", "c", 3 ),
        2,
        "オフセットあり2"
      );
      jsunit.assertEqual(
        $ustr.rindex( "abcdef", "d", 3 ),
        null,
        "オフセットにより一致なし"
      );
    },
    "rindex"
  );
  jsunit.execTest(
    function(){
      jsunit.assertEqual(
        $ustr.insert( "aaa", 0, "_bbb_" ),
        "_bbb_aaa",
        "行頭に挿入"
      );
      jsunit.assertEqual(
        $ustr.insert( "aaa", 1, "_bbb_" ),
        "a_bbb_aa",
        "文中に挿入"
      );
      jsunit.assertEqual(
        $ustr.insert( "aaa", 3, "_bbb_" ),
        "aaa_bbb_",
        "行末に挿入"
      );
      jsunit.assertEqual(
        $ustr.insert( "aaa", -1, "_bbb_" ),
        "aaa_bbb_",
        "挿入位置を行末からのカウントで指定"
      );
      jsunit.assertEqual(
        $ustr.insert( "aaa", -2, "_bbb_" ),
        "aa_bbb_a",
        "挿入位置を行末からのカウントで指定2"
      );
    },
    "insert"
  );
  jsunit.execTest(
    function(){
      jsunit.assertTrue(
        $ustr.isEmpty( "" ),
        "空文字"
      );
      jsunit.assertTrue(
        $ustr.isEmpty( null ),
        "NULL"
      );
      jsunit.assertTrue(
        $ustr.isEmpty(),
        "undefined"
      );
      jsunit.assertFalse(
        $ustr.isEmpty( "abc" ),
        "文字指定"
      );
      jsunit.assertFalse(
        $ustr.isBlank( "abc" ),
        "isEmptyのalias"
      );
    },
    "isEmpty"
  );
  jsunit.execTest(
    function(){
      jsunit.assertTrue(
        $ustr.isEndWith( "abcdef", "def" ),
        "文末が一致"
      );
      jsunit.assertFalse(
        $ustr.isEndWith( "abcdef", "cde" ),
        "文末が不一致（文中一致）"
      );
      jsunit.assertFalse(
        $ustr.isEndWith( "abcdef", "dEf" ),
        "文末が不一致（文中不一致）"
      );
      jsunit.assertFalse(
        $ustr.isEndWith( "abcdef", "efg" ),
        "文末が不一致（部分一致）"
      );
      jsunit.assertFalse(
        $ustr.isEndWith( "def", "abcdef" ),
        "比較文字の方が文字数が多い"
      );
      jsunit.assertTrue(
        $ustr.isEndWith( "abcdef", "[a-z]{2}" ),
        "正規表現文字"
      );
      jsunit.assertFalse(
        $ustr.isEndWith( "abcdef", "[e-z]{3}" ),
        "正規表現文字（不一致）"
      );
      jsunit.assertTrue(
        $ustr.isEndWith( "abcdef", /[a-z]{2}/ ),
        "正規表現"
      );
      jsunit.assertFalse(
        $ustr.isEndWith( "abcdef", /[e-z]{3}/ ),
        "正規表現（不一致）"
      );
      jsunit.assertFalse(
        $ustr.isEndWith( "", "a" ),
        "対象文字が空文字"
      );
      jsunit.assertFalse(
        $ustr.isEndWith( null, "a" ),
        "対象文字がNULL"
      );
      jsunit.assertFalse(
        $ustr.isEndWith( undefined, "a" ),
        "対象文字がundefined"
      );
      jsunit.assertFalse(
        $ustr.isEndWith( "a", "" ),
        "比較文字が空文字"
      );
      jsunit.assertFalse(
        $ustr.isEndWith( "a", null ),
        "比較文字がNULL"
      );
      jsunit.assertFalse(
        $ustr.isEndWith( "a", undefined ),
        "比較文字がundefined"
      );
      jsunit.assertFalse(
        $ustr.isEndWith( "", "" ),
        "空文字"
      );
      jsunit.assertFalse(
        $ustr.isEndWith( null, null ),
        "NULL"
      );
      jsunit.assertFalse(
        $ustr.isEndWith(),
        "undefined"
      );
    },
    "isEndWith"
  );
  jsunit.execTest(
    function(){
      jsunit.assertTrue(
        $ustr.isStartWith( "abcdef", "abc" ),
        "行頭が一致"
      );
      jsunit.assertFalse(
        $ustr.isStartWith( "abcdef", "bcd" ),
        "行頭が不一致（文中一致）"
      );
      jsunit.assertFalse(
        $ustr.isStartWith( "abcdef", "aBc" ),
        "行頭が不一致（文中不一致）"
      );
      jsunit.assertFalse(
        $ustr.isStartWith( "abcdef", "zab" ),
        "行頭が不一致（部分一致）"
      );
      jsunit.assertFalse(
        $ustr.isStartWith( "def", "abcdef" ),
        "比較文字の方が文字数が多い"
      );
      jsunit.assertTrue(
        $ustr.isStartWith( "abcdef", "[a-z]{2}" ),
        "正規表現文字"
      );
      jsunit.assertFalse(
        $ustr.isStartWith( "abcdef", "[b-z]{2}" ),
        "正規表現文字（不一致）"
      );
      jsunit.assertTrue(
        $ustr.isStartWith( "abcdef", /[a-z]{2}/ ),
        "正規表現"
      );
      jsunit.assertFalse(
        $ustr.isStartWith( "abcdef", /[b-z]{2}/ ),
        "正規表現（不一致）"
      );
      jsunit.assertFalse(
        $ustr.isStartWith( "", "a" ),
        "対象文字が空文字"
      );
      jsunit.assertFalse(
        $ustr.isStartWith( null, "a" ),
        "対象文字がNULL"
      );
      jsunit.assertFalse(
        $ustr.isStartWith( undefined, "a" ),
        "対象文字がundefined"
      );
      jsunit.assertFalse(
        $ustr.isStartWith( "a", "" ),
        "比較文字が空文字"
      );
      jsunit.assertFalse(
        $ustr.isStartWith( "a", null ),
        "比較文字がNULL"
      );
      jsunit.assertFalse(
        $ustr.isStartWith( "a", undefined ),
        "比較文字がundefined"
      );
      jsunit.assertFalse(
        $ustr.isStartWith( "", "" ),
        "空文字"
      );
      jsunit.assertFalse(
        $ustr.isStartWith( null, null ),
        "NULL"
      );
      jsunit.assertFalse(
        $ustr.isStartWith(),
        "undefined"
      );
    },
    "isStartWith"
  );
  jsunit.execTest(
    function(){
      jsunit.assertTrue(
        $ustr.isInclude( "abcdef", "bcd" ),
        "文中で一致"
      );
      jsunit.assertFalse(
        $ustr.isInclude( "abcdef", "bCd" ),
        "文中で不一致"
      );
      jsunit.assertFalse(
        $ustr.isInclude( "abcdef", "bce" ),
        "文中で不一致（部分一致）"
      );
      jsunit.assertTrue(
        $ustr.isInclude( "abcdef", "abc" ),
        "文中で一致（行頭）"
      );
      jsunit.assertTrue(
        $ustr.isInclude( "abcdef", "def" ),
        "文中で一致（行末）"
      );
      jsunit.assertFalse(
        $ustr.isInclude( "def", "abcdef" ),
        "比較文字の方が文字数が多い"
      );
      jsunit.assertTrue(
        $ustr.isInclude( "abcdef", "[b-d]{2}" ),
        "正規表現文字"
      );
      jsunit.assertFalse(
        $ustr.isInclude( "abcdef", "[aef]{3}" ),
        "正規表現文字（不一致）"
      );
      jsunit.assertTrue(
        $ustr.isInclude( "abcdef", /[b-d]{2}/ ),
        "正規表現"
      );
      jsunit.assertFalse(
        $ustr.isInclude( "abcdef", /[aef]{3}/ ),
        "正規表現（不一致）"
      );
      jsunit.assertFalse(
        $ustr.isInclude( "", "a" ),
        "対象文字が空文字"
      );
      jsunit.assertFalse(
        $ustr.isInclude( null, "a" ),
        "対象文字がNULL"
      );
      jsunit.assertFalse(
        $ustr.isInclude( undefined, "a" ),
        "対象文字がundefined"
      );
      jsunit.assertFalse(
        $ustr.isInclude( "a", "" ),
        "比較文字が空文字"
      );
      jsunit.assertFalse(
        $ustr.isInclude( "a", null ),
        "比較文字がNULL"
      );
      jsunit.assertFalse(
        $ustr.isInclude( "a", undefined ),
        "比較文字がundefined"
      );
      jsunit.assertFalse(
        $ustr.isInclude( "", "" ),
        "空文字"
      );
      jsunit.assertFalse(
        $ustr.isInclude( null, null ),
        "NULL"
      );
      jsunit.assertFalse(
        $ustr.isInclude(),
        "undefined"
      );
    },
    "isInclude"
  );
  jsunit.execTest(
    function(){
      jsunit.assertEqual(
        $ustr.ljust( "left", 10 ),
        "left      ",
        "通常"
      );
      jsunit.assertEqual(
        $ustr.ljust( "left", 9, "-*" ),
        "left-*-*-",
        "オプション指定"
      );
      jsunit.assertEqual(
        $ustr.ljust( "left", 10, "" ),
        "left      ",
        "オプションが空文字"
      );
      jsunit.assertEqual(
        $ustr.ljust( "left", 2 ),
        "left",
        "文字数が対象文字より小さい"
      );
      jsunit.assertEqual(
        $ustr.ljust( "left", 4 ),
        "left",
        "文字数が対象文字と同じ"
      );
      jsunit.assertEqual(
        $ustr.ljust( "", 4 ),
        "    ",
        "空文字"
      );
      jsunit.assertEqual(
        $ustr.ljust( "left", 10, null ),
        "left      ",
        "オプションがnull"
      );
      jsunit.assertEqual(
        $ustr.ljust( "left", 9, "あいう" ),
        "leftあいうあい",
        "オプションがマルチバイト文字"
      );
      jsunit.assertEqual(
        $ustr.left( "left", 9, "-*" ),
        "left-*-*-",
        "ljustのalias"
      );
    },
    "ljust"
  );
  jsunit.execTest(
    function(){
      jsunit.assertEqual(
        $ustr.rjust( "right", 10 ),
        "     right",
        "通常"
      );
      jsunit.assertEqual(
        $ustr.rjust( "right", 10, "-*" ),
        "-*-*-right",
        "オプション指定"
      );
      jsunit.assertEqual(
        $ustr.rjust( "right", 10, "" ),
        "     right",
        "オプションが空文字"
      );
      jsunit.assertEqual(
        $ustr.rjust( "right", 2 ),
        "right",
        "文字数が対象文字より小さい"
      );
      jsunit.assertEqual(
        $ustr.rjust( "right", 5 ),
        "right",
        "文字数が対象文字と同じ"
      );
      jsunit.assertEqual(
        $ustr.rjust( "", 4 ),
        "    ",
        "空文字"
      );
      jsunit.assertEqual(
        $ustr.rjust( "right", 10, null ),
        "     right",
        "オプションがnull"
      );
      jsunit.assertEqual(
        $ustr.rjust( "right", 10, "あいう" ),
        "あいうあいright",
        "オプションがマルチバイト文字"
      );
      jsunit.assertEqual(
        $ustr.right( "right", 10, "-*" ),
        "-*-*-right",
        "rjustのalias"
      );
    },
    "rjust"
  );
  jsunit.execTest(
    function(){
      jsunit.assertEqual(
        $ustr.padding( "-", 5 ),
        "-----",
        "通常"
      );
      jsunit.assertEqual(
        $ustr.padding( "-*", 5 ),
        "-*-*-",
        "複数文字"
      );
      jsunit.assertEqual(
        $ustr.padding( "-=_~_=-", 3 ),
        "-=_",
        "指定文字数よりもパディング用文字数が大きい"
      );
      jsunit.assertEqual(
        $ustr.padding( "-=_~_=-", 0 ),
        "",
        "指定文字数が0"
      );
      jsunit.assertEqual(
        $ustr.padding( "", 5 ),
        "     ",
        "パディング用文字が空文字"
      );
      jsunit.assertEqual(
        $ustr.padding( null, 5 ),
        "     ",
        "パディング用文字がNULL"
      );
      jsunit.assertEqual(
        $ustr.padding( undefined, 5 ),
        "     ",
        "パディング用文字がundefined"
      );
      jsunit.assertEqual(
        $ustr.fill( "-", 5 ),
        "-----",
        "paddingのalias"
      );
    },
    "padding"
  );
  jsunit.execTest(
    function(){
      jsunit.assertEqual(
        $ustr.oct( "12" ),
        10,
        "通常"
      );
      jsunit.assertEqual(
        $ustr.oct( "-0o71" ),
        -57,
        "マイナス値"
      );
      jsunit.assertEqual(
        $ustr.oct( "19" ),
        0,
        "8真数として正しく無い値"
      );
      jsunit.assertEqual(
        $ustr.oct( "18" ),
        0,
        "8真数として正しく無い値2"
      );
      jsunit.assertEqual(
        $ustr.oct( "017" ),
        15,
        "0パディング"
      );
      jsunit.assertEqual(
        $ustr.oct( "0" ),
        0,
        "0"
      );
      jsunit.assertEqual(
        $ustr.oct( "" ),
        0,
        "空文字"
      );
      jsunit.assertEqual(
        $ustr.oct( null ),
        0,
        "null"
      );
      jsunit.assertEqual(
        $ustr.oct(),
        0,
        "undefined"
      );
    },
    "oct"
  );
  jsunit.execTest(
    function(){
      jsunit.assertEqual(
        $ustr.findWord( "hello world" ),
        ["hello","world"],
        "通常"
      );
      jsunit.assertEqual(
        $ustr.findWord( "hello" ),
        ["hello"],
        "単語が1つ"
      );
      jsunit.assertEqual(
        $ustr.findWord( "HelloWorld" ),
        ["Hello", "World"],
        "わかち文字が無い英文"
      );
      jsunit.assertEqual(
        $ustr.findWord( "hello  world" ),
        ["hello","world"],
        "わかち文字の連続"
      );
      jsunit.assertEqual(
        $ustr.findWord( "hello  \t\r\n\r  world" ),
        ["hello","world"],
        "わかち文字の複合"
      );
      jsunit.assertEqual(
        $ustr.findWord( "  Hello  " ),
        ["Hello"],
        "前後の空白"
      );
      jsunit.assertEqual(
        $ustr.findWord( "\nHello\n" ),
        ["Hello"],
        "前後の改行"
      );
      jsunit.assertEqual(
        $ustr.findWord( " \t\r\n\r\t Hello \t\r\n\r\t " ),
        ["Hello"],
        "前後の空白・改行の複合"
      );
      jsunit.assertEqual(
        $ustr.findWord( "hello-world" ),
        ["hello","world"],
        "-による文字連結"
      );
      jsunit.assertEqual(
        $ustr.findWord( "hello-200yen" ),
        ["hello","-200","yen"],
        "数値としての-"
      );
      jsunit.assertEqual(
        $ustr.findWord( "hello -200yen" ),
        ["hello","-200","yen"],
        "わかち文字後のマイナス値"
      );
      jsunit.assertEqual(
        $ustr.findWord( "-200yen" ),
        ["-200","yen"],
        "行頭のマイナス値"
      );
      jsunit.assertEqual(
        $ustr.findWord( "hello--world" ),
        ["hello","-","world"],
        "-の連続"
      );
      jsunit.assertEqual(
        $ustr.findWord( "hello--100" ),
        ["hello","-","-100"],
        "-の連続2"
      );
      jsunit.assertEqual(
        $ustr.findWord( "hello - world" ),
        ["hello","-","world"],
        "記号としての-"
      );
      jsunit.assertEqual(
        $ustr.findWord( "hello¥world" ),
        ["hello","¥","world"],
        "¥による文字分割"
      );
      jsunit.assertEqual(
        $ustr.findWord( "hello¥200yen" ),
        ["hello","¥200","yen"],
        "¥付きの数値の分割"
      );
      jsunit.assertEqual(
        $ustr.findWord( "hello¥-world" ),
        ["hello","¥","world"],
        "¥付きの-による文字連結"
      );
      jsunit.assertEqual(
        $ustr.findWord( "hello¥-200yen" ),
        ["hello","¥-200","yen"],
        "¥付きの数値としての-"
      );
      jsunit.assertEqual(
        $ustr.findWord( "hello ¥-200yen" ),
        ["hello","¥-200","yen"],
        "¥付きのわかち文字後のマイナス値"
      );
      jsunit.assertEqual(
        $ustr.findWord( "¥-200yen" ),
        ["¥-200","yen"],
        "¥付きの行頭のマイナス値"
      );
      jsunit.assertEqual(
        $ustr.findWord( "hello$world" ),
        ["hello","$","world"],
        "$による文字分割"
      );
      jsunit.assertEqual(
        $ustr.findWord( "hello$200yen" ),
        ["hello","$200","yen"],
        "$付きの数値の分割"
      );
      jsunit.assertEqual(
        $ustr.findWord( "hello$-world" ),
        ["hello","$","world"],
        "$付きの-による文字連結"
      );
      jsunit.assertEqual(
        $ustr.findWord( "hello$-200yen" ),
        ["hello","$-200","yen"],
        "$付きの数値としての-"
      );
      jsunit.assertEqual(
        $ustr.findWord( "hello $-200yen" ),
        ["hello","$-200","yen"],
        "$付きのわかち文字後のマイナス値"
      );
      jsunit.assertEqual(
        $ustr.findWord( "$-200yen" ),
        ["$-200","yen"],
        "$付きの行頭のマイナス値"
      );
      jsunit.assertEqual(
        $ustr.findWord( "'This is {commonFunctions}, too.'" ),
        ["'", "This", "is", "{", "common", "Functions", "}", ",", "too", ".", "'"],
        "複合"
      );
      jsunit.assertEqual(
        $ustr.findWord( "10or-20-things-" ),
        ["10", "or", "-20", "things"],
        "複合2"
      );
      jsunit.assertEqual(
        $ustr.findWord( "¥¥10¥ab¥c1¥¥" ),
        ["¥", "¥10", "¥", "ab", "¥", "c", "1", "¥", "¥"],
        "複合3"
      );
      jsunit.assertEqual(
        $ustr.findWord( '.,!?"`&=_+*<>@:;~|{}/[]()' ),
        [".", ",", "!", "?", '"', "`", "&", "=", "_", "+", "*", "<", ">", "@", ":", ";", "~", "|", "{", "}", "/", "[", "]", "(", ")"],
        "記号類"
      );
      jsunit.assertEqual(
        $ustr.findWord( "" ),
        [],
        "空文字"
      );
      jsunit.assertEqual(
        $ustr.findWord( null ),
        [],
        "NULL"
      );
      jsunit.assertEqual(
        $ustr.findWord(),
        [],
        "undefined"
      );
      jsunit.assertEqual(
        $ustr.findWord( " " ),
        [],
        "空白文字のみ"
      );
      jsunit.assertEqual(
        $ustr.findWord( "  " ),
        [],
        "空白文字のみ2"
      );
    },
    "findWord"
  );
  jsunit.execTest(
    function(){
      jsunit.assertEqual(
        $ustr.toByteArray( "abc" ),
        [0x61, 0x62, 0x63],
        "通常"
      );
      jsunit.assertEqual(
        $ustr.toByteArray( "あいう" ),
        [ 227, 129, 130, 227, 129, 132, 227, 129, 134 ],
        "マルチバイト文字"
      );
      jsunit.assertEqual(
        $ustr.toByteArray( "" ),
        [],
        "空文字"
      );
      jsunit.assertEqual(
        $ustr.toByteArray( null ),
        [],
        "null文字"
      );
      jsunit.assertEqual(
        $ustr.toByteArray(),
        [],
        "undefined"
      );
      jsunit.assertEqual(
        $ustr.byteCodes( "あいう" ),
        [ 227, 129, 130, 227, 129, 132, 227, 129, 134 ],
        "toByteArrayのalias"
      );
    },
    "toByteArray"
  );
  jsunit.execTest(
    function(){
      jsunit.assertEqual(
        $ustr.lstrip( " a b c " ),
        "a b c ",
        "通常"
      );
      jsunit.assertEqual(
        $ustr.lstrip( " \t\r\n a b c " ),
        "a b c ",
        "複合"
      );
      jsunit.assertEqual(
        $ustr.lstrip( "a b c " ),
        "a b c ",
        "左に無駄な文字列が無い時"
      );
      jsunit.assertEqual(
        $ustr.lstrip( "" ),
        "",
        "空文字"
      );
      jsunit.assertEqual(
        $ustr.lstrip( null ),
        "",
        "null文字"
      );
      jsunit.assertEqual(
        $ustr.lstrip(),
        "",
        "undefined"
      );
    },
    "lstrip"
  );
  jsunit.execTest(
    function(){
      jsunit.assertEqual(
        $ustr.rstrip( " a b c " ),
        " a b c",
        "通常"
      );
      jsunit.assertEqual(
        $ustr.rstrip( " a b c \t\r\n " ),
        " a b c",
        "複合"
      );
      jsunit.assertEqual(
        $ustr.rstrip( " a b c" ),
        " a b c",
        "右に無駄な文字列が無い時"
      );
      jsunit.assertEqual(
        $ustr.rstrip( "" ),
        "",
        "空文字"
      );
      jsunit.assertEqual(
        $ustr.rstrip( null ),
        "",
        "null文字"
      );
      jsunit.assertEqual(
        $ustr.rstrip(),
        "",
        "undefined"
      );
    },
    "rstrip"
  );
  jsunit.execTest(
    function(){
      jsunit.assertEqual(
        $ustr.strip( " a b c " ),
        "a b c",
        "通常"
      );
      jsunit.assertEqual(
        $ustr.strip( " \t\r\n a b c \t\r\n " ),
        "a b c",
        "複合"
      );
      jsunit.assertEqual(
        $ustr.strip( "a b c" ),
        "a b c",
        "左右に無駄な文字列が無い時"
      );
      jsunit.assertEqual(
        $ustr.strip( "" ),
        "",
        "空文字"
      );
      jsunit.assertEqual(
        $ustr.strip( null ),
        "",
        "null文字"
      );
      jsunit.assertEqual(
        $ustr.strip(),
        "",
        "undefined"
      );
    },
    "strip"
  );
  jsunit.execTest(
    function(){
      jsunit.assertEqual(
        $ustr.next( "1" ),
        "2",
        "通常"
      );
      jsunit.assertEqual(
        $ustr.next( "-1" ),
        "-2",
        "マイナス値（マイナス値は認識しない）"
      );
      jsunit.assertEqual(
        $ustr.next( "9" ),
        "10",
        "繰上げ"
      );
      jsunit.assertEqual(
        $ustr.next( "19" ),
        "20",
        "繰上げ2"
      );
      jsunit.assertEqual(
        $ustr.next( "0" ),
        "1",
        "0"
      );
      jsunit.assertEqual(
        $ustr.next( "00" ),
        "01",
        "0埋め"
      );
      jsunit.assertEqual(
        $ustr.next( "01" ),
        "02",
        "0埋め2"
      );
      jsunit.assertEqual(
        $ustr.next( "09" ),
        "10",
        "0埋め繰上げ"
      );
      jsunit.assertEqual(
        $ustr.next( "a" ),
        "b",
        "英字"
      );
      jsunit.assertEqual(
        $ustr.next( "z" ),
        "aa",
        "英字繰上げ"
      );
      jsunit.assertEqual(
        $ustr.next( "az" ),
        "ba",
        "英字繰上げ2"
      );
      jsunit.assertEqual(
        $ustr.next( "B" ),
        "C",
        "大文字英字"
      );
      jsunit.assertEqual(
        $ustr.next( "z9Z" ),
        "aa0A",
        "複合"
      );
      jsunit.assertEqual(
        $ustr.next( "<z9Z>" ),
        "<aa0A>",
        "前後に認識しない文字"
      );
      jsunit.assertEqual(
        $ustr.next( "z-9-Z" ),
        "z-9-AA",
        "文中に認識しない文字"
      );
      jsunit.assertEqual(
        $ustr.next( "-" ),
        "-",
        "認識しない文字のみ"
      );
      jsunit.assertEqual(
        $ustr.next( "" ),
        "",
        "空文字"
      );
      jsunit.assertEqual(
        $ustr.next( null ),
        "",
        "null文字"
      );
      jsunit.assertEqual(
        $ustr.next(),
        "",
        "undefined"
      );
      jsunit.assertEqual(
        $ustr.succ( "<z9Z>" ),
        "<aa0A>",
        "nextのaliase"
      );
    },
    "next"
  );
  jsunit.execTest(
    function(){
      jsunit.assertEqual(
        $ustr.partition( "abcdef", "cd" ),
        [ "ab", "cd", "ef" ],
        "文中"
      );
      jsunit.assertEqual(
        $ustr.partition( "abcdef", "ab" ),
        [ "", "ab", "cdef" ],
        "行頭"
      );
      jsunit.assertEqual(
        $ustr.partition( "abcdef", "ef" ),
        [ "abcd", "ef", "" ],
        "行末"
      );
      jsunit.assertEqual(
        $ustr.partition( "abcdefcdab", "cd" ),
        [ "ab", "cd", "efcdab" ],
        "複数一致"
      );
      jsunit.assertEqual(
        $ustr.partition( "abcdef", "[cde]" ),
        [ "ab", "c", "def" ],
        "正規表現文字列"
      );
      jsunit.assertEqual(
        $ustr.partition( "abcdef", /[cde]/ ),
        [ "ab", "c", "def" ],
        "正規表現"
      );
      jsunit.assertEqual(
        $ustr.partition( "abcdef", "CD" ),
        [ "abcdef", "", "" ],
        "不一致"
      );
      jsunit.assertEqual(
        $ustr.partition( "abcdef", "" ),
        [ "abcdef", "", "" ],
        "セパレータが空文字"
      );
      jsunit.assertEqual(
        $ustr.partition( "abcdef", null ),
        [ "abcdef", "", "" ],
        "セパレータがNULL"
      );
      jsunit.assertEqual(
        $ustr.partition( "abcdef" ),
        [ "abcdef", "", "" ],
        "セパレータがundefined"
      );
      jsunit.assertEqual(
        $ustr.partition( "", "A" ),
        [ "", "", "" ],
        "対象文字が空文字"
      );
      jsunit.assertEqual(
        $ustr.partition( null, "A" ),
        [ "", "", "" ],
        "対象文字がnull文字"
      );
      jsunit.assertEqual(
        $ustr.partition( undefined, "A" ),
        [ "", "", "" ],
        "対象文字がundefined"
      );      
    },
    "partition"
  );
  jsunit.execTest(
    function(){
      jsunit.assertEqual(
        $ustr.rpartition( "abcdef", "cd" ),
        [ "ab", "cd", "ef" ],
        "文中"
      );
      jsunit.assertEqual(
        $ustr.rpartition( "abcdef", "ab" ),
        [ "", "ab", "cdef" ],
        "行頭"
      );
      jsunit.assertEqual(
        $ustr.rpartition( "abcdef", "ef" ),
        [ "abcd", "ef", "" ],
        "行末"
      );
      jsunit.assertEqual(
        $ustr.rpartition( "abcdefcdab", "cd" ),
        [ "abcdef", "cd", "ab" ],
        "複数一致"
      );
      jsunit.assertEqual(
        $ustr.rpartition( "abcdef", "[cde]" ),
        [ "abcd", "e", "f" ],
        "正規表現文字列"
      );
      jsunit.assertEqual(
        $ustr.rpartition( "abcdef", /[cde]/ ),
        [ "abcd", "e", "f" ],
        "正規表現"
      );
      jsunit.assertEqual(
        $ustr.rpartition( "abcdef", "CD" ),
        [ "", "", "abcdef" ],
        "不一致"
      );
      jsunit.assertEqual(
        $ustr.rpartition( "abcdef", "" ),
        [ "", "", "abcdef" ],
        "セパレータが空文字"
      );
      jsunit.assertEqual(
        $ustr.rpartition( "abcdef", null ),
        [ "", "", "abcdef" ],
        "セパレータがNULL"
      );
      jsunit.assertEqual(
        $ustr.rpartition( "abcdef" ),
        [ "", "", "abcdef" ],
        "セパレータがundefined"
      );
      jsunit.assertEqual(
        $ustr.rpartition( "", "A" ),
        [ "", "", "" ],
        "対象文字が空文字"
      );
      jsunit.assertEqual(
        $ustr.rpartition( null, "A" ),
        [ "", "", "" ],
        "対象文字がnull文字"
      );
      jsunit.assertEqual(
        $ustr.rpartition( undefined, "A" ),
        [ "", "", "" ],
        "対象文字がundefined"
      );      
    },
    "rpartition"
  );
  jsunit.execTest(
    function(){
      jsunit.assertEqual(
        $ustr.reverse( "abcdef" ),
        "fedcba",
        "通常"
      );
      jsunit.assertEqual(
        $ustr.reverse( "a" ),
        "a",
        "1文字"
      );
      jsunit.assertEqual(
        $ustr.reverse( "" ),
        "",
        "空文字"
      );
      jsunit.assertEqual(
        $ustr.reverse( null ),
        "",
        "null文字"
      );
      jsunit.assertEqual(
        $ustr.reverse(),
        "",
        "undefined"
      );
    },
    "reverse"
  );
  jsunit.execTest(
    function(){
      jsunit.assertEqual(
        $ustr.scan( "hello world", "l" ),
        [ "l", "l", "l" ],
        "通常"
      );
      jsunit.assertEqual(
        $ustr.scan( "foo bar baz qux", "[a-z]{3}" ),
        [ "foo", "bar", "baz", "qux" ],
        "正規表現文字列"
      );
      jsunit.assertEqual(
        $ustr.scan( "foo bar baz qux", /[a-z]{3}/ ),
        [ "foo", "bar", "baz", "qux" ],
        "正規表現"
      );
      jsunit.assertEqual(
        $ustr.scan( "foo:bar, baz:qux", "([a-z]+):([a-z]+)" ),
        [ [ "foo", "bar" ], [ "baz", "qux" ] ],
        "()付き正規表現文字列"
      );
      jsunit.assertEqual(
        $ustr.scan( "foo:bar, baz:qux", /([\w]+):([\w]+)/ ),
        [ [ "foo", "bar" ], [ "baz", "qux" ] ],
        "()付き正規表現"
      );
      jsunit.assertEqual(
        $ustr.scan( "foo:bar,baz:qux", "((([a-z])([a-z])([a-z])):([a-z]+)),?" ),
        [ [ "foo:bar", "foo", "f", "o", "o", "bar" ], [ "baz:qux", "baz", "b", "a", "z", "qux" ] ],
        "()のネストした正規表現"
      );
      jsunit.assertEqual(
        $ustr.scan( "hello world", "" ),
        [],
        "空文字"
      );
      jsunit.assertEqual(
        $ustr.scan( "hello world", "bey" ),
        [],
        "不一致"
      );
      jsunit.assertEqual(
        $ustr.scan( "hello world", null ),
        [],
        "null文字"
      );
      jsunit.assertEqual(
        $ustr.scan( "hello world" ),
        [],
        "undefined"
      );
      jsunit.assertEqual(
        $ustr.scan( "", "" ),
        [],
        "対象文字が空文字"
      );
      jsunit.assertEqual(
        $ustr.scan( null, "" ),
        [],
        "対象文字がnull文字"
      );
      jsunit.assertEqual(
        $ustr.scan( undefined, "" ),
        [],
        "対象文字がundefined"
      );
    },
    "scan"
  );
  jsunit.execTest(
    function(){
      jsunit.assertEqual(
        $ustr.toS( "a" ),
        "a",
        "通常"
      );
      jsunit.assertEqual(
        $ustr.toS( 1 ),
        "1",
        "文字列以外からの変換"
      );
      jsunit.assertEqual(
        (new $UStr()).toS( "b" ),
        "b",
        "任意インスタンスからの変換"
      );
      jsunit.assertEqual(
        (new $UStr("c")).toS(),
        (new $UStr("c")),
        "任意インスタンスからの変換2"
      );
      jsunit.assertEqual(
        $ustr.toS( "" ),
        "",
        "空文字"
      );
      jsunit.assertEqual(
        $ustr.toS( null ),
        "",
        "null文字"
      );
      jsunit.assertEqual(
        $ustr.toS(),
        "",
        "undefined"
      );
    },
    "toS"
  );
  jsunit.execTest(
    function(){
      jsunit.assertEqual(
        $ustr.remove( "abcdef", "cd" ),
        "abef",
        "通常"
      );
      jsunit.assertEqual(
        $ustr.remove( "abcdef", "ab" ),
        "cdef",
        "行頭"
      );
      jsunit.assertEqual(
        $ustr.remove( "abcdef", "ef" ),
        "abcd",
        "行末"
      );
      jsunit.assertEqual(
        $ustr.remove( "abcdef", "CD" ),
        "abcdef",
        "一致なし"
      );
      jsunit.assertEqual(
        $ustr.remove( "abcdef", "[b-d]{3}" ),
        "aef",
        "正規表現文字列"
      );
      jsunit.assertEqual(
        $ustr.remove( "abcdef", /[b-d]{3}/ ),
        "aef",
        "正規表現"
      );
      jsunit.assertEqual(
        $ustr.remove( "abcdef", "" ),
        "abcdef",
        "空文字"
      );
      jsunit.assertEqual(
        $ustr.remove( "abcdef", null ),
        "abcdef",
        "null文字"
      );
      jsunit.assertEqual(
        $ustr.remove( "abcdef" ),
        "abcdef",
        "undeinfed"
      );
      jsunit.assertEqual(
        $ustr.remove( "", "a" ),
        "",
        "対象文字が空文字"
      );
      jsunit.assertEqual(
        $ustr.remove( null, "a" ),
        "",
        "対象文字がnull文字"
      );
      jsunit.assertEqual(
        $ustr.remove( undefined, "a" ),
        "",
        "対象文字がundeinfed"
      );
    },
    "remove"
  );
  jsunit.execTest(
    function(){
      jsunit.assertEqual(
        $ustr.setByte( "a_c", 1, 98 ),
        "abc",
        "2文字目"
      );
      jsunit.assertEqual(
        $ustr.setByte( "ab_", -1, 99 ),
        "abc",
        "最後の文字"
      );
      jsunit.assertEqual(
        $ustr.setByte( "_bc", 0, 97 ),
        "abc",
        "1文字目"
      );
      jsunit.assertEqual(
        $ustr.setByte( "ああう", 5, 132 ),
        "あいう",
        "マルチバイト文字"
      );
      jsunit.assertEqual(
        $ustr.setByte( "abc", 3, 100 ),
        "abc",
        "存在しない文字位置を指定"
      );
      jsunit.assertEqual(
        $ustr.setByte( "abc", -4, 100 ),
        "abc",
        "存在しない文字位置を指定2"
      );
      jsunit.assertEqual(
        $ustr.setByte( "", 0, 97 ),
        "",
        "空文字"
      );
    },
    "setByte"
  );
  jsunit.execTest(
    function(){
      jsunit.assertEqual(
        $ustr.squeeze( "hello world" ),
        "helo world",
        "通常"
      );
      jsunit.assertEqual(
        $ustr.squeeze( "aaabc" ),
        "abc",
        "行頭"
      );
      jsunit.assertEqual(
        $ustr.squeeze( "abccc" ),
        "abc",
        "末尾"
      );
      jsunit.assertEqual(
        $ustr.squeeze( "aaaaa" ),
        "a",
        "全文一致"
      );
      jsunit.assertEqual(
        $ustr.squeeze( "おおおかえちぜん" ),
        "おかえちぜん",
        "マルチバイト"
      );
      jsunit.assertEqual(
        $ustr.squeeze( "abc" ),
        "abc",
        "一致なし"
      );
      jsunit.assertEqual(
        $ustr.squeeze( "a" ),
        "a",
        "１文字"
      );
      jsunit.assertEqual(
        $ustr.squeeze( "aaa   bbbcc", /[a-z]/ ),
        "a   bc",
        "一致条件"
      );
      jsunit.assertEqual(
        $ustr.squeeze( "aaa   bbbcc", /[a-z]/, "b" ),
        "aaa   bcc",
        "一致条件が複数"
      );
      jsunit.assertEqual(
        $ustr.squeeze( "aaa   bbbcc", [ /[a-z]/, "b" ] ),
        "aaa   bcc",
        "一致条件が配列"
      );
      jsunit.assertEqual(
        $ustr.squeeze( "aaa   bbbcc", [ /[a-z]/, "b" ], "c" ),
        "aaa   bcc",
        "一致条件が配列と混在"
      );
      jsunit.assertEqual(
        $ustr.squeeze( "aaa   bbbcc", "c", [ /[a-z]/, "b" ] ),
        "aaa   bbbcc",
        "一致条件が配列と混在2"
      );
      jsunit.assertEqual(
        $ustr.squeeze( "aaa   bbbcc", /[A-Z]/ ),
        "aaa   bbbcc",
        "一致条件に適合なし"
      );
      jsunit.assertEqual(
        $ustr.squeeze( "" ),
        "",
        "対象文字が空文字"
      );
      jsunit.assertEqual(
        $ustr.squeeze( null ),
        "",
        "対象文字がnull"
      );
      jsunit.assertEqual(
        $ustr.squeeze(),
        "",
        "対象文字がundefined"
      );
      jsunit.assertEqual(
        $ustr.squeeze( "aaa", "" ),
        "aaa",
        "一致条件が空文字"
      );
      jsunit.assertEqual(
        $ustr.squeeze( "aaa", [] ),
        "a",
        "一致条件が空配列"
      );
      jsunit.assertEqual(
        $ustr.squeeze( "aaa", null ),
        "aaa",
        "一致条件がnull"
      );
      jsunit.assertEqual(
        $ustr.squeeze( "aaa", undefined ),
        "aaa",
        "一致条件がundefined"
      );
      jsunit.assertEqual(
        $ustr.squeeze( "aaa", "", "[a-z]" ),
        "aaa",
        "一致条件に空文字を含む"
      );
      jsunit.assertEqual(
        $ustr.squeeze( "aaa", "[a-z]", "" ),
        "aaa",
        "一致条件に空文字を含む2"
      );
      jsunit.assertEqual(
        $ustr.squeeze( "aaa", null, "[a-z]" ),
        "aaa",
        "一致条件にnullを含む"
      );
      jsunit.assertEqual(
        $ustr.squeeze( "aaa", "[a-z]", null ),
        "aaa",
        "一致条件にnullを含む2"
      );
      jsunit.assertEqual(
        $ustr.squeeze( "aaa", undefined, "[a-z]" ),
        "aaa",
        "一致条件にundefinedを含む"
      );
      jsunit.assertEqual(
        $ustr.squeeze( "aaa", "[a-z]", undefined ),
        "aaa",
        "一致条件にundefinedを含む2"
      );
    },
    "squeeze"
  );
  jsunit.execTest(
    function(){
      jsunit.assertEqual(
        $ustr.sum( "abc" ),
        294,
        "通常"
      );
      jsunit.assertEqual(
        $ustr.sum( "あいう" ),
        1464,
        "通常2"
      );
      jsunit.assertEqual(
        $ustr.sum( "abc\n" ),
        304,
        "改行コードを含む"
      );
      jsunit.assertEqual(
        $ustr.sum( "abc", 8 ),
        38,
        "下位8bits"
      );
      jsunit.assertEqual(
        $ustr.sum( "あいう", 8 ),
        184,
        "下位8bits2"
      );
      jsunit.assertEqual(
        $ustr.sum( "abc", 4 ),
        6,
        "下位4bits"
      );
      jsunit.assertEqual(
        $ustr.sum( "あいう", 4 ),
        8,
        "下位4bits2"
      );
      jsunit.assertEqual(
        $ustr.sum( "a", 1 ),
        1,
        "下位1bits"
      );
      jsunit.assertEqual(
        $ustr.sum( "b", 1 ),
        0,
        "下位1bits2"
      );
      jsunit.assertEqual(
        $ustr.sum( "abc", 0 ),
        0,
        "bitsに0を指定"
      );
      jsunit.assertEqual(
        $ustr.sum( "abc", -1 ),
        0,
        "bitsにマイナス値を指定"
      );
      jsunit.assertEqual(
        $ustr.sum( "abc", null ),
        294,
        "bitsにnullを指定"
      );
      jsunit.assertEqual(
        $ustr.sum( "abc", undefined ),
        294,
        "bitsにundefinedを指定"
      );
      jsunit.assertEqual(
        $ustr.sum( "" ),
        0,
        "対象文字が空文字"
      );
      jsunit.assertEqual(
        $ustr.sum( null ),
        0,
        "対象文字がnull"
      );
      jsunit.assertEqual(
        $ustr.sum(),
        0,
        "対象文字がundefined"
      );
    },
    "sum"
  );
  jsunit.execTest(
    function(){
      jsunit.assertEqual(
        $ustr.swapcase( "Hello World!" ),
        "hELLO wORLD!",
        "通常"
      );
      jsunit.assertEqual(
        $ustr.swapcase( "あaいBうc" ),
        "あAいbうC",
        "マルチバイト文字列の混在"
      );
      jsunit.assertEqual(
        $ustr.swapcase( "" ),
        "",
        "対象文字が空文字"
      );
      jsunit.assertEqual(
        $ustr.swapcase( null ),
        "",
        "対象文字がnull"
      );
      jsunit.assertEqual(
        $ustr.swapcase(),
        "",
        "対象文字がundefined"
      );
    },
    "swapcase"
  );
  jsunit.execTest(
    function(){
      jsunit.assertEqual(
        $ustr.upto( "a", "c" ),
        [ "a", "b", "c" ],
        "通常"
      );
      jsunit.assertEqual(
        $ustr.upto( "a9y", "b0b" ),
        [ "a9y", "a9z", "b0a", "b0b" ],
        "繰上げ"
      );
      jsunit.assertEqual(
        $ustr.upto( "z", "a" ),
        [ "z" ],
        "繰上げ不可"
      );
      jsunit.assertEqual(
        $ustr.upto( "a", "a" ),
        [ "a" ],
        "開始と終了が同一"
      );
      jsunit.assertEqual(
        $ustr.upto( "_z_", "_ab_" ),
        [ "_z_", "_aa_", "_ab_" ],
        "対象文字以外を含む"
      );
      jsunit.assertEqual(
        $ustr.upto( "_z_", "=ab=" ),
        [ "_z_" ],
        "対象外文字が不一致"
      );
      jsunit.assertEqual(
        $ustr.upto( "_", "~" ),
        [ "_" ],
        "対象外文字のみ"
      );
      jsunit.assertEqual(
        $ustr.upto( "", "b" ),
        [ "" ],
        "開始文字が空欄"
      );
      jsunit.assertEqual(
        $ustr.upto( null, "b" ),
        [ "" ],
        "開始文字がnull"
      );
      jsunit.assertEqual(
        $ustr.upto( undefined, "b" ),
        [ "" ],
        "開始文字がundefined"
      );
      jsunit.assertEqual(
        $ustr.upto( "a", "" ),
        [ "a" ],
        "終了文字が空欄"
      );
      jsunit.assertEqual(
        $ustr.upto( "a", null ),
        [ "a" ],
        "終了文字がnull"
      );
      jsunit.assertEqual(
        $ustr.upto( "a" ),
        [ "a" ],
        "終了文字がundefined"
      );
      var test = "";
      jsunit.assertEqual(
        $ustr.upto( "a", "c", function(e){ test = test + e; } ),
        [ "a", "b", "c" ],
        "ブロック指定時の戻り値"
      );
      jsunit.assertEqual(
        test,
        "abc",
        "ブロック"
      );
      jsunit.assertEqual(
        $ustr.upto( "a", "c", "z" ),
        [ "a", "b", "c" ],
        "ブロックに文字列を指定"
      );
      jsunit.assertEqual(
        $ustr.upto( "a", "c", null ),
        [ "a", "b", "c" ],
        "ブロックにnull"
      );
    },
    "upto"
  );
  jsunit.execTest(
    function(){
      jsunit.assertEqual(
        $ustr.prev( "1" ),
        "0",
        "通常"
      );
      jsunit.assertEqual(
        $ustr.prev( "-1" ),
        "-0",
        "マイナス値（マイナス値は認識しない）"
      );
      jsunit.assertEqual(
        $ustr.prev( "10" ),
        "9",
        "繰下げ"
      );
      jsunit.assertEqual(
        $ustr.prev( "20" ),
        "19",
        "繰下げ2"
      );
      jsunit.assertEqual(
        $ustr.prev( "0100" ),
        "099",
        "繰下げ3"
      );
      jsunit.assertEqual(
        $ustr.prev( "0" ),
        "0",
        "0"
      );
      jsunit.assertEqual(
        $ustr.prev( "00" ),
        "00",
        "0埋め"
      );
      jsunit.assertEqual(
        $ustr.prev( "01" ),
        "00",
        "0埋め2"
      );
      jsunit.assertEqual(
        $ustr.prev( "<00>" ),
        "<00>",
        "0埋め3"
      );
      jsunit.assertEqual(
        $ustr.prev( "010" ),
        "09",
        "0埋め繰下げ"
      );
      jsunit.assertEqual(
        $ustr.prev( "b" ),
        "a",
        "英字"
      );
      jsunit.assertEqual(
        $ustr.prev( "a" ),
        "a",
        "英字最小値"
      );
      jsunit.assertEqual(
        $ustr.prev( "<00a>" ),
        "<00a>",
        "英字最小値0埋め"
      );
      jsunit.assertEqual(
        $ustr.prev( "aa" ),
        "z",
        "英字繰下げ"
      );
      jsunit.assertEqual(
        $ustr.prev( "ba" ),
        "az",
        "英字繰下げ2"
      );
      jsunit.assertEqual(
        $ustr.prev( "A0a" ),
        "9z",
        "英字繰下げ3"
      );
      jsunit.assertEqual(
        $ustr.prev( "B" ),
        "A",
        "大文字英字"
      );
      jsunit.assertEqual(
        $ustr.prev( "aa0A" ),
        "z9Z",
        "複合"
      );
      jsunit.assertEqual(
        $ustr.prev( "<aa0A>" ),
        "<z9Z>",
        "前後に認識しない文字"
      );
      jsunit.assertEqual(
        $ustr.prev( "z-9-AA" ),
        "z-9-Z",
        "文中に認識しない文字"
      );
      jsunit.assertEqual(
        $ustr.prev( "-" ),
        "-",
        "認識しない文字のみ"
      );
      jsunit.assertEqual(
        $ustr.prev( "" ),
        "",
        "空文字"
      );
      jsunit.assertEqual(
        $ustr.prev( null ),
        "",
        "null文字"
      );
      jsunit.assertEqual(
        $ustr.prev(),
        "",
        "undefined"
      );
      jsunit.assertEqual(
        $ustr.ante( "<aa0A>" ),
        "<z9Z>",
        "prevのaliase"
      );
    },
    "prev"
  );
  jsunit.execTest(
    function(){
      jsunit.assertEqual(
        $ustr.downto( "c", "a" ),
        [ "c", "b", "a" ],
        "通常"
      );
      jsunit.assertEqual(
        $ustr.downto( "b0b", "a9y" ),
        [ "b0b", "b0a", "a9z", "a9y" ],
        "繰下げ"
      );
      jsunit.assertEqual(
        $ustr.downto( "a", "z" ),
        [ "a" ],
        "繰下げ不可"
      );
      jsunit.assertEqual(
        $ustr.downto( "z", "z" ),
        [ "z" ],
        "開始と終了が同一"
      );
      jsunit.assertEqual(
        $ustr.downto( "_ab_", "_z_" ),
        [ "_ab_", "_aa_", "_z_" ],
        "対象文字以外を含む"
      );
      jsunit.assertEqual(
        $ustr.downto( "=ab=", "_z_" ),
        [ "=ab=" ],
        "対象外文字が不一致"
      );
      jsunit.assertEqual(
        $ustr.downto( "_", "~" ),
        [ "_" ],
        "対象外文字のみ"
      );
      jsunit.assertEqual(
        $ustr.downto( "", "b" ),
        [ "" ],
        "開始文字が空欄"
      );
      jsunit.assertEqual(
        $ustr.downto( null, "b" ),
        [ "" ],
        "開始文字がnull"
      );
      jsunit.assertEqual(
        $ustr.downto( undefined, "b" ),
        [ "" ],
        "開始文字がundefined"
      );
      jsunit.assertEqual(
        $ustr.downto( "b", "" ),
        [ "b" ],
        "終了文字が空欄"
      );
      jsunit.assertEqual(
        $ustr.downto( "b", null ),
        [ "b" ],
        "終了文字がnull"
      );
      jsunit.assertEqual(
        $ustr.downto( "b" ),
        [ "b" ],
        "終了文字がundefined"
      );
      var test = "";
      jsunit.assertEqual(
        $ustr.downto( "c", "a", function(e){ test = test + e; } ),
        [ "c", "b", "a" ],
        "ブロック指定時の戻り値"
      );
      jsunit.assertEqual(
        test,
        "cba",
        "ブロック"
      );
      jsunit.assertEqual(
        $ustr.downto( "c", "a", "z" ),
        [ "c", "b", "a" ],
        "ブロックに文字列を指定"
      );
      jsunit.assertEqual(
        $ustr.downto( "c", "a", null ),
        [ "c", "b", "a" ],
        "ブロックにnull"
      );
    },
    "downto"
  );
  jsunit.execTest(
    function(){
      jsunit.assertEqual(
        $ustr.times( "abc", 3 ),
        "abcabcabc",
        "通常"
      );
      jsunit.assertEqual(
        $ustr.times( "abc", 1 ),
        "abc",
        "1回"
      );
      jsunit.assertEqual(
        $ustr.times( "abc", 0 ),
        "",
        "0回"
      );
      jsunit.assertEqual(
        $ustr.times( "abc", -1 ),
        "cba",
        "-1回"
      );
      jsunit.assertEqual(
        $ustr.times( "abc", -2 ),
        "cbacba",
        "-2回"
      );
      jsunit.assertEqual(
        $ustr.times( "-", 2 ),
        "--",
        "1文字"
      );
      jsunit.assertEqual(
        $ustr.times( "あいう", -2 ),
        "ういあういあ",
        "マルチバイト文字列"
      );
      jsunit.assertEqual(
        $ustr.times( "", 2 ),
        "",
        "空文字"
      );
      jsunit.assertEqual(
        $ustr.times( "", -2 ),
        "",
        "空文字を負の回数"
      );
      jsunit.assertEqual(
        $ustr.times( null, 2 ),
        "",
        "null"
      );
      jsunit.assertEqual(
        $ustr.times( undefined, 2 ),
        "",
        "undefined"
      );
      jsunit.assertEqual(
        $ustr.repeat( "aaa", 2 ),
        "aaaaaa",
        "timesのaliase"
      );
    },
    "times"
  );
  jsunit.execTest(
    function(){
      jsunit.assertEqual(
        $ustr.charAt( "abc", 0 ),
        "a",
        "通常"
      );
      jsunit.assertEqual(
        $ustr.charAt( "abc", 1 ),
        "b",
        "通常2"
      );
    },
    "charAt"
  );
  jsunit.execTest(
    function(){
      jsunit.assertEqual(
        $ustr.charCodeAt( "abc", 0 ),
        97,
        "通常"
      );
      jsunit.assertEqual(
        $ustr.charCodeAt( "abc", 1 ),
        98,
        "通常2"
      );
    },
    "charCodeAt"
  );
  jsunit.execTest(
    function(){
      jsunit.assertEqual(
        $ustr.concat( "abc", "def" ),
        "abcdef",
        "通常"
      );
      jsunit.assertEqual(
        $ustr.concat( "", "a" ),
        "a",
        "通常2"
      );
    },
    "concat"
  );
  jsunit.execTest(
    function(){
      jsunit.assertEqual(
        $ustr.lastIndexOf( "abcdef", "cd" ),
        2,
        "通常"
      );
      jsunit.assertEqual(
        $ustr.lastIndexOf( "abcdabcd", "cd" ),
        6,
        "通常2"
      );
      jsunit.assertEqual(
        $ustr.lastIndexOf( "abcdabcd", "cd", 5 ),
        2,
        "通常3"
      );
    },
    "lastIndexOf"
  );
  jsunit.execTest(
    function(){
      jsunit.assertEqual(
        $ustr.match( "abcdef", "cd" ),
        [ "cd" ],
        "通常"
      );
      jsunit.assertEqual(
        $ustr.match( "abcdef", /[b-d]+/ ),
        [ "bcd" ],
        "通常2"
      );
      jsunit.assertEqual(
        $ustr.match( "abcdef", /[g-z]+/ ),
        null,
        "通常3"
      );
    },
    "match"
  );
  jsunit.execTest(
    function(){
      jsunit.assertEqual(
        $ustr.replace( "abcdef", "cd", "--" ),
        "ab--ef",
        "通常"
      );
      jsunit.assertEqual(
        $ustr.replace( "abcdef", /[b-d]+/, "--" ),
        "a--ef",
        "通常2"
      );
    },
    "replace"
  );
  jsunit.execTest(
    function(){
      jsunit.assertEqual(
        $ustr.search( "abcdef", "cd" ),
        2,
        "通常"
      );
      jsunit.assertEqual(
        $ustr.search( "abcdef", /[b-d]+/ ),
        1,
        "通常2"
      );
      jsunit.assertEqual(
        $ustr.search( "abcdef", /[g-z]+/ ),
        -1,
        "通常3"
      );
      jsunit.assertEqual(
        $ustr.search( "abcdef", /[b-d]/ ),
        1,
        "通常4"
      );
    },
    "search"
  );
  jsunit.execTest(
    function(){
      jsunit.assertEqual(
        $ustr.slice( "abcdef", 0 ),
        "abcdef",
        "通常"
      );
      jsunit.assertEqual(
        $ustr.slice( "abcdef", 2 ),
        "cdef",
        "通常2"
      );
      jsunit.assertEqual(
        $ustr.slice( "abcdef", -2 ),
        "ef",
        "通常3"
      );
      jsunit.assertEqual(
        $ustr.slice( "abcdef", 1, 3 ),
        "bc",
        "通常4"
      );
    },
    "slice"
  );  
  jsunit.execTest(
    function(){
      jsunit.assertEqual(
        $ustr.substr( "abcdef", 0 ),
        "abcdef",
        "通常"
      );
      jsunit.assertEqual(
        $ustr.substr( "abcdef", 2 ),
        "cdef",
        "通常2"
      );
      jsunit.assertEqual(
        $ustr.substr( "abcdef", -2 ),
        "ef",
        "通常3"
      );
      jsunit.assertEqual(
        $ustr.substr( "abcdef", 1, 2 ),
        "bc",
        "通常4"
      );
    },
    "substr"
  );    
  jsunit.execTest(
    function(){
      jsunit.assertEqual(
        $ustr.substring( "abcdef", 0 ),
        "abcdef",
        "通常"
      );
      jsunit.assertEqual(
        $ustr.substring( "abcdef", 2 ),
        "cdef",
        "通常2"
      );
      jsunit.assertEqual(
        $ustr.substring( "abcdef", -2 ),
        "abcdef",
        "通常3"
      );
      jsunit.assertEqual(
        $ustr.substring( "abcdef", 1, 3 ),
        "bc",
        "通常4"
      );
    },
    "substring"
  );    
  jsunit.execTest(
    function(){
      jsunit.assertEqual(
        $ustr.split( "abc", "" ),
        [ "a", "b", "c" ],
        "通常1"
      );
      jsunit.assertEqual(
        $ustr.split( "a,bc,d", "," ),
        [ "a", "bc", "d" ],
        "通常2"
      );
      jsunit.assertEqual(
        $ustr.split( "abcd", "", 2 ),
        [ "a", "b" ],
        "通常3"
      );
      jsunit.assertEqual(
        $ustr.split( "a,b,c,d", ",", 2 ),
        [ "a", "b" ],
        "通常2"
      );
    },
    "split"
  );
  jsunit.execTest(
    function(){
      jsunit.assertEqual(
        $ustr.toLowerCase( "abcABCあいう01_" ),
        "abcabcあいう01_",
        "通常"
      );
    },
    "toLowerCase"
  );
  jsunit.execTest(
    function(){
      jsunit.assertEqual(
        $ustr.toUpperCase( "abcABCあいう01_" ),
        "ABCABCあいう01_",
        "通常"
      );
    },
    "toUpperCase"
  );
  jsunit.execTest(
    function(){
      jsunit.assertEqual(
        $ustr.findPhone( "090-1234-5678", false ),
        [ "090-1234-5678" ],
        "通常"
      );
      jsunit.assertEqual(
        $ustr.findPhone( "090(1234)5678", false ),
        [ "090(1234)5678" ],
        "通常2"
      );
      jsunit.assertEqual(
        $ustr.findPhone( "12345678", false ),
        [ "12345678" ],
        "通常3"
      );
      jsunit.assertEqual(
        $ustr.findPhone( "090-1234-5678.090-1234-5678", false ),
        [ "090-1234-5678", "090-1234-5678" ],
        "複数"
      );
      jsunit.assertEqual(
        $ustr.findPhone( "090-1234-5678090-1234-5678", false ),
        [ "090-1234-5678", "090-1234-5678" ],
        "複数2"
      );
      jsunit.assertEqual(
        $ustr.findPhone( "0901234567809012345678", false ),
        [ "0901234567809", "012345678" ],
        "複数3"
      );
      jsunit.assertEqual(
        $ustr.findPhone( "8190-1234-5678", false ),
        [ "8190-1234-5678" ],
        "国際番号"
      );
      jsunit.assertEqual(
        $ustr.findPhone( "81090-1234-5678", false ),
        [ "81090-1234" ],
        "国際番号NG"
      );
      jsunit.assertEqual(
        $ustr.findPhone( "090-1234-5678", true ),
        [ "090-1234-5678" ],
        "通常 strict"
      );
      jsunit.assertEqual(
        $ustr.findPhone( "090(1234)5678", true ),
        [ "090(1234)5678" ],
        "通常2 strict"
      );
      jsunit.assertEqual(
        $ustr.findPhone( "09012345678", true ),
        [ "09012345678" ],
        "通常3 strict"
      );
      jsunit.assertEqual(
        $ustr.findPhone( "12345678", true ),
        [],
        "通常4 strict"
      );
      jsunit.assertEqual(
        $ustr.findPhone( "090-1234-5678090-1234-5678", true ),
        [ "090-1234-5678", "090-1234-5678" ],
        "複数 strict"
      );
      jsunit.assertEqual(
        $ustr.findPhone( "0901234567809012345678", true ),
        [ "09012345678", "09012345678" ],
        "複数2 strict"
      );
      jsunit.assertEqual(
        $ustr.findPhone( "8190-1234-5678", true ),
        [ "8190-1234-5678" ],
        "国際番号 strict"
      );
      jsunit.assertEqual(
        $ustr.findPhone( "81090-1234-5678", true ),
        [ "090-1234-5678" ],
        "国際番号NG strict"
      );
      jsunit.assertEqual(
        $ustr.findPhone( "810090-1234-5678", true ),
        [ "090-1234-5678" ],
        "国際番号NG2 strict"
      );
      jsunit.assertEqual(
        $ustr.findPhone( "810090-1234-5678" ),
        [ "090-1234-5678" ],
        "国際番号NG2 strict default"
      );
      jsunit.assertEqual(
        $ustr.findPhone( "810090-1234-5678", false ),
        [ "810090", "1234-5678" ],
        "国際番号NG2 not strict"
      );
      jsunit.assertEqual(
        $ustr.findPhone( "01234" ),
        [],
        "一致なし"
      );
      jsunit.assertEqual(
        $ustr.findPhone( "" ),
        [],
        "空文字"
      );
      jsunit.assertEqual(
        $ustr.findPhone( "" ),
        [],
        "null"
      );
      jsunit.assertEqual(
        $ustr.findPhone(),
        [],
        "undefined"
      );
      jsunit.assertEqual(
        $ustr.findTel( "abc090-1234-5678def" ),
        [ "090-1234-5678" ],
        "findPhoneのaliase"
      );
    },
    "findPhone"
  );
  jsunit.execTest(
    function(){
      jsunit.assertEqual(
        $ustr.findEmail( "a@b.com" ),
        [ "a@b.com" ],
        "通常"
      );
      jsunit.assertEqual(
        $ustr.findEmail( "ab.com" ),
        [],
        "@なし"
      );
      jsunit.assertEqual(
        $ustr.findEmail( "@ab.com" ),
        [],
        "@先頭"
      );
      jsunit.assertEqual(
        $ustr.findEmail( "ab.com@" ),
        [],
        "@行末"
      );
      jsunit.assertEqual(
        $ustr.findEmail( "a@b.comc@d.come@f.com" ),
        [ "a@b.comc", "d.come@f.com" ],
        "連続"
      );
      jsunit.assertEqual(
        $ustr.findEmail( "HelloWorld¥a@b¥@c.com@@d.com" ),
        [ "a@b" ],
        "メアド以外の@"
      );
      jsunit.assertEqual(
        $ustr.findEmail( "ab.com", false ),
        [],
        "@なし not strict"
      );
      jsunit.assertEqual(
        $ustr.findEmail( "HelloWorld¥a@b¥@c.com@@d.com", false ),
        [ "a@b" ],
        "メアド以外の@ not strict"
      );
      jsunit.assertEqual(
        $ustr.findEmail( "@ab.com", false ),
        [],
        "@先頭"
      );
      jsunit.assertEqual(
        $ustr.findEmail( "ab.com@", false ),
        [],
        "@行末"
      );
      jsunit.assertEqual(
        $ustr.findEmail( "aB0.!#$%&-/*+=?^_{|}~`'@.-cD0" ),
        [],
        "不正なアドレス default"
      );
      jsunit.assertEqual(
        $ustr.findEmail( "aB0.!#$%&-/*+=?^_{|}~`'@.-cD0", true ),
        [],
        "不正なアドレス strict"
      );
      jsunit.assertEqual(
        $ustr.findEmail( "aB0.!#$%&-/*+=?^_{|}~`'@.-cD0", false ),
        [ "aB0.!#$%&-/*+=?^_{|}~`'@.-cD0" ],
        "不正なアドレス not strict"
      );
      jsunit.assertEqual(
        $ustr.findEmail( "aB0.!#$%&-/*+=?^_{|}~`'\\@.-cD0", false ),
        [],
        "不正なアドレス2 not strict"
      );
      jsunit.assertEqual(
        $ustr.findEmail( "" ),
        [],
        "空欄"
      );
      jsunit.assertEqual(
        $ustr.findEmail( null ),
        [],
        "null"
      );
      jsunit.assertEqual(
        $ustr.findEmail(),
        [],
        "undefined"
      );
    },
    "findEmail"
  );
  jsunit.execTest(
    function(){
      jsunit.assertEqual(
        $ustr.findUrl( "http://hoge.com/hogehoge" ),
        [ "http://hoge.com/hogehoge" ],
        "通常"
      );
      jsunit.assertEqual(
        $ustr.findUrl( "http://user:password@exsample.com:80/directory/subdirectory.html?key=value&query=#fragment" ),
        [ "http://user:password@exsample.com:80/directory/subdirectory.html?key=value&query=#fragment" ],
        "フル"
      );
      jsunit.assertEqual(
        $ustr.findUrl( "//user:password@exsample.com:80/directory/subdirectory.html?key=value&query=#fragment" ),
        [ "//user:password@exsample.com:80/directory/subdirectory.html?key=value&query=#fragment" ],
        "スキーマ無し"
      );
      jsunit.assertEqual(
        $ustr.findUrl( "http://user:password@exsample.com:80/directory/subdirectory.html#fragment?key=value&query=" ),
        [ "http://user:password@exsample.com:80/directory/subdirectory.html#fragment?key=value&query=" ],
        "フラグメントとクエリ逆"
      );
      jsunit.assertEqual(
        $ustr.findUrl( "https://user:password@exsample.com:80/directory/subdirectory.html?key=value&query=#fragment" ),
        [ "https://user:password@exsample.com:80/directory/subdirectory.html?key=value&query=#fragment" ],
        "スキーム違い"
      );
      jsunit.assertEqual(
        $ustr.findUrl( "https://exsample.com:80/directory/subdirectory.html?key=value&query=#fragment" ),
        [ "https://exsample.com:80/directory/subdirectory.html?key=value&query=#fragment" ],
        "ユーザ情報なし"
      );
      jsunit.assertEqual(
        $ustr.findUrl( "https://exsample.com/directory/subdirectory.html?key=value&query=#fragment" ),
        [ "https://exsample.com/directory/subdirectory.html?key=value&query=#fragment" ],
        "ポート番号なし"
      );
      jsunit.assertEqual(
        $ustr.findUrl( "https://exsample.com?key=value&query=#fragment" ),
        [ "https://exsample.com?key=value&query=#fragment" ],
        "ディレクトリなし"
      );
      jsunit.assertEqual(
        $ustr.findUrl( "https://exsample.com#fragment" ),
        [ "https://exsample.com#fragment" ],
        "フラグメントあり、クエリなし"
      );
      jsunit.assertEqual(
        $ustr.findUrl( "https://exsample.com?key=value&query=" ),
        [ "https://exsample.com?key=value&query=" ],
        "フラグメントなし、クエリあり"
      );
      jsunit.assertEqual(
        $ustr.findUrl( "https://exsample.com/directory" ),
        [ "https://exsample.com/directory" ],
        "ディレクトリ"
      );
      jsunit.assertEqual(
        $ustr.findUrl( "https://exsample.com/directory/subdirectory.html" ),
        [ "https://exsample.com/directory/subdirectory.html" ],
        "サブディレクトリ"
      );
      jsunit.assertEqual(
        $ustr.findUrl( "https://exsample.com/" ),
        [ "https://exsample.com/" ],
        "ルートディレクトリ"
      );
      jsunit.assertEqual(
        $ustr.findUrl( "https://exsample.com" ),
        [ "https://exsample.com" ],
        "ホストのみ"
      );
      jsunit.assertEqual(
        $ustr.findUrl( "https://exsample.com:8080" ),
        [ "https://exsample.com:8080" ],
        "ホストのみ+ポート番号あり"
      );
      jsunit.assertEqual(
        $ustr.findUrl( "https://197.0.0.1:8080" ),
        [ "https://197.0.0.1:8080" ],
        "ホストがIPv4"
      );
      jsunit.assertEqual(
        $ustr.findUrl( "https://[::1]:8080" ),
        [ "https://[::1]:8080" ],
        "ホストがIPv6"
      );
      jsunit.assertEqual(
        $ustr.findUrl( "https://[2001:db8::]:8080" ),
        [ "https://[2001:db8::]:8080" ],
        "ホストがIPv6(2)"
      );
      jsunit.assertEqual(
        $ustr.findUrl( "https://[ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff]" ),
        [ "https://[ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff]" ],
        "ホストがIPv6(3)"
      );
      jsunit.assertEqual(
        $ustr.findUrl( "https://localhost" ),
        [ "https://localhost" ],
        "localhost"
      );
      jsunit.assertEqual(
        $ustr.findUrl( "mysql://localhost" ),
        [ "mysql://localhost" ],
        "スキーマ"
      );
      jsunit.assertEqual(
        $ustr.findUrl( "mysql://user:pass@/directory" ),
        [ "mysql://user" ],
        "ホストがユーザ情報のみ"
      );
      jsunit.assertEqual(
        $ustr.findUrl( "mysql://:8080/directory" ),
        [],
        "ホストがポートのみ"
      );
      jsunit.assertEqual(
        $ustr.findUrl( "http://localhost:8080;http://localhost:8080/directory.gif" ),
        [ "http://localhost:8080", "http://localhost:8080/directory.gif" ],
        "複数"
      );
      jsunit.assertEqual(
        $ustr.findUrl( "http:https:ftps:/ssh:///mysql://" ),
        [ "//mysql" ],
        "不正url"
      );
      jsunit.assertEqual(
        $ustr.findUrl( "aB_%-+.://-._~%!$&'()*+,;=:@-._~%!$&'()*+,;=:0/-._~%!$&'()*+,;=:@/-._~%!$&'()*+,;=:@?-._~%!$&'()*+,;=:@/?#-._~%!$&'()*+,;=:@/?" ),
        [ "aB_%-+.://-._~%!$&'()*+,;=:@-._~%!$&'()*+,;=:0/-._~%!$&'()*+,;=:@/-._~%!$&'()*+,;=:@?-._~%!$&'()*+,;=:@/?#-._~%!$&'()*+,;=:@/?" ],
        "利用可能な文字の全て"
      );
      jsunit.assertEqual(
        $ustr.findUrl( "https://www.google.co.jp/search?q=hoge&oq=hoge&aqs=chrome.0.69i59j69i57j69i60l3j69i61.411j0j8&sourceid=chrome&ie=UTF-8" ),
        [ "https://www.google.co.jp/search?q=hoge&oq=hoge&aqs=chrome.0.69i59j69i57j69i60l3j69i61.411j0j8&sourceid=chrome&ie=UTF-8" ],
        "google"
      );
      jsunit.assertEqual(
        $ustr.findUrl( "https://exsample.co.jp/file/FOYER/%E7%92%B0%E5%A2%83/" ),
        [ "https://exsample.co.jp/file/FOYER/%E7%92%B0%E5%A2%83/" ],
        "URL encode"
      );
      jsunit.assertEqual(
        $ustr.findUrl( "aB_%-+.://-._~%!$&'()*+,;=:@-._~%!$&'()*+,;=:0/-._~%!$&'()*+,;=:@/-._~%!$&'()*+,;=:@?-._~%!$&'()*+,;=:@/?#-._~%!$&'()*+,;=:@/?", true ),
        [ "aB_%-+.://-._~%!$&'()*+,;=:@-._~%!$&'()*+,;=:0/-._~%!$&'()*+,;=:@/-._~%!$&'()*+,;=:@?-._~%!$&'()*+,;=:@/?#-._~%!$&'()*+,;=:@/?" ],
        "strict"
      );
      jsunit.assertEqual(
        $ustr.findUrl( "aB_%-+.://-._~%!$&'()*+,;=:@-._~%!$&'()*+,;=:0/-._~%!$&'()*+,;=:@/-._~%!$&'()*+,;=:@?-._~%!$&'()*+,;=:@/?#-._~%!$&'()*+,;=:@/?", false ),
        [ "aB_%-+.://-._~%!$&'()*+,;=:@-._~%!$&'()*+,;=:0/-._~%!$&'()*+,;=:@/-._~%!$&'()*+,;=:@?-._~%!$&'()*+,;=:@/?#-._~%!$&'()*+,;=:@/?" ],
        "not strict"
      );
      jsunit.assertEqual(
        $ustr.findUrl( "http://google.com", false ),
        [ "http://google.com" ],
        "相対パス"
      );
      jsunit.assertEqual(
        $ustr.findUrl( "./hoge.gif", false ),
        [ "./hoge.gif" ],
        "相対パス not strict"
      );
      jsunit.assertEqual(
        $ustr.findUrl( "../directory/hoge.gif", false ),
        [ "../directory/hoge.gif" ],
        "相対パス2 not strict"
      );
      jsunit.assertEqual(
        $ustr.findUrl( "/directory/hoge.gif", false ),
        [ "/directory/hoge.gif" ],
        "相対パス3 not strict"
      );
      jsunit.assertEqual(
        $ustr.findUrl( ".//exsample.com/directory/hoge.gif", false ),
        [ ".//exsample.com/directory/hoge.gif" ],
        "相対パス不正 not strict"
      );
      jsunit.assertEqual(
        $ustr.findUrl( "./-._~%!$&'()*+,;=:@/-._~%!$&'()*+,;=:@?-._~%!$&'()*+,;=:@/?#-._~%!$&'()*+,;=:@/?", false ),
        [ "./-._~%!$&'()*+,;=:@/-._~%!$&'()*+,;=:@?-._~%!$&'()*+,;=:@/?#-._~%!$&'()*+,;=:@/?" ],
        "相対パス 利用可能な文字の全て not strict"
      );
      jsunit.assertEqual(
        $ustr.findUrl( "" ),
        [],
        "空欄"
      );
      jsunit.assertEqual(
        $ustr.findUrl( null ),
        [],
        "null"
      );
      jsunit.assertEqual(
        $ustr.findUrl(),
        [],
        "undefined"
      );
    },
    "findUrl"
  );
  jsunit.execTest(
    function(){
      jsunit.assertEqual(
        $ustr.findIp4( "127.0.0.1" ),
        [ "127.0.0.1" ],
        "通常"
      );
      jsunit.assertEqual(
        $ustr.findIp4( "127.0.0.1/32" ),
        [ "127.0.0.1/32" ],
        "サブネットマスク付き"
      );
      jsunit.assertEqual(
        $ustr.findIp4( "127.0.0.1/29" ),
        [ "127.0.0.1/29" ],
        "サブネットマスク付き2"
      );
      jsunit.assertEqual(
        $ustr.findIp4( "127.0.0.1/0" ),
        [ "127.0.0.1/0" ],
        "サブネットマスク付き3"
      );
      jsunit.assertEqual(
        $ustr.findIp4( "127.0.0.100127.0.0.1" ),
        [ "127.0.0.100", "127.0.0.1" ],
        "複数"
      );
      jsunit.assertEqual(
        $ustr.findIp4( "a127.0.0.1b" ),
        [ "127.0.0.1" ],
        "文中"
      );
      jsunit.assertEqual(
        $ustr.findIp4( "0.0.0.0" ),
        [ "0.0.0.0" ],
        "最小"
      );
      jsunit.assertEqual(
        $ustr.findIp4( "000.000.000.000" ),
        [ "000.000.000.000" ],
        "pad"
      );
      jsunit.assertEqual(
        $ustr.findIp4( "00.00.00.00" ),
        [ "00.00.00.00" ],
        "pad2"
      );
      jsunit.assertEqual(
        $ustr.findIp4( "90.90.90.90" ),
        [ "90.90.90.90" ],
        "no pad"
      );
      jsunit.assertEqual(
        $ustr.findIp4( "090.090.090.090" ),
        [ "090.090.090.090" ],
        "pad3"
      );
      jsunit.assertEqual(
        $ustr.findIp4( "255.255.255.255" ),
        [ "255.255.255.255" ],
        "最大"
      );
      jsunit.assertEqual(
        $ustr.findIp4( "256.0.0.0" ),
        [ "56.0.0.0" ],
        "不正"
      );
      jsunit.assertEqual(
        $ustr.findIp4( "260.0.0.0" ),
        [ "60.0.0.0" ],
        "不正2"
      );
      jsunit.assertEqual(
        $ustr.findIp4( "300.0.0.0" ),
        [ "00.0.0.0" ],
        "不正3"
      );
      jsunit.assertEqual(
        $ustr.findIp4( "127.0.0.1/33" ),
        [ "127.0.0.1/3" ],
        "サブネットマスク不正"
      );
      jsunit.assertEqual(
        $ustr.findIp4( "127.0.0.1/40" ),
        [ "127.0.0.1/4" ],
        "サブネットマスク不正2"
      );
      jsunit.assertEqual(
        $ustr.findIp4( "" ),
        [],
        "空欄"
      );
      jsunit.assertEqual(
        $ustr.findIp4( null ),
        [],
        "null"
      );
      jsunit.assertEqual(
        $ustr.findIp4(),
        [],
        "undefined"
      );
    },
    "findIp4"
  );
  jsunit.execTest(
    function(){
      jsunit.assertEqual(
        $ustr.findIp6( "0:0:0:0:0:0:0:0" ),
        [ "0:0:0:0:0:0:0:0" ],
        "通常"
      );
      jsunit.assertEqual(
        $ustr.findIp6( "FFFF:FFFF:FFFF:FFFF:FFFF:FFFF:FFFF:FFFF" ),
        [ "FFFF:FFFF:FFFF:FFFF:FFFF:FFFF:FFFF:FFFF" ],
        "最大"
      );
      jsunit.assertEqual(
        $ustr.findIp6( "0:0:0:0:0:0:0:FFFFg0:0:0:0:0:0:0:0" ),
        [ "0:0:0:0:0:0:0:FFFF", "0:0:0:0:0:0:0:0" ],
        "連続"
      );
      jsunit.assertEqual(
        $ustr.findIp6( "g0:0:0:0:0:0:0:0h" ),
        [ "0:0:0:0:0:0:0:0" ],
        "文中"
      );
      jsunit.assertEqual(
        $ustr.findIp6( "0:00:000:0000:1:01:001:0001" ),
        [ "0:00:000:0000:1:01:001:0001" ],
        "pad"
      );
      jsunit.assertEqual(
        $ustr.findIp6( "::" ),
        [ "::" ],
        "省略"
      );
      jsunit.assertEqual(
        $ustr.findIp6( "::1" ),
        [ "::1" ],
        "前方省略1"
      );
      jsunit.assertEqual(
        $ustr.findIp6( "::1:1" ),
        [ "::1:1" ],
        "前方省略2"
      );
      jsunit.assertEqual(
        $ustr.findIp6( "::1:1:1" ),
        [ "::1:1:1" ],
        "前方省略3"
      );
      jsunit.assertEqual(
        $ustr.findIp6( "::1:1:1:1" ),
        [ "::1:1:1:1" ],
        "前方省略4"
      );
      jsunit.assertEqual(
        $ustr.findIp6( "::1:1:1:1:1" ),
        [ "::1:1:1:1:1" ],
        "前方省略5"
      );
      jsunit.assertEqual(
        $ustr.findIp6( "::1:1:1:1:1:1" ),
        [ "::1:1:1:1:1:1" ],
        "前方省略6"
      );

      jsunit.assertEqual(
        $ustr.findIp6( "1::" ),
        [ "1::" ],
        "後方省略1"
      );
      jsunit.assertEqual(
        $ustr.findIp6( "1:1::" ),
        [ "1:1::" ],
        "後方省略2"
      );
      jsunit.assertEqual(
        $ustr.findIp6( "1:1:1::" ),
        [ "1:1:1::" ],
        "後方省略3"
      );
      jsunit.assertEqual(
        $ustr.findIp6( "1:1:1:1::" ),
        [ "1:1:1:1::" ],
        "後方省略4"
      );
      jsunit.assertEqual(
        $ustr.findIp6( "1:1:1:1:1::" ),
        [ "1:1:1:1:1::" ],
        "後方省略5"
      );
      jsunit.assertEqual(
        $ustr.findIp6( "1:1:1:1:1:1::" ),
        [ "1:1:1:1:1:1::" ],
        "後方省略6"
      );
      
      jsunit.assertEqual(
        $ustr.findIp6( "1::1" ),
        [ "1::1" ],
        "文中省略"
      );
      jsunit.assertEqual(
        $ustr.findIp6( "1:1::1" ),
        [ "1:1::1" ],
        "文中省略2"
      );
      jsunit.assertEqual(
        $ustr.findIp6( "1:1::1:1" ),
        [ "1:1::1:1" ],
        "文中省略3"
      );

      jsunit.assertEqual(
        $ustr.findIp6( "::1/0" ),
        [ "::1/0" ],
        "CIDR"
      );
      jsunit.assertEqual(
        $ustr.findIp6( "::/0" ),
        [ "::/0" ],
        "CIDR1"
      );
      jsunit.assertEqual(
        $ustr.findIp6( "::/128" ),
        [ "::/128" ],
        "CIDR max"
      );
      jsunit.assertEqual(
        $ustr.findIp6( "::/129" ),
        [ "::/12" ],
        "CIDR over"
      );
      jsunit.assertEqual(
        $ustr.findIp6( "::/130" ),
        [ "::/13" ],
        "CIDR over2"
      );
      jsunit.assertEqual(
        $ustr.findIp6( "::/200" ),
        [ "::/20" ],
        "CIDR over3"
      );

      jsunit.assertEqual(
        $ustr.findIp6( "0:0:0:0:0:0:255.255.255.255/128" ),
        [ "0:0:0:0:0:0:255.255.255.255/128" ],
        "IPv4埋め込み"
      );
      jsunit.assertEqual(
        $ustr.findIp6( "0:0:0:0:0:0:0:255.255.255.255/128" ),
        [ "0:0:0:0:0:0:0:255" ],
        "IPv4埋め込み不正"
      );

      jsunit.assertEqual(
        $ustr.findIp6( "::1:1:1:1:1:1:1:1" ),
        [ "::1:1:1:1:1:1:1" ],
        "不正"
      );
      jsunit.assertEqual(
        $ustr.findIp6( "1:1:1:1:1:1:1:1::" ),
        [ "1:1:1:1:1:1:1:1", "::" ],
        "不正2"
      );
      jsunit.assertEqual(
        $ustr.findIp6( "1:1:1:1::1:1:1:1" ),
        [ "1:1:1:1::1:1:1" ],
        "不正3"
      );
      jsunit.assertEqual(
        $ustr.findIp6( "1::1::1:" ),
        [ "1::1", "::1" ],
        "不正4"
      );
      jsunit.assertEqual(
        $ustr.findIp6( "" ),
        [],
        "空欄"
      );
      jsunit.assertEqual(
        $ustr.findIp6( null ),
        [],
        "null"
      );
      jsunit.assertEqual(
        $ustr.findIp6(),
        [],
        "undefined"
      );
    },
    "findIp6"
  );
  jsunit.execTest(
    function(){
      jsunit.assertEqual(
        $ustr.findIp( "::" ),
        [ "::" ],
        "ipv6"
      );
      jsunit.assertEqual(
        $ustr.findIp( "0:0:0:0:0:0:0:0" ),
        [ "0:0:0:0:0:0:0:0" ],
        "ipv6 2"
      );
      jsunit.assertEqual(
        $ustr.findIp( "127.0.0.0" ),
        [ "127.0.0.0" ],
        "ipv4"
      );
      jsunit.assertEqual(
        $ustr.findIp( ":: 0:0:0:0:0:0:0:0 1:1:1:1:1:1:1:FFFF0.0.0.0/32::/128" ),
        [ "::", "0:0:0:0:0:0:0:0", "1:1:1:1:1:1:1:FFFF", "0.0.0.0/32", "::/128" ],
        "混在"
      );
      
    },
    "findIp"
  );
  jsunit.execTest(
    function(){
      jsunit.assertEqual(
        $ustr.parseUrl( "http://google.com" ),
        { url:"http://google.com", schema:"http", user:null, password:null, fqdn:"google.com", host:null, domain:"google.com", ip4:null, ip6:null, port:null, path:null, query:null, queries:null, fragment:null },
        "通常"
      );
      jsunit.assertEqual(
        $ustr.parseUrl( "https://user:password@www.exsample.com:80/directory/subdirectory.html?key=value&query=#fragment" ),
        { url:"https://user:password@www.exsample.com:80/directory/subdirectory.html?key=value&query=#fragment", schema:"https", user:"user", password:"password", fqdn:"www.exsample.com", host:"www", domain:"exsample.com", ip4:null, ip6:null, port:"80", path:"directory/subdirectory.html", query:"key=value&query=", queries:{ key:"value", query:null }, fragment:"fragment" },
        "フル"
      );
      jsunit.assertEqual(
        $ustr.parseUrl( "http://google.com/" ),
        { url:"http://google.com/", schema:"http", user:null, password:null, fqdn:"google.com", host:null, domain:"google.com", ip4:null, ip6:null, port:null, path:"", query:null, queries:null, fragment:null },
        "ルート階層"
      );
      jsunit.assertEqual(
        $ustr.parseUrl( "http://127.0.0.1/" ),
        { url:"http://127.0.0.1/", schema:"http", user:null, password:null, fqdn:"127.0.0.1", host:null, domain:null, ip4:"127.0.0.1", ip6:null, port:null, path:"", query:null, queries:null, fragment:null },
        "IP4"
      );
      jsunit.assertEqual(
        $ustr.parseUrl( "http://localhost" ),
        { url:"http://localhost", schema:"http", user:null, password:null, fqdn:"localhost", host:null, domain:"localhost", ip4:null, ip6:null, port:null, path:null, query:null, queries:null, fragment:null },
        "localhost"
      );
      jsunit.assertEqual(
        $ustr.parseUrl( "http://dev.exp.com" ),
        { url:"http://dev.exp.com", schema:"http", user:null, password:null, fqdn:"dev.exp.com", host:"dev", domain:"exp.com", ip4:null, ip6:null, port:null, path:null, query:null, queries:null, fragment:null },
        "com"
      );
      jsunit.assertEqual(
        $ustr.parseUrl( "http://dev.exp.co.jp" ),
        { url:"http://dev.exp.co.jp", schema:"http", user:null, password:null, fqdn:"dev.exp.co.jp", host:"dev", domain:"exp.co.jp", ip4:null, ip6:null, port:null, path:null, query:null, queries:null, fragment:null },
        "co.jp"
      );
      jsunit.assertEqual(
        $ustr.parseUrl( "http://dev.exp.jp" ),
        { url:"http://dev.exp.jp", schema:"http", user:null, password:null, fqdn:"dev.exp.jp", host:null, domain:"dev.exp.jp", ip4:null, ip6:null, port:null, path:null, query:null, queries:null, fragment:null },
        "jp"
      );
      jsunit.assertEqual(
        $ustr.parseUrl( "http://test.example.com" ),
        { url:"http://test.example.com", schema:"http", user:null, password:null, fqdn:"test.example.com", host:"test", domain:"example.com", ip4:null, ip6:null, port:null, path:null, query:null, queries:null, fragment:null },
        "comでホスト付き"
      );
      jsunit.assertEqual(
        $ustr.parseUrl( "http://dev.test.example.com" ),
        { url:"http://dev.test.example.com", schema:"http", user:null, password:null, fqdn:"dev.test.example.com", host:"dev.test", domain:"example.com", ip4:null, ip6:null, port:null, path:null, query:null, queries:null, fragment:null },
        "comでホスト付き2"
      );
      jsunit.assertEqual(
        $ustr.parseUrl( "http://com.com.com.com" ),
        { url:"http://com.com.com.com", schema:"http", user:null, password:null, fqdn:"com.com.com.com", host:"com.com", domain:"com.com", ip4:null, ip6:null, port:null, path:null, query:null, queries:null, fragment:null },
        "com連続"
      );
      jsunit.assertEqual(
        $ustr.parseUrl( "http://ex.com.co.co" ),
        { url:"http://ex.com.co.co", schema:"http", user:null, password:null, fqdn:"ex.com.co.co", host:"ex", domain:"com.co.co", ip4:null, ip6:null, port:null, path:null, query:null, queries:null, fragment:null },
        "co連続"
      );
      jsunit.assertEqual(
        $ustr.parseUrl( "http://google.com?" ),
        { url:"http://google.com?", schema:"http", user:null, password:null, fqdn:"google.com", host:null, domain:"google.com", ip4:null, ip6:null, port:null, path:null, query:null, queries:null, fragment:null },
        "クエリのデリミタのみ"
      );
      jsunit.assertEqual(
        $ustr.parseUrl( "http://google.com#" ),
        { url:"http://google.com#", schema:"http", user:null, password:null, fqdn:"google.com", host:null, domain:"google.com", ip4:null, ip6:null, port:null, path:null, query:null, queries:null, fragment:null },
        "フラグメントのデリミタのみ"
      );
      jsunit.assertEqual(
        $ustr.parseUrl( "//user:password@www.exsample.com:80/directory/subdirectory.html?key=value&query=#fragment" ),
        { url:"//user:password@www.exsample.com:80/directory/subdirectory.html?key=value&query=#fragment", schema:null, user:"user", password:"password", fqdn:"www.exsample.com", host:"www", domain:"exsample.com", ip4:null, ip6:null, port:"80", path:"directory/subdirectory.html", query:"key=value&query=", queries:{ key:"value", query:null }, fragment:"fragment" },
        "相対パス"
      );
      jsunit.assertEqual(
        $ustr.parseUrl( "directory/subdirectory.html" ),
        { url:"directory/subdirectory.html", schema:null, user:null, password:null, fqdn:null, host:null, domain:null, ip4:null, ip6:null, port:null, path:"./directory/subdirectory.html", query:null, queries:null, fragment:null },
        "相対パス2"
      );
      jsunit.assertEqual(
        $ustr.parseUrl( "./directory/subdirectory.html" ),
        { url:"./directory/subdirectory.html", schema:null, user:null, password:null, fqdn:null, host:null, domain:null, ip4:null, ip6:null, port:null, path:"./directory/subdirectory.html", query:null, queries:null, fragment:null },
        "相対パス3"
      );
      jsunit.assertEqual(
        $ustr.parseUrl( "../directory/subdirectory.html" ),
        { url:"../directory/subdirectory.html", schema:null, user:null, password:null, fqdn:null, host:null, domain:null, ip4:null, ip6:null, port:null, path:"../directory/subdirectory.html", query:null, queries:null, fragment:null },
        "相対パス4"
      );
      jsunit.assertEqual(
        $ustr.parseUrl( "あいうえお" ),
        null,
        "URLではない文字列"
      );
      jsunit.assertEqual(
        $ustr.parseUrl( "./abc/def\\ghi.html" ),
        null,
        "URLではない文字列2"
      );
      jsunit.assertEqual(
        $ustr.parseUrl( "./abc def.html#fragment" ),
        null,
        "URLではない文字列3"
      );
      jsunit.assertEqual(
        $ustr.parseUrl( "" ),
        null,
        "空文字"
      );
      jsunit.assertEqual(
        $ustr.parseUrl( null ),
        null,
        "null"
      );
      jsunit.assertEqual(
        $ustr.parseUrl(),
        null,
        "undefined"
      );
    },
    "parseUrl"
  );
  jsunit.execTest(
    function(){
      jsunit.assertEqual(
        $ustr.mergeUrl( "http://example.com/", "./test" ),
        "http://example.com/test",
        "通常"
      );
      jsunit.assertEqual(
        $ustr.mergeUrl( "http://google.com", "http://example.com/" ),
        "http://example.com",
        "両方絶対パス"
      );
      jsunit.assertEqual(
        $ustr.mergeUrl( "./test", "http://example.com/" ),
        "http://example.com/test",
        "2つ目が絶対パス"
      );
      jsunit.assertEqual(
        $ustr.mergeUrl( "http://example.com", "./test" ),
        "http://example.com/test",
        "合成元に/なし"
      );
      jsunit.assertEqual(
        $ustr.mergeUrl( "http://example.com", "/test" ),
        "http://example.com/test",
        "合成元2に.なし"
      );
      jsunit.assertEqual(
        $ustr.mergeUrl( "http://example.com", "test" ),
        "http://example.com/test",
        "合成元2に./なし"
      );
      jsunit.assertEqual(
        $ustr.mergeUrl( "http://example.com/file1", "./file2" ),
        "http://example.com/file2",
        "ファイルとファイル"
      );
      jsunit.assertEqual(
        $ustr.mergeUrl( "http://example.com/directory/", "./file" ),
        "http://example.com/directory/file",
        "ディレクトリとファイル"
      );
      jsunit.assertEqual(
        $ustr.mergeUrl( "http://example.com/directory1/directory2/file1", "./file2" ),
        "http://example.com/directory1/directory2/file2",
        "複数ディレクトリ・ファイルとファイル"
      );
      jsunit.assertEqual(
        $ustr.mergeUrl( "http://example.com/directory1/directory2/file1", "./directory3/file2" ),
        "http://example.com/directory1/directory2/directory3/file2",
        "複数ディレクトリ・ファイルとディレクトリ・ファイル"
      );
      jsunit.assertEqual(
        $ustr.mergeUrl( "http://example.com/directory1/directory2/file1", "../directory3/file2" ),
        "http://example.com/directory1/directory3/file2",
        "前のディレクトリに戻る"
      );
      jsunit.assertEqual(
        $ustr.mergeUrl( "http://example.com/directory1/directory2/directory3/file1", "../../directory4/file2" ),
        "http://example.com/directory1/directory4/file2",
        "前の前のディレクトリに戻る＋新しいディレクトリの指定"
      );
      jsunit.assertEqual(
        $ustr.mergeUrl( "./directory1/file1", "./directory2/file2" ),
        "./directory1/directory2/file2",
        "相対パス同士"
      );      
      jsunit.assertEqual(
        $ustr.mergeUrl( "../directory1/file1", "./directory2/file2" ),
        "../directory1/directory2/file2",
        "相対パス同士2"
      );
      jsunit.assertEqual(
        $ustr.mergeUrl( "../directory1/file1", "../directory2/file2" ),
        "../directory2/file2",
        "相対パス同士3"
      );      
      jsunit.assertEqual(
        $ustr.mergeUrl( "http://example.com/directory1/directory2/file1", "./file2" ),
        "http://example.com/directory1/directory2/file2",
        "複数ディレクトリ・ファイルとファイル"
      );
      jsunit.assertEqual(
        $ustr.mergeUrl( "http://example.com/directory1/directory2/file1#fragment", "./directory3/file2" ),
        "http://example.com/directory1/directory2/directory3/file2",
        "絶対パス側にフラグメント"
      );
      jsunit.assertEqual(
        $ustr.mergeUrl( "http://example.com/directory1/directory2/file1?key=value", "./directory3/file2" ),
        "http://example.com/directory1/directory2/directory3/file2",
        "絶対パス側にクエリストリング"
      );      
      jsunit.assertEqual(
        $ustr.mergeUrl( "http://example.com/directory1/directory2/file1", "./directory3/file2#fragment" ),
        "http://example.com/directory1/directory2/directory3/file2#fragment",
        "相対パス側にフラグメント"
      );
      jsunit.assertEqual(
        $ustr.mergeUrl( "http://example.com/directory1/directory2/file1", "./directory3/file2?key=value" ),
        "http://example.com/directory1/directory2/directory3/file2?key=value",
        "絶対パス側にクエリストリング"
      );
      jsunit.assertEqual(
        $ustr.mergeUrl( "http://example.com/directory1/file1", "//example.co.jp/directory2/file2" ),
        "http://example.co.jp/directory1/directory2/file2",
        "片方スキーマ無し"
      );
      jsunit.assertEqual(
        $ustr.mergeUrl( "//example.com/directory1/file1", "https://example.co.jp/directory2/file2" ),
        "https://example.com/directory2/directory1/file1",
        "片方スキーマ無し2"
      );
      jsunit.assertEqual(
        $ustr.mergeUrl( "//example.com/directory1/file1", "//example.co.jp/directory2/file2" ),
        "//example.co.jp/directory1/directory2/file2",
        "両方スキーマ無し"
      );
      jsunit.assertEqual(
        $ustr.mergeUrl( "hello world", "http://exsample.com" ),
        null,
        "片方がURLではない"
      );
      jsunit.assertEqual(
        $ustr.mergeUrl( "http://exsample.com", "hello world" ),
        null,
        "片方がURLではない2"
      );
      jsunit.assertEqual(
        $ustr.mergeUrl( "foo bar", "baz qux" ),
        null,
        "両方がURLではない"
      );
      jsunit.assertEqual(
        $ustr.mergeUrl( "", "http://exsample.com" ),
        null,
        "1つめが空欄"
      );
      jsunit.assertEqual(
        $ustr.mergeUrl( null, "http://exsample.com" ),
        null,
        "1つめがnull"
      );
      jsunit.assertEqual(
        $ustr.mergeUrl( undefined, "http://exsample.com" ),
        null,
        "1つめがundefined"
      );
      jsunit.assertEqual(
        $ustr.mergeUrl( "http://exsample.com", "" ),
        null,
        "2つめが空欄"
      );
      jsunit.assertEqual(
        $ustr.mergeUrl( "http://exsample.com", null ),
        null,
        "2つめがnull"
      );
      jsunit.assertEqual(
        $ustr.mergeUrl( "http://exsample.com", undefined ),
        null,
        "2つめがundefined"
      );
    },
    "mergeUrl"
  );
  jsunit.execTest(
    function(){
      jsunit.assertEqual(
        $ustr.parsePath( "/root/directory1/file.txt" ),
        { path:"/root/directory1/file.txt", delimiter:"/", root:"root", directory:"directory1", directories:[ "directory1" ], file:"file.txt", extension:"txt" },
        "通常"
      );
      jsunit.assertEqual(
        $ustr.parsePath( "/root/directory1/directory2/file.txt" ),
        { path:"/root/directory1/directory2/file.txt", delimiter:"/", root:"root", directory:"directory1/directory2", directories:[ "directory1", "directory2" ], file:"file.txt", extension:"txt" },
        "ディレクトリ複数"
      );
      jsunit.assertEqual(
        $ustr.parsePath( "/root/directory1/directory2/" ),
        { path:"/root/directory1/directory2/", delimiter:"/", root:"root", directory:"directory1/directory2", directories:[ "directory1", "directory2" ], file:null, extension:null },
        "ファイル名なし"
      );
      jsunit.assertEqual(
        $ustr.parsePath( "/root/directory1/directory2/file" ),
        { path:"/root/directory1/directory2/file", delimiter:"/", root:"root", directory:"directory1/directory2", directories:[ "directory1", "directory2" ], file:"file", extension:null },
        "拡張子なし"
      );
      jsunit.assertEqual(
        $ustr.parsePath( "/root/file.txt" ),
        { path:"/root/file.txt", delimiter:null, root:"root", directory:null, directories:null, file:"file.txt", extension:"txt" },
        "ディレクトリなし"
      );
      jsunit.assertEqual(
        $ustr.parsePath( "/root/" ),
        { path:"/root/", delimiter:null, root:"root", directory:null, directories:null, file:null, extension:null },
        "ディレクトリ・ファイルなし"
      );
      jsunit.assertEqual(
        $ustr.parsePath( "c:¥" ),
        { path:"c:¥", delimiter:null, root:"c:", directory:null, directories:null, file:null, extension:null },
        "windows"
      );
      jsunit.assertEqual(
        $ustr.parsePath( "c:¥directory1¥file.txt" ),
        { path:"c:¥directory1¥file.txt", delimiter:"¥", root:"c:", directory:"directory1", directories:[ "directory1" ], file:"file.txt", extension:"txt" },
        "windowsディレクトリ"
      );
      jsunit.assertEqual(
        $ustr.parsePath( "c:/directory1/directory2¥directory3¥file.txt" ),
        { path:"c:/directory1/directory2¥directory3¥file.txt", delimiter:"¥", root:"c:", directory:"directory1/directory2¥directory3", directories:[ "directory1", "directory2", "directory3" ], file:"file.txt", extension:"txt" },
        "デリミタ混在"
      );
      jsunit.assertEqual(
        $ustr.parsePath( "./directory1/directory2/" ),
        { path:"./directory1/directory2/", delimiter:"/", root:null, directory:"./directory1/directory2", directories:[ ".", "directory1", "directory2" ], file:null, extension:null },
        "相対パス"
      );
      jsunit.assertEqual(
        $ustr.parsePath( "../.././directory1/directory2/" ),
        { path:"../.././directory1/directory2/", delimiter:"/", root:null, directory:"../.././directory1/directory2", directories:[ "..", "..", ".", "directory1", "directory2" ], file:null, extension:null },
        "相対パス2"
      );
      jsunit.assertEqual(
        $ustr.parsePath( "directory1/directory2/" ),
        { path:"directory1/directory2/", delimiter:"/", root:null, directory:"directory1/directory2", directories:[ "directory1", "directory2" ], file:null, extension:null },
        "相対パス3"
      );
      jsunit.assertEqual(
        $ustr.parsePath( ".¥directory1¥directory2¥" ),
        { path:".¥directory1¥directory2¥", delimiter:"¥", root:null, directory:".¥directory1¥directory2", directories:[ ".", "directory1", "directory2" ], file:null, extension:null },
        "windows相対パス"
      );
      jsunit.assertEqual(
        $ustr.parsePath( "./" ),
        { path:"./", delimiter:"/", root:null, directory:".", directories:[ "." ], file:null, extension:null },
        "./"
      );
      jsunit.assertEqual(
        $ustr.parsePath( "../" ),
        { path:"../", delimiter:"/", root:null, directory:"..", directories:[ ".." ], file:null, extension:null },
        "../"
      );
      jsunit.assertEqual(
        $ustr.parsePath( "../../" ),
        { path:"../../", delimiter:"/", root:null, directory:"../..", directories:[ "..", ".." ], file:null, extension:null },
        "../../"
      );
      jsunit.assertEqual(
        $ustr.parsePath( "(///^_^///)" ),
        null,
        "pathではない"
      );
      jsunit.assertEqual(
        $ustr.parsePath( "" ),
        null,
        "空文字"
      );
      jsunit.assertEqual(
        $ustr.parsePath( null ),
        null,
        "null"
      );
      jsunit.assertEqual(
        $ustr.parsePath(),
        null,
        "undefined"
      );

      // { path:null, delimiter:null, root:null, directory:null, directories:null, file:null }
    },
    "parsePath"
  );
  jsunit.execTest(
    function(){
      jsunit.assertEqual(
        $ustr.mergePath( "./directory1/file1.txt", "./directory2/file2.txt" ),
        "./directory1/directory2/file2.txt",
        "通常"
      );
      jsunit.assertEqual(
        $ustr.mergePath( "./directory1/file1.txt", "../directory2/file2.txt" ),
        "./directory2/file2.txt",
        "back1"
      );
      jsunit.assertEqual(
        $ustr.mergePath( "./directory1/file1.txt", "../../directory2/file2.txt" ),
        "../directory2/file2.txt",
        "back2"
      );
      jsunit.assertEqual(
        $ustr.mergePath( "../directory1/file1.txt", "../../directory2/file2.txt" ),
        "../../directory2/file2.txt",
        "back3"
      );
      jsunit.assertEqual(
        $ustr.mergePath( "../directory1/file1.txt", "../../directory2/./../file2.txt" ),
        "../../file2.txt",
        "back4"
      );
      jsunit.assertEqual(
        $ustr.mergePath( "../directory1/../file1.txt", "../../directory2/./../file2.txt" ),
        "../../../file2.txt",
        "back5"
      );
      jsunit.assertEqual(
        $ustr.mergePath( "./directory1/file1.txt", "./directory2/" ),
        "./directory1/directory2/",
        "ファイルなし"
      );
      jsunit.assertEqual(
        $ustr.mergePath( "./directory1/", "./directory2/file2.txt" ),
        "./directory1/directory2/file2.txt",
        "ファイルなし2"
      );
      jsunit.assertEqual(
        $ustr.mergePath( "./directory1/", "./directory2/" ),
        "./directory1/directory2/",
        "ファイルなし3"
      );
      jsunit.assertEqual(
        $ustr.mergePath( "/root/directory1/", "./directory2/" ),
        "/root/directory1/directory2/",
        "root"
      );
      jsunit.assertEqual(
        $ustr.mergePath( "./directory1/", "/root/directory2/" ),
        "/root/directory2/directory1/",
        "root2"
      );
      jsunit.assertEqual(
        $ustr.mergePath( "/root1/directory1/", "/root2/directory2/" ),
        "/root2/directory2/",
        "root3"
      );
      jsunit.assertEqual(
        $ustr.mergePath( "c:¥directory1¥directory2¥", "..¥directory3¥file.txt" ),
        "c:¥directory1¥directory3¥file.txt",
        "windows path"
      );
      jsunit.assertEqual(
        $ustr.mergePath( "directory1/file1.txt", "directory2/directory3/file2.txt" ),
        "./directory1/directory2/directory3/file2.txt",
        "no current"
      );
      jsunit.assertEqual(
        $ustr.mergePath( "(///^_^///)", "./" ),
        null,
        "URLではない"
      );
      jsunit.assertEqual(
        $ustr.mergePath( "./", "(///^_^///)" ),
        null,
        "URLではない2"
      );
      jsunit.assertEqual(
        $ustr.mergePath( "", "./" ),
        null,
        "空文字"
      );
      jsunit.assertEqual(
        $ustr.mergePath( null, "./" ),
        null,
        "null"
      );
      jsunit.assertEqual(
        $ustr.mergePath( undefined, "./" ),
        null,
        "undefined"
      );
      jsunit.assertEqual(
        $ustr.mergePath( "./", "" ),
        null,
        "空文字2"
      );
      jsunit.assertEqual(
        $ustr.mergePath( "./", null ),
        null,
        "null2"
      );
      jsunit.assertEqual(
        $ustr.mergePath( "./" ),
        null,
        "undefined2"
      );
    },
    "mergePath"
  );
  jsunit.execTest(
    function(){
      jsunit.assertEqual(
        $ustr.diff( "apple", "approach" ),
        [{value:"app", type:"="},{value:"le", type:"-"},{value:"roach", type:"+"}],
        "通常"
      );
      jsunit.assertEqual(
        $ustr.diff( "unable", "able" ),
        [{value:"un", type:"-"},{value:"able", type:"="}],
        "最初はdeletion"
      );
      jsunit.assertEqual(
        $ustr.diff( "able", "unable" ),
        [{value:"un", type:"+"},{value:"able", type:"="}],
        "最初はinsertion"
      );
      jsunit.assertEqual(
        $ustr.diff( "hello", "hello world" ),
        [{value:"hello", type:"="},{value:" world", type:"+"}],
        "最後はinsertion"
      );
      jsunit.assertEqual(
        $ustr.diff( "hello world", "hello" ),
        [{value:"hello", type:"="},{value:" world", type:"-"}],
        "最後はdeletion"
      );
      jsunit.assertEqual(
        $ustr.diff( "hello", "hello" ),
        [{value:"hello", type:"="}],
        "全て同じ"
      );
      jsunit.assertEqual(
        $ustr.diff( "aaaaa", "bbbbbbbb" ),
        [{value:"aaaaa", type:"-"},{value:"bbbbbbbb", type:"+"}],
        "全て異なる"
      );
      jsunit.assertEqual(
        $ustr.diff( "", "hello" ),
        [{value:"hello", type:"+"}],
        "全てinsertion"
      );
      jsunit.assertEqual(
        $ustr.diff( "hello", "" ),
        [{value:"hello", type:"-"}],
        "全てdeletion"
      );
      jsunit.assertEqual(
        $ustr.diff( "", "" ),
        [{value:"", type:"="}],
        "両方空文字"
      );
      jsunit.assertEqual(
        $ustr.diff( "abcdef", "dacfea" ),
        [{value:"d",type:"+"},{value:"a",type:"="},{value:"b",type:"-"},{value:"c",type:"="},{value:"de",type:"-"},{value:"f",type:"="},{value:"ea",type:"+"}],
        "混在"
      );
      jsunit.assertEqual(
        $ustr.diff( "たいこ", "たんすいこ" ),
        [{value:"た", type:"="},{value:"んす", type:"+"},{value:"いこ", type:"="}],
        "マルチバイト文字1"
      );
      jsunit.assertEqual(
        $ustr.diff( "ちからうどん", "からげんき" ),
        [{value:"ち",type:"-"},{value:"から",type:"="},{value:"げ",type:"+"},{value:"うど",type:"-"},{value:"ん",type:"="},{value:"き",type:"+"}],
        "マルチバイト文字2"
      );
      jsunit.assertTime(
        function(){ $ustr.diff( "abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuv", "ABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUV" ) },
        100,
        "異なる100文字"
      );
      jsunit.assertTime(
        function(){ $ustr.diff( "abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuv", "abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuv" ) },
        100,
        "同じ100文字"
      );
      jsunit.assertTime(
        function(){ $ustr.diff( "abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuv", "zyxwvutsrqponmlkihgfedcbazyxwvutsrqponmlkihgfedcbazyxwvutsrqponmlkihgfedcbazyxwvutsrqponmlkihgfedcba" ) },
        100,
        "部分的に同じ100文字"
      );
      jsunit.assertTime(
        function(){ $ustr.diff( "abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuv", "aabcdefghijklmnopqrstuvwxyzaabcdefghijklmnopqrstuvwxyzaabcdefghijklmnopqrstuvwxyzaabcdefghijklmnopqv" ) },
        100,
        "重複が多い100文字"
      );
    },
    "diff"
  );
  jsunit.execTest(
    function(){
      jsunit.assertEqual(
        $ustr.diffLine( "a", "a" ),
        [{value:"a", type:"="}],
        "1行"
      );
      jsunit.assertEqual(
        $ustr.diffLine( "a\nb", "a\nb" ),
        [{value:"a\nb", type:"="}],
        "2行"
      );
      jsunit.assertEqual(
        $ustr.diffLine( "a\n", "a\n" ),
        [{value:"a\n", type:"="}],
        "行末改行"
      );
      jsunit.assertEqual(
        $ustr.diffLine( "\na\n\n", "\na\n\n" ),
        [{value:"\na\n\n", type:"="}],
        "行頭改行・連続改行"
      );
      jsunit.assertEqual(
        $ustr.diffLine( "hello world\ndiff lines\nfoo\nbaz", "hello world\ndiff lines\nbar\nbaz" ),
        [{value:"hello world\ndiff lines\n", type:"="},{value:"foo\n", type:"-"},{value:"bar\n", type:"+"},{value:"baz", type:"="}],
        "行頭改行・連続改行"
      );
    },
    "diffLine"
  );
  jsunit.execTest(
    function(){
      jsunit.assertEqual(
        $ustr.similarity( "aaa", "aaa" ),
        1,
        "完全一致"
      );
      jsunit.assertEqual(
        $ustr.similarity( "aaa", "bbb" ),
        0,
        "完全不一致"
      );
      jsunit.assertEqual(
        $ustr.similarity( "aaaa", "aabb" ),
        0.5,
        "半分一致1"
      );
      jsunit.assertEqual(
        $ustr.similarity( "foo", "foobar" ),
        0.5,
        "半分一致2"
      );
      jsunit.assertEqual(
        $ustr.similarity( "aaaa", "aa" ),
        0.5,
        "半分一致3"
      );
      jsunit.assertEqual(
        $ustr.similarity( "aaaaaaaaaa", "bbaaaaaaaa" ),
        0.8,
        "8割一致"
      );
      jsunit.assertEqual(
        $ustr.similarity( "apple", "approach" ),
        0.375,
        "実際の文字"
      );
      jsunit.assertEqual(
        $ustr.similarity( "", "" ),
        1,
        "空文字同士"
      );
      jsunit.assertEqual(
        $ustr.similarity( "", "aaa" ),
        0,
        "比較元が空文字"
      );
      jsunit.assertEqual(
        $ustr.similarity( "aaa", "" ),
        0,
        "比較先が空文字"
      );
    },
    "similarity"
  );
  jsunit.execTest(
    function(){
      jsunit.assertEqual(
        $ustr.findBlock( 'abc"def"ghi' ),
        [ "def" ],
        "デフォルト1"
      );
      jsunit.assertEqual(
        $ustr.findBlock( 'abc"def"ghi"jkl"mnl' ),
        [ "def", "jkl" ],
        "デフォルト2"
      );
      jsunit.assertEqual(
        $ustr.findBlock( 'abc"def"ghi', '"', false ),
        [ "def" ],
        "囲み文字指定1"
      );
      jsunit.assertEqual(
        $ustr.findBlock( 'abc"def"ghi', '""', false ),
        [ "def" ],
        "囲み文字指定2"
      );
      jsunit.assertEqual(
        $ustr.findBlock( 'abc<def>ghi', '<>', false ),
        [ "def" ],
        "囲み文字指定3"
      );
      jsunit.assertEqual(
        $ustr.findBlock( 'abc?def?ghi', '?', false ),
        [ "def" ],
        "囲み文字指定4"
      );
      jsunit.assertEqual(
        $ustr.findBlock( 'abcHdefOghiGjklEmno', 'HOGE', false ),
        [ "def" ],
        "囲み文字指定5"
      );
      jsunit.assertEqual(
        $ustr.findBlock( '--"abc""def""ghi"--' ),
        [ "abc\"def\"ghi" ],
        "エスケープ1"
      );
      jsunit.assertEqual(
        $ustr.findBlock( "--\\\"abc\\\"def\\\"ghi\\\"--" ),
        [ "abc\\", "ghi\\" ],
        "エスケープ2"
      );
      jsunit.assertEqual(
        $ustr.findBlock( '--<abc<<def>>ghi>--', '<>', false, true, true ),
        [ "abc<def>ghi" ],
        "エスケープ3"
      );
      jsunit.assertEqual(
        $ustr.findBlock( '--<abc<<def>>ghi>--', '<>', false, false, true ),
        [ "abc<<def" ],
        "エスケープ4"
      );
      jsunit.assertEqual(
        $ustr.findBlock( "--<abc\\<def\\>ghi>--", '<>', false, true, true ),
        [ "abc<def>ghi" ],
        "エスケープ5"
      );
      jsunit.assertEqual(
        $ustr.findBlock( "--<abc\\<def\\>ghi>--", '<>', false, true, false ),
        [ "abc\\<def\\" ],
        "エスケープ6"
      );
      jsunit.assertEqual(
        $ustr.findBlock( "--<abc¥<def¥>ghi>--", '<>', false, true, true ),
        [ "abc<def>ghi" ],
        "エスケープ7"
      );
      jsunit.assertEqual(
        $ustr.findBlock( "--<abc¥<def¥>ghi>--", '<>', false, true, false ),
        [ "abc¥<def¥" ],
        "エスケープ8"
      );
      jsunit.assertEqual(
        $ustr.findBlock( '-""""-', '"', false, true, true ),
        [ "\"" ],
        "エスケープ9"
      );
      jsunit.assertEqual(
        $ustr.findBlock( '-<>><<>-', '<>', false, true, true ),
        [ "><" ],
        "エスケープ11"
      );
      jsunit.assertEqual(
        $ustr.findBlock( "-<\\>\\<>-", '<>', false, true, true ),
        [ "><" ],
        "エスケープ12"
      );
      jsunit.assertEqual(
        $ustr.findBlock( 'abcdefghijklmn' ),
        [],
        "囲み文字無し"
      );
      jsunit.assertEqual(
        $ustr.findBlock( 'abc"def' ),
        [],
        "囲み文字が開始だけ1"
      );
      jsunit.assertEqual(
        $ustr.findBlock( 'abc<def', "<>" ),
        [],
        "囲み文字が開始だけ2"
      );
      jsunit.assertEqual(
        $ustr.findBlock( 'abc>def', "<>" ),
        [],
        "囲み文字が終了だけ"
      );
      jsunit.assertEqual(
        $ustr.findBlock( 'abc<>def', "<>" ),
        [ "" ],
        "囲み文字内部が空文字"
      );
      jsunit.assertEqual(
        $ustr.findBlock( '<a<b<c<d>c>b>a>', "<>", true ),
        [ "a<b<c<d>c>b>a" ],
        "囲み文字のネスト"
      );
      jsunit.assertEqual(
        $ustr.findBlock( '<a<b<c<d>c>b>a>', "<>", false ),
        [ "a<b<c<d" ],
        "囲み文字のネスト2"
      );
    },
    "findBlock"
  );
  jsunit.execTest(
    function(){
      jsunit.assertEqual(
        $ustr.parseCsv( "col1,col2,col3\n1,2,3" ),
        [ [ "col1", "col2", "col3" ], [ "1", "2", "3" ] ],
        "通常"
      );
      jsunit.assertEqual(
        $ustr.parseCsv( "col1\tcol2\tcol3\n1\t2,3", "\t" ),
        [ [ "col1", "col2", "col3" ], [ "1", "2,3" ] ],
        "区切り文字の変更"
      );
      jsunit.assertEqual(
        $ustr.parseCsv( "1,,3" ),
        [ [ "1", "", "3" ] ],
        "区切り文字間に値が無い時"
      );
      jsunit.assertEqual(
        $ustr.parseCsv( "1,,3\n4,5,6,7" ),
        [ [ "1", "", "3" ], [ "4", "5", "6", "7" ] ],
        "正規化なし（デフォルト値）"
      );
      jsunit.assertEqual(
        $ustr.parseCsv( "1,,3\n4,5,6,7", ",", false ),
        [ [ "1", "", "3" ], [ "4", "5", "6", "7" ] ],
        "正規化なし"
      );
      jsunit.assertEqual(
        $ustr.parseCsv( "1,,3\n4,5,6,7", ",", true ),
        [ [ "1", "", "3", null ], [ "4", "5", "6", "7" ] ],
        "正規化"
      );
      jsunit.assertEqual(
        $ustr.parseCsv( '1,"2",3' ),
        [ [ "1", "2", "3" ] ],
        "囲い文字1"
      );
      jsunit.assertEqual(
        $ustr.parseCsv( '1,"2,3"' ),
        [ [ "1", "2,3" ] ],
        "囲い文字2"
      );
      jsunit.assertEqual(
        $ustr.parseCsv( '1,"2,3\n4,5",6' ),
        [ [ "1", "2,3\n4,5", "6" ] ],
        "囲い文字3"
      );
      jsunit.assertEqual(
        $ustr.parseCsv( '1,"2,3' ),
        [ [ "1", "2,3" ] ],
        "閉じない囲い文字1"
      );
      jsunit.assertEqual(
        $ustr.parseCsv( '1,"2,3\n4,5' ),
        [ [ "1", "2,3\n4,5" ] ],
        "閉じない囲い文字2"
      );
      jsunit.assertEqual(
        $ustr.parseCsv( ' 1 ,  "2"  ,  3   ' ),
        [ [ "1", "2", "3" ] ],
        "区切り文字の前後に空白・タブ"
      );
      jsunit.assertEqual(
        $ustr.parseCsv( '1,"\"\"",3' ),
        [ [ "1", '"', "3" ] ],
        "エスケープ"
      );
    },
    "parseCsv"
  );
  jsunit.execTest(
    function(){
      jsunit.assertEqual(
        $ustr.escapeHtml( "abcdefg" ),
        "abcdefg",
        "通常"
      );
      jsunit.assertEqual(
        $ustr.escapeHtml( "--&<>\"'&--" ),
        "--&amp;&lt;&gt;&quot;&#039;&amp;--",
        "エスケープ"
      );
    },
    "escapeHtml"
  );
  jsunit.execTest(
    function(){
      jsunit.assertEqual(
        $ustr.unescapeHtml( "abcdefg" ),
        "abcdefg",
        "通常"
      );
      jsunit.assertEqual(
        $ustr.unescapeHtml( "--&amp;&lt;&gt;&quot;&#039;&amp;--" ),
        "--&<>\"'&--",
        "アンエスケープ"
      );
    },
    "unescapeHtml"
  );
  jsunit.execTest(
    function(){
      jsunit.assertEqual(
        $ustr.plural( "man" ),
        "men",
        "イレギュラー1"
      );
      jsunit.assertEqual(
        $ustr.plural( "phenomenon" ),
        "phenomena",
        "イレギュラー2"
      );
      jsunit.assertEqual(
        $ustr.plural( "safe" ),
        "safes",
        "イレギュラー3"
      );
      jsunit.assertEqual(
        $ustr.plural( "radio" ),
        "radios",
        "os1"
      );
      jsunit.assertEqual(
        $ustr.plural( "folio" ),
        "folios",
        "os2"
      );
      jsunit.assertEqual(
        $ustr.plural( "studio" ),
        "studios",
        "os3"
      );
      jsunit.assertEqual(
        $ustr.plural( "echo" ),
        "echoes",
        "es1"
      );
      jsunit.assertEqual(
        $ustr.plural( "hero" ),
        "heroes",
        "es2"
      );
      jsunit.assertEqual(
        $ustr.plural( "potato" ),
        "potatoes",
        "es3"
      );
      jsunit.assertEqual(
        $ustr.plural( "library" ),
        "libraries",
        "ies1"
      );
      jsunit.assertEqual(
        $ustr.plural( "baby" ),
        "babies",
        "ies2"
      );
      jsunit.assertEqual(
        $ustr.plural( "knife" ),
        "knives",
        "ves1"
      );
      jsunit.assertEqual(
        $ustr.plural( "leaf" ),
        "leaves",
        "ves2"
      );
      jsunit.assertEqual(
        $ustr.plural( "book" ),
        "books",
        "other1"
      );
      jsunit.assertEqual(
        $ustr.plural( "" ),
        "s",
        "空欄"
      );
    },
    "plural"
  );
  jsunit.execTest(
    function(){
      jsunit.assertEqual(
        $ustr.singular( "men" ),
        "man",
        "イレギュラー1"
      );
      jsunit.assertEqual(
        $ustr.singular( "phenomena" ),
        "phenomenon",
        "イレギュラー2"
      );
      jsunit.assertEqual(
        $ustr.singular( "safes" ),
        "safe",
        "イレギュラー3"
      );
      jsunit.assertEqual(
        $ustr.singular( "radios" ),
        "radio",
        "os1"
      );
      jsunit.assertEqual(
        $ustr.singular( "folios" ),
        "folio",
        "os2"
      );
      jsunit.assertEqual(
        $ustr.singular( "studios" ),
        "studio",
        "os3"
      );
      jsunit.assertEqual(
        $ustr.singular( "echoes" ),
        "echo",
        "es1"
      );
      jsunit.assertEqual(
        $ustr.singular( "heroes" ),
        "hero",
        "es2"
      );
      jsunit.assertEqual(
        $ustr.singular( "potatoes" ),
        "potato",
        "es3"
      );
      jsunit.assertEqual(
        $ustr.singular( "libraries" ),
        "library",
        "ies1"
      );
      jsunit.assertEqual(
        $ustr.singular( "babies" ),
        "baby",
        "ies2"
      );
      jsunit.assertEqual(
        $ustr.singular( "knives" ),
        "knife",
        "ves1"
      );
      jsunit.assertEqual(
        $ustr.singular( "leaves" ),
        "leaf",
        "ves2"
      );
      jsunit.assertEqual(
        $ustr.singular( "books" ),
        "book",
        "other1"
      );
      jsunit.assertEqual(
        $ustr.singular( "" ),
        "",
        "空欄"
      );
    },
    "singular"
  );
  jsunit.execTest(
    function(){
      jsunit.assertEqual(
        $ustr.kana( "ぁあぃいぅうぇえぉおかがきぎくぐけげこごさざしじすずせぜそぞただちぢっつづてでとどなにぬねのはばぱひびぴふぶぷへべぺほぼぽまみむめもゃやゅゆょよらりるれろゎわゐゑをんゔゕゖ" ),
        "ァアィイゥウェエォオカガキギクグケゲコゴサザシジスズセゼソゾタダチヂッツヅテデトドナニヌネノハバパヒビピフブプヘベペホボポマミムメモャヤュユョヨラリルレロヮワヰヱヲンヴヵヶ",
        "通常"
      );
      jsunit.assertEqual(
        $ustr.kana( "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンガギグゲゴザジズゼゾダヂヅデドバビブベボパピプペポァィゥェォッャュョヰヱヴヵヶ" ),
        "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンガギグゲゴザジズゼゾダヂヅデドバビブベボパピプペポァィゥェォッャュョヰヱヴヵヶ",
        "変換不要"
      );
    },
    "kana"
  );
  jsunit.execTest(
    function(){
      jsunit.assertEqual(
        $ustr.hiragana( "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンガギグゲゴザジズゼゾダヂヅデドバビブベボパピプペポァィゥェォッャュョヰヱヴヵヶ" ),
        "あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをんがぎぐげござじずぜぞだぢづでどばびぶべぼぱぴぷぺぽぁぃぅぇぉっゃゅょゐゑゔゕゖ",
        "通常"
      );
      jsunit.assertEqual(
        $ustr.hiragana( "あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをんがぎぐげござじずぜぞだぢづでどばびぶべぼぱぴぷぺぽぁぃぅぇぉっゃゅょゐゑゔゕゖ" ),
        "あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをんがぎぐげござじずぜぞだぢづでどばびぶべぼぱぴぷぺぽぁぃぅぇぉっゃゅょゐゑゔゕゖ",
        "変換不要"
      );
    },
    "hiragana"
  );
  jsunit.execTest(
    function(){
      jsunit.assertEqual(
        $ustr.en( "ァアィイゥウェエォオカガキギクグケゲコゴサザシジスズセゼソゾタダチヂッツヅテデトドナニヌネノハバパヒビピフブプヘベペホボポマミムメモャヤュユョヨラリルレロヮワヰヱヲンヴヵヶ" ),
        "ｧｱｨｲｩｳｪｴｫｵｶｶﾞｷｷﾞｸｸﾞｹｹﾞｺｺﾞｻｻﾞｼｼﾞｽｽﾞｾｾﾞｿｿﾞﾀﾀﾞﾁﾁﾞｯﾂﾂﾞﾃﾃﾞﾄﾄﾞﾅﾆﾇﾈﾉﾊﾊﾞﾊﾟﾋﾋﾞﾋﾟﾌﾌﾞﾌﾟﾍﾍﾞﾍﾟﾎﾎﾞﾎﾟﾏﾐﾑﾒﾓｬﾔｭﾕｮﾖﾗﾘﾙﾚﾛヮﾜヰヱｦﾝｳﾞヵヶ",
        "カタカナ"
      );
      jsunit.assertEqual(
        $ustr.en( "　！＃＄％＆（）＊＋／０１２３４５６７８９：；＜＝＞？＠＾＿｀｜￥’”、。「」『』〜ー" ),
        " !#$%&()*+/0123456789:;<=>?@^_`|¥'\",.[]{}~-",
        "数値、記号"
      );
      jsunit.assertEqual(
        $ustr.en( "ａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ" ),
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
        "英字"
      );
    },
    "en"
  );
  jsunit.execTest(
    function(){
      jsunit.assertEqual(
        $ustr.em( "ｦｧｨｩｪｫｬｭｮｯｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝｶﾞｷﾞｸﾞｹﾞｺﾞｻﾞｼﾞｽﾞｾﾞｿﾞﾀﾞﾁﾞﾂﾞﾃﾞﾄﾞﾊﾞﾋﾞﾌﾞﾍﾞﾎﾞﾊﾟﾋﾟﾌﾟﾍﾟﾎﾟ" ),
        "ヲァィゥェォャュョッアイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワンガギグゲゴザジズゼゾダヂヅデドバビブベボパピプペポ",
        "カタカナ"
      );
      jsunit.assertEqual(
        $ustr.em( " !#$%&()*+/0123456789:;<=>?@^_`|¥'\",.[]{}~-" ),
        "　！＃＄％＆（）＊＋／０１２３４５６７８９：；＜＝＞？＠＾＿｀｜￥’”、。「」『』〜ー",
        "数値、記号"
      );
      jsunit.assertEqual(
        $ustr.em( "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ" ),
        "ａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ",
        "英字"
      );
    },
    "em"
  );
  jsunit.execTest(
    function(){
      jsunit.assertEqual(
        $ustr.caesarCipher( "ァアィイゥウェエォオカガキギクグケゲコゴサザシジスズセゼソゾタダチヂッツヅテデトドナニヌネノハバパヒビピフブプヘベペホボポマミムメモャヤュユョヨラリルレロヮワヰヱヲンヴヵヶ", 1 ),
        "アィイゥウェエォオカガキギクグケゲコゴサザシジスズセゼソゾタダチヂッツヅテデトドナニヌネノハバパヒビピフブプヘベペホボポマミムメモャヤュユョヨラリルレロヮワヰヱヲンヴヵヶァ",
        "カタカナ+1"
      );
      jsunit.assertEqual(
        $ustr.caesarCipher( "ァアィイゥウェエォオカガキギクグケゲコゴサザシジスズセゼソゾタダチヂッツヅテデトドナニヌネノハバパヒビピフブプヘベペホボポマミムメモャヤュユョヨラリルレロヮワヰヱヲンヴヵヶ", -1 ),
        "ヶァアィイゥウェエォオカガキギクグケゲコゴサザシジスズセゼソゾタダチヂッツヅテデトドナニヌネノハバパヒビピフブプヘベペホボポマミムメモャヤュユョヨラリルレロヮワヰヱヲンヴヵ",
        "カタカナ-1"
      );
      jsunit.assertEqual(
        $ustr.caesarCipher( "ァアィイゥウェエォオカガキギクグケゲコゴサザシジスズセゼソゾタダチヂッツヅテデトドナニヌネノハバパヒビピフブプヘベペホボポマミムメモャヤュユョヨラリルレロヮワヰヱヲンヴヵヶ", 86 ),
        "ァアィイゥウェエォオカガキギクグケゲコゴサザシジスズセゼソゾタダチヂッツヅテデトドナニヌネノハバパヒビピフブプヘベペホボポマミムメモャヤュユョヨラリルレロヮワヰヱヲンヴヵヶ",
        "カタカナ+一周"
      );
      jsunit.assertEqual(
        $ustr.caesarCipher( "ァアィイゥウェエォオカガキギクグケゲコゴサザシジスズセゼソゾタダチヂッツヅテデトドナニヌネノハバパヒビピフブプヘベペホボポマミムメモャヤュユョヨラリルレロヮワヰヱヲンヴヵヶ", 87 ),
        "アィイゥウェエォオカガキギクグケゲコゴサザシジスズセゼソゾタダチヂッツヅテデトドナニヌネノハバパヒビピフブプヘベペホボポマミムメモャヤュユョヨラリルレロヮワヰヱヲンヴヵヶァ",
        "カタカナ+一周+1"
      );
      jsunit.assertEqual(
        $ustr.caesarCipher( "ァアィイゥウェエォオカガキギクグケゲコゴサザシジスズセゼソゾタダチヂッツヅテデトドナニヌネノハバパヒビピフブプヘベペホボポマミムメモャヤュユョヨラリルレロヮワヰヱヲンヴヵヶ", -86 ),
        "ァアィイゥウェエォオカガキギクグケゲコゴサザシジスズセゼソゾタダチヂッツヅテデトドナニヌネノハバパヒビピフブプヘベペホボポマミムメモャヤュユョヨラリルレロヮワヰヱヲンヴヵヶ",
        "カタカナ-一周"
      );
      jsunit.assertEqual(
        $ustr.caesarCipher( "ァアィイゥウェエォオカガキギクグケゲコゴサザシジスズセゼソゾタダチヂッツヅテデトドナニヌネノハバパヒビピフブプヘベペホボポマミムメモャヤュユョヨラリルレロヮワヰヱヲンヴヵヶ", -87 ),
        "ヶァアィイゥウェエォオカガキギクグケゲコゴサザシジスズセゼソゾタダチヂッツヅテデトドナニヌネノハバパヒビピフブプヘベペホボポマミムメモャヤュユョヨラリルレロヮワヰヱヲンヴヵ",
        "カタカナ-一周+1"
      );
      jsunit.assertEqual(
        $ustr.caesarCipher( "ぁあぃいぅうぇえぉおかがきぎくぐけげこごさざしじすずせぜそぞただちぢっつづてでとどなにぬねのはばぱひびぴふぶぷへべぺほぼぽまみむめもゃやゅゆょよらりるれろゎわゐゑをんゔゕゖ", 1 ),
        "あぃいぅうぇえぉおかがきぎくぐけげこごさざしじすずせぜそぞただちぢっつづてでとどなにぬねのはばぱひびぴふぶぷへべぺほぼぽまみむめもゃやゅゆょよらりるれろゎわゐゑをんゔゕゖぁ",
        "平仮名+1"
      );
      jsunit.assertEqual(
        $ustr.caesarCipher( "ａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ", 1 ),
        "ｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚａ",
        "全角英字小文字+1"
      );
      jsunit.assertEqual(
        $ustr.caesarCipher( "ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ", 1 ),
        "ＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺＡ",
        "全角英字大文字+1"
      );
      jsunit.assertEqual(
        $ustr.caesarCipher( "ｦｧｨｩｪｫｬｭｮｯｰｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ", 1 ),
        "ｧｨｩｪｫｬｭｮｯｰｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝｦ",
        "半角かな+1"
      );
      jsunit.assertEqual(
        $ustr.caesarCipher( " !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~", 1 ),
        "!\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~ ",
        "半角アルファベット+1"
      );
      jsunit.assertEqual(
        $ustr.caesarCipher( "０１２３４５６７８９", 1 ),
        "１２３４５６７８９０",
        "全角数値+1"
      );
      jsunit.assertEqual(
        $ustr.caesarCipher( "1＋１＊a＠AａＡあｱア", 1 ),
        "2＋２＊b＠BｂＢぃｲィ",
        "混在"
      );
    },
    "caesarCipher"
  );
  jsunit.execTest(
    function(){
      jsunit.assertEqual(
        $ustr.leet( "abcdefghijklmnopqrstuvwxyz" ),
        "46cd3fgh1jklmn0p9r57uvwxy2",
        "通常"
      );
    },
    "leet"
  );
  jsunit.execTest(
    function(){
      var now = new Date();
      jsunit.assertEqual(
        $ustr.formats( "%d", 123 ),
        "123",
        "通常"
      );
      jsunit.assertEqual(
        $ustr.formats( "%5d", 123 ),
        "  123",
        "フィールド幅"
      );
      jsunit.assertEqual(
        $ustr.formats( "%0d", 123 ),
        "123",
        "0ディレクティブ"
      );
      jsunit.assertEqual(
        $ustr.formats( "%05d", 123 ),
        "00123",
        "0ディレクティブとフィールド幅"
      );
      jsunit.assertEqual(
        $ustr.formats( "%-d", 123 ),
        "123",
        "-ディレクティブ"
      );
      jsunit.assertEqual(
        $ustr.formats( "%-5d", 123 ),
        "123  ",
        "-ディレクティブとフィールド幅"
      );
      jsunit.assertEqual(
        $ustr.formats( "%+d", 123 ),
        "+123",
        "+ディレクティブ"
      );
      jsunit.assertEqual(
        $ustr.formats( "%+5d", 123 ),
        " +123",
        "+ディレクティブとフィールド幅"
      );
      jsunit.assertEqual(
        $ustr.formats( "% d", 123 ),
        "123",
        "' 'ディレクティブ"
      );
      jsunit.assertEqual(
        $ustr.formats( "% 5d", 123 ),
        "  123",
        "' 'ディレクティブとフィールド幅"
      );
      jsunit.assertEqual(
        $ustr.formats( "%+ 5d", 123 ),
        "+ 123",
        "' 'と+ディレクティブとフィールド幅"
      );
      jsunit.assertEqual(
        $ustr.formats( "%o", 123 ),
        "173",
        "8進数"
      );
      jsunit.assertEqual(
        $ustr.formats( "%x", 123 ),
        "7b",
        "16進数"
      );
      jsunit.assertEqual(
        $ustr.formats( "%X", 123 ),
        "7B",
        "16進数(大)"
      );
      jsunit.assertEqual(
        $ustr.formats( "%#d", 123 ),
        "123",
        "#ディレクティブと10進数"
      );
      jsunit.assertEqual(
        $ustr.formats( "%#o", 123 ),
        "0173",
        "#ディレクティブと8進数"
      );
      jsunit.assertEqual(
        $ustr.formats( "%#x", 123 ),
        "0x7b",
        "#ディレクティブと16進数"
      );
      jsunit.assertEqual(
        $ustr.formats( "%#X", 123 ),
        "0x7B",
        "#ディレクティブと16進数(大)"
      );
      jsunit.assertEqual(
        $ustr.formats( "%%d%d-%d", 123 ),
        "%d123-123",
        "%%とパラメータ不足"
      );
      jsunit.assertEqual(
        $ustr.formats( "%.1d", 123.456 ),
        "123.4",
        "小数部のフィールド幅が小さい"
      );
      jsunit.assertEqual(
        $ustr.formats( "%.5d", 123.456 ),
        "123.45600",
        "小数部のフィールド幅が大きい"
      );
      jsunit.assertEqual(
        $ustr.formats( "%0.d", 123.456 ),
        "123.456",
        "0パディングでフィールド幅指定なし"
      );
      jsunit.assertEqual(
        $ustr.formats( "%09.d", 123.456 ),
        "00123.456",
        "0パディングでフィールド幅大"
      );
      jsunit.assertEqual(
        $ustr.formats( "% 9.d", 123.456 ),
        "  123.456",
        "空白パディングでフィールド幅大"
      );
      jsunit.assertEqual(
        $ustr.formats( "% 9.d", -123.456 ),
        "- 123.456",
        "空白パディングでフィールド幅大、符号あり"
      );
      jsunit.assertEqual(
        $ustr.formats( "% 09.d", -123.456 ),
        "-0123.456",
        "0パディングでフィールド幅大、符号あり"
      );
      jsunit.assertEqual(
        $ustr.formats( "%#+.X", 255.0 ),
        "+0xFF",
        "16進数符号・小数あり"
      );
      jsunit.assertEqual(
        $ustr.formats( "%#+.X", 255.1 ),
        "+0xFF.199999999998",
        "16進数符号・小数フィールド大きい"
      );
      jsunit.assertEqual(
        $ustr.formats( "%#+.2X", 255.1 ),
        "+0xFF.19",
        "16進数符号・小数フィールド指定"
      );
      jsunit.assertEqual(
        $ustr.formats( "%#+ 9.X", -1.0 ),
        "-0x     1",
        "16進数符号・小数あり、フィールド幅大、符号間にスペース"
      );
      jsunit.assertEqual(
        $ustr.formats( "%#+9.X", -1.0 ),
        "     -0x1",
        "16進数符号・小数あり、フィールド幅大"
      );
      jsunit.assertEqual(
        $ustr.formats( "%#+-9.X", -1.0 ),
        "-0x1     ",
        "16進数符号・小数あり、フィールド幅大、左寄せ"
      );
      jsunit.assertEqual(
        $ustr.formats( "% 12.d", -NaN ),
        "         NaN",
        "-NaNで符号フィールド大"
      );
      jsunit.assertEqual(
        $ustr.formats( "% 12.d", -Infinity ),
        "-   Infinity",
        "-Infinityで符号フィールド大"
      );
      jsunit.assertEqual(
        $ustr.formats( "%12.2d", -Infinity ),
        "   -Infinity",
        "-Infinityで符号と小数フィールド大"
      );
      jsunit.assertEqual(
        $ustr.formats( "% 12.2d", -Infinity ),
        "-   Infinity",
        "-Infinityで符号と小数フィールド大"
      );
      jsunit.assertEqual(
        $ustr.formats( "%s%s%s", [ "a", "b", "c" ] ),
        "abc",
        "パラメータが配列"
      );
      jsunit.assertEqual(
        $ustr.formats( [ "%s%s%s", "a", "b", "c" ] ),
        "abc",
        "引数が配列"
      );
      // %d
      jsunit.assertEqual(
        $ustr.formats( "%d", 123 ),
        "123",
        "%dに整数"
      );
      jsunit.assertEqual(
        $ustr.formats( "%d", 123.456 ),
        "123",
        "%dに小数"
      );
      jsunit.assertEqual(
        $ustr.formats( "%d", "" ),
        "NaN",
        "%dに空文字"
      );
      jsunit.assertEqual(
        $ustr.formats( "%d", null ),
        "NaN",
        "%dにnull"
      );
      jsunit.assertEqual(
        $ustr.formats( "%d", NaN ),
        "NaN",
        "%dにNaN"
      );
      jsunit.assertEqual(
        $ustr.formats( "%d", Infinity ),
        "Infinity",
        "%dにInfinity"
      );
      jsunit.assertEqual(
        $ustr.formats( "%d", -Infinity ),
        "-Infinity",
        "%dに-Infinity"
      );      
      jsunit.assertEqual(
        $ustr.formats( "%d", "123.456" ),
        "123",
        "%dに文字列"
      );
      jsunit.assertEqual(
        $ustr.formats( "%d", now ),
        now.getDate().toString(),
        "%dに日付"
      );
      jsunit.assertEqual(
        $ustr.formats( "%.d", 123.456 ),
        "123.456",
        "%.dに小数"
      );
      // %o
      jsunit.assertEqual(
        $ustr.formats( "%o", 64 ),
        "100",
        "%oに整数"
      );
      jsunit.assertEqual(
        $ustr.formats( "%o", 65.123 ),
        "101",
        "%oに小数"
      );
      jsunit.assertEqual(
        $ustr.formats( "%.o", 65.123 ),
        "101.0767635544264164",
        "%.oに小数"
      );
      jsunit.assertEqual(
        $ustr.formats( "%o", "" ),
        "NaN",
        "%oに空文字"
      );
      jsunit.assertEqual(
        $ustr.formats( "%o", null ),
        "NaN",
        "%oにnull"
      );
      jsunit.assertEqual(
        $ustr.formats( "%o", NaN ),
        "NaN",
        "%oにNaN"
      );
      jsunit.assertEqual(
        $ustr.formats( "%o", Infinity ),
        "Infinity",
        "%oにInfinity"
      );
      jsunit.assertEqual(
        $ustr.formats( "%o", -Infinity ),
        "-Infinity",
        "%oに-Infinity"
      );      
      jsunit.assertEqual(
        $ustr.formats( "%o", "66.123" ),
        "102",
        "%oに文字列"
      );
      jsunit.assertEqual(
        $ustr.formats( "%o", now ),
        now.getTime().toString( 8 ),
        "%oに日付"
      );
      // %x
      jsunit.assertEqual(
        $ustr.formats( "%x", 65535 ),
        "ffff",
        "%xに整数"
      );
      jsunit.assertEqual(
        $ustr.formats( "%x", 65535.123 ),
        "ffff",
        "%xに小数"
      );
      jsunit.assertEqual(
        $ustr.formats( "%.x", 65535.123 ),
        "ffff.1f7ced9168",
        "%.xに小数"
      );
      jsunit.assertEqual(
        $ustr.formats( "%x", "" ),
        "NaN",
        "%xに空文字"
      );
      jsunit.assertEqual(
        $ustr.formats( "%x", null ),
        "NaN",
        "%xにnull"
      );
      jsunit.assertEqual(
        $ustr.formats( "%x", NaN ),
        "NaN",
        "%xにNaN"
      );
      jsunit.assertEqual(
        $ustr.formats( "%x", Infinity ),
        "Infinity",
        "%xにInfinity"
      );
      jsunit.assertEqual(
        $ustr.formats( "%x", -Infinity ),
        "-Infinity",
        "%xに-Infinity"
      );      
      jsunit.assertEqual(
        $ustr.formats( "%x", "65535.123" ),
        "ffff",
        "%xに文字列"
      );
      jsunit.assertEqual(
        $ustr.formats( "%x", now ),
        now.getTime().toString( 16 ),
        "%xに日付"
      );
      // %X
      jsunit.assertEqual(
        $ustr.formats( "%X", 65535 ),
        "FFFF",
        "%Xに整数"
      );
      jsunit.assertEqual(
        $ustr.formats( "%X", 65535.123 ),
        "FFFF",
        "%Xに小数"
      );
      jsunit.assertEqual(
        $ustr.formats( "%.X", 65535.123 ),
        "FFFF.1F7CED9168",
        "%.Xに小数"
      );
      jsunit.assertEqual(
        $ustr.formats( "%X", "" ),
        "NaN",
        "%Xに空文字"
      );
      jsunit.assertEqual(
        $ustr.formats( "%X", null ),
        "NaN",
        "%Xにnull"
      );
      jsunit.assertEqual(
        $ustr.formats( "%X", NaN ),
        "NaN",
        "%XにNaN"
      );
      jsunit.assertEqual(
        $ustr.formats( "%X", Infinity ),
        "Infinity",
        "%XにInfinity"
      );
      jsunit.assertEqual(
        $ustr.formats( "%X", -Infinity ),
        "-Infinity",
        "%Xに-Infinity"
      );      
      jsunit.assertEqual(
        $ustr.formats( "%X", "65535.123" ),
        "FFFF",
        "%Xに文字列"
      );
      jsunit.assertEqual(
        $ustr.formats( "%X", now ),
        now.getTime().toString( 16 ).toUpperCase(),
        "%Xに日付"
      );
      // %f
      jsunit.assertEqual(
        $ustr.formats( "%f", 123.456 ),
        "123.456",
        "%fに小数"
      );
      jsunit.assertEqual(
        $ustr.formats( "%f", 123 ),
        "123.0",
        "%fに整数"
      );
      jsunit.assertEqual(
        $ustr.formats( "%f", "123.456" ),
        "123.456",
        "%.fに文字列"
      );
      jsunit.assertEqual(
        $ustr.formats( "%f", "" ),
        "NaN",
        "%.fに空文字"
      );
      jsunit.assertEqual(
        $ustr.formats( "%f", null ),
        "NaN",
        "%.fにnull"
      );
      jsunit.assertEqual(
        $ustr.formats( "%f", NaN ),
        "NaN",
        "%.fにNaN"
      );
      jsunit.assertEqual(
        $ustr.formats( "%f", Infinity ),
        "Infinity",
        "%.fにInfinity"
      );
      jsunit.assertEqual(
        $ustr.formats( "%f", -Infinity ),
        "-Infinity",
        "%.fに-Infinity"
      );
      jsunit.assertEqual(
        $ustr.formats( "%f", now ),
        now.getTime().toString() + ".0",
        "%fに日付"
      );
      // %g
      jsunit.assertEqual(
        $ustr.formats( "%g", 123 ),
        "1e+2",
        "%gに整数"
      );
      jsunit.assertEqual(
        $ustr.formats( "%g", 123.456 ),
        "1e+2",
        "%gに小数"
      );
      jsunit.assertEqual(
        $ustr.formats( "%.g", 123.456 ),
        "1.23456e+2",
        "%.gに小数"
      );
      jsunit.assertEqual(
        $ustr.formats( "%.3g", 123.456 ),
        "1.235e+2",
        "%.gに小数2"
      );
      jsunit.assertEqual(
        $ustr.formats( "%g", "" ),
        "NaN",
        "%gに空文字"
      );
      jsunit.assertEqual(
        $ustr.formats( "%g", null ),
        "NaN",
        "%gにnull"
      );
      jsunit.assertEqual(
        $ustr.formats( "%g", NaN ),
        "NaN",
        "%gにNaN"
      );
      jsunit.assertEqual(
        $ustr.formats( "%g", Infinity ),
        "Infinity",
        "%gにInfinity"
      );
      jsunit.assertEqual(
        $ustr.formats( "%g", -Infinity ),
        "-Infinity",
        "%gに-Infinity"
      );
      jsunit.assertEqual(
        $ustr.formats( "%g", "123.456" ),
        "1e+2",
        "%gに文字列"
      );
      jsunit.assertEqual(
        $ustr.formats( "%g", now ),
        now.getTime().toExponential( 0 ),
        "%gに日付"
      );
      // %s
      jsunit.assertEqual(
        $ustr.formats( "%s", 123 ),
        "123",
        "%sに数値"
      );
      jsunit.assertEqual(
        $ustr.formats( "%s", "123" ),
        "123",
        "%sに文字列"
      );
      jsunit.assertEqual(
        $ustr.formats( "%s", now ),
        now.toISOString(),
        "%sに日付時刻"
      );
      jsunit.assertEqual(
        $ustr.formats( "%s", "" ),
        "",
        "%sに空文字"
      );
      jsunit.assertEqual(
        $ustr.formats( "%s", null ),
        "NULL",
        "%sにnull"
      );
      jsunit.assertEqual(
        $ustr.formats( "%s", NaN ),
        "NaN",
        "%sにNaN"
      );
      jsunit.assertEqual(
        $ustr.formats( "%s", Infinity ),
        "Infinity",
        "%sにInfinity"
      );
      jsunit.assertEqual(
        $ustr.formats( "%s", -Infinity ),
        "-Infinity",
        "%sに-Infinity"
      );
      jsunit.assertEqual(
        $ustr.formats( "%s", undefined ),
        "undefined",
        "%sにundefined"
      );
      jsunit.assertEqual(
        $ustr.formats( "%#s", 123 ),
        "123",
        "%sに符号付き"
      );
      // %Y
      jsunit.assertEqual(
        $ustr.formats( "%Y", now ),
        now.getFullYear().toString(),
        "%Yに日付時刻"
      );
      jsunit.assertEqual(
        $ustr.formats( "%Y", 2017 ),
        "2017",
        "%Yに数値"
      );
      jsunit.assertEqual(
        $ustr.formats( "%Y", 0 ),
        "1900",
        "%Yに数値2"
      );
      jsunit.assertEqual(
        $ustr.formats( "%Y", 99 ),
        "1999",
        "%Yに数値3"
      );
      jsunit.assertEqual(
        $ustr.formats( "%Y", 12345 ),
        "1970",
        "%Yに数値4"
      );
      jsunit.assertEqual(
        $ustr.formats( "%Y", -1 ),
        "NaN",
        "%Yに数値5"
      );
      jsunit.assertEqual(
        $ustr.formats( "%Y", "2017/10/28" ),
        "2017",
        "%Yに文字列"
      );
      jsunit.assertEqual(
        $ustr.formats( "%Y", "" ),
        "NaN",
        "%Yに空文字"
      );
      jsunit.assertEqual(
        $ustr.formats( "%Y", null ),
        "NaN",
        "%Yにnull"
      );
      jsunit.assertEqual(
        $ustr.formats( "%Y", NaN ),
        "NaN",
        "%YにNaN"
      );
      jsunit.assertEqual(
        $ustr.formats( "%Y", Infinity ),
        "NaN",
        "%YにInfinity"
      );
      jsunit.assertEqual(
        $ustr.formats( "%Y", -Infinity ),
        "NaN",
        "%Yに-Infinity"
      );
      jsunit.assertEqual(
        $ustr.formats( "%Y", undefined ),
        "NaN",
        "%Yにundefined"
      );
      jsunit.assertEqual(
        $ustr.formats( "%#Y", 2017 ),
        "2017",
        "%Yに符号付き"
      );
      // %y
      jsunit.assertEqual(
        $ustr.formats( "%y", now ),
        now.getFullYear().toString().slice( 2 ),
        "%yに日付時刻"
      );
      jsunit.assertEqual(
        $ustr.formats( "%y", 2017 ),
        "17",
        "%yに数値"
      );
      jsunit.assertEqual(
        $ustr.formats( "%y", 0 ),
        "00",
        "%yに数値2"
      );
      jsunit.assertEqual(
        $ustr.formats( "%y", 99 ),
        "99",
        "%yに数値3"
      );
      jsunit.assertEqual(
        $ustr.formats( "%y", 12345 ),
        "70",
        "%yに数値4"
      );
      jsunit.assertEqual(
        $ustr.formats( "%y", -1 ),
        "NaN",
        "%yに数値5"
      );
      jsunit.assertEqual(
        $ustr.formats( "%y", "2017/10/28" ),
        "17",
        "%yに文字列"
      );
      // %m
      jsunit.assertEqual(
        $ustr.formats( "%m", now ),
        (now.getMonth()+1).toString(),
        "%mに日付時刻"
      );
      jsunit.assertEqual(
        $ustr.formats( "%m", 1 ),
        "1",
        "%mに数値"
      );
      jsunit.assertEqual(
        $ustr.formats( "%m", 0 ),
        "12",
        "%mに数値2"
      );
      jsunit.assertEqual(
        $ustr.formats( "%m", 12 ),
        "12",
        "%mに数値3"
      );
      jsunit.assertEqual(
        $ustr.formats( "%m", 13 ),
        "1",
        "%mに数値4"
      );
      jsunit.assertEqual(
        $ustr.formats( "%m", 26 ),
        "2",
        "%mに数値5"
      );
      jsunit.assertEqual(
        $ustr.formats( "%m", -1 ),
        "NaN",
        "%mに数値6"
      );
      jsunit.assertEqual(
        $ustr.formats( "%m", 200 ),
        "1",
        "%mに数値7"
      );
      jsunit.assertEqual(
        $ustr.formats( "%m", "2017/10/28" ),
        "10",
        "%mに文字列"
      );
      // %B
      jsunit.assertEqual(
        $ustr.formats( "%B", now ),
        [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ][ now.getMonth() ],
        "%Bに日付時刻"
      );
      jsunit.assertEqual(
        $ustr.formats( "%B", 1 ),
        "January",
        "%Bに数値"
      );
      jsunit.assertEqual(
        $ustr.formats( "%B", 0 ),
        "December",
        "%Bに数値2"
      );
      jsunit.assertEqual(
        $ustr.formats( "%B", 12 ),
        "December",
        "%Bに数値3"
      );
      jsunit.assertEqual(
        $ustr.formats( "%B", "2017/10/28" ),
        "October",
        "%Bに文字列"
      );
      // %b
      jsunit.assertEqual(
        $ustr.formats( "%b", now ),
        [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ][ now.getMonth() ],
        "%bに日付時刻"
      );
      jsunit.assertEqual(
        $ustr.formats( "%b", 1 ),
        "Jan",
        "%bに数値"
      );
      jsunit.assertEqual(
        $ustr.formats( "%b", 0 ),
        "Dec",
        "%bに数値2"
      );
      jsunit.assertEqual(
        $ustr.formats( "%b", 12 ),
        "Dec",
        "%bに数値3"
      );
      jsunit.assertEqual(
        $ustr.formats( "%b", "2017/10/28" ),
        "Oct",
        "%bに文字列"
      );
      // %j
      jsunit.assertEqual(
        $ustr.formats( "%j", new Date( 2017, 0, 1 ) ),
        "1",
        "%jに日付時刻"
      );
      jsunit.assertEqual(
        $ustr.formats( "%j", new Date( 2017, 0, 2 ) ),
        "2",
        "%jに日付時刻2"
      );
      jsunit.assertEqual(
        $ustr.formats( "%j", new Date( 2017, 11, 31 ) ),
        "365",
        "%jに日付時刻3"
      );
      jsunit.assertEqual(
        $ustr.formats( "%j", new Date( 2017, 0, 1, 23, 59, 59, 999 ) ),
        "1",
        "%jに日付時刻4"
      );
      // %w
      jsunit.assertEqual(
        $ustr.formats( "%w", new Date( 2017, 9, 18 ) ),
        "3",
        "%wに日付時刻"
      );
      jsunit.assertEqual(
        $ustr.formats( "%w", new Date( 2017, 9, 1 ) ),
        "0",
        "%wに日付時刻2"
      );
      jsunit.assertEqual(
        $ustr.formats( "%w", new Date( 2017, 9, 14 ) ),
        "6",
        "%wに日付時刻3"
      );
      // %A
      jsunit.assertEqual(
        $ustr.formats( "%A", new Date( 2017, 9, 18 ) ),
        "Wednesday",
        "%Aに日付時刻"
      );
      jsunit.assertEqual(
        $ustr.formats( "%A", new Date( 2017, 9, 1 ) ),
        "Sunday",
        "%Aに日付時刻2"
      );
      jsunit.assertEqual(
        $ustr.formats( "%A", new Date( 2017, 9, 14 ) ),
        "Saturday",
        "%Aに日付時刻3"
      );
      // %a
      jsunit.assertEqual(
        $ustr.formats( "%a", new Date( 2017, 9, 18 ) ),
        "Wed",
        "%aに日付時刻"
      );
      jsunit.assertEqual(
        $ustr.formats( "%a", new Date( 2017, 9, 1 ) ),
        "Sun",
        "%aに日付時刻2"
      );
      jsunit.assertEqual(
        $ustr.formats( "%a", new Date( 2017, 9, 14 ) ),
        "Sat",
        "%aに日付時刻3"
      );
      // %V
      jsunit.assertEqual(
        $ustr.formats( "%V", new Date( 2016, 0, 1 ) ),
        "53",
        "%Vに日付時刻 2016/1/1(金)は2015年の最後の週"
      );
      jsunit.assertEqual(
        $ustr.formats( "%V", new Date( 2016, 0, 3 ) ),
        "53",
        "%Vに日付時刻 2016/1/3(日)は2015年の最後の週"
      );
      jsunit.assertEqual(
        $ustr.formats( "%V", new Date( 2016, 0, 4 ) ),
        "1",
        "%Vに日付時刻 2016/1/4(月)は2016年の最初の週"
      );
      jsunit.assertEqual(
        $ustr.formats( "%V", new Date( 2016, 0, 10 ) ),
        "1",
        "%Vに日付時刻 2016/1/10(日)は2016年の最初の週"
      );
      jsunit.assertEqual(
        $ustr.formats( "%V", new Date( 2016, 0, 11 ) ),
        "2",
        "%Vに日付時刻 2016/1/11(月)は2016年の第2週"
      );      
      jsunit.assertEqual(
        $ustr.formats( "%V", new Date( 2017, 0, 1 ) ),
        "52",
        "%Vに日付時刻 2017/1/1(日)は2016年の最後の週"
      );
      jsunit.assertEqual(
        $ustr.formats( "%V", new Date( 2017, 0, 2 ) ),
        "1",
        "%Vに日付時刻 2017/1/2(月)は2017年の最初の週"
      );
      jsunit.assertEqual(
        $ustr.formats( "%V", new Date( 2017, 11, 31 ) ),
        "52",
        "%Vに日付時刻 2017/12/31(日)は2017年の最後の週"
      );
      jsunit.assertEqual(
        $ustr.formats( "%V", new Date( 2018, 11, 23 ) ),
        "51",
        "%Vに日付時刻 2018/12/23(日)は2018年の最後の週の前週"
      );
      jsunit.assertEqual(
        $ustr.formats( "%V", new Date( 2018, 11, 24 ) ),
        "52",
        "%Vに日付時刻 2018/12/24(月)は2018年の最後の週の最初の日"
      );
      jsunit.assertEqual(
        $ustr.formats( "%V", new Date( 2018, 11, 30 ) ),
        "52",
        "%Vに日付時刻 2018/12/30(日)は2018年の最後の週"
      );
      jsunit.assertEqual(
        $ustr.formats( "%V", new Date( 2018, 11, 31 ) ),
        "1",
        "%Vに日付時刻 2018/12/31(月)は2019年の最初の週に含まれる"
      );
      // %U
      jsunit.assertEqual(
        $ustr.formats( "%U", new Date( 2016, 0, 1 ) ),
        "52",
        "%Uに日付時刻 2016/1/1(金)は2015年の最後の週"
      );
      jsunit.assertEqual(
        $ustr.formats( "%U", new Date( 2016, 0, 3 ) ),
        "1",
        "%Uに日付時刻 2016/1/3(日)は2016年の最初の週"
      );
      jsunit.assertEqual(
        $ustr.formats( "%U", new Date( 2016, 0, 4 ) ),
        "1",
        "%Uに日付時刻 2016/1/4(月)は2016年の最初の週"
      );
      jsunit.assertEqual(
        $ustr.formats( "%U", new Date( 2016, 0, 10 ) ),
        "2",
        "%Uに日付時刻 2016/1/10(日)は2016年の第2週"
      );
      jsunit.assertEqual(
        $ustr.formats( "%U", new Date( 2016, 0, 11 ) ),
        "2",
        "%Uに日付時刻 2016/1/11(月)は2016年の第2週"
      );
      jsunit.assertEqual(
        $ustr.formats( "%U", new Date( 2017, 0, 1 ) ),
        "1",
        "%Uに日付時刻 2017/1/1(日)は2017年の最初の週"
      );
      jsunit.assertEqual(
        $ustr.formats( "%U", new Date( 2017, 0, 2 ) ),
        "1",
        "%Uに日付時刻 2017/1/2(月)は2017年の最初の週"
      );
      jsunit.assertEqual(
        $ustr.formats( "%U", new Date( 2017, 11, 31 ) ),
        "53",
        "%Uに日付時刻 2017/12/31(日)は2017年の最後の週"
      );
      jsunit.assertEqual(
        $ustr.formats( "%U", new Date( 2018, 11, 23 ) ),
        "51",
        "%Uに日付時刻 2018/12/23(日)は2018年の最後の週の前週"
      );
      jsunit.assertEqual(
        $ustr.formats( "%U", new Date( 2018, 11, 24 ) ),
        "51",
        "%Uに日付時刻 2018/12/24(月)は2018年の最後の週の前週"
      );
      jsunit.assertEqual(
        $ustr.formats( "%U", new Date( 2018, 11, 30 ) ),
        "52",
        "%Uに日付時刻 2018/12/30(日)は2018年の最後の週"
      );
      jsunit.assertEqual(
        $ustr.formats( "%U", new Date( 2018, 11, 31 ) ),
        "52",
        "%Uに日付時刻 2018/12/31(月)は2018年の最後の週"
      );
      // %W
      jsunit.assertEqual(
        $ustr.formats( "%W", new Date( 2016, 0, 1 ) ),
        "52",
        "%Wに日付時刻 2016/1/1(金)は2015年の最後の週"
      );
      jsunit.assertEqual(
        $ustr.formats( "%W", new Date( 2016, 0, 3 ) ),
        "52",
        "%Wに日付時刻 2016/1/3(日)は2015年の最後の週"
      );
      jsunit.assertEqual(
        $ustr.formats( "%W", new Date( 2016, 0, 4 ) ),
        "1",
        "%Wに日付時刻 2016/1/4(月)は2016年の最初の週"
      );
      jsunit.assertEqual(
        $ustr.formats( "%W", new Date( 2016, 0, 10 ) ),
        "1",
        "%Wに日付時刻 2016/1/10(日)は2016年の第1週"
      );
      jsunit.assertEqual(
        $ustr.formats( "%W", new Date( 2016, 0, 11 ) ),
        "2",
        "%Wに日付時刻 2016/1/11(月)は2016年の第2週"
      );
      jsunit.assertEqual(
        $ustr.formats( "%W", new Date( 2017, 0, 1 ) ),
        "52",
        "%Wに日付時刻 2017/1/1(日)は2016年の最後の週"
      );
      jsunit.assertEqual(
        $ustr.formats( "%W", new Date( 2017, 0, 2 ) ),
        "1",
        "%Wに日付時刻 2017/1/2(月)は2017年の最初の週"
      );
      jsunit.assertEqual(
        $ustr.formats( "%W", new Date( 2017, 11, 31 ) ),
        "52",
        "%Wに日付時刻 2017/12/31(日)は2017年の最後の週"
      );
      jsunit.assertEqual(
        $ustr.formats( "%W", new Date( 2018, 11, 23 ) ),
        "51",
        "%Wに日付時刻 2018/12/23(日)は2018年の最後の週の前々週"
      );
      jsunit.assertEqual(
        $ustr.formats( "%W", new Date( 2018, 11, 24 ) ),
        "52",
        "%Wに日付時刻 2018/12/24(月)は2018年の最後の前週"
      );
      jsunit.assertEqual(
        $ustr.formats( "%W", new Date( 2018, 11, 30 ) ),
        "52",
        "%Wに日付時刻 2018/12/30(日)は2018年の最後の前週"
      );
      jsunit.assertEqual(
        $ustr.formats( "%W", new Date( 2018, 11, 31 ) ),
        "53",
        "%Wに日付時刻 2018/12/31(月)は2018年の最後の週"
      );
      // %H
      jsunit.assertEqual(
        $ustr.formats( "%H", new Date( 2017, 0, 1, 0, 0, 0 ) ),
        "0",
        "%H 0時"
      );
      jsunit.assertEqual(
        $ustr.formats( "%02H", new Date( 2017, 0, 1, 0, 0, 0 ) ),
        "00",
        "%H 00時"
      );
      jsunit.assertEqual(
        $ustr.formats( "%H", new Date( 2017, 0, 1, 1, 0, 0 ) ),
        "1",
        "%H 1時"
      );
      jsunit.assertEqual(
        $ustr.formats( "%02H", new Date( 2017, 0, 1, 1, 0, 0 ) ),
        "01",
        "%H 01時"
      );
      jsunit.assertEqual(
        $ustr.formats( "%02H", new Date( 2017, 0, 1, 12, 0, 0 ) ),
        "12",
        "%H 12時"
      );
      jsunit.assertEqual(
        $ustr.formats( "%02H", new Date( 2017, 0, 1, 23, 0, 0 ) ),
        "23",
        "%H 23時"
      );
      // %l
      jsunit.assertEqual(
        $ustr.formats( "%l", new Date( 2017, 0, 1, 12, 0, 0 ) ),
        "12",
        "%l 12時"
      );
      jsunit.assertEqual(
        $ustr.formats( "%02l", new Date( 2017, 0, 1, 0, 0, 0 ) ),
        "12",
        "%l 12時"
      );
      jsunit.assertEqual(
        $ustr.formats( "%l", new Date( 2017, 0, 1, 1, 0, 0 ) ),
        "1",
        "%l 1時"
      );
      jsunit.assertEqual(
        $ustr.formats( "%02l", new Date( 2017, 0, 1, 13, 0, 0 ) ),
        "01",
        "%l 13時"
      );
      jsunit.assertEqual(
        $ustr.formats( "%02l", new Date( 2017, 0, 1, 12, 0, 0 ) ),
        "12",
        "%l 12時"
      );
      jsunit.assertEqual(
        $ustr.formats( "%02l", new Date( 2017, 0, 1, 23, 0, 0 ) ),
        "11",
        "%l 23時"
      );
      // %M
      jsunit.assertEqual(
        $ustr.formats( "%M", new Date( 2017, 0, 1, 0, 0, 0 ) ),
        "0",
        "%M 0分"
      );
      jsunit.assertEqual(
        $ustr.formats( "%02M", new Date( 2017, 0, 1, 0, 0, 0 ) ),
        "00",
        "%M 00分"
      );
      jsunit.assertEqual(
        $ustr.formats( "%M", new Date( 2017, 0, 1, 0, 1, 0 ) ),
        "1",
        "%M 1分"
      );
      jsunit.assertEqual(
        $ustr.formats( "%02M", new Date( 2017, 0, 1, 0, 1, 0 ) ),
        "01",
        "%M 01分"
      );
      jsunit.assertEqual(
        $ustr.formats( "%02M", new Date( 2017, 0, 1, 0, 59, 0 ) ),
        "59",
        "%M 59分"
      );
      // %S
      jsunit.assertEqual(
        $ustr.formats( "%S", new Date( 2017, 0, 1, 0, 0, 0 ) ),
        "0",
        "%S 0秒"
      );
      jsunit.assertEqual(
        $ustr.formats( "%02S", new Date( 2017, 0, 1, 0, 0, 0 ) ),
        "00",
        "%S 00秒"
      );
      jsunit.assertEqual(
        $ustr.formats( "%S", new Date( 2017, 0, 1, 0, 0, 1 ) ),
        "1",
        "%S 1秒"
      );
      jsunit.assertEqual(
        $ustr.formats( "%02S", new Date( 2017, 0, 1, 0, 0, 1 ) ),
        "01",
        "%S 01秒"
      );
      jsunit.assertEqual(
        $ustr.formats( "%02S", new Date( 2017, 0, 1, 0, 0, 59 ) ),
        "59",
        "%S 59秒"
      );
      // %N
      jsunit.assertEqual(
        $ustr.formats( "%N", new Date( 2017, 0, 1, 0, 0, 0, 0 ) ),
        "0",
        "%N 0ミリ秒"
      );
      jsunit.assertEqual(
        $ustr.formats( "%03N", new Date( 2017, 0, 1, 0, 0, 0, 1 ) ),
        "001",
        "%N 1ミリ秒"
      );
      jsunit.assertEqual(
        $ustr.formats( "%03N", new Date( 2017, 0, 1, 0, 0, 0, 23 ) ),
        "023",
        "%N 23ミリ秒"
      );
      jsunit.assertEqual(
        $ustr.formats( "%03N", new Date( 2017, 0, 1, 0, 0, 0, 456 ) ),
        "456",
        "%N 456ミリ秒"
      );
      jsunit.assertEqual(
        $ustr.formats( "%03N", new Date( 2017, 0, 1, 0, 0, 0, 999 ) ),
        "999",
        "%N 999ミリ秒"
      );
      jsunit.assertEqual(
        $ustr.formats( "%03L", new Date( 2017, 0, 1, 0, 0, 0, 999 ) ),
        "999",
        "%L 999ミリ秒"
      );
      // %P
      jsunit.assertEqual(
        $ustr.formats( "%P", new Date( 2017, 0, 1, 0 ) ),
        "am",
        "%P 0時"
      );
      jsunit.assertEqual(
        $ustr.formats( "%P", new Date( 2017, 0, 1, 11 ) ),
        "am",
        "%P 11時"
      );
      jsunit.assertEqual(
        $ustr.formats( "%P", new Date( 2017, 0, 1, 12 ) ),
        "pm",
        "%P 12時"
      );
      jsunit.assertEqual(
        $ustr.formats( "%P", new Date( 2017, 0, 1, 23 ) ),
        "pm",
        "%P 23時"
      );
      // %p
      jsunit.assertEqual(
        $ustr.formats( "%p", new Date( 2017, 0, 1, 0 ) ),
        "AM",
        "%p 0時"
      );
      jsunit.assertEqual(
        $ustr.formats( "%p", new Date( 2017, 0, 1, 11 ) ),
        "AM",
        "%p 11時"
      );
      jsunit.assertEqual(
        $ustr.formats( "%p", new Date( 2017, 0, 1, 12 ) ),
        "PM",
        "%p 12時"
      );
      jsunit.assertEqual(
        $ustr.formats( "%p", new Date( 2017, 0, 1, 23 ) ),
        "PM",
        "%p 23時"
      );
      // 混在
      jsunit.assertEqual(
        $ustr.formats( "%04Y/%02m/%02d(%9A) %p %02H:%02M:%02S.%03N", new Date( 2017, 8, 24, 15, 3, 10, 123 ) ),
        "2017/09/24(   Sunday) PM 15:03:10.123",
        "混在"
      );
      // %Z
      jsunit.assertEqual(
        $ustr.formats( "%Z", new Date( 2017, 0, 1, 0 ) ),
        "JST",
        "%Z timezone"
      );
      // %z
      jsunit.assertEqual(
        $ustr.formats( "%z", new Date( 2017, 0, 1, 0 ) ),
        "09:00",
        "%z timezone"
      );
      // %F
      jsunit.assertEqual(
        $ustr.formats( "%F", new Date( 2017, 8, 6 ) ),
        "2017-09-06",
        "%F"
      );
      // %D
      jsunit.assertEqual(
        $ustr.formats( "%D", new Date( 2017, 8, 6 ) ),
        "09/06/2017",
        "%D"
      );
      // %v
      jsunit.assertEqual(
        $ustr.formats( "%v", new Date( 2017, 8, 6 ) ),
        "Sep-06-2017",
        "%v"
      );
      // %T
      jsunit.assertEqual(
        $ustr.formats( "%T", new Date( 2017, 8, 6, 13, 5, 32 ) ),
        "13:05:32",
        "%T"
      );
      // %r
      jsunit.assertEqual(
        $ustr.formats( "%r", new Date( 2017, 8, 6, 13, 5, 32 ) ),
        "01:05:32 PM",
        "%r"
      );
    },
    "formats"
  );
  jsunit.execTest(
    function(){
      jsunit.assertEqual(
        $ustr.separate( "abc123def456ghi", "123" ),
        [ "abc", "123", "def456ghi" ],
        "通常"
      );
      jsunit.assertEqual(
        $ustr.separate( "abc123def456ghi", /[0-9]{3}/ ),
        [ "abc", "123", "def", "456", "ghi" ],
        "複数"
      );
      jsunit.assertEqual(
        $ustr.separate( "abc123def456ghi", /[0-9]/ ),
        [ "abc", "1", "2", "3", "def", "4", "5", "6", "ghi" ],
        "複数2"
      );
      jsunit.assertEqual(
        $ustr.separate( "123abcd456", /(abc|abcd)/ ),
        [ "123", "abc", "d456" ],
        "複数3"
      );
      jsunit.assertEqual(
        $ustr.separate( "123abcd456", /(abcd|abc)/ ),
        [ "123", "abcd", "456" ],
        "複数4"
      );
    },
    "separate"
  );
  jsunit.execTest(
    function(){
      jsunit.assertEqual(
        $ustr.parseFormula( "1+2" ),
        { "+": [ 1, 2 ] },
        "1+2"
      );
      jsunit.assertEqual(
        $ustr.parseFormula( "1+2+3" ),
        { "+":[ 1, { "+": [ 2, 3 ] } ] },
        "1+2+3"
      );
      jsunit.assertEqual(
        $ustr.parseFormula( "1*2+3" ),
        { "+":[ { "*": [ 1, 2 ] }, 3 ] },
        "1*2+3"
      );
      jsunit.assertEqual(
        $ustr.parseFormula( "1+2*3" ),
        { "+":[ 1, { "*": [ 2, 3 ] } ] },
        "1+2*3"
      );
      jsunit.assertEqual(
        $ustr.parseFormula( "1*(2+3)*4" ),
        {"*":[1,{"*":[{"+":[2,3]},4]}]},
        "1*(2+3)*4"
      );
      jsunit.assertEqual(
        $ustr.parseFormula( "3!" ),
        {"!":[3]},
        "3!"
      );
      jsunit.assertEqual(
        $ustr.parseFormula( "1+3!" ),
        {"+":[ 1, {"!":[3]} ]},
        "1+3!"
      );
      jsunit.assertEqual(
        $ustr.parseFormula( "3!+1" ),
        {"+":[ {"!":[3]}, 1 ] },
        "3!+1"
      );
      jsunit.assertEqual(
        $ustr.parseFormula( "3!*5!" ),
        { "*":[{"!":[3]}, {"!":[5]}]},
        "3!5!"
      );
      jsunit.assertEqual(
        $ustr.parseFormula( "sin(90)" ),
        {"sin":[90]},
        "sin(90)"
      );
      jsunit.assertEqual(
        $ustr.parseFormula( "sin(90*3.14/180)" ),
        {"sin":[ {"*":[90,{"/":[ 3.14, 180 ]}]} ]},
        "sin(90*3.14/180)"
      );
      jsunit.assertEqual(
        $ustr.parseFormula( "1+sin(90)" ),
        {"+":[1,{"sin":[90]}]},
        "1+sin(90)"
      );
      jsunit.assertEqual(
        $ustr.parseFormula( "sin(90)+1" ),
        {"+":[{"sin":[90]},1]},
        "sin(90)+1"
      );
      jsunit.assertEqual(
        $ustr.parseFormula( "3N" ),
        {"*":[3,"N"]},
        "3N"
      );
      jsunit.assertEqual(
        $ustr.parseFormula( "1+3N" ),
        {"+":[ 1, {"*":[3,"N"]} ]},
        "1+3N"
      );
      jsunit.assertEqual(
        $ustr.parseFormula( "3N+1" ),
        {"+":[ {"*":[3,"N"]}, 1 ] },
        "3N+1"
      );
    },
    "parseFormula"
  );
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
  $(".log").append( "\n\n・grape-utility-string\n\n" );
  $(".log").append( jsunit.getOutput() );
  if ( false == jsunit.getResult() ) {
    $(".result").append("grape-utility-string : 失敗");
  }
  else {
    $(".result").append("grape-utility-string : 成功");    
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