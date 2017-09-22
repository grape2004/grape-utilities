/*----------------------------------------------------------
grape-utility-string.js
  License    : MIT
  Written by : S.Murakoshi( grape@nona.dti.ne.jp )

Usage:
  $ustr.capitalize( "hello" );  // -> "Hello"
  // or
  foo = new $UStr();
  foo.capitalize( "world" );  // -> "World"
  // or
  foo = new $UStr( "utility" );
  foo.capitalize().center( 15, '-' );  // -> "----Utility----"

----------------------------------------------------------*/
function $UStr( opt_string ) {
  this.context = opt_string;
  /*----------------------------------------------------------
    private member
  ----------------------------------------------------------*/
  var url_pattern = {};
  url_pattern["schema"]     = "([a-zA-Z_%][a-zA-Z0-9\\-_+.%]*:)";
  url_pattern["userinfo"]   = "([a-zA-Z0-9\\-._~%!$&'()*+,;=:]+@)";
  url_pattern["regname"]    = "([a-zA-Z0-9\\-._~%!$&'()*+,;=]+)";
  url_pattern["ipv4"]       = "([0-9]{1,3}(\\.[0-9]{1,3}){3})";
  url_pattern["ipv6"]       = "(\\[([a-fA-F0-9]{0,4}(:[a-fA-F0-9]{0,4}){1,8})(:"+url_pattern.ipv4+")?\\])";
  url_pattern["port"]       = "(:[0-9]+)";
  url_pattern["host"]       = "("+url_pattern.userinfo+"?("+url_pattern.regname+"|"+url_pattern.ipv4+"|"+url_pattern.ipv6+")"+url_pattern.port+"?)";
  url_pattern["authority"]  = "((\\/\\/)"+url_pattern.host+")";
  url_pattern["path"]       = "((\\/[a-zA-Z0-9\\-._~%!$&'()*+,;=:@]*)*)";
  url_pattern["query"]      = "(\\?[a-zA-Z0-9\\-._~%!$&'()*+,;=:@\\/?]+)";
  url_pattern["fragment"]   = "(\\#[a-zA-Z0-9\\-._~%!$&'()*+,;=:@\\/?]+)";
  url_pattern["absolute_url"] = url_pattern.schema+"?"+url_pattern.authority+url_pattern.path+"?("+url_pattern.query+"?"+url_pattern.fragment+"?|"+url_pattern.fragment+"?"+url_pattern.query+"?)";
  url_pattern["relative_url"] = "("+url_pattern.schema+"?"+url_pattern.authority+"|\\.{0,2})(\\/[a-zA-Z0-9\\-._~%!$&'()*+,;=:@]*)+("+url_pattern.query+"?"+url_pattern.fragment+"?|"+url_pattern.fragment+"?"+url_pattern.query+"?)";
  var domain_pattern = {
    domain: "([a-zA-Z0-9][a-zA-Z0-9\\-]+[a-zA-Z0-9])(\\.(com|net|org|edu|gov|mil|int|info|biz|name|pro|museum|aero|coop|jobs|travel|mobi|cat|asia|tel|xxx|post|arpa|[a-zA-Z]{2,})|\\.[a-zA-Z]{2,}\\.[a-zA-Z]{2})?$",
    host: "^([a-zA-Z0-9][a-zA-Z0-9\\-.]*[a-zA-Z0-9])"
  };
  var ip_pattern = {
    IPv4: "((25[0-5]|2[0-4][0-9]|1[0-9]{2}|0[0-9]?[0-9]|[0-9]{1,2})(\\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|0[0-9]?[0-9]|[0-9]{1,2})){3}(\\/(3[0-2]|[0-2]?[0-9]))?)",
    IPv6: "(((([0-9a-fA-F]{1,4}:){7}([0-9a-fA-F]{1,4}|:))|(([0-9a-fA-F]{1,4}:){6}(:[0-9a-fA-F]{1,4}|((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])(\\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3})|:))|(([0-9a-fA-F]{1,4}:){5}(((:[0-9a-fA-F]{1,4}){1,2})|:((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])(\\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3})|:))|(([0-9a-fA-F]{1,4}:){4}(((:[0-9a-fA-F]{1,4}){1,3})|((:[0-9a-fA-F]{1,4})?:((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])(\\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}))|:))|(([0-9a-fA-F]{1,4}:){3}(((:[0-9a-fA-F]{1,4}){1,4})|((:[0-9a-fA-F]{1,4}){0,2}:((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])(\\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}))|:))|(([0-9a-fA-F]{1,4}:){2}(((:[0-9a-fA-F]{1,4}){1,5})|((:[0-9a-fA-F]{1,4}){0,3}:((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])(\\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}))|:))|(([0-9a-fA-F]{1,4}:){1}(((:[0-9a-fA-F]{1,4}){1,6})|((:[0-9a-fA-F]{1,4}){0,4}:((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])(\\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}))|:))|(:(((:[0-9a-fA-F]{1,4}){1,7})|((:[0-9a-fA-F]{1,4}){0,5}:((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])(\\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}))|:)))(\\/(12[0-8]|1[0-1][0-9]|[1-9][0-9]|[0-9]))?)",
  };
  /*----------------------------------------------------------
    private methods
  ----------------------------------------------------------*/
  function max( a, b ){
    return a < b ? b : a;
  }
  function toArrayLine( str ){
    var ary=[];
    var i_=0;
    while( 0 < str.length ){
      if ( i_ == str.length ) {
        ary[ ary.length ] = str;
        break;
      }
      if ( "\n" == str.charAt(i_) ){
        ary[ ary.length ] = str.slice( 0, i_+1 );
        str = str.slice( i_+1 );
        i_=-1;
      }
      i_++;
    }
    return ary;
  }
  function getArgumentsExceptContext( args ) {
    var new_args_ = [];
    for ( var i_=1; i_<args.length; i_++ ) {
      new_args_[ new_args_.length ] = args[i_];
    }
    return new_args_;
  }
  function generateRegExpAndValue( string ){
    var reverse_str_ary_ = string.split("").reverse();
    var reg_ary_ = [];
    var val_ary_ = [];
    var has_availabel_str_ = false;
    var finished_availabel_str_ = false;
    for (var i_=0; i_<reverse_str_ary_.length; i_++) {
      var code_ = reverse_str_ary_[i_].charCodeAt(0);
      // a-z
      if ( false == finished_availabel_str_ && 0x61 <= code_ && 0x7a >= code_ ) {
        has_availabel_str_ = true;
        reg_ary_[reg_ary_.length] = "[a-z]";
        val_ary_[val_ary_.length] = [ code_ - 0x60, 26 ]; // 1 origin
        
      }
      // A-Z
      else if ( false == finished_availabel_str_ && 0x41 <= code_ && 0x5a >= code_ ) {
        has_availabel_str_ = true;
        reg_ary_[reg_ary_.length] = "[A-Z]";
        val_ary_[val_ary_.length] = [ code_ - 0x40, 26 ]; // 1 origin

      }
      // 0-9
      else if ( false == finished_availabel_str_ && 0x30 <= code_ && 0x39 >= code_ ) {
        has_availabel_str_ = true;
        reg_ary_[reg_ary_.length] = "[0-9]";
        val_ary_[val_ary_.length] = [ code_ - 0x30, 10 ]; // 0 origin

      }
      // other characters
      else {
        if ( has_availabel_str_ ) {
          finished_availabel_str_ = true;
          reg_ary_[reg_ary_.length-1] = reg_ary_[reg_ary_.length-1] + "+"
        }
        reg_ary_[reg_ary_.length] = reverse_str_ary_[i_].replace( /(\.\^\$\[\]\*\+\?\|\(\)\\)/, "\$1" );
      }
    }
    if ( has_availabel_str_ && false == finished_availabel_str_ ) {
      reg_ary_[reg_ary_.length-1] = reg_ary_[reg_ary_.length-1] + "+"
    }
    // calculate value.
    var value_ = 0;
    var digit_ = 1;
    for ( var i_=0; i_<val_ary_.length; i_++ ) {
      value_ = value_ + ( val_ary_[i_][0] * digit_ );
      digit_ = digit_ * val_ary_[i_][1];
    }
    return {
      regexp_next: new RegExp( "^" + reg_ary_.reverse().join("") + "$" ),
      regexp_prev: new RegExp( "^" + reg_ary_.reverse().join("").replace( /([^\\]?)\+/, "$1?" ) + "$" ),
      value: value_
    }
  }
  function initialArray( d1_size, d2_size, fill_value ){
    var ary = [];
    for ( var d1_=0; d1_<d1_size; d1_++ ){
      ary[d1_] = ( 0 == d2_size ? fill_value : [] );
      for ( var d2_=0; d2_<d2_size; d2_++ ){
        ary[d1_][d2_] = fill_value;
      }        
    }
    return ary;
  }
  function deletionCount( orgs_, dests_ ){
    function snake( k_, y_ ){
      var x_ = y_ - k_;
      while( x_ < orgs_.length && y_ < dests_.length && orgs_[x_] == dests_[y_] ){
        x_++;
        y_++;
      }
      return y_;
    }
    var offset_ = orgs_.length + 1;
    var delta_  = dests_.length - orgs_.length;
    var size_   = orgs_.length + dests_.length + 3;

    var fp_=[];
    for( var i_=0; i_<size_; i_++ ){
      fp_[i_] = -1;
    }

    var p_ = -1;
    do {
      p_++;
      for ( var k_=-p_; k_<=delta_-1; k_++ ) {
        fp_[ k_ + offset_ ] = snake( k_, max( fp_[ k_ - 1 + offset_ ] + 1, fp_[ k_ + 1 + offset_ ] ) );
      }
      for ( var k_=delta_+p_; k_>=delta_+1; k_-- ) {
        fp_[ k_ + offset_ ] = snake( k_, max( fp_[ k_ - 1 + offset_ ] + 1, fp_[ k_ + 1 + offset_ ] ) );
      }
      fp_[ delta_ + offset_ ] = snake( delta_, max( fp_[ delta_ - 1 + offset_ ] + 1, fp_[ delta_ + 1 + offset_ ] ) );
    } while( fp_[ delta_ + offset_ ] != dests_.length );
    return p_;    // editioin = delta + 2 * p_
  }
  function diffWuSearch( map_, orgs_, dests_ ){
    //var p_ = dests_.length + orgs_.length;  // remove comment and comment next step, if you not need to detect no-searching-range
    var p_ = deletionCount( orgs_, dests_ );
    var delta_ = dests_.length - orgs_.length;
    var o_;
    var d_;
    var fo_;
    var fd_;
    var cost_;
    var old_cost_;
    var stack_=[ [ 0, 0, -1, -1, 0 ] ];
    // serache min Levenshtein distance
    while( 0 < stack_.length ){
      o_=stack_[0][0];
      d_=stack_[0][1];
      fo_=stack_[0][2];
      fd_=stack_[0][3];
      cost_=stack_[0][4];
      stack_.splice( 0, 1 );
      
      old_cost_ = ( map_[o_][d_] || [ -1 ] )[0];
      if ( -1 == old_cost_ || cost_ < old_cost_ ) {
        map_[o_][d_] = [ cost_, fo_, fd_ ];
        if ( o_ == map_.length-1 && d_ == map_[0].length-1 ) break; // last element
        // same
        if ( o_ < map_.length-1 && d_ < map_[0].length-1 && orgs_[o_] == dests_[d_] ) {
          stack_[stack_.length] = [ o_+1, d_+1, o_, d_, cost_ ];
        }
        // need edit
        else {
          // inside range
          if ( o_ < map_.length-1 ) {
            if ( o_ + 1 <= d_ + p_ && d_ <= o_ + 1 + delta_ + p_ ) {
              // deletion
              stack_[stack_.length] = [ o_+1, d_, o_, d_, cost_+1 ];
            }
          }
          // inside range
          if ( d_ < map_[0].length-1 ) {
            if ( o_ <= d_ + 1 + p_ && d_ + 1 <= o_ + delta_ + p_ ) {
              // insertion
              stack_[stack_.length] = [ o_, d_+1, o_, d_, cost_+1 ];
            }
          }
        }
      }
    }
    // create route datas
    var ret_=[];
    o_=map_.length-1;
    d_=map_[0].length-1;
    while( 0!=o_ || 0!=d_ ){
      fo_= map_[o_][d_][1];
      fd_= map_[o_][d_][2];
      // same
      if ( fo_ != o_ && fd_ != d_ ) {
        if ( ret_[ ret_.length-1 ] && "=" == ret_[ ret_.length-1 ].type ) {
          ret_[ ret_.length-1 ].value = dests_[fd_] + ret_[ ret_.length-1 ].value;
        }
        else {
          ret_[ ret_.length ] = { value: dests_[fd_], type: "=" };
        }
      }
      // deletion
      else if ( fo_ != o_ ) {
        if ( ret_[ ret_.length-1 ] && "-" == ret_[ ret_.length-1 ].type ) {
          ret_[ ret_.length-1 ].value = orgs_[fo_] + ret_[ ret_.length-1 ].value;
        }
        else {
          ret_[ ret_.length ] = { value: orgs_[fo_], type: "-" };
        }
      }
      // insertion
      else {
        if ( ret_[ ret_.length-1 ] && "+" == ret_[ ret_.length-1 ].type ) {
          ret_[ ret_.length-1 ].value = dests_[fd_] + ret_[ ret_.length-1 ].value;
        }
        else {
          ret_[ ret_.length ] = { value: dests_[fd_], type: "+" };
        }
      }
      // next route
      o_=fo_;
      d_=fd_;
    }
    if ( 0 == ret_.length ) ret_ = [{ value:"", type:"=" }];
    return ret_;
  }

  /*----------------------------------------------------------
    public methods
  ----------------------------------------------------------*/
  var ustr_ = {
    /*----------------------------------------------------------
      convert string as bin to dec number.
    ----------------------------------------------------------*/
    bin: function( string ){
      string = ( string || "" ).toString();
      var bin_ = string.replace( /^(-?)0b/i, "$1" );
      if ( bin_.match( /^-?[01]+$/ ) ) {
        return parseInt( bin_, 2 );
      }
      return 0;
    },
    /*----------------------------------------------------------
      get length as byte
    ----------------------------------------------------------*/
    byteSize: function( string ){
      string = ( string || "" ).toString();
      var characters_ = string.replace(/(\r\n|\r|\n)/g,"\n");
      return unescape(encodeURIComponent(characters_)).length;
    },
    // This is alias from byteSize().
    byteLength: function(){
      return ustr_.byteSize.apply( this, arguments );
    },
    // This is alias from byteSize().
    size: function(){
      return ustr_.byteSize.apply( this, arguments );
    },
    /*----------------------------------------------------------
      First character is changed to big letter.
    ----------------------------------------------------------*/
    capitalize: function( string ){
      return string.slice(0,1).toUpperCase() + string.slice(1).toLowerCase();
    },
    /*----------------------------------------------------------
      Compare strings with ignore big or small letters.
      If different it, return number as sort priority.
      0 : same
      -1 : org is ahead
      1 : dest is ahead
    ----------------------------------------------------------*/
    casecmp: function( string_org, string_dest ){
      var org_ = string_org.toLowerCase();
      var dest_ = string_dest.toLowerCase();
      if ( org_ == dest_ ) return 0;
      return [ org_, dest_ ].sort()[0] == org_ ? -1 : 1
    },
    /*----------------------------------------------------------
      centering strings.
      ex)
      center("hello",9) -> "  hello  "
      center("hello",9,"-") -> "--hello--"
    ----------------------------------------------------------*/
    center: function( string, length, opt_padding ){
      string = ( string || "" ).toString();
      length = length || string.length;
      opt_padding = opt_padding || " ";
      if ( string.length > length ) length = string.length;
      if ( 0 == opt_padding.length ) opt_padding = " ";
      var diff_length_ = length - string.length;
      return ustr_.padding( opt_padding, Math.floor( diff_length_ / 2 ) ) +
        string + 
        ustr_.padding( opt_padding, Math.ceil( diff_length_ / 2 ) );
    },
    // This is alias from center().
    cjust: function(){
      return ustr_.center.apply( this, arguments );
    },
    /*----------------------------------------------------------
      remove return code in end of sentence.
    ----------------------------------------------------------*/
    chomp: function( string ){
      string = string || "";
      return string.replace( /(\r\n|\n|\r)$/, "" );
    },
    /*----------------------------------------------------------
      remove character in end of sentence.
    ----------------------------------------------------------*/
    chop: function( string ){
      return ( string || "" ).replace( /(.|\r\n|\r|\n|\t)$/, "" );
    },
    /*----------------------------------------------------------
      count fraze from strings.
    ----------------------------------------------------------*/
    count: function( string, phraze ){
      function getConditionElement( obj ){
        if ( "string" == typeof obj && 0 < obj.length ) {
          return new RegExp( obj );
        }
        else if ( obj instanceof RegExp ) {
          return obj;
        }
        return null;
      }
      function isValid( string, conditions ){
        for (var i_=0; i_<conditions.length; i_++) {
          if ( null == conditions[i_] || !string.match( conditions[i_] ) ) return false;
        }
        return true;
      }
      string = ( string || "" ).toString();
      if ( null == phraze || ( 'string' != typeof phraze && !(phraze instanceof RegExp) ) || 0 == phraze.length ) return 0;
      var reg_ = new RegExp( phraze, "g" );

      var conditions_ = [];
      if ( 2 < arguments.length ) {
        if ( null != arguments[2] && "object" == typeof arguments[2] && !(arguments[2] instanceof RegExp) && 0 <= arguments[2].length ) {
          for (var i_=0; i_<arguments[2].length; i_++) {
            conditions_[conditions_.length] = getConditionElement( arguments[2][i_] );
          }
        }
        else {
          for (var i_=2; i_<arguments.length; i_++) {
            conditions_[conditions_.length] = getConditionElement( arguments[i_] );
          }
        }
      }
      var mt_ = ( string.match( reg_ ) || [] );
      var count_ = 0;
      for (var i_=0; i_<mt_.length; i_++ ) {
        if ( isValid( mt_[i_], conditions_ ) ) count_++;
      }
      return count_;
    },
    /*----------------------------------------------------------
      convert string to dec number.
    ----------------------------------------------------------*/
    dec: function( string ){
      string = ( string || "" ).toString();
      var dec_ = string.replace( /^[¥$](-?)/i, "$1" ).replace( /(,|\.[0-9,]+$)/g, "" );
      if ( dec_.match( /^-?[0-9]+$/ ) ) {
        return parseInt( dec_ );
      }
      return 0
    },
    // This is alias from dec().
    toI: function(){
      return ustr_.dec.apply( this, arguments );
    },
    /*----------------------------------------------------------
      generate prev-string and exec block-function during org to dest string.
    ----------------------------------------------------------*/
    downto: function( org_str, dest_str, opt_function ){
      org_str = ( org_str || "" );
      dest_str = ( dest_str || "" );
      if ( !dest_str.match( /[a-zA-Z0-9]+/ ) ) return [ org_str ];
      var org_ret_ = generateRegExpAndValue( org_str );
      var dest_ret_ = generateRegExpAndValue( dest_str );
      // not matched
      if ( !dest_str.match( org_ret_.regexp_prev ) || org_ret_.value <= dest_ret_.value ) {
        if ( "function" == typeof opt_function ) opt_function.call( org_str, org_str );
        return [ org_str ];
      }
      // mached next strings
      else {
        var str_ary_ = []
        var seek_str_ = null;
        while( seek_str_ != dest_str ) {
          seek_str_ = ( null == seek_str_ ? org_str : ustr_.prev( seek_str_ ) );
          str_ary_[str_ary_.length] = seek_str_;
          if ( "function" == typeof opt_function ) opt_function.call( seek_str_, seek_str_ );
          if ( 65535 <= str_ary_.length ) break;   // for escape from endless-looping
        }
        return str_ary_;
      }
    },
    /*----------------------------------------------------------
      exec iterator by each lines.
    ----------------------------------------------------------*/
    each: function( string, iterator ){
      string = ( string || "" ).toString();
      iterator = iterator || function(){};
      var lines_ = string.replace( /(\r\n|\r|\n)/g, "\n" ).split( "\n" );
      for (var i_=0; i_<lines_.length; i_++) {
        iterator.call( lines_[i_] );
      }
    },
    // This is alias from each().
    eachLine: function(){
      ustr_.each.apply( this, arguments );
    },
    // This is alias from each().
    lines: function(){
      ustr_.each.apply( this, arguments );
    },
    /*----------------------------------------------------------
      exec iterator by each byte code.
    ----------------------------------------------------------*/
    eachByte: function( string, iterator ){
      string = ( string || "" ).toString();
      iterator = iterator || function(){};
      var characters_ = string;
      var bytes_ = unescape(encodeURIComponent(characters_));
      for (var i_=0; i_<bytes_.length; i_++) {
        iterator.call( bytes_.charCodeAt(i_) );
      }
    },
    // This is alias from eachByte().
    bytes: function(){
      ustr_.eachByte.apply( this, arguments );
    },
    /*----------------------------------------------------------
      exec iterator by each character.
    ----------------------------------------------------------*/
    eachChar: function( string, iterator ){
      string = ( string || "" ).toString();
      iterator = iterator || function(){};
      var characters_ = string.split("");
      for (var i_=0; i_<characters_.length; i_++) {
        iterator.call( characters_[i_] );
      }
    },
    /*----------------------------------------------------------
      find words and return array as string
      ex)
      "This is commonFunctions, too." -> [ "This", "is", "common", "Functions" ]
    ----------------------------------------------------------*/
    findWord: function( string ){
      string = ( string || "" ).toString();
      if ( 0 == string.length || string.match(/^[ \t\r\n]+$/) ) return [];
      return string.replace( 
          // the marks makes words divide.
          /([.,!?"'`&=_+*<>@:;~|{}\/\[\]\(\)])/g, " $1 "
        ).replace( 
          // control code and serial space are replaced to " "
          /[ \t\r\n]+/g, " "
        ).replace( 
          // The big letter makes words dived in serial alphabets. ex) "aaAA" -> "aa AA"
          /([^ ]+)([A-Z]+)/g, "$1 $2"
        ).replace( 
          // The number makes words dived in serial alphabets. ex) "aa12" -> "aa 12"
          /([^ 0-9¥$\-])([¥\-]?[0-9]+)/g, "$1 $2"
        ).replace( 
          // The character excepts number makes words dived in serial number-characters. ex) "12aa" -> "12 aa"
          /([0-9]+)([^ 0-9]*)/g, "$1 $2"
        ).replace(
          // The "$" or "¥" makes words devide if after "$" or "¥" are number-characters. ex) "a¥b" -> "a ¥ b". "a¥100" -> "a ¥100"
          /(.?)([¥$])/g, "$1 $2"
        ).replace( 
          // same the avobe purpose.
          /([¥$])([^0-9\-])/g, "$1 $2"
        ).replace( 
          // The "-" makes words devide if after "-" are number-characters. ex) "a-b" -> "a b". "a-100" -> "a -100"
          /([^¥$])-([0-9])/g, "$1 -$2"
        ).replace( 
          // same the avobe purpose.
          /([^ ]?)-([^0-9\- ]|$)/g, "$1 $2"
        ).replace( 
          // same the avobe purpose.
          /([^ ¥$])-/g, "$1 -"
        ).replace(
          // replace one space-character(space is " ") if serial space-characters.
          /[ ]+/g, " "
        ).replace( 
          // remove space-characters in start and end of sentence
          /(^[ ]+|[ ]+$)/g, ""
        ).split( " " );
    },
    /*----------------------------------------------------------
      convert string to float number.
    ----------------------------------------------------------*/
    float: function( string ){
      string = ( string || "" ).toString();
      var float_ = string.replace( /^[¥$](-?)/i, "$1" ).replace( /,/g, "" );
      if ( float_.match( /^-?[0-9]+(\.[0-9]+)?$/ ) ) {
        return parseFloat( float_ );
      }
      return 0
    },
    // This is alias from float().
    toF: function(){
      return ustr_.float.apply( this, arguments );
    },
    /*----------------------------------------------------------
      get byte code from strings at index.
    ----------------------------------------------------------*/
    getByte: function( string, index ){
      string = ( string || "" ).toString();
      var bytes_ = unescape(encodeURIComponent(string));
      if ( "number" != typeof index || bytes_.length <= index ) return 0;
      if ( 0 > index ) index = bytes_.length + index;
      if ( 0 > index ) return 0;
      return bytes_.charCodeAt(index);
    },
    /*----------------------------------------------------------
      convert string as hex to dec number.
    ----------------------------------------------------------*/
    hex: function( string ){
      string = ( string || "" ).toString();
      var hex_ = string.replace( /^(-?)0x/i, "$1" );
      if ( hex_.match( /^-?[0-9a-fA-F]+$/ ) ) {
        return parseInt( hex_, 16 );
      }
      return 0
    },
    /*----------------------------------------------------------
      return index number of strings if the sentence include the phraze.
    ----------------------------------------------------------*/
    index: function( string, phraze, opt_offset ){
      string = ( string || "" ).toString();
      if ( null == phraze || ( 'string' != typeof phraze && !(phraze instanceof RegExp) ) || 0 == phraze.length ) return null;
      opt_offset = opt_offset || 0;
      var str_ = string.slice( opt_offset );
      var reg_ = new RegExp( phraze, "" );
      if ( str_.match( reg_ ) ) {
        return opt_offset + str_.search( reg_ );
      }
      return null;
    },
    /*----------------------------------------------------------
      insert strings at index.
    ----------------------------------------------------------*/
    insert: function( string, index, other ){
      string = ( string || "" ).toString();
      other = ( other || "" ).toString();
      if ( "number" != typeof index || string.length <= index ) return string + other;
      if ( 0 > index ) index = string.length + ( index + 1 );
      if ( 0 >= index ) return other + string;
      return string.slice( 0, index ) + other + string.slice( index );
    },
    /*----------------------------------------------------------
      return true if the strings is blank.
    ----------------------------------------------------------*/
    isEmpty: function( string ){
      if ( null == string || "undefined" == typeof string ) return true;
      if ( "string" == typeof string ) return 0 == string.length ? true : false;
      return false;
    },
    // This is alias from isEmpty().
    isBlank: function(){
      return ustr_.isEmpty.apply( this, arguments );
    },
    /*----------------------------------------------------------
      return true if the end of sentence same the phraze.
    ----------------------------------------------------------*/
    isEndWith: function( string, phraze ){
      string = ( string || "" ).toString();
      if ( null == phraze || ( 'string' != typeof phraze && !(phraze instanceof RegExp) ) || 0 == phraze.length ) return false;
      // get matched-strings with argument.
      var reg_ = new RegExp( phraze, "g" );
      var ary_ = string.match( reg_ );
      if ( null == ary_ || 0 == ary_.length ) return false;
      // try to re-match with last-mached-string in end of sentence.
      return string.match(
        new RegExp( ary_[ary_.length-1] + "$", "" )
      ) ? true : false;
    },
    /*----------------------------------------------------------
      return true if the sentence include the phraze.
    ----------------------------------------------------------*/
    isInclude: function( string, phraze ){
      string = ( string || "" ).toString();
      if ( null == phraze || ( 'string' != typeof phraze && !(phraze instanceof RegExp) ) || 0 == phraze.length ) return false;
      var reg_ = new RegExp( phraze, "" );
      return string.match( reg_ ) ? true : false;
    },
    /*----------------------------------------------------------
      return true if the begin of sentence same the phraze.
    ----------------------------------------------------------*/
    isStartWith: function( string, phraze ){
      string = ( string || "" ).toString();
      if ( null == phraze || ( 'string' != typeof phraze && !(phraze instanceof RegExp) ) || 0 == phraze.length ) return false;
      // get matched-strings with argument.
      var reg_ = new RegExp( phraze, "g" );
      var ary_ = string.match( reg_ );
      if ( null == ary_ || 0 == ary_.length ) return false;
      // try to re-match with first-mached-string in begin of sentence.
      return string.match(
        new RegExp( "^" + ary_[0], "" )
      ) ? true : false;
    },
    /*----------------------------------------------------------
      padding strings to right side using argument-strings.
    ----------------------------------------------------------*/
    ljust: function( string, length, opt_padding ){
      string = ( string || "" ).toString();
      length = length || string.length;
      opt_padding = opt_padding || " ";
      if ( string.length > length ) length = string.length;
      if ( 0 == opt_padding.length ) opt_padding = " ";
      var diff_length_ = length - string.length;
      return string + ustr_.padding( opt_padding, diff_length_ );
    },
    // This is alias from ljust().
    left: function(){
      return ustr_.ljust.apply( this, arguments );
    },
    /*----------------------------------------------------------
      remove spaces, tabs or control-codes from begin of sentence.
    ----------------------------------------------------------*/
    lstrip: function( string ){
      string = ( string || "" ).toString();
      return string.replace( /^[ \t\r\n]+/, "" );
    },
    /*----------------------------------------------------------
      generate next string.
      if charater is not number of alphabet, it will ignore.
      ex)
      next("a") -> "b"
      next("b") -> "c"
      next("z") -> "aa"
      next("AB") -> "AC"
      next("AZ") -> "BA"
      next("9") -> "10"
    ----------------------------------------------------------*/
    next: function( string ){
      string = ( string || "" ).toString();
      var strings_ = string.split("");
      var conver_tbl_ = [
        "0123456789",
        "abcdefghijklmnopqrstuvwxyz",
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      ];
      var type_ = -1;
      var last_type_ = -1;
      var index_ = 0;
      var is_carry = false;
      for (var i_=strings_.length-1; i_>=0; i_--) {
        // get character-type, number or alphabet.
        if ( strings_[i_].match( /[0-9]/ ) ) {
          type_ = 0;
        }
        else if ( strings_[i_].match( /[a-z]/ ) ) {
          type_ = 1;
        }
        else if ( strings_[i_].match( /[A-Z]/ ) ) {
          type_ = 2;
        }
        else {
          type_ = -1;
          if ( -1 == last_type_ ) continue; // ignore other character until first convert target.
          break;
        }
        if ( 0 <= type_ ) {
          is_carry = false;
          // get next index of character with convert-table.
          index_ = ustr_.index( conver_tbl_[type_], strings_[i_] ) + 1;
          // if the index over convert-table length, carry to next character.
          if ( index_ >= conver_tbl_[type_].length ) {
            index_ = 0;
            is_carry = true;  // reserve to carry
          }
          // convert character with convert-table.
          strings_[i_] = conver_tbl_[type_].charAt( index_ );
          // memory character type for over string length and need to carry.
          last_type_ = type_;
          if ( !is_carry ) return strings_.join("");
        }
      }
      string = strings_.join("");
      if ( is_carry ) {
        i_++;
        if ( 0 == last_type_ ) {
          string = ustr_.insert( string, i_, conver_tbl_[last_type_].charAt(1) );
        }
        else {
          string = ustr_.insert( string, i_, conver_tbl_[last_type_].charAt(0) );
        }
      }
      return string;
    },
    // This is alias from next().
    succ: function(){
      return ustr_.next.apply( this, arguments );
    },
    /*----------------------------------------------------------
      generate previous string.
      if charater is not number of alphabet, it will ignore.
      ex)
      prev("b") -> "a"
      prev("c") -> "b"
      prev("aa") -> "zz"
      prev("AC") -> "AB"
      prev("BA") -> "AZ"
      prev("10") -> "9"
    ----------------------------------------------------------*/
    prev: function( string ){
      string = ( string || "" ).toString();
      // argment value is already minimum value.
      if ( string.match( /^[^a-zA-Z0-9]*[0]*[aA0][^a-zA-Z0-9]*$/ ) ) return string;
      var strings_ = string.split("");
      var conver_tbl_ = [
        "0123456789",
        "abcdefghijklmnopqrstuvwxyz",
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      ];
      var type_ = -1;
      var last_type_ = -1;
      var last_index_ = -1;
      var digit_ = 0;
      var index_ = 0;
      var is_carry = false;
      for (var i_=strings_.length-1; i_>=0; i_--) {
        // get character-type, number or alphabet.
        if ( strings_[i_].match( /[0-9]/ ) ) {
          type_ = 0;
        }
        else if ( strings_[i_].match( /[a-z]/ ) ) {
          type_ = 1;
        }
        else if ( strings_[i_].match( /[A-Z]/ ) ) {
          type_ = 2;
        }
        else {
          type_ = -1;
          if ( -1 == last_type_ ) continue; // ignore other character until first convert target.
          break;
        }
        if ( 0 <= type_ ) {
          is_carry = false;
          // memory character type for over string length and need to carry.
          last_type_ = type_;
          last_index_ = i_;
          digit_++;
          // get next index of character with convert-table.
          index_ = ustr_.index( conver_tbl_[type_], strings_[i_] ) - 1;
          // if the index over convert-table length, carry to next character.
          if ( index_ < 0 ) {
            index_ = conver_tbl_[type_].length - 1;
            is_carry = true;  // reserve to carry
          }
          // convert character with convert-table.
          strings_[i_] = conver_tbl_[type_].charAt( index_ );
          if ( !is_carry ) {
            if ( 0 <= last_index_ && 1 < digit_ && "0" == strings_[last_index_] ) {
              strings_[last_index_] = "";
            }
            return strings_.join("");
          }
        }
      }
      // if last character, remove it by carry down. ( aa -> z )
      if ( 0 <= last_index_ && is_carry ) {
        if ( 1 < digit_ ) {
          strings_[last_index_] = "";
        }
        else {
          strings_[last_index_] = conver_tbl_[last_type_].charAt( 0 )
        }
      }
      var prev_str_ = strings_.join("");
      return prev_str_;
    },
    // This is alias from prev().
    ante: function(){
      return ustr_.prev.apply( this, arguments );
    },
    /*----------------------------------------------------------
      convert string as oct to dec number.
    ----------------------------------------------------------*/
    oct: function( string ){
      string = ( string || "" ).toString();
      var oct_ = string.replace( /^(-?)0o/i, "$1" );
      if ( oct_.match( /^-?[0-7]+$/ ) ) {
        return parseInt( oct_, 8 );
      }
      return 0
    },
    /*----------------------------------------------------------
      padding strings using argument-strings.
      ex)
      padding("-",5) -> "-----"
      padding("-*",5) -> "-*-*-"    
    ----------------------------------------------------------*/
    padding: function( string, length ){
      string = ( string || " " ).toString();
      length = length || 0;
      if ( 0 == length || 0 == string.length ) return "";
      var ret_ = "";
      for (var i_=0; i_<length; i_++) {
        ret_ += string.charAt( i_ % string.length );
      }
      return ret_;
    },
    // This is alias from padding().
    fill: function(){
      return ustr_.padding.apply( this, arguments );
    },
    /*----------------------------------------------------------
      split to 3 parts, before indicate-phraze, phraze and after.
    ----------------------------------------------------------*/
    partition: function( string, phraze ){
      string = ( string || "" ).toString();
      if ( null == phraze || ( 'string' != typeof phraze && !(phraze instanceof RegExp) ) || 0 == phraze.length ) return [ string, "", "" ];
      var reg_ = new RegExp( phraze, "" );
      if ( string.match( reg_ ) ) {
        var ret_ = []
        ret_[0] = string.slice( 0, string.search( reg_ ) );
        ret_[1] = string.match( reg_ )[0];
        ret_[2] = string.slice( ret_[0].length + ret_[1].length );
        return ret_;
      }
      return [ string, "", "" ];
    },
    /*----------------------------------------------------------
      remove phraze from argument-strings.
    ----------------------------------------------------------*/
    remove: function( string, phraze ){
      string = ( string || "" ).toString();
      if ( null == phraze || ( 'string' != typeof phraze && !(phraze instanceof RegExp) ) || 0 == phraze.length ) return string;
      var reg_ = new RegExp( phraze, "g" );
      return string.replace( reg_, "" );
    },
    /*----------------------------------------------------------
      reverse string.
    ----------------------------------------------------------*/
    reverse: function( string ){
      string = ( string || "" ).toString();
      return string.split("").reverse().join("");
    },
    /*----------------------------------------------------------
      return index number(last mached) of strings if the sentence include the phraze.
    ----------------------------------------------------------*/
    rindex: function( string, phraze, opt_offset ){
      string = ( string || "" ).toString();
      if ( null == phraze || ( 'string' != typeof phraze && !(phraze instanceof RegExp) ) || 0 == phraze.length ) return null;
      opt_offset = opt_offset || string.length;
      var str_ = string.slice( 0, opt_offset );
      var reg_ = new RegExp( phraze, "" );
      var last_index_ = 0;
      var last_match_size = 0;
      while ( str_.match( reg_ ) ) {
        var index_ = str_.search( reg_ );
        last_index_ += ( last_match_size + index_ );
        last_match_size = 1;  // if ignore match word. use the next. -> str_.match( reg_ )[0].length
        str_ = str_.slice( index_ + last_match_size );
      }
      return 0 < last_match_size ? last_index_ : null;
    },
    /*----------------------------------------------------------
      padding strings to left side using argument-strings.
    ----------------------------------------------------------*/
    rjust: function( string, length, opt_padding ){
      string = ( string || "" ).toString();
      length = length || string.length;
      opt_padding = opt_padding || " ";
      if ( string.length > length ) length = string.length;
      if ( 0 == opt_padding.length ) opt_padding = " ";
      var diff_length_ = length - string.length;
      return ustr_.padding( opt_padding, diff_length_ ) + string;
    },
    // This is alias from rjust().
    right: function(){
      return ustr_.rjust.apply( this, arguments );
    },
    /*----------------------------------------------------------
      split to 3 parts, before indicate-phraze(last mached), phraze and after.
    ----------------------------------------------------------*/
    rpartition: function( string, phraze ){
      string = ( string || "" ).toString();
      if ( null == phraze || ( 'string' != typeof phraze && !(phraze instanceof RegExp) ) || 0 == phraze.length ) return [ "", "", string ];
      var reg_ = new RegExp( phraze, "" );
      if ( string.match( reg_ ) ) {
        var ret_ = []
        ret_[0] = string.slice( 0, ustr_.rindex( string, reg_ ) );
        ret_[1] = string.slice( ret_[0].length ).match( reg_ )[0];
        ret_[2] = string.slice( ret_[0].length + ret_[1].length );
        return ret_;
      }
      return [ "", "", string ];
    },
    /*----------------------------------------------------------
      remove spaces, tabs or control-codes from end of sentence.
    ----------------------------------------------------------*/
    rstrip: function( string ){
      string = ( string || "" ).toString();
      return string.replace( /[ \t\r\n]+$/, "" );
    },
    /*----------------------------------------------------------
      return mached phraze parts in string as array. 
      ex)
      scan( "foo, bar", "[\w]+" ) -> [ "foo", "bar" ]
      scan( "foo:bar, baz:qux", "([\w]+):([\w]+)" ) -> [ [ "foo", "bar" ], [ "baz", "qux" ] ]
    ----------------------------------------------------------*/
    scan: function( string, phraze ){
      if ( null == string || 'string' != typeof string || 0 == string.length ) return [];
      if ( null == phraze || ( 'string' != typeof phraze && !(phraze instanceof RegExp) ) || 0 == phraze.length ) return [];
      var reg_ = new RegExp( phraze, "g" );
      var ret_ = [];
      string.replace( reg_, function(){
        // not include () in pattern.
        if ( 3 == arguments.length ) {
          ret_[ ret_.length ] = arguments[0];
        }
        // include () in pattern.
        else {
          var ary_ = []
          for ( var i_=1; i_<arguments.length-2; i_++ ) {
            ary_[ ary_.length ] = arguments[i_];
          }
          ret_[ ret_.length ] = ary_;
        }
      } )
      return ret_;
    },
    /*----------------------------------------------------------
      set byte code to strings at index.
    ----------------------------------------------------------*/
    setByte: function( string, index, code ){
      string = ( string || "" ).toString();
      var bytes_ = unescape(encodeURIComponent(string));
      if ( "number" != typeof index || bytes_.length <= index ) return string;
      if ( 0 > index ) index = bytes_.length + index;
      if ( 0 > index ) return string;
      bytes_ = bytes_.slice(0,index) + String.fromCharCode( code ) + bytes_.slice(index+1);
      return decodeURIComponent(escape(bytes_));
    },
    /*----------------------------------------------------------
      Convert same consecutive characters into one character.
    ----------------------------------------------------------*/
    squeeze: function( string ){
      function getConditionElement( obj ){
        if ( "string" == typeof obj && 0 < obj.length ) {
          return new RegExp( obj );
        }
        else if ( obj instanceof RegExp ) {
          return obj;
        }
        return null;
      }
      string = ( string || "" ).toString();
      var conditions_ = [];
      if ( 1 < arguments.length ) {
        if ( null != arguments[1] && "object" == typeof arguments[1] && !(arguments[1] instanceof RegExp) && 0 <= arguments[1].length ) {
          for (var i_=0; i_<arguments[1].length; i_++) {
            conditions_[conditions_.length] = getConditionElement( arguments[1][i_] );
          }
        }
        else {
          for (var i_=1; i_<arguments.length; i_++) {
            conditions_[conditions_.length] = getConditionElement( arguments[i_] );
          }
        }
      }
      return string.replace( /(.)\1{1,}/g, function( all, grp ){
        for (var i_=0; i_<conditions_.length; i_++) {
          if ( null == conditions_[i_] || !all.match( conditions_[i_] ) ) return all;
        }
        return grp;
      } );
    },
    /*----------------------------------------------------------
      remove spaces, tabs or control-codes from begin and end of sentence.
    ----------------------------------------------------------*/
    strip: function( string ){
      string = ( string || "" ).toString();
      return string.replace( /(^[ \t\r\n]+|[ \t\r\n]+$)/g, "" );
    },
    /*----------------------------------------------------------
      return check-sum value.
    ----------------------------------------------------------*/
    sum: function( string, opt_bits ){
      string = ( string || "" ).toString();
      if ( 'number' == typeof opt_bits && 0 >= opt_bits ) return 0;
      opt_bits = opt_bits || 16;
      var bytes_ = unescape(encodeURIComponent(string));
      var value_ = 0;
      for(var i_=0; i_<bytes_.length; i_++){
        value_ = value_ + bytes_.charCodeAt(i_);
      }
      var mask_ = ( ( 1 << opt_bits ) - 1 );
      return value_ & mask_;
    },
    /*----------------------------------------------------------
      swap character lower or upper-case.
    ----------------------------------------------------------*/
    swapcase: function( string ){
      string = ( string || "" ).toString();
      return string.replace( /([a-z]+|[A-Z]+)/g, function( mt ){ 
        return 0x5A >= mt.charCodeAt(0) ? mt.toLowerCase() : mt.toUpperCase();
      } );
    },
    /*----------------------------------------------------------
      generate repeated string
    ----------------------------------------------------------*/
    times: function( string, number ){
      string = ( string || "" ).toString();
      number = parseInt( number );
      if ( 0 == string.length || 0 == number ) return "";
      if ( 0 > number ) {
        string = ustr_.reverse( string );
        number = -number;
      }
      var repeated_str_ = "";
      for ( var i_=0; i_<number; i_++ ) {
        repeated_str_ += string;
      }
      return repeated_str_;
    },
    // This is alias from times().
    repeat: function(){
      return ustr_.times.apply( this, arguments );
    },
    /*----------------------------------------------------------
      Convert array of bytecode.
    ----------------------------------------------------------*/
    toByteArray: function( string ){
      string = ( string || "" ).toString();
      var bytes_ = unescape(encodeURIComponent(string));
      var byte_array_ = [];
      for(var i_=0; i_<bytes_.length; i_++){
        byte_array_[i_] = bytes_.charCodeAt(i_);
      }
      return byte_array_;
    },
    // This is alias from rjust().
    byteCodes: function(){
      return ustr_.toByteArray.apply( this, arguments );
    },
    /*----------------------------------------------------------
      generate next-string and exec block-function during org to dest string.
    ----------------------------------------------------------*/
    upto: function( org_str, dest_str, opt_function ){
      org_str = ( org_str || "" );
      dest_str = ( dest_str || "" );
      if ( !dest_str.match( /[a-zA-Z0-9]+/ ) ) return [ org_str ];
      var org_ret_ = generateRegExpAndValue( org_str );
      var dest_ret_ = generateRegExpAndValue( dest_str );
      // not matched
      if ( !dest_str.match( org_ret_.regexp_next ) || org_ret_.value >= dest_ret_.value ) {
        if ( "function" == typeof opt_function ) opt_function.call( org_str, org_str );
        return [ org_str ];
      }
      // mached next strings
      else {
        var str_ary_ = []
        var seek_str_ = null;
        while( seek_str_ != dest_str ) {
          seek_str_ = ( null == seek_str_ ? org_str : ustr_.next( seek_str_ ) );
          str_ary_[str_ary_.length] = seek_str_;
          if ( "function" == typeof opt_function ) opt_function.call( seek_str_, seek_str_ );
          if ( 65535 <= str_ary_.length ) break;   // for escape from endless-looping
        }
        return str_ary_;
      }
    },
    /*----------------------------------------------------------
      extract phone-number as array
    ----------------------------------------------------------*/
    findPhone: function( string, opt_is_strict ){
      string = ( string || "" ).toString();
      opt_is_strict = ( "boolean" == typeof opt_is_strict && false == opt_is_strict ) ? false : true;
      if ( opt_is_strict ) {
        return string.match( /((81|0)[1-9]0[\-(]?[0-9]{4}[\-)]?[0-9]{4}|(81|0)([1-9]{1}[\-(]?[0-9]{4}|[1-9]{2}[\-(]?[0-9]{3}|[1-9]{3}[\-(]?[0-9]{2}|[1-9]{4}[\-(]?[0-9]{1})[\-)]?[0-9]{4})/g ) || [];
      }
      else {
        return string.match( /((81|0)[1-9][0-9]{0,2}[\-(]?)?[0-9]{1,5}[\-)]?[0-9]{4}/g ) || [];
      }
    },
    // This is alias from findPhone().
    findTel: function(){
      return ustr_.findPhone.apply( this, arguments );
    },
    /*----------------------------------------------------------
      extract email address as array
    ----------------------------------------------------------*/
    findEmail: function( string, opt_is_strict ){
      string = ( string || "" ).toString();
      opt_is_strict = ( "boolean" == typeof opt_is_strict && false == opt_is_strict ) ? false : true;
      if ( opt_is_strict ) {
        return string.match( /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*/g ) || [];
      }
      else {
        return string.match( /[a-zA-Z0-9.!#$%&\-\/*+=?^_{|}~`']+@[a-zA-Z0-9\-.]+/g ) || [];
      }
    },
    /*----------------------------------------------------------
      extract URL as array
    ----------------------------------------------------------*/
    findUrl: function( string, opt_is_strict ){
      string = ( string || "" ).toString();
      opt_is_strict = ( "boolean" == typeof opt_is_strict && false == opt_is_strict ) ? false : true;
      if ( opt_is_strict ) {
        return string.match( new RegExp( url_pattern.absolute_url, "g" ) ) || [];
      }
      else {
        return string.match( new RegExp( "("+url_pattern.relative_url+"|"+url_pattern.absolute_url+")", "g" ) ) || [];
      }
    },
    /*----------------------------------------------------------
      extract IPv4 as array
    ----------------------------------------------------------*/
    findIp4: function( string ){
      string = ( string || "" ).toString();
      return string.match( new RegExp( ip_pattern.IPv4, "g" ) ) || [];
    },
    /*----------------------------------------------------------
      extract IPv6 as array
    ----------------------------------------------------------*/
    findIp6: function( string ){
      string = ( string || "" ).toString();
      return string.match( new RegExp( ip_pattern.IPv6, "g" ) ) || [];
    },
    /*----------------------------------------------------------
      extract IPv4 and IPv6 as array
    ----------------------------------------------------------*/
    findIp: function( string ){
      string = ( string || "" ).toString();
      return string.match( new RegExp( "("+ip_pattern.IPv4+"|"+ip_pattern.IPv6+")", "g" ) ) || [];
    },
    /*----------------------------------------------------------
      get string of each part of url as object
    ----------------------------------------------------------*/
    parseUrl: function( string ){
      string = ( string || "" ).toString();
      var org_string_ = string;
      string = string.replace( /[\?\#]$/, "" );
      if ( !string.match( new RegExp( "^" + url_pattern.schema )) && !string.match( /^(\.|\/)/ ) && 0 < string.length ) {
        string = "./" + string;
      }
      var find_results_ = ustr_.findUrl( string, false );
      if ( 0 == find_results_.length || 1 < find_results_.length || string != find_results_[0] ) return null;
      var ret_ = { url:org_string_, schema:null, user:null, password:null, fqdn:null, host:null, domain:null, ip4:null, ip6:null, port:null, path:null, query:null, queries:null, fragment:null };
      var tmp_ = string;
 
      // try to get schema
      var schema_ = tmp_.match( new RegExp( "^" + url_pattern.schema ));
      if ( schema_ ) {
        ret_.schema = schema_[0].replace(":","");
        tmp_ = tmp_.slice( schema_[0].length )
      }
      tmp_ = tmp_.replace( /^(\/\/)/, "" );

      // if absolute url
      if ( !tmp_.match( /^(\.|\.\.)?\// ) ) {
        // try to get user, host, domain and port
        var fqdn_ = tmp_.match( new RegExp( "^" + url_pattern.host ));
        if ( fqdn_ ) {
          ret_.fqdn = fqdn_[0];
          tmp_ = tmp_.slice( fqdn_[0].length );

          // try to get user
          fqdn_ = ret_.fqdn;
          var user_password_ = fqdn_.match( new RegExp( "^" + url_pattern.userinfo ));
          if ( user_password_ ) {
            var user_ = user_password_[0].match( /^[^:]+/ );
            ret_.user = user_ ? user_[0] : null;
            if ( ret_.user ) {
              ret_.password = user_password_[0].slice( ret_.user.length + 1 );
              if ( ret_.password ) ret_.password = ret_.password.slice( 0, ret_.password.length-1 );
            }
            ret_.fqdn = ret_.fqdn.slice( user_password_[0].length );
          }
          // try to get port
          fqdn_ = ret_.fqdn;
          var port_ = fqdn_.match( new RegExp( url_pattern.port + "$" ));
          if ( port_ ) {
            ret_.port = port_[0].slice( 1 );
            ret_.fqdn = ret_.fqdn.slice( 0, ret_.fqdn.length - ret_.port.length - 1 );
          }
          // try to get IPv6
          fqdn_ = ret_.fqdn;
          var ip6_ = fqdn_.match( new RegExp( "^\\[" + ip_pattern.IPv6 + "\\]$" ) );
          if ( ip6_ ) {
            ret_.ip6 = fqdn_.match( new RegExp( ip_pattern.IPv6 ) )[0];
          }
          // try to get IPv4
          else {
            var ip4_ = fqdn_.match( new RegExp( "^" + ip_pattern.IPv4 + "$" ) );
            if ( ip4_ ) {
              ret_.ip4 = ip4_[0];
            }
            // try to get domain
            else {
              var domain_ = fqdn_.match( new RegExp( domain_pattern.domain + "$" ) );
              if ( domain_ ) {
                ret_.domain = domain_[0];
                fqdn_ = fqdn_.slice( 0, fqdn_.length - ret_.domain.length );
                if ( 0 < fqdn_.length ) {
                  // try to get host
                  var host_ = fqdn_.match( new RegExp( "^" + domain_pattern.host ) );
                  if ( host_ ){
                    ret_.host = host_[0];
                  }
                }
              }
            }
          }
          

        }
        if ( 0 == tmp_.length ) return ret_;
      }

      // relational url?
      var relational = "";
      if ( tmp_.match( /^\.\// ) ) {
        relational = "./";
        tmp_ = tmp_.slice( 1 );
      }
      if ( tmp_.match( /^\.\.\// ) ) {
        relational = "../";
        tmp_ = tmp_.slice( 2 );
      }
      // try to get path
      var path_ = tmp_.match( new RegExp( "^" + url_pattern.path ));
      if ( path_ ) {
        ret_.path = path_[0];
        // if there is host and top character is "/", remove "/". because it is not meaning root path.
        if ( ret_.path.match( /^\/($|[^\/])/ ) ) {
          ret_.path = ret_.path.slice( 1 );
        }
        ret_.path = relational + ret_.path;
        tmp_ = tmp_.slice( path_[0].length );
        if ( 0 == tmp_.length ) return ret_;
      }
      
      // try to get fragment
      var fragment_ = tmp_.match( new RegExp( "^" + url_pattern.fragment ));
      if ( fragment_ ) {
        ret_.fragment = fragment_[0].slice( 1 );
        tmp_ = tmp_.slice( fragment_[0].length );
        if ( 0 == tmp_.length ) return ret_;
      }

      // try to get query
      var query_ = tmp_.match( new RegExp( "^" + url_pattern.query ));
      if ( query_ ) {
        ret_.query = query_[0].slice( 1 );
        tmp_ = tmp_.slice( query_[0].length );

        ret_.queries = {};
        var queries_ = ret_.query.split( /[\/\?&]/g );
        for ( var i_=0; i_<queries_.length; i_++ ) {
          var key_value = queries_[i_].split( "=" );
          if ( queries_[i_].match( /=$/ ) ) key_value[1] = null;
          ret_.queries[ key_value[0] ] = ( "undefined" == typeof key_value[1] ? null : key_value[1] );
        }

        if ( 0 == tmp_.length ) return ret_;
      }

      // try to get fragment again
      var fragment_ = tmp_.match( new RegExp( "^" + url_pattern.fragment ));
      if ( fragment_ ) {
        ret_.fragment = fragment_[0].slice( 1 );
        tmp_ = tmp_.slice( fragment_[0].length );
      }

      return ret_;
    },
    /*----------------------------------------------------------
      generate new Url from two Url( absolute url + relative url )
    ----------------------------------------------------------*/
    mergeUrl: function( url1, url2 ){
      url1 = ( url1 || "" ).toString();
      url2 = ( url2 || "" ).toString();
      var url1_obj_ = ustr_.parseUrl( url1 );
      var url2_obj_ = ustr_.parseUrl( url2 );
      if ( null == url1_obj_ || null == url2_obj_ ) return null;

      // decide priority
      var need_reverse_ = false;
      if ( null == url1_obj_.schema && null != url2_obj_.schema ) need_reverse_ = true;
      if ( null == url1_obj_.fqdn && null != url2_obj_.fqdn ) need_reverse_ = true;
      if ( need_reverse_ ) {
        var tmp;
        tmp = url2_obj_;
        url2_obj_ = url1_obj_;
        url1_obj_ = tmp;
      }
      
      // merge parts of url
      // { url:org_string_, schema:null, user:null, password:null, fqdn:null, host:null, domain:null, ip4:null, ip6:null, port:null, path:null, query:null, queries:null, fragment:null }
      var ret_ = url1_obj_;
      if ( null != url2_obj_.schema ) ret_.schema = url2_obj_.schema;
      if ( null != url2_obj_.user ) { 
        ret_.user = url2_obj_.user;
        ret_.password = url2_obj_.password; 
      }
      if ( null != url2_obj_.fqdn ) { 
        ret_.fqdn = url2_obj_.fqdn; 
        ret_.host = url2_obj_.host;
        ret_.domain = url2_obj_.domain;
        ret_.ip4 = url2_obj_.ip4;
        ret_.ip6 = url2_obj_.ip6;
        ret_.port = url2_obj_.port;
      }
      ret_.query = url2_obj_.query;
      ret_.queries = url2_obj_.queries;
      ret_.fragment = url2_obj_.fragment;

      if ( null != ret_.path && 0 < ret_.path.length ) {
        if ( null != url2_obj_.path && 0 < url2_obj_.path.length ) {
          if ( !ret_.path.match( /^\.\// ) ) ret_.path = "./" + ret_.path;
          ret_.path = ustr_.mergePath( ret_.path, url2_obj_.path );          
        }
      }
      else if ( null != url2_obj_.path && 0 < url2_obj_.path.length ) {
        ret_.path = url2_obj_.path;
      }
      if ( null != ret_.fqdn && null != ret_.path ) ret_.path = ret_.path.replace( /^\.\//, "" );

      // generate url
      var url_ = "";
      if ( null != ret_.schema ) url_ = ret_.schema + ":";
      if ( null != ret_.fqdn ) {
        url_ += "//";
        if ( null != ret_.user ) {
          url_ += ret_.user;
          if ( null != ret_.password ) url_ += ":" + ret_.password;
          url_ += "@";
        }
        url_ += ret_.fqdn;
        if ( ret_.port ) url_ += ":" + ret_.port;
      }
      if ( null != ret_.path ) {
        if ( 0 < url_.length ) {
          url_ += "/" + ret_.path;
        }
        else {
          url_ = ret_.path;
          if ( url_.match( /^[^\.\/]/ ) ) url_ = "./" + url_;
        }
      }
      if ( null != ret_.query ) url_ += "?" + ret_.query;
      if ( null != ret_.fragment ) url_ += "#" + ret_.fragment;
      ret_.url = url_;

      return ret_.url;
    },
    /*----------------------------------------------------------
      get string of each directory and file as object 
    ----------------------------------------------------------*/
    parsePath: function( string ){
      string = ( string || "" ).toString();
      var ret_ = { path:null, delimiter:null, root:null, directory:null, directories:null, file:null, extension:null };
      if ( !string.match( /^(\.(\/|¥)|\.\.(\/|¥)|(\/|¥)|[a-zA-Z]:(\/|¥))?([^\/¥]+(\/|¥|$))+/ ) || string.match( /(\/|¥){2,}/ ) ) return null;
      ret_.path = string;

      // get root ( /root/ or c:¥ )
      var tmp = string.match( /^(\/[^\/¥]+(\/|$)|[a-zA-Z]:(\/|¥))/ );
      if ( tmp ) {
        ret_.root = tmp[0].replace( /(^\/|(\/|¥)$)/g, "" );
        string = string.slice( tmp[0].length );
      }

      // get directory
      var tmp = string.match( /^([^\/¥]+(\/|¥))+/ );
      if ( tmp ) {
        ret_.directory = tmp[0].replace( /(\/|¥)$/, "" );
        string = string.slice( tmp[0].length );

        // get delimiter
        if ( tmp[0].match( /¥/ ) || ( ret_.root && ret_.root.match( /[a-zA-Z]:(\/|¥)/ ) ) ) {
          ret_.delimiter = "¥";
        }
        else {
          ret_.delimiter = "/";
        }

        // get directories
        ret_.directories = ret_.directory.replace( /¥/g, "/" ).split( "/" );
      }
      
      // get file
      ret_.file = ( 0 < string.length ? string : null );

      // get extension
      if ( ret_.file ) {
        var tmp_ = ret_.file.match( /\.[^\.]+$/ );
        if ( tmp_ ) {
          ret_.extension = tmp_[0].replace( /^./, "" );
        }
      }

      return ret_;
    },
    /*----------------------------------------------------------
      generate new Path from two Path
    ----------------------------------------------------------*/
    mergePath: function( path1, path2 ){
      // remove current and normalization back directory(../) depth
      function normalizationDirectory( directories ){
        var ret_ = [];
        // remove current
        for ( var i=0; i<directories.length; i++ ) {
          if ( "." == directories[i] ) continue;
          ret_[ ret_.length ] = directories[i];
        }
        directories = ret_;
        ret_ = [];
        // normalization back directory
        var is_directory = false;
        for ( var i=0; i<directories.length; i++ ) {
          if ( ".." == directories[i] ) {
            if ( is_directory ) {
              ret_.splice( ret_.length-1, 1 );
              if ( ret_.length == backDirectoryDepth( ret_ ) ) is_directory = false;
            }
            else {
              ret_[ ret_.length ] = directories[i];
            }
            continue;
          }
          is_directory = true;
          ret_[ ret_.length ] = directories[i];
        }
        return ret_;
      }
      // count back directory(../) depth
      function backDirectoryDepth( directories ){
        for ( var i=0; i<directories.length; i++ ) {
          if ( ".." != directories[i] ) return i;
        }
        return i;
      }

      path1 = ( path1 || "" ).toString();
      path2 = ( path2 || "" ).toString();
      var path1_obj_ = ustr_.parsePath( path1 );
      var path2_obj_ = ustr_.parsePath( path2 );
      if ( null == path1_obj_ || null == path2_obj_ ) return null;

      // decide priority
      var need_reverse_ = false;
      if ( null == path1_obj_.root && null != path2_obj_.root ) need_reverse_ = true;
      if ( null == path1_obj_.root && null == path1_obj_.directory && null != path2_obj_.directory ) need_reverse_ = true;
      if ( need_reverse_ ) {
        var tmp_;
        tmp_ = path2_obj_;
        path2_obj_ = path1_obj_ 
        path1_obj_ = tmp_;
      }
      if ( null != path1_obj_.root && null != path2_obj_.root ) return path2_obj_.path;

      // merge parts of path
      // { path:null, delimiter:null, root:null, directory:null, directories:null, file:null }
      var ret_ = path1_obj_;
      if ( null != path2_obj_.root ) ret_.root = path2_obj_.root;
      ret_.file = path2_obj_.file;
      if ( null != path2_obj_.delimiter ) ret_.delimiter = path2_obj_.delimiter;
      
      if ( null == ret_.directory ) {
        ret_.directory = path2_obj_.directory;
        ret_.directories = path2_obj_.directories;
      }
      else if ( null != path2_obj_.directory ) {
        ret_.directories = normalizationDirectory( ret_.directories.concat( path2_obj_.directories ) );
        if ( 0 == ret_.directories.length ) {
          if ( null != ret_.root ) {
            ret_.directories = null;
            ret_.directory = null;
          }
          else {
            ret_.directories[0] = "."
            ret_.directory = "./";
          }
        }
        else {
          if ( null == ret_.root && 0 == backDirectoryDepth( ret_.directories ) ) {
            ret_.directories = [ "." ].concat( ret_.directories );
          }
          ret_.directory = ret_.directories.join( ret_.delimiter || "/" );
        }
      }

      // generate path
      path_ = "";
      if ( null != ret_.root ) path_ = ( ret_.root.match( /[a-zA-Z]:/ ) ? ret_.root : "/"+ret_.root ) + ( ret_.delimiter || "/" );
      if ( null != ret_.directory ) {
        path_ += ret_.directory;
        if ( !path_.match( /(\/|¥)$/ ) ) path_ += ( ret_.delimiter || "/" );
      }
      if ( null != ret_.file ) path_ += ret_.file;
      ret_.path = path_;

      return ret_.path;
    },
    /*----------------------------------------------------------
      diff 2 strings and return org to from edit way
    ----------------------------------------------------------*/
    diff: function( org, dest ){
      org = ( org || "" ).toString();
      dest = ( dest || "" ).toString();
      var orgs_ = org.split("");
      var dests_ = dest.split("");
      var reverse_flag=false;
      // always make shoter than horizontal.
      if ( orgs_.length > dests_.length ) {
        var tmp = dests_;
        dests_ = orgs_;
        orgs_ = tmp;
        reverse_flag = true;
      }

      // for temporary data of searching routes.
      var map_ = initialArray( orgs_.length+1, dests_.length+1, null );

      // search
      var ret_ = diffWuSearch( map_, orgs_, dests_ );
      // reverse edition type if swap org and dest
      if ( reverse_flag ) {
        for ( var i_=0; i_<ret_.length; i_++ ) {
          switch( ret_[i_].type ){
          case "+":
            ret_[i_].type = "-"
            break;
          case "-":
            ret_[i_].type = "+"
            break;
          }
        }
      }
      // return value and reverse route. because order of route datas are from end to start.
      return ret_.reverse();
    },
    /*----------------------------------------------------------
      diff each line and return org to from edit way
    ----------------------------------------------------------*/
    diffLine: function( org, dest ){
      org = ( org || "" ).toString();
      dest = ( dest || "" ).toString();
      var orgs_ = toArrayLine( org );
      var dests_ = toArrayLine( dest );
      var reverse_flag=false;
      // always make shoter than horizontal.
      if ( orgs_.length > dests_.length ) {
        var tmp = dests_;
        dests_ = orgs_;
        orgs_ = tmp;
        reverse_flag = true;
      }

      // for temporary data of searching routes.
      var map_ = initialArray( orgs_.length+1, dests_.length+1, null );

      // search
      var ret_ = diffWuSearch( map_, orgs_, dests_ );
      // reverse edition type if swap org and dest
      if ( reverse_flag ) {
        for ( var i_=0; i_<ret_.length; i_++ ) {
          ret_[i_].value = toArrayLine( ret_[i_].value );
          switch( ret_[i_].type ){
          case "+":
            ret_[i_].type = "-"
            break;
          case "-":
            ret_[i_].type = "+"
            break;
          }
        }
      }
      else {
        for ( var i_=0; i_<ret_.length; i_++ ) {
          ret_[i_].value = toArrayLine( ret_[i_].value );
        }        
      }
      // return value and reverse route. because order of route datas are from end to start.
      return ret_.reverse();
    },
    /*----------------------------------------------------------
      This is alias from charAt().
    ----------------------------------------------------------*/
    charAt: function( string ){
      string = ( string || "" );
      return string.charAt.apply( string, getArgumentsExceptContext( arguments ) );
    },
    /*----------------------------------------------------------
      This is alias from String.charCodeAt().
    ----------------------------------------------------------*/
    charCodeAt: function( string ){
      string = ( string || "" );
      return string.charCodeAt.apply( string, getArgumentsExceptContext( arguments ) );
    },
    /*----------------------------------------------------------
      This is alias from String.concat().
    ----------------------------------------------------------*/
    concat: function( string ){
      string = ( string || "" );
      return string.concat.apply( string, getArgumentsExceptContext( arguments ) );
    },
    /*----------------------------------------------------------
      This is alias from String.lastIndexOf().
    ----------------------------------------------------------*/
    lastIndexOf: function( string ){
      string = ( string || "" );
      return string.lastIndexOf.apply( string, getArgumentsExceptContext( arguments ) );
    },
    /*----------------------------------------------------------
      This is alias from String.match().
    ----------------------------------------------------------*/
    match: function( string ){
      string = ( string || "" );
      return string.match.apply( string, getArgumentsExceptContext( arguments ) );
    },
    /*----------------------------------------------------------
      This is alias from String.replace().
    ----------------------------------------------------------*/
    replace: function( string ){
      string = ( string || "" );
      return string.replace.apply( string, getArgumentsExceptContext( arguments ) );
    },
    /*----------------------------------------------------------
      This is alias from String.search().
    ----------------------------------------------------------*/
    search: function( string ){
      string = ( string || "" );
      return string.search.apply( string, getArgumentsExceptContext( arguments ) );
    },
    /*----------------------------------------------------------
      This is alias from String.slice().
    ----------------------------------------------------------*/
    slice: function( string ){
      string = ( string || "" );
      return string.slice.apply( string, getArgumentsExceptContext( arguments ) );
    },
    /*----------------------------------------------------------
      This is alias from String.split().
    ----------------------------------------------------------*/
    split: function( string ){
      string = ( string || "" );
      return string.split.apply( string, getArgumentsExceptContext( arguments ) );
    },
    /*----------------------------------------------------------
      This is alias from String.substr().
    ----------------------------------------------------------*/
    substr: function( string ){
      string = ( string || "" );
      return string.substr.apply( string, getArgumentsExceptContext( arguments ) );
    },
    /*----------------------------------------------------------
      This is alias from String.substring().
    ----------------------------------------------------------*/
    substring: function( string ){
      string = ( string || "" );
      return string.substring.apply( string, getArgumentsExceptContext( arguments ) );
    },
    /*----------------------------------------------------------
      This is alias from String.toLowerCase().
    ----------------------------------------------------------*/
    toLowerCase: function( string ){
      string = ( string || "" );
      return string.toLowerCase.apply( string, getArgumentsExceptContext( arguments ) );
    },
    /*----------------------------------------------------------
      This is alias from String.toUpperCase().
    ----------------------------------------------------------*/
    toUpperCase: function( string ){
      string = ( string || "" );
      return string.toUpperCase.apply( string, getArgumentsExceptContext( arguments ) );
    },
    /*----------------------------------------------------------
      This is alias from String.toString().
    ----------------------------------------------------------*/
    toS: function( string ){
      string = ( string || "" );
      return string.toString();
    },
  };
  /*----------------------------------------------------------
  // override toString
  //   return context(string) or arguments.
  ----------------------------------------------------------*/
  $UStr.prototype.toString = function( string ){
    return ( string || this.context ).toString();
  };
  /*----------------------------------------------------------
    Define prototype functions.
  ----------------------------------------------------------*/
  for ( var key_ in ustr_ ) {
    $UStr.prototype[key_] = function(){
      var arg_ = [];
      if ( "undefined" != typeof this.context ) {
        arg_ = [ this.context ];
      }
      for (var i_=0; i_<arguments.length; ++i_) {
        arg_[arg_.length] = arguments[i_];
      }
      var ret_ = ustr_[arguments.callee.method_name].apply( this, arg_ );
      switch( typeof ret_ ){
        case 'string':
          if ( "undefined" != typeof this.context ) {
            return new $UStr( ret_ );
          }
          break;
        case 'undefined':
          return;
      }
      return ret_;
    };
    $UStr.prototype[key_].method_name = key_;
  }
}
if ( "undefined" == typeof $ustr ) {
  var $ustr = new $UStr();
}
