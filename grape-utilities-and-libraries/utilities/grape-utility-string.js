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
  var plural_irregular = {
    'man':          'men',
    'seaman':       'seamen',
    'snowman':      'snowmen',
    'woman':        'women',
    'person':       'people',
    'child':        'children',
    'foot':         'feet',
    'crux':         'cruces',
    'oasis':        'oases',
    'phenomenon':   'phenomena',
    'tooth':        'teeth',
    'goose':        'geese',
    'genus':        'genera',
    'graffito':     'graffiti',
    'mythos':       'mythoi',
    'numen':        'numina',
    'equipment':    'equipment',
    'information':  'information',
    'rice':         'rice',
    'money':        'money',
    'species':      'species',
    'series':       'series',
    'fish':         'fish',
    'sheep':        'sheep',
    'swiss':        'swiss',
    'chief':        'chiefs',
    'cliff':        'cliffs',
    'proof':        'proofs',
    'reef':         'reefs',
    'relief':       'reliefs',
    'roof':         'roofs',
    'piano':        'pianos',
    'photo':        'photos',
    'safe':         'safes',
  };
  plural_rules = [
    [ new RegExp( /(a|i|u|e|o)o$/, "i" ), "$1os" ],
    [ new RegExp( /(s|x|sh|ch|o)$/, "i" ), "$1es" ],
    [ new RegExp( /(b|c|d|f|g|h|j|k|l|m|n|p|q|r|s|t|v|w|x|y|z)y$/, "i" ), "$1ies" ],
    [ new RegExp( /(f|fe)$/, "i" ), "ves" ],
  ];
  var singular_irregular = {
    'men':          'man',
    'seamen':	      'seaman',
    'snowmen':	    'snowman',
    'women':	      'woman',
    'people':	      'person',
    'children':	    'child',
    'sexes':	      'sex',
    'moves':	      'move',
    'databases':	  'database',
    'feet':	        'foot',
    'cruces':	      'crux',
    'oases':	      'oasis',
    'phenomena':	  'phenomenon',
    'teeth':	      'tooth',
    'geese':	      'goose',
    'atlases':	    'atlas',
    'corpuses':	    'corpus',
    'genies':	      'genie',
    'genera':	      'genus',
    'graffiti':	    'graffito',
    'loaves':	      'loaf',
    'mythoi':	      'mythos',
    'niches':	      'niche',
    'numina':	      'numen',
    'octopuses':	  'octopus',
    'opuses':	      'opus',
    'penises':	    'penis',
    'equipment':	  'equipment',
    'information':	'information',
    'rice':	        'rice',
    'money':	      'money',
    'species':	    'species',
    'series':	      'series',
    'fish':	        'fish',
    'sheep':	      'sheep',
    'swiss':	      'swiss',
    'leaves':       'leaf',
    'ganglions':    'ganglion',
    'leaves':       'leaf', 
    'monies':       'money', 
    'soliloquies':  'soliloquy',
    'testes':       'testis', 
  };
  var singular_rules = [
    [ new RegExp( /(quiz)zes$/, "i" ),	"$1" ],
    [ new RegExp( /(matr)ices$/, "i" ),	"$1ix" ],
    [ new RegExp( /(vert|ind)ices$/, "i" ),	"$1ex" ],
    [ new RegExp( /^(ox)en/, "i" ),	"$1" ],
    [ new RegExp( /(alias|status)es$/, "i" ),	"$1" ],
    [ new RegExp( /(octop|vir)i$/, "i" ),	"$1us" ],
    [ new RegExp( /(cris|ax|test)es$/, "i" ), "$1is" ],
    [ new RegExp( /(shoe)s$/, "i" ), "$1" ],
    [ new RegExp( /(o)es$/, "i" ), "$1" ],
    [ new RegExp( /(bus)es$/, "i" ), "$1" ],
    [ new RegExp( /([m|l])ice$/, "i" ), "$1ouse" ],
    [ new RegExp( /(x|ch|ss|sh)es$/, "i" ), "$1" ],
    [ new RegExp( /movies$/, "i" ), "movie" ],
    [ new RegExp( /series$/, "i" ), "series" ],
    [ new RegExp( /([^aeiouy]|qu)ies$/, "i" ), "$1y" ],
    [ new RegExp( /([lr])ves$/, "i" ), "$1f" ],
    [ new RegExp( /(tive)s$/, "i" ), "$1" ],
    [ new RegExp( /(hive)s$/, "i" ), "$1" ],
    [ new RegExp( /([^f])ves$/, "i" ), "$1fe" ],
    [ new RegExp( /(^analy)ses$/, "i" ), "$1sis" ],
    [ new RegExp( /(analy|ba|diagno|parenthe|progno|synop|the)ses$/, "i" ), "$1sis" ],
    [ new RegExp( /([ti])a$/, "i" ), "$1um" ],
    [ new RegExp( /(n)ews$/, "i" ), "$1ews" ],
    [ new RegExp( /(.)s$/, "i" ), "$1" ],
  ];
  var week_names        = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ];
  var abbr_week_names   = [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ];
  var month_names       = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
  var abbr_month_names  = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
  var abbr_timezone     = [ [ 'BIT', -720 ], [ 'SST', -660 ], [ 'HST', -600 ], [ 'AKST', -540 ], [ 'PST', -480 ], [ 'MST', -420 ], [ 'CST', -360 ], [ 'CST', -300 ], [ 'CLT', -240 ], [ 'UYT', -180 ], [ 'BRST', -120 ], [ 'AZOT', -60 ], [ 'UTC', 0 ], [ 'IST', 60 ], [ 'IST', 120 ], [ 'AST', 180 ], [ 'IRST', 210 ], [ 'GET', 240 ], [ 'AFT', 270 ], [ 'PKT', 300 ], [ 'IST', 330 ], [ 'NPT', 345 ], [ 'BST', 360 ], [ 'MMT', 390 ], [ 'THA', 420 ], [ 'SST', 480 ], [ 'ACWST', 525 ], [ 'JST', 540 ], [ 'ACST', 570 ], [ 'AEST', 600 ], [ 'LHST', 630 ], [ 'BST', 660 ], [ 'NZST', 720 ], [ 'CHAST', 765 ], [ 'NZDT', 780 ], [ 'CHADT', 825 ], [ 'LINT', 840 ] ];
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
      return similarity ratio of string
    ----------------------------------------------------------*/
    similarity: function( org, dest ){
      if ( org == dest ) return 1;
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

      var p_ = deletionCount( orgs_, dests_ );  // deletion count
      var delta_ = dests_.length - orgs_.length;  // str length delta
      var edition_ = delta_ + 2 * p_; // Levenshtein distance
      var same_ = ( dests_.length + orgs_.length ) - edition_;  // same str count
      if ( 0 == same_ || 0 == dests_.length ) return 0;
      return ( same_ / 2 ) / dests_.length;
    },
    /*----------------------------------------------------------
      return strings of inside closed character.
    ----------------------------------------------------------*/
    findBlock: function( string, opt_delimiter, opt_allowNest, opt_isEscapeSameChar, opt_isEscapeReverseSolidus ){
      string = ( string || "" ).toString();
      opt_delimiter = ( opt_delimiter || '"' ).toString();
      opt_allowNest              = ( "boolean" == typeof opt_allowNest ? opt_allowNest : true );
      opt_isEscapeSameChar       = ( "boolean" == typeof opt_isEscapeSameChar ? opt_isEscapeSameChar : true );
      opt_isEscapeReverseSolidus = ( "boolean" == typeof opt_isEscapeReverseSolidus ? opt_isEscapeReverseSolidus : false );
      if ( 0 == string.length ) return [];
      var st_delimiter_ = opt_delimiter.slice( 0, 1 );
      var ed_delimiter_ = opt_delimiter.slice( 1, 2 ) || st_delimiter_;

      var ret_=[];
      var isInside=false;
      var needBreak_;
      var nest_=0;
      while( 0 != string.length ){
        needBreak_ = false;
        for ( var i_=0; i_<string.length; i_++ ) {
          switch ( string.charAt(i_) ){
          case st_delimiter_:
            if ( !isInside ) {
              isInside = true;
              string = string.slice( i_+1 );
              needBreak_ = true;
              if ( opt_allowNest ) nest_++;
              break;
            }
            else if ( st_delimiter_ == ed_delimiter_ ) {
              if ( opt_isEscapeSameChar && i_+1<string.length && ed_delimiter_ == string.charAt(i_+1) ) {
                i_++;   // ignore
                break;
              }
              ret_[ret_.length] = string.slice( 0, i_ );
              string = string.slice( i_+1 );
              isInside = false;
              needBreak_ = true;
            }
            else if ( opt_allowNest ) {
              nest_++;
            }            
            break;
          case ed_delimiter_:
            if ( isInside ) {
              if ( opt_isEscapeSameChar && i_+1<string.length && ed_delimiter_ == string.charAt(i_+1) ) {
                i_++;   // ignore
                break;
              }
              if ( opt_allowNest ) nest_--;
              if ( 0 == nest_ ) {
                ret_[ret_.length] = string.slice( 0, i_ );
                string = string.slice( i_+1 );
                isInside = false;
                needBreak_ = true;
              }
            }
            break;
          case "\\":
            if ( isInside && opt_isEscapeReverseSolidus ) {
              if ( i_+1<string.length && ( ed_delimiter_ == string.charAt(i_+1) || "\\" == string.charAt(i_+1) ) ) {
                i_++;   // ignore
                break;
              }
            }
            break;
          case "¥":
            if ( isInside && opt_isEscapeReverseSolidus ) {
              if ( i_+1<string.length && ( ed_delimiter_ == string.charAt(i_+1) || "¥" == string.charAt(i_+1) ) ) {
                i_++;   // ignore
                break;
              }
            }
            break;
          }
          if ( needBreak_ ) break;
        }
        if ( i_ == string.length ) break;
      }

      // escape
      if ( opt_isEscapeSameChar || opt_isEscapeReverseSolidus ) {
        var tmp_;
        var now_;
        for ( var i_=0; i_<ret_.length; i_++ ) {
          tmp_ = "";
          for ( var j_=0; j_<ret_[i_].length; j_++ ) {
            now_ = ret_[i_].charAt(j_);
            switch( now_ ){
            case st_delimiter_:
              if ( opt_isEscapeSameChar && j_+1<ret_[i_].length && st_delimiter_ == ret_[i_].charAt(j_+1) ) {
                j_++;   // ignore
              }
              tmp_ += now_
              break;
            case ed_delimiter_:
              if ( opt_isEscapeSameChar && j_+1<ret_[i_].length && ed_delimiter_ == ret_[i_].charAt(j_+1) ) {
                j_++;   // ignore
              }
              tmp_ += now_
              break;
            case "\\":
              if ( opt_isEscapeReverseSolidus && j_+1<ret_[i_].length ) {
                if ( "\\" == ret_[i_].charAt(j_+1) ) {
                  j_++;   // ignore
                  tmp_ += now_
                  break;
                }
                else if ( st_delimiter_ == ret_[i_].charAt(j_+1) ) {
                  j_++;   // ignore
                  tmp_ += st_delimiter_
                  break;
                }
                else if ( ed_delimiter_ == ret_[i_].charAt(j_+1) ) {
                  j_++;   // ignore
                  tmp_ += ed_delimiter_
                  break;
                }
              }
              tmp_ += now_
              break;
            case "¥":
              if ( opt_isEscapeReverseSolidus && j_+1<ret_[i_].length ) {
                if ( "¥" == ret_[i_].charAt(j_+1) ) {
                  j_++;   // ignore
                  tmp_ += now_
                  break;
                }
                else if ( st_delimiter_ == ret_[i_].charAt(j_+1) ) {
                  j_++;   // ignore
                  tmp_ += st_delimiter_
                  break;
                }
                else if ( ed_delimiter_ == ret_[i_].charAt(j_+1) ) {
                  j_++;   // ignore
                  tmp_ += ed_delimiter_
                  break;
                }
              }
              tmp_ += now_
              break;
            default:
              tmp_ += now_
            }
          }
          ret_[i_] = tmp_;        
        }
      }

      return ret_;
    },
    /*----------------------------------------------------------
      parse strings as csv and return data as array.
    ----------------------------------------------------------*/
    parseCsv: function( string, opt_delimiter, opt_isNormalization ){
      function getCols( line, last_col_not_closed, opt_delimiter ) {
        var analyzed_cols_ = [];
        var analyzed_index_ = 0;
        var is_inside_ = last_col_not_closed || false;
        var is_block   = is_inside_;
        var last_block = false;
        var tmp_ = "";
        if ( is_inside_ ) tmp_ += "\n";
        for ( var i_=0; i_<line.length; i_++ ) {
          switch( line.charAt( i_ ) ){
          case opt_delimiter:
            if ( is_inside_ && is_block ) {
              tmp_ += line.charAt( i_ );
            }
            else {
              if ( !last_block ) tmp_ = tmp_.replace( /[ \t]+$/, "" );
              analyzed_cols_[ analyzed_index_ ] = tmp_;
              analyzed_index_++;
              is_inside_ = false;
              last_block = false;
              tmp_ = "";
            }
            break;

          case '"':
            if ( !is_inside_ ) {
              is_inside_ = true;
              is_block = true;
            }
            else {
              if ( !is_block ) {
                tmp_ += line.charAt( i_ );
              }
              else {
                if ( i_ == line.length-1 || '"' != line.charAt( i_ + 1 ) ) {
                  is_inside_ = false;
                  is_block = false;
                  last_block = true;
                }
                else {
                  tmp_ += line.charAt( i_ );
                  if ( '"' == line.charAt( i_ + 1 ) ) i_++;
                }
              }
            }            
            break;

          case " ":
          case "\t":
            if ( is_inside_ ) {
              tmp_ += line.charAt( i_ );
            }
            break;

          default:
            if ( !is_inside_ ) {
              is_inside_ = true;
            }
            tmp_ += line.charAt( i_ );
            break;
          }
        }
        if ( !is_block && is_inside_ ) is_inside_ = false;
        if ( !is_inside_ && !last_block ) tmp_ = tmp_.replace( /[ \t]+$/, "" );
        if ( 0 < tmp_.length ) analyzed_cols_[ analyzed_index_ ] = tmp_;
        return {
          analyzed_cols_: analyzed_cols_,
          last_col_not_closed: is_inside_
        };
      }

      string = ( string || "" ).toString().replace( /[\n\r]+$/, "" );
      opt_delimiter = ( opt_delimiter || "," ).toString();
      opt_isNormalization = ( "boolean" == typeof opt_isNormalization ? opt_isNormalization : false );
      if ( 0 == string.length ) return [];

      var lines_ = string.split("\n");
      var last_col_not_closed_ = false;
      var analyzed_cols_;

      var row_index_ = 0;
      var col_index_ = 0;
      var max_col_index = 0;
      var ret_ = []

      // analyze row
      for ( var i_=0; i_<lines_.length; i_++ ) {
        // analyze cols
        var cols_ = getCols( lines_[i_], last_col_not_closed_, opt_delimiter );
        analyzed_cols_ = cols_.analyzed_cols_;
        ret_[row_index_] = ret_[row_index_] || [];
        // analyze col
        var col_ = "";
        while ( 0 < analyzed_cols_.length ) {
          col_ = analyzed_cols_[0];
          analyzed_cols_.splice(0,1);

          ret_[row_index_][col_index_] = ret_[row_index_][col_index_] || "";
          ret_[row_index_][col_index_] += col_;

          if ( 0 == analyzed_cols_.length ) {
            if ( false == cols_.last_col_not_closed ) {
              col_index_++;
            }
          }
          else {
            col_index_++;
          }
        }
        if ( false ==  cols_.last_col_not_closed ) {
          row_index_++;
          if ( col_index_ > max_col_index ) max_col_index = col_index_;
          col_index_ = 0;
        }
        last_col_not_closed_ = cols_.last_col_not_closed;
      }

      // remove last return-code.
      if ( 1 == ret_[ ret_.length -1 ].length
        && (
          null == ret_[ ret_.length -1 ][0] ||
          "undefined" == typeof( ret_[ ret_.length -1 ][0] ) ||
          "" == ret_[ ret_.length -1 ][0]
        )
      ) {
        ret_ = ret_.slice( 0, ret_.length - 1 );
      }

      // normalization
      if ( opt_isNormalization ) {
        for ( var i_=0; i_<ret_.length; i_++ ) {
          for ( var j_=ret_[i_].length; j_<max_col_index; j_++ ) {
            ret_[i_][j_] = null;
          }
        }
      }

      return ret_;
    },
    /*----------------------------------------------------------
      escape HTML special character
    ----------------------------------------------------------*/
    escapeHtml: function( string ){
      string = ( string || "" ).toString();
      return string.replace( /&/g, "&amp;" ).replace( /</g, "&lt;" ).replace( />/g, "&gt;" ).replace( /"/g, "&quot;" ).replace( /'/g, "&#039;" );
    },
    /*----------------------------------------------------------
      unescapeHtml HTML special character
    ----------------------------------------------------------*/
    unescapeHtml: function( string ){
      string = ( string || "" ).toString();
      return string.replace( /&lt;/g, "<" ).replace( /&gt;/g, ">" ).replace( /&quot;/g, "\"" ).replace( /&#039;/g, "'" ).replace( /&amp;/g, "&" );
    },
    /*----------------------------------------------------------
      return plural word from singular
    ----------------------------------------------------------*/
    plural: function( string ){
      string = ( string || "" ).toString();
      if ( plural_irregular[string] ) return plural_irregular[string];
      for ( var i_=0; i_<plural_rules.length; i_++ ) {
        if ( string.match( plural_rules[i_][0] ) ) return string.replace( plural_rules[i_][0], plural_rules[i_][1] );
      }
      return string + "s";
    },
    /*----------------------------------------------------------
      return singular word from plural
    ----------------------------------------------------------*/
    singular: function( string ){
      string = ( string || "" ).toString();
      if ( singular_irregular[string] ) return singular_irregular[string];
      for ( var i_=0; i_<singular_rules.length; i_++ ) {
        if ( string.match( singular_rules[i_][0] ) ) return string.replace( singular_rules[i_][0], singular_rules[i_][1] );
      }
      return string;
    },
    /*----------------------------------------------------------
      convert kana from hiragana
    ----------------------------------------------------------*/
    kana: function( string ){
      string = ( string || "" );
      var strings_ = string.split("");
      var charcode_;
      for ( var i_=0; i_<strings_.length; i_++ ) {
        charcode_ = strings_[i_].charCodeAt(0);
        if ( 0x3041 <= charcode_ && charcode_ <= 0x3096 ) {
          // 0x30A2 - 0x30F6
          strings_[i_] =  String.fromCharCode( charcode_ + 0x60 );
        }
      }
      return strings_.join("");
    },
    /*----------------------------------------------------------
      convert hiragana from kana
    ----------------------------------------------------------*/
    hiragana: function( string ){
      string = ( string || "" );
      var strings_ = string.split("");
      var charcode_;
      for ( var i_=0; i_<strings_.length; i_++ ) {
        charcode_ = strings_[i_].charCodeAt(0);
        if ( 0x30A1 <= charcode_ && charcode_ <= 0x30F6 ) {
          // 0x3041 - 0x3096
          strings_[i_] =  String.fromCharCode( charcode_ - 0x60 );
        }
      }
      return strings_.join("");
    },
    /*----------------------------------------------------------
      convert en from em
    ----------------------------------------------------------*/
    en: function( string ){
      string = ( string || "" );
      var strings_ = string.split("");
      var en_kana_ = [ "ｧ", "ｱ", "ｨ", "ｲ", "ｩ", "ｳ", "ｪ", "ｴ", "ｫ", "ｵ", "ｶ", "ｶﾞ", "ｷ", "ｷﾞ", "ｸ", "ｸﾞ", "ｹ", "ｹﾞ", "ｺ", "ｺﾞ", "ｻ", "ｻﾞ", "ｼ", "ｼﾞ", "ｽ", "ｽﾞ", "ｾ", "ｾﾞ", "ｿ", "ｿﾞ", "ﾀ", "ﾀﾞ", "ﾁ", "ﾁﾞ", "ｯ", "ﾂ", "ﾂﾞ", "ﾃ", "ﾃﾞ", "ﾄ", "ﾄﾞ", "ﾅ", "ﾆ", "ﾇ", "ﾈ", "ﾉ", "ﾊ", "ﾊﾞ", "ﾊﾟ", "ﾋ", "ﾋﾞ", "ﾋﾟ", "ﾌ", "ﾌﾞ", "ﾌﾟ", "ﾍ", "ﾍﾞ", "ﾍﾟ", "ﾎ", "ﾎﾞ", "ﾎﾟ", "ﾏ", "ﾐ", "ﾑ", "ﾒ", "ﾓ", "ｬ", "ﾔ", "ｭ", "ﾕ", "ｮ", "ﾖ", "ﾗ", "ﾘ", "ﾙ", "ﾚ", "ﾛ", null, "ﾜ", null, null, "ｦ", "ﾝ", "ｳﾞ" ];
      var en_symbol_ = [ "!", null, "#", "$", "%", "&", null, "(", ")", "*", "+", null, null, null, "/", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ":", ";", "<", "=", ">", "?", "@" ];
      var en_symbol_irregular_ = { "　":" ", "＾":"^", "＿":"_", "｀":"`", "｜":"|", "￥":"¥", "’":"'", "”":"\"", "、":",", "。":".", "「":"[", "」":"]", "『":"{", "』":"}", "〜":"~", "ー":"-" };
      var charcode_;
      for ( var i_=0; i_<strings_.length; i_++ ) {
        charcode_ = strings_[i_].charCodeAt(0);
        // kana
        if ( 0x30A1 <= charcode_ && charcode_ <= 0x30F6 ) {
          strings_[i_] =  en_kana_[ charcode_ - 0x30A1 ] || String.fromCharCode( charcode_ );
        }
        // lowercase alphabet
        else if ( 0xFF41 <= charcode_ && charcode_ <= 0xFF5a ) {
          strings_[i_] =  String.fromCharCode( 0x61 + charcode_ - 0xFF41 );
        }
        // uppercase alphabet
        else if ( 0xFF21 <= charcode_ && charcode_ <= 0xFF3a ) {
          strings_[i_] =  String.fromCharCode( 0x41 + charcode_ - 0xFF21 );          
        }
        else if ( 0xFF01 <= charcode_ && charcode_ <= 0xFF20 ) {
          strings_[i_] =  en_symbol_[ charcode_ - 0xFF01 ] || String.fromCharCode( charcode_ );
        }
        else if ( en_symbol_irregular_[ strings_[i_] ] ) {
          strings_[i_] = en_symbol_irregular_[ strings_[i_] ];
        }
      }
      return strings_.join("");
    },
    /*----------------------------------------------------------
      convert em from en
    ----------------------------------------------------------*/
    em: function( string ){
      string = ( string || "" );
      var strings_ = string.split("");
      var em_kana_ = [ "ヲ", "ァ", "ィ", "ゥ", "ェ", "ォ", "ャ", "ュ", "ョ", "ッ", null, "ア", "イ", "ウ", "エ", "オ", "カ", "キ", "ク", "ケ", "コ", "サ", "シ", "ス", "セ", "ソ", "タ", "チ", "ツ", "テ", "ト", "ナ", "ニ", "ヌ", "ネ", "ノ", "ハ", "ヒ", "フ", "ヘ", "ホ", "マ", "ミ", "ム", "メ", "モ", "ヤ", "ユ", "ヨ", "ラ", "リ", "ル", "レ", "ロ", "ワ", "ン" ];
      var em_symbol_ = [ "！", "”", "＃", "＄", "％", "＆", "’", "（", "）", "＊", "＋", "、", "ー", "。", "／", "０", "１" ,"２", "３", "４", "５", "６", "７", "８", "９", "：", "；", "＜", "＝", "＞", "？", "＠" ];
      var em_symbol_irregular_ = { " ":"　", "^":"＾", "_":"＿", "`":"｀", "|":"｜", "¥":"￥", "[":"「", "]":"」", "{":"『", "}":"』", "~":"〜" };
      var charcode_;
      var prev_charcode_;
      for ( var i_=0; i_<strings_.length; i_++ ) {
        charcode_ = strings_[i_].charCodeAt(0);
        // kana
        if ( 0xFF66 <= charcode_ && charcode_ <= 0xFF9d ) {
          strings_[i_] =  em_kana_[ charcode_ - 0xFF66 ] || String.fromCharCode( charcode_ );
        }
        // dull
        else if ( 0xFF9e == charcode_ ) {
          prev_charcode_ = strings_[i_-1].charCodeAt(0);
          if ( 0 < i_ && 0x30AB <= prev_charcode_ && prev_charcode_ <= 0x30C8 ) {
            strings_[i_-1] =  String.fromCharCode( prev_charcode_ + 1 );
            strings_[i_] = "";
          }
          else if ( 0 < i_ && 0x30CF <= prev_charcode_ && prev_charcode_ <= 0x30DB ) {
            strings_[i_-1] =  String.fromCharCode( prev_charcode_ + 1 );
            strings_[i_] = "";
          }
          else {
            strings_[i_] = "゛";
          }
        }
        // half dull
        else if ( 0xFF9f == charcode_ ) {
          prev_charcode_ = strings_[i_-1].charCodeAt(0);
          if ( 0 < i_ && 0x30CF <= prev_charcode_ && prev_charcode_ <= 0x30DB ) {
            strings_[i_-1] =  String.fromCharCode( prev_charcode_ + 2 );
            strings_[i_] = "";
          }
          else {
            strings_[i_] = "゜";
          }
        }
        // lowercase alphabet
        else if ( 0x61 <= charcode_ && charcode_ <= 0x7A ) {
          strings_[i_] =  String.fromCharCode( 0xFF41 + charcode_ - 0x61 );
        }
        // uppercase alphabet
        else if ( 0x41 <= charcode_ && charcode_ <= 0x5A ) {
          strings_[i_] =  String.fromCharCode( 0xFF21 + charcode_ - 0x41 );
        }
        else if ( 0x21 <= charcode_ && charcode_ <= 0x40 ) {
          strings_[i_] =  em_symbol_[ charcode_ - 0x21 ] || String.fromCharCode( charcode_ );
        }
        else if ( em_symbol_irregular_[ strings_[i_] ] ) {
          strings_[i_] = em_symbol_irregular_[ strings_[i_] ];
        }
      }
      return strings_.join("");
    },
    /*----------------------------------------------------------
      convert strings with caesar cipher
    ----------------------------------------------------------*/
    caesarCipher: function( string, shift ){
      string = ( string || "" );
      var strings_ = string.split("");
      function convert( str, index, convert_table, tbl_index, shift ){
        tbl_index += ( shift % convert_table.length );
        if ( tbl_index >= convert_table.length ) tbl_index -= convert_table.length;
        if ( tbl_index < 0 ) tbl_index = convert_table.length + tbl_index;
        strings_[index] =  convert_table[ tbl_index ];
        if ( null == strings_[index] ) {
          strings_[index] = ( 0 < shift ? convert_table[ tbl_index+1 ] : convert_table[ tbl_index-1 ] );
        }
      }
      var en_alphabet_ = " !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~";
      var em_hiragana_ = "ぁあぃいぅうぇえぉおかがきぎくぐけげこごさざしじすずせぜそぞただちぢっつづてでとどなにぬねのはばぱひびぴふぶぷへべぺほぼぽまみむめもゃやゅゆょよらりるれろゎわゐゑをんゔゕゖ";
      var em_kana_     = "ァアィイゥウェエォオカガキギクグケゲコゴサザシジスズセゼソゾタダチヂッツヅテデトドナニヌネノハバパヒビピフブプヘベペホボポマミムメモャヤュユョヨラリルレロヮワヰヱヲンヴヵヶ";
      var em_number_ = "０１２３４５６７８９";
      var em_alphabet_u_ = "ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ";
      var em_alphabet_l_ = "ａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ";
      var en_kana_ = "ｦｧｨｩｪｫｬｭｮｯｰｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ";
      var charcode_;
      var index_;
      for ( var i_=0; i_<strings_.length; i_++ ) {
        charcode_ = strings_[i_].charCodeAt(0);
        // en alphabet
        if ( 0x20 <= charcode_ && charcode_ <= 0x7E ) {
          convert( strings_, i_, en_alphabet_, ( charcode_ - 0x20 ), shift );
        }
        // em hiragana
        if ( 0x3041 <= charcode_ && charcode_ <= 0x3096 ) {
          convert( strings_, i_, em_hiragana_, ( charcode_ - 0x3041 ), shift );
        }
        // em kana
        else if ( 0x30A1 <= charcode_ && charcode_ <= 0x30F6 ) {
          convert( strings_, i_, em_kana_, ( charcode_ - 0x30A1 ), shift );
        }
        // em number
        else if ( 0xFF10 <= charcode_ && charcode_ <= 0xFF19 ) {
          convert( strings_, i_, em_number_, ( charcode_ - 0xFF10 ), shift );
        }
        // em alphabet upper
        else if ( 0xFF21 <= charcode_ && charcode_ <= 0xFF3A ) {
          convert( strings_, i_, em_alphabet_u_, ( charcode_ - 0xFF21 ), shift );
        }
        // em alphabet lower
        else if ( 0xFF41 <= charcode_ && charcode_ <= 0xFF5A ) {
          convert( strings_, i_, em_alphabet_l_, ( charcode_ - 0xFF41 ), shift );
        }
        // en kana
        else if ( 0xFF66 <= charcode_ && charcode_ <= 0xFF9D ) {
          convert( strings_, i_, en_kana_, ( charcode_ - 0xFF66 ), shift );
        }
      }
      return strings_.join("");
    },
    /*----------------------------------------------------------
      convert strings with leet
    ----------------------------------------------------------*/
    leet: function( string ){
      string = ( string || "" );
      var strings_ = string.split("");
      //          abcdefghijklmnopqrstuvwxyz
      var leet_ = "46cd3fgh1jklmn0p9r57uvwxy2";
      for ( var i_=0; i_<strings_.length; i_++ ) {
        charcode_ = strings_[i_].charCodeAt(0);
        if ( 0x61 <= charcode_ && charcode_ <= 0x7A ) {
          strings_[i_] = leet_[ ( charcode_ - 0x61 ) ];
        }
      }
      return strings_.join("");
    },
    /*----------------------------------------------------------
      Replace parameters to strings with formats
    ----------------------------------------------------------*/
    formats: function(){
      var formats_ = "";
      var params_ = [];
      var tmp_ = arguments[0];
      switch( typeof tmp_ ){
      case 'object':
        if ( !(tmp_ instanceof Array) ) return null;
        formats_ = tmp_[0].toString();
        params_ = tmp_.slice( 1 );
        break;
      case 'string':
        formats_ = tmp_;
        if ( 1 < arguments.length ) {
          if ( arguments[1] instanceof Array ) {
            params_ = arguments[1];
          }
          else {
            for ( var i_=1; i_<arguments.length; i_++ ) params_[ params_.length ] = arguments[i_];
          }
        }
        break;
      default:
        return null;
      }
      // get param private function
      var param_index_ = 0;
      function getParam(){
        if ( 0 == params_.length ) return "";
        if ( params_.length-1 < param_index_ ) return params_[ params_.length - 1 ];
        var tmp_ = params_[ param_index_ ];
        param_index_++;
        return tmp_;
      }
      function toNumber( param ){
        if ( "number" == typeof param ) return param;
        if ( param instanceof Date ) return param.getTime();
        var tmp_ =  parseFloat( param );
        return tmp_;
      }
      function toDatetime( param, limit ){
        if ( param instanceof Date ) return param;
        limit = limit || 0;
        if ( "number" == typeof param ) {
          if ( 0 > param ) return "NaN";
          if ( limit < param.toString().length ) {
            return new Date( param );
          }
          return param;
        }
        var tmp_ = Date.parse( param );
        if ( isNaN( tmp_ ) ) return "NaN";
        return new Date( param.toString() );
      }
      function getBeginningOfYear( date ){
        return new Date( date.getFullYear(), 0, 1 );
      }
      function getDiffDays( a, b ){
        return Math.floor( ( b.getTime() - a.getTime() ) / ( 1000 * 60 * 60 * 24 ) );
      }
      function getWeeksByOrigin( date, origin_week, contain_week_of_start ) {
        var oneJan_ = getBeginningOfYear( date );
        var tmp_ = getDiffDays( oneJan_, date ) + 1;   // get dill days. ex) 1/1 is 1. 1/2 is 2.
        var offset_ = ( oneJan_.getDay() - origin_week ) - 1
        tmp_ = Math.floor( ( tmp_ + offset_ ) / 7 ) + 1;
        if ( "number" == typeof contain_week_of_start && contain_week_of_start < oneJan_.getDay() ) tmp_ -= 1;  // if the 1/1 is after start-week, treat it as week in last year.
        return tmp_;
      }
      function paddingLeft( str, length, pad ){
        if ( "string" != typeof str ) str = str.toString();
        if ( str.length < length ) {
          var pad_size_ = length - str.length;
          var tmp_ = "";
          for ( var i_=0; i_<pad_size_; i_++ ) tmp_ += pad;
          str = pad + str;
        }
        return str;
      }
      // analyze format and replace params
      formats_ = formats_.replace( /(%%|%[ 0#+\-]*([1-9][0-9]*)?\.?([1-9][0-9]*)?[doxXfgsYymBbjwAaVUWHlMSNLPpZzFDvTRr])/g, function( sp ){
        if ( "%%" == sp ) return "%";
        // init
        var right_align_ = true;
        var mark_ = false;
        var pad_after_mark_ = false;
        var prefix_ = false;
        var prefix_str_ = "";
        var pad_ = " ";
        var limit_ = 0;
        var decimal_ = false;
        var decimal_limit_ = 0;
        var specifier_ = "";
        var param_ = "";
        // analyze
        var tmp_ = sp.slice( 1 );
        //   analyze flag directive
        var tmpmc_ = tmp_.match( /^[ 0#+\-]+/ );
        if ( tmpmc_ ) {
          var dirty_flag_ = {};
          for ( var i_=0; i_<tmpmc_[0].length; i_++ ) {
            switch( tmpmc_[0].charAt(i_) ){
            case "+":
              mark_ = true;
              if ( dirty_flag_["+"] ) return sp;
              dirty_flag_["+"] = true;
              break;
            case "#":
              prefix_ = true;
              if ( dirty_flag_["#"] ) return sp;
              dirty_flag_["#"] = true;
              break;
            case " ":
              pad_after_mark_ = true;
              if ( dirty_flag_[" "] ) return sp;
              dirty_flag_[" "] = true;
              break;
            case "0":
              pad_ = "0";
              if ( dirty_flag_["0"] ) return sp;
              dirty_flag_["0"] = true;
              break;
            case "-":
              right_align_ = false;
              if ( dirty_flag_["-"] ) return sp;
              dirty_flag_["-"] = true;
              break;
            }
          }
          if ( dirty_flag_["-"] ) {
            if ( dirty_flag_["0"] ) pad_ = " ";
            if ( dirty_flag_[" "] ) pad_after_mark_ = false;
          }
          tmp_ = tmp_.slice( tmpmc_[0].length );
        }
        //   analize limits
        var tmpmc_ = tmp_.match( /^[0-9]+/ );
        if ( tmpmc_ ) {
          limit_ = parseInt( tmpmc_[0] );
          tmp_ = tmp_.slice( tmpmc_[0].length );
        }
        //   analize decimal
        var tmpmc_ = tmp_.match( /^\.[0-9]*/ );
        if ( tmpmc_ ) {
          decimal_ = true;
          if ( 1 < tmpmc_[0].length ) decimal_limit_ = parseInt( tmpmc_[0].slice( 1 ) );
          tmp_ = tmp_.slice( tmpmc_[0].length );
        }
        //   analyze specifier
        var tmpmc_ = tmp_.match( /^[doxXfgsYymBbjwAaVUWHlMSNLPpZzFDvTRr]$/ );
        if ( tmpmc_ ) {
          specifier_ = tmpmc_[0];
        }
        else {
          return sp;
        }
        // replace specifier
        var replaced_ = "";
        var replaced_decimal_ = "";
        var param_ = getParam();
        switch( specifier_ ) {
        // replace number as strings
        case "d":
          if ( param_ instanceof Date ) param_ = param_.getDate();
          tmp_ = toNumber( param_ )
          if ( 0 > tmp_ ) {
            mark_ = true;
            prefix_str_ = "-";
          }
          else if ( mark_ ) {
            prefix_str_ = "+";
          }
          if ( isNaN( tmp_ ) ) {
            decimal_ = false;
            tmp_ = "NaN";
          }
          else if ( !isFinite( tmp_ ) ) {
            decimal_ = false;
            tmp_ = "Infinity";
          }
          tmp_ = tmp_.toString().split(".");
          replaced_ = tmp_[0] || "0";
          replaced_decimal_ = tmp_[1] || "";
          if ( "-" == replaced_.charAt(0) ) replaced_ = replaced_.slice( 1 );
          break;
        // replace oct number as strings
        case "o":
          tmp_ = toNumber( param_ )
          if ( 0 > tmp_ ) {
            mark_ = true;
            prefix_str_ = "-" + prefix_str_;
          }
          else if ( mark_ ) {
            prefix_str_ = "+" + prefix_str_;
          }
          if ( isNaN( tmp_ ) ) {
            decimal_ = false;
            tmp_ = "NaN";
          }
          else if ( !isFinite( tmp_ ) ) {
            decimal_ = false;
            tmp_ = "Infinity";
          }
          else if ( prefix_ ) prefix_str_ = prefix_str_ + "0";
          tmp_ = tmp_.toString( 8 ).split(".");
          replaced_ = tmp_[0] || "0";
          replaced_decimal_ = tmp_[1] || "";
          if ( "-" == replaced_.charAt(0) ) replaced_ = replaced_.slice( 1 );
          break;
        // replace hex number as strings(lower case)
        case "x":
          tmp_ = toNumber( param_ )
          if ( 0 > tmp_ ) {
            mark_ = true;
            prefix_str_ = "-" + prefix_str_;
          }
          else if ( mark_ ) {
            prefix_str_ = "+" + prefix_str_;
          }
          if ( isNaN( tmp_ ) ) {
            decimal_ = false;
            tmp_ = "NaN";
          }
          else if ( !isFinite( tmp_ ) ) {
            decimal_ = false;
            tmp_ = "Infinity";
          }
          else if ( prefix_ ) prefix_str_ = prefix_str_ + "0x";
          tmp_ = ( "number" == typeof tmp_ ? tmp_.toString( 16 ).toLowerCase().split(".") : [tmp_] );
          replaced_ = tmp_[0] || "0";
          replaced_decimal_ = tmp_[1] || "";
          if ( "-" == replaced_.charAt(0) ) replaced_ = replaced_.slice( 1 );
          break;
        // replace hex number as strings(upper case)
        case "X":
          tmp_ = toNumber( param_ )
          if ( 0 > tmp_ ) {
            mark_ = true;
            prefix_str_ = "-" + prefix_str_;
          }
          else if ( mark_ ) {
            prefix_str_ = "+" + prefix_str_;
          }
          if ( isNaN( tmp_ ) ) {
            decimal_ = false;
            tmp_ = "NaN";
          }
          else if ( !isFinite( tmp_ ) ) {
            decimal_ = false;
            tmp_ = "Infinity";
          }
          else if ( prefix_ ) prefix_str_ = prefix_str_ + "0x";
          tmp_ = ( "number" == typeof tmp_ ? tmp_.toString( 16 ).toUpperCase().split(".") : [tmp_] );
          replaced_ = tmp_[0] || "0";
          replaced_decimal_ = tmp_[1] || "";
          if ( "-" == replaced_.charAt(0) ) replaced_ = replaced_.slice( 1 );
          break;
        // replace float number as strings
        case "f":
          decimal_ = true;
          tmp_ = toNumber( param_ )
          if ( 0 > tmp_ ) {
            mark_ = true;
            prefix_str_ = "-";
          }
          else if ( mark_ ) {
            prefix_str_ = "+";
          }
          if ( isNaN( tmp_ ) ) {
            decimal_ = false;
            tmp_ = "NaN";
          }
          else if ( !isFinite( tmp_ ) ) {
            decimal_ = false;
            tmp_ = "Infinity";
          }
          tmp_ = tmp_.toString().split(".");
          replaced_ = tmp_[0] || 0;
          replaced_decimal_ = tmp_[1] || "0";
          if ( "-" == replaced_.charAt(0) ) replaced_ = replaced_.slice( 1 );
          break;
        // replace exponent as strings
        case "g":
          tmp_ = toNumber( param_ )
          if ( 0 > tmp_ ) {
            mark_ = true;
            prefix_str_ = "-";
          }
          else if ( mark_ ) {
            prefix_str_ = "+";
          }
          if ( isNaN( tmp_ ) ) {
            decimal_ = false;
            replaced_ = "NaN";
          }
          else if ( !isFinite( tmp_ ) ) {
            decimal_ = false;
            replaced_ = "Infinity";
          }
          else {
            if ( decimal_ ) {
              tmp_ = tmp_.toExponential( 0 < decimal_limit_ ? decimal_limit_ : undefined ).split(".");              
            }
            else {
              tmp_ = tmp_.toExponential( 0 ).split(".");
            }
            replaced_ = tmp_[0] || "0e+0";
            replaced_decimal_ = tmp_[1] || "";
            if ( 0 < decimal_limit_ ) decimal_limit_ += ( ( replaced_decimal_.split("e+")[1] || "" ).length + 2 );
            if ( "-" == replaced_.charAt(0) ) replaced_ = replaced_.slice( 1 );
          }
          break;
        // replace it as strings
        case "s":
          mark_ = false;
          if ( param_ instanceof Date ) {
            replaced_ = param_.toISOString();
          }
          else {
            if ( "undefined" == typeof param_ ) {
              replaced_ = "undefined";
            }
            else if ( null == param_ ) {
              replaced_ = "NULL";
            }
            else {
              replaced_ = param_.toString();
            }
          }
          break;
        // replace date as 4 digit of Year
        case "Y":
          mark_ = false;
          decimal_ = false;
          param_ = toDatetime( param_, 4 );
          if ( "number" == typeof param_ ) param_ = new Date( param_, 1, 1 );
          if ( param_ instanceof Date ) {
            replaced_ = param_.getFullYear().toString();
          }
          else {
            replaced_ = param_.toString();
          }
          break;
        // replace date as the bottom 2 digit of year
        case "y":
          mark_ = false;
          decimal_ = false;
          param_ = toDatetime( param_, 4 );
          if ( "number" == typeof param_ ) param_ = new Date( param_, 1, 1 );
          if ( param_ instanceof Date ) {
            replaced_ = param_.getFullYear().toString().slice( 2 );
          }
          else {
            replaced_ = param_.toString();
          }
          break;
        // replace date as month number (1-12)
        case "m":
          mark_ = false;
          decimal_ = false;
          param_ = toDatetime( param_, 2 );
          if ( "number" == typeof param_ ) param_ = new Date( 1900, param_-1, 1 );
          if ( param_ instanceof Date ) {
            replaced_ = ( param_.getMonth() + 1 ).toString();
          }
          else {
            replaced_ = param_.toString();
          }
          break;
        // replace date as month name of english
        case "B":
          mark_ = false;
          pad_ = " ";
          decimal_ = false;
          param_ = toDatetime( param_, 2 );
          if ( "number" == typeof param_ ) param_ = new Date( 1900, param_-1, 1 );
          if ( param_ instanceof Date ) {
            replaced_ = month_names[ param_.getMonth() ];
          }
          else {
            replaced_ = param_.toString();
          }
          break;
        // replace date as abbreviated month name
        case "b":
          mark_ = false;
          pad_ = " ";
          decimal_ = false;
          param_ = toDatetime( param_, 2 );
          if ( "number" == typeof param_ ) param_ = new Date( 1900, param_-1, 1 );
          if ( param_ instanceof Date ) {
            replaced_ = abbr_month_names[ param_.getMonth() ];
          }
          else {
            replaced_ = param_.toString();
          }
          break;
        // replace date as strings how days since beginning of year
        case "j":
          mark_ = false;
          decimal_ = false;
          param_ = toDatetime( param_ );
          if ( param_ instanceof Date ) {
            replaced_ = ( getDiffDays( getBeginningOfYear( param_ ), param_ ) + 1 ).toString();
          }
          else {
            replaced_ = param_.toString();
          }
          break;
        // replace date as week number(0-6, 0 is sunday)
        case "w":
          mark_ = false;
          decimal_ = false;
          param_ = toDatetime( param_ );
          if ( param_ instanceof Date ) {
            replaced_ = param_.getDay().toString();
          }
          else {
            replaced_ = param_.toString();
          }
          break;
        // replace date as week name
        case "A":
          mark_ = false;
          pad_ = " ";
          decimal_ = false;
          param_ = toDatetime( param_ );
          if ( param_ instanceof Date ) {
            replaced_ = week_names[ param_.getDay() ];
          }
          else {
            replaced_ = param_.toString();
          }
          break;
        // replace date as abbreviated week name
        case "a":
          mark_ = false;
          pad_ = " ";
          decimal_ = false;
          param_ = toDatetime( param_ );
          if ( param_ instanceof Date ) {
            replaced_ = abbr_week_names[ param_.getDay() ];
          }
          else {
            replaced_ = param_.toString();
          }
          break;
        // replace date as weeks since beginning of year (ISO8601)
        // According to the definition of ISO8601, the first week starts on monday and must contain thursday.
        // So, if 1/1 is thursday, 12/31 in last year is contained first week of new year.
        // Or, if 1/1 is friday, 1/1 is contained end week of last year. and 1/4 is first week.
        case "V":
          mark_ = false;
          decimal_ = false;
          param_ = toDatetime( param_ );
          if ( param_ instanceof Date ) {
            tmp_ = getWeeksByOrigin( param_, 1, 4 );
            if ( 0 == tmp_ ) tmp_ = getWeeksByOrigin( new Date( param_.getFullYear()-1, 11, 31 ), 1, 4 ); // it is contained last year
            // if it is contained next year
            var dec31_ = new Date( param_.getFullYear(), 11, 31 );
            if ( 4 > dec31_.getDay() && 1 <= param_.getDay() && dec31_.getDay() > getDiffDays( param_, dec31_ ) ) {   // if week in end of year not contained thursday. the week is contained next year.
              tmp_ = 1;
            }
            replaced_ = tmp_.toString();
          }
          else {
            replaced_ = param.toString();
          }
          break;
        // replace date as weeks since begginning of year (first sunday is first week)
        case "U":
          mark_ = false;
          decimal_ = false;
          param_ = toDatetime( param_ );
          if ( param_ instanceof Date ) {
            tmp_ = getWeeksByOrigin( param_, 0, 0 );
            if ( 0 == tmp_ ) tmp_ = getWeeksByOrigin( new Date( param_.getFullYear()-1, 11, 31 ), 0, 0 ); // it is contained last year
            replaced_ = tmp_.toString();
          }
          else {
            replaced_ = param_.toString();
          }
          break;
        // replace date as weeks since begginning of year (first monday is first week)
        case "W":
          mark_ = false;
          decimal_ = false;
          param_ = toDatetime( param_ );
          if ( param_ instanceof Date ) {
            tmp_ = getWeeksByOrigin( param_, 1, 1 );
            if ( 0 == tmp_ ) tmp_ = getWeeksByOrigin( new Date( param_.getFullYear()-1, 11, 31 ), 1, 1 ); // it is contained last year
            replaced_ = tmp_.toString();
          }
          else {
            replaced_ = param_.toString();
          }
          break;
        // replace date as hour(0-23)
        case "H":
          mark_ = false;
          decimal_ = false;
          param_ = toDatetime( param_ );
          if ( param_ instanceof Date ) {
            replaced_ = param_.getHours().toString();
          }
          else {
            replaced_ = param_.toString();
          }
          break;
        // replace date as hour(1-12)
        case "l":
          mark_ = false;
          decimal_ = false;
          param_ = toDatetime( param_ );
          if ( param_ instanceof Date ) {
            tmp_ = param_.getHours();
            if ( 0 == tmp_ ) tmp_ = 12;
            if ( 12 < tmp_ ) tmp_ -= 12;
            replaced_ = tmp_.toString();
          }
          else {
            replaced_ = param_.toString();
          }
          break;
        // replace date as minute(0-59)
        case "M":
          mark_ = false;
          decimal_ = false;
          param_ = toDatetime( param_ );
          if ( param_ instanceof Date ) {
            replaced_ = param_.getMinutes().toString();
          }
          else {
            replaced_ = param_.toString();
          }
          break;
        // replace date as sec(0-60)
        case "S":
          mark_ = false;
          decimal_ = false;
          param_ = toDatetime( param_ );
          if ( param_ instanceof Date ) {
            replaced_ = param_.getSeconds().toString();
          }
          else {
            replaced_ = param_.toString();
          }
          break;
        // replace date as milli-sec(0-999)
        case "N":
        case "L":
          mark_ = false;
          decimal_ = false;
          param_ = toDatetime( param_ );
          if ( param_ instanceof Date ) {
            replaced_ = param_.getMilliseconds().toString();
          }
          else {
            replaced_ = param_.toString();
          }
          break;
        // replace date am or pm
        case "P":
          mark_ = false;
          pad_ = " ";
          decimal_ = false;
          param_ = toDatetime( param_ );
          if ( param_ instanceof Date ) {
            tmp_ = param_.getHours();
            replaced_ = ( 12 > tmp_ ? "am" : "pm" );
          }
          else {
            replaced_ = param_.toString();
          }
          break;
        // replace date AM or PM
        case "p":
          mark_ = false;
          pad_ = " ";
          decimal_ = false;
          param_ = toDatetime( param_ );
          if ( param_ instanceof Date ) {
            tmp_ = param_.getHours();
            replaced_ = ( 12 > tmp_ ? "AM" : "PM" );
          }
          else {
            replaced_ = param_.toString();
          }
          break;
        // replace date as timezone name
        case "Z":
          mark_ = false;
          pad_ = " ";
          decimal_ = false;
          param_ = toDatetime( param_ );
          if ( param_ instanceof Date ) {
            tmp_ = -param_.getTimezoneOffset();
            // search neer value
            replaced_ = abbr_timezone[ abbr_timezone.length - 1 ][0];
            for ( var i_=1; i_<abbr_timezone.length; i_++ ) {
              if ( tmp_ >= abbr_timezone[i_-1][1] && tmp_ < abbr_timezone[i_][1] ) {
                var diff_ = tmp_ - abbr_timezone[i_-1][1];
                var center_ = ( abbr_timezone[i_][1] - abbr_timezone[i_-1][1] ) / 2;
                replaced_ = ( diff_ > center_ ? abbr_timezone[i_][0] : abbr_timezone[i_-1][0] );
                break;
              }
            }
          }
          else {
            replaced_ = param_.toString();
          }
          break;
        // replace date as timezone(offset time from UTC)
        case "z":
          pad_ = " ";
          decimal_ = false;
          param_ = toDatetime( param_ );
          if ( param_ instanceof Date ) {
            tmp_ = -param_.getTimezoneOffset();
            if ( 0 > tmp_ ) {
              mark_ = true;
              prefix_str_ = "-";
              tmp_ = -tmp_;
            }
            else if ( mark_ ) {
              prefix_str_ = "+";
            }
            var hour_ = Math.floor( tmp_ / 60 ).toString();
            var minute_ = ( tmp_ % 60 ).toString();
            hour_ = paddingLeft( hour_, 2, "0" );
            minute_ = paddingLeft( minute_, 2, "0" );
            replaced_ = hour_ + ":" + minute_;
          }
          else {
            replaced_ = param_.toString();
          }
          break;
        // replace date as string of YYYY-mm-dd
        case "F":
          mark_ = false;
          pad_ = " ";
          decimal_ = false;
          param_ = toDatetime( param_ );
          if ( param_ instanceof Date ) {
            tmp_ = [
              paddingLeft( param_.getFullYear(), 4, "0" ),
              paddingLeft( param_.getMonth()+1, 2, "0" ),
              paddingLeft( param_.getDate(), 2, "0" ),
            ];
            replaced_ = tmp_.join("-");
          }
          else {
            replaced_ = param_.toString();
          }
          break;
        // replace date as string of mm/dd/YYYY
        case "D":
          mark_ = false;
          pad_ = " ";
          decimal_ = false;
          param_ = toDatetime( param_ );
          if ( param_ instanceof Date ) {
            tmp_ = [
              paddingLeft( param_.getMonth()+1, 2, "0" ),
              paddingLeft( param_.getDate(), 2, "0" ),
              paddingLeft( param_.getFullYear(), 4, "0" ),
            ];
            replaced_ = tmp_.join("/");
          }
          else {
            replaced_ = param_.toString();
          }
          break;
        // replace date as string of b-dd-YYYY
        case "v":
          mark_ = false;
          pad_ = " ";
          decimal_ = false;
          param_ = toDatetime( param_ );
          if ( param_ instanceof Date ) {
            tmp_ = [
              abbr_month_names[ param_.getMonth() ],
              paddingLeft( param_.getDate(), 2, "0" ),
              paddingLeft( param_.getFullYear(), 4, "0" ),
            ];
            replaced_ = tmp_.join("-");
          }
          else {
            replaced_ = param_.toString();
          }
          break;
        // replace date as string of HH:MM:SS
        case "T":
          mark_ = false;
          pad_ = " ";
          decimal_ = false;
          param_ = toDatetime( param_ );
          if ( param_ instanceof Date ) {
            tmp_ = [
              paddingLeft( param_.getHours(), 2, "0" ),
              paddingLeft( param_.getMinutes(), 2, "0" ),
              paddingLeft( param_.getSeconds(), 2, "0" ),
            ];
            replaced_ = tmp_.join(":");
          }
          else {
            replaced_ = param.toString();
          }
          break;
        // replace date as string of HH:MM
        case "R":
          mark_ = false;
          pad_ = " ";
          decimal_ = false;
          param_ = toDatetime( param_ );
          if ( param_ instanceof Date ) {
            tmp_ = [
              paddingLeft( param_.getHours(), 2, "0" ),
              paddingLeft( param_.getMinutes(), 2, "0" ),
            ];
            replaced_ = tmp_.join(":");
          }
          else {
            replaced_ = param_.toString();
          }
          break;
        // replace date as string of ll:MM:SS p
        case "r":
          mark_ = false;
          pad_ = " ";
          decimal_ = false;
          param_ = toDatetime( param_ );
          if ( param_ instanceof Date ) {
            var hour_ = param_.getHours();
            var h_hour_ = hour_;
            if ( 0 == h_hour_ ) h_hour_ = 12;
            if ( 12 < h_hour_ ) h_hour_ -= 12;
            tmp_ = [
              paddingLeft( h_hour_, 2, "0" ),
              paddingLeft( param_.getMinutes(), 2, "0" ),
              paddingLeft( param_.getSeconds(), 2, "0" ),
            ];
            replaced_ = tmp_.join(":") + ( 12 > hour_ ? " AM" : " PM" );
          }
          else {
            replaced_ = param_.toString();
          }
          break;
        default:
          return sp;
        }
        // modification
        //   floor decimal
        if ( decimal_ ) {
          if ( 0 < decimal_limit_ ) {
            if ( decimal_limit_ < replaced_decimal_.length ) {
              replaced_decimal_ = replaced_decimal_.slice( 0, decimal_limit_ );              
            }
            else if ( decimal_limit_ > replaced_decimal_.length ) {
              var tmp_ = decimal_limit_ - replaced_decimal_.length;
              for ( var i_=0; i_<tmp_; i_++ ) replaced_decimal_ += "0";
            }
          }
          if ( 0 < replaced_decimal_.length ) replaced_ = replaced_ + "." + replaced_decimal_;            
        }
        //   generate padding
        var pad_str_ = "";
        if ( limit_ > ( replaced_.length + prefix_str_.length ) ) {
          var tmp_ = limit_ - ( replaced_.length + prefix_str_.length );
          for ( var i_=0; i_<tmp_; i_++ ) pad_str_ += pad_;
        }
        //   append prefix and padding
        if ( right_align_ ) {
          if ( pad_after_mark_ ) {
            replaced_ = prefix_str_ + pad_str_ + replaced_;
          }
          else {
            replaced_ = pad_str_ + prefix_str_ + replaced_;
          }
        }
        else {
          replaced_ = prefix_str_ + replaced_ + pad_str_;
        }
        return replaced_;
      } );
      return formats_;
    },
    /*----------------------------------------------------------
      separate the strings.
    ----------------------------------------------------------*/
    separate: function( string, phraze ){
      string = ( string || "" ).toString();
      if ( null == phraze || ( 'string' != typeof phraze && !(phraze instanceof RegExp) ) || 0 == phraze.length ) return string.split("");
      var reg_ = new RegExp( phraze );
      var ret_ = [];
      while( 0 < string.length ){
        var index_ = string.search( reg_ );
        if ( -1 == index_ ) {
          ret_[ ret_.length ] = string;
          break;
        }
        else {
          if ( 0 < index_ ) {
            ret_[ ret_.length ] = string.slice( 0, index_ );
            string = string.slice( index_ );
          }
          var tmp_ = string.match( reg_ );
          if ( !tmp_ ) {
            ret_[ ret_.length ] = string;
            break;
          }
          ret_[ ret_.length ] = tmp_[0];
          string = string.slice( tmp_[0].length );
        }
      }
      return ret_
    },
    /*----------------------------------------------------------
      parse formula and return result as objects
    ----------------------------------------------------------*/
    parseFormula: function( string, opt_operators, opt_tacitness ){
      string = ( string || "" ).replace( /[ \t\r\n]+/g, " " );
      opt_operators = opt_operators || [ 
        [ "sin", "cos", "tan" ], 
        [ "!", "^" ],
        [ "%", "/" ],
        [ "*" ],
        [ "-", "+" ],
      ];
      if ( "string" != typeof opt_tacitness || 0 == opt_tacitness.length ) opt_tacitness = "*";

      // always append special operators
      opt_operators[ opt_operators.length ] = [ "=", " ", "(", ")" ];

      // prepare
      var ope_regstr_ = [];
      var ope_priorities_ = {};
      for ( var i_=0; i_<opt_operators.length; i_++ ) {
        if ( !( opt_operators[i_] instanceof Array ) ) opt_operators[i_] = [ opt_operators[i_] ];
        for ( var j_=0; j_<opt_operators[i_].length; j_++ ) {
          // make operator's priority
          ope_priorities_[ opt_operators[i_][j_] ] = i_;
          // convert for regular expression
          ope_regstr_[ ope_regstr_.length ] = opt_operators[i_][j_].replace( /([\[\]\{\}\(\)\/\\\^\$\.\*\+\-|])/g, "\\$1" );
        }
      }
      ope_regstr_[ ope_regstr_.length ] = "[0-9]+(\\.[0-9]+)?";

      // lex
      var ope_reg_ = "(" + ope_regstr_.join("|") + ")";
      var lex_ = ustr_.separate.apply( this, [ string, ope_reg_ ] );

      // parse
      var value_buf_ = [];
      var ope_stack_ = [];
      var is_value = false;
      var is_operator = false;
      for ( var i_=0; i_<lex_.length; i_++ ) {
        var priority = ope_priorities_[ lex_[i_] ];
        // this token is value
        if ( "number" != typeof priority ) {
          if ( is_value ) ope_stack_[ ope_stack_.length ] = opt_tacitness;
          is_value = false;
          is_operator = false;
          if ( lex_[i_].match( /^[0-9]+\.[0-9]+$/ ) ) {
            value_buf_[ value_buf_.length ] = parseFloat( lex_[i_] );
          }
          else if ( lex_[i_].match( /^[0-9]+$/ ) ) {
            value_buf_[ value_buf_.length ] = parseInt( lex_[i_] );
          }
          else {
            value_buf_[ value_buf_.length ] = lex_[i_];
          }
          is_value = true;
        }
        // this token is operator
        else {
          switch( lex_[i_] ) {
          case '(':
            if ( is_value ) ope_stack_[ ope_stack_.length ] = opt_tacitness;
            is_value = false;
            is_operator = false;
            ope_stack_[ ope_stack_.length ] = lex_[i_];
            break;
          case ')':
            is_value = false;
            is_operator = false;
            while( 0 < ope_stack_.length ){
              var tmp_ = ope_stack_[ ope_stack_.length - 1 ];
              ope_stack_.splice( ope_stack_.length - 1, 1 );
              if ( '(' == tmp_ ) break;
              value_buf_[ value_buf_.length ] = tmp_;
            }
            is_value = true;  // if there is value after this token, append tacitness operator.
            break;
          case ' ':
            // do not anything (ignore)
            break;
          default:
            if ( is_operator ) value_buf_[ value_buf_.length ] = null;
            is_value = false;
            is_operator = false;
            
            var prev_priority = ope_priorities_[ ope_stack_[ ope_stack_.length - 1 ] ];
            if ( "number" != typeof prev_priority ) prev_priority = Number.MAX_SAFE_INTEGER;
            // if token priority higher than priority of top of the stack, push it stack.
            if ( prev_priority >= priority ) {
              ope_stack_[ ope_stack_.length ] = lex_[i_];
            }
            // In other case, pop and append top of the stack to buffer. The token is pushed stack.
            else {
              value_buf_[ value_buf_.length ] = ope_stack_[ ope_stack_.length - 1 ];
              ope_stack_[ ope_stack_.length - 1 ] = lex_[i_];
            }
            is_operator = true;
            break;
          }
        }
      }
      if ( !is_value && is_operator ) ope_stack_[ ope_stack_.length ] = null;
      while( 0 < ope_stack_.length ){
        var tmp_ = ope_stack_[ ope_stack_.length - 1 ];
        ope_stack_.splice( ope_stack_.length - 1, 1 );
        if ( '(' == tmp_ ) continue;
        value_buf_[ value_buf_.length ] = tmp_;
      }

      // generate objects
      var calc_stack_ = [];
      for ( var i_=0; i_<value_buf_.length; i_++ ) {
        var priority = ope_priorities_[ ( value_buf_[i_] || "" ).toString() ];
        // this is value
        if ( "number" != typeof priority ) {
          calc_stack_[ calc_stack_.length ] = value_buf_[i_];
        }
        // this is operator
        else {
          var obj_ = {};
          var tmp_ = [];
          var val1_ = calc_stack_[calc_stack_.length - 2];
          var val2_ = calc_stack_[calc_stack_.length - 1];
          calc_stack_.splice( calc_stack_.length - 2, 2 );
          if ( "undefined" != typeof val1_ && null != val1_ ) tmp_[ tmp_.length ] = val1_;
          if ( "undefined" != typeof val2_ && null != val2_ ) tmp_[ tmp_.length ] = val2_;
          obj_[ value_buf_[i_] ] = tmp_;
          calc_stack_[ calc_stack_.length ] = obj_;
        }
      }
      if ( 0 == calc_stack_ || 1 < calc_stack_.length ) return null;
      return calc_stack_[0];
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
