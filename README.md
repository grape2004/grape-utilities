
# ユーティリティ / ライブラリ


## 目次


[文字列](#grape-utility-string)

A 
: [ante](#grape-utility-string-ante)

B 
: [bin](#grape-utility-string-bin)、[byteCodes](#grape-utility-string-byteCodes)、[byteLength](#grape-utility-string-byteLength)、[byteSize](#grape-utility-string-byteSize)、[bytes](#grape-utility-string-bytes)

C 
: [caesarCipher](#grape-utility-string-caesarCipher)、[capitalize](#grape-utility-string-capitalize)、[casecmp](#grape-utility-string-casecmp)、[center](#grape-utility-string-center)、[charAt](#grape-utility-string-charAt)、[charCodeAt](#grape-utility-string-charCodeAt)、[chomp](#grape-utility-string-chomp)、[chop](#grape-utility-string-chop)、[cjust](#grape-utility-string-cjust)、[concat](#grape-utility-string-concat)、[count](#grape-utility-string-count)

D 
: [dec](#grape-utility-string-dec)、[diff](#grape-utility-string-diff)、[diffLine](#grape-utility-string-diffLine)、[downto](#grape-utility-string-downto)

E 
: [each](#grape-utility-string-each)、[eachByte](#grape-utility-string-eachByte)、[eachChar](#grape-utility-string-eachChar)、[eachLine](#grape-utility-string-eachLine)、[em](#grape-utility-string-em)、[en](#grape-utility-string-en)、[escapeHtml](#grape-utility-string-escapeHtml)

F 
: [fill](#grape-utility-string-fill)、[findBlock](#grape-utility-string-findBlock)、[findEmail](#grape-utility-string-findEmail)、[findIp](#grape-utility-string-findIp)、[findIp4](#grape-utility-string-findIp4)、[findIp6](#grape-utility-string-findIp6)、[findPhone](#grape-utility-string-findPhone)、[findTel](#grape-utility-string-findTel)、[findUrl](#grape-utility-string-findUrl)、[findWord](#grape-utility-string-findWord)、[float](#grape-utility-string-float)、[formats](#grape-utility-string-formats)

G 
: [getByte](#grape-utility-string-getByte)

H 
: [hex](#grape-utility-string-hex)、[hiragana](#grape-utility-string-hiragana)

I 
: [index](#grape-utility-string-index)、[insert](#grape-utility-string-insert)、[isBlank](#grape-utility-string-isBlank)、[isEmpty](#grape-utility-string-isEmpty)、[isEndWith](#grape-utility-string-isEndWith)、[isInclude](#grape-utility-string-isInclude)、[isStartWith](#grape-utility-string-isStartWith)

K 
: [kana](#grape-utility-string-kana)

L 
: [lastIndexOf](#grape-utility-string-lastIndexOf)、[leet](#grape-utility-string-leet)、[left](#grape-utility-string-left)、[lines](#grape-utility-string-lines)、[ljust](#grape-utility-string-ljust)、[lstrip](#grape-utility-string-lstrip)

M 
: [match](#grape-utility-string-match)、[mergePath](#grape-utility-string-mergePath)、[mergeUrl](#grape-utility-string-mergeUrl)

N 
: [next](#grape-utility-string-next)

O 
: [oct](#grape-utility-string-oct)

P 
: [padding](#grape-utility-string-padding)、[parseCsv](#grape-utility-string-parseCsv)、[parseFormula](#grape-utility-string-parseFormula)、[parsePath](#grape-utility-string-parsePath)、[parseUrl](#grape-utility-string-parseUrl)、[partition](#grape-utility-string-partition)、[plural](#grape-utility-string-plural)、[prev](#grape-utility-string-prev)

R 
: [remove](#grape-utility-string-remove)、[repeat](#grape-utility-string-repeat)、[replace](#grape-utility-string-replace)、[reverse](#grape-utility-string-reverse)、[right](#grape-utility-string-right)、[rindex](#grape-utility-string-rindex)、[rjust](#grape-utility-string-rjust)、[rpartition](#grape-utility-string-rpartition)、[rstrip](#grape-utility-string-rstrip)

S 
: [scan](#grape-utility-string-scan)、[search](#grape-utility-string-search)、[separate](#grape-utility-string-separate)、[setByte](#grape-utility-string-setByte)、[similarity](#grape-utility-string-similarity)、[singular](#grape-utility-string-singular)、[size](#grape-utility-string-size)、[slice](#grape-utility-string-slice)、[split](#grape-utility-string-split)、[squeeze](#grape-utility-string-squeeze)、[strip](#grape-utility-string-strip)、[substr](#grape-utility-string-substr)、[substring](#grape-utility-string-substring)、[succ](#grape-utility-string-succ)、[sum](#grape-utility-string-sum)、[swapcase](#grape-utility-string-swapcase)

T 
: [times](#grape-utility-string-times)、[toByteArray](#grape-utility-string-toByteArray)、[toF](#grape-utility-string-toF)、[toI](#grape-utility-string-toI)、[toLowerCase](#grape-utility-string-toLowerCase)、[toS](#grape-utility-string-toS)、[toString](#grape-utility-string-toString)、[toUpperCase](#grape-utility-string-toUpperCase)

U 
: [unescapeHtml](#grape-utility-string-unescapeHtml)、[upto](#grape-utility-string-upto)
[数値](#grape-utility-number)


[配列](#grape-utility-array)


[日付](#grape-utility-datetime)


[汎用アルゴリズム](#grape-libraries-algorithm)

G 
: [getRouteByDijkstra](#grape-libraries-algorithm-getRouteByDijkstra)、[getRouteFastByDijkstra](#grape-libraries-algorithm-getRouteFastByDijkstra)、[getRouteNodeByDijkstra](#grape-libraries-algorithm-getRouteNodeByDijkstra)

## ダウンロード


ver 0.1 (2017/10/23) : [Download](https://github.com/grape2004/grape-utilities/releases/download/ver1.0/grape-utility-string.js)

## 使用方法（共通）


使用したいユーティリティ/ライブラリを、HEAD要素内のSCRIPT要素で読み込みます。

例：

    <script src="./grape-utility-string.js"></script>
    <script type="text/javascript">
    
    // 自動的に変数 $ustr が定義されます。
    $ustr.capitalize( "hello" );   // -> "Hello"
    
    // 任意の変数に割り当てることもできます。
    var foo = new $UStr();
    foo.capitalize( "world" );    // -> "World"
    
    // インスタンス生成時に文字列を設定し、メソッドチェーンを使用することもできます。
    var bar = new $UStr( "utility" );
    bar.capitalize.center( 15, '-' );  // -> "----Utility----"
    
    </script>


## 文字列

<a name="grape-utility-string"></a><a name="grape-utility-string-ante"></a>
### ante


anteはantecessorの略


_本メソッドは、[prev](#grape-utility-string-prev)の別名です。_


<a name="grape-utility-string-bin"></a>
### bin


文字列を2進数とみなし、整数（数値）に変換します。
文字列の先頭に0bを含むことができます。
数値に変換できない場合には、0を返します。



Number ret = bin( String str )


str : 
変換対象の文字列を指定します。

ret : 
変換した数値を返します。



_関連：[dec](#grape-utility-string-dec)、[hex](#grape-utility-string-hex)、[oct](#grape-utility-string-oct)_


<a name="grape-utility-string-byteCodes"></a>
### byteCodes



_本メソッドは、[toByteArray](#grape-utility-string-toByteArray)の別名です。_


<a name="grape-utility-string-byteLength"></a>
### byteLength



_本メソッドは、[byteSize](#grape-utility-string-byteSize)の別名です。_


<a name="grape-utility-string-byteSize"></a>
### byteSize


文字列のbyteサイズを取得します。



Number ret = byteSize( String str )


str : 
文字列を指定します。

ret : byte
サイズを返します。



_本メソッドは、[byteLength](#grape-utility-string-byteLength)の別名です。
関連：[eachByte](#grape-utility-string-eachByte)、[getByte](#grape-utility-string-getByte)、[toByteArray](#grape-utility-string-toByteArray)_


<a name="grape-utility-string-bytes"></a>
### bytes



_本メソッドは、[eachByte](#grape-utility-string-eachByte)の別名です。_


<a name="grape-utility-string-caesarCipher"></a>
### caesarCipher


指定の文字列を指定数だけ文字列をシフトさせ、変更して返します。（シーザー暗号）
例えば、"A"を1シフトさせた場合には、"B"に。-1なら"Z"となります。
変換対象は、平仮名、カタカナ（全角・半角）、数値、英字（全角・半角）、一部の記号です。
対象外の文字はそのまま変換せずに返します。



String ret = caesarCipher( String str, Number shift )


str : 
変換したい文字列を指定します

shift : 
シフト数を指定します

ret : 
変換後の文字列を取得します



_関連：[hiragana](#grape-utility-string-hiragana)、[kana](#grape-utility-string-kana)、[en](#grape-utility-string-en)、[em](#grape-utility-string-em)、[leet](#grape-utility-string-leet)_


<a name="grape-utility-string-capitalize"></a>
### capitalize


文字列（英単語）の最初の1文字目を大文字にします。



String ret = capitalize( String str )


str : 
変換対象の文字列を指定します。

ret : 
変換後の文字列を返します。


例：

    $ustr.capitalize( "capitalize" );
    > "Capitalize"


_関連：[casecmp](#grape-utility-string-casecmp)、[toLowerCase](#grape-utility-string-toLowerCase)、[toUpperCase](#grape-utility-string-toUpperCase)_


<a name="grape-utility-string-casecmp"></a>
### casecmp


大文字小文字を区別せずに比較します。
文字が異なる場合には、ソート順位の前後で、-1か1を返します。



Number ret = casecmp( String str1, String str2 )


str1 : 
比較元の文字列を指定します。

str2 : 
比較先の文字列を指定します。

ret : (0)
同じ (-1)比較元が先 (1)比較元が後


例：

    $ustr.casecmp( "abc", "Abc" );
    > 0
    $ustr.casecmp( "abc", "def" );
    > -1
          

_関連：[capitalize](#grape-utility-string-capitalize)、[toLowerCase](#grape-utility-string-toLowerCase)、[toUpperCase](#grape-utility-string-toUpperCase)_


<a name="grape-utility-string-center"></a>
### center


文字列を指定文字数内で中央寄せをします。


String ret = center( String str, Number num, String pad = " " )

str : 
中央寄せしたい文字列を指定します。

num : 
中央寄せする行の最大文字数を指定します。

pad : (option) 
中央寄せの際に埋める文字（デフォルトは空白文字）を指定します。

ret : 
中央寄せした文字列を返します。


例：

    $ustr.center( "center", 10 );
    > "  center  "
    $ustr.center( "center", 15, "-*" );
    > "-*-*center-*-*-"



_関連：[right](#grape-utility-string-right)、[left](#grape-utility-string-left)_


<a name="grape-utility-string-charAt"></a>
### charAt


JavaScriptのStringオブジェクトのメソッド、String.charAtと同一です。
指定文字中の、指定位置の文字を返します。
文字の位置は、1文字目を0として指定します。



String ret = charAt( String str, Number num )


str : 
文字列を指定します

num : 
取得したい文字位置を指定します。

ret : 
指定位置の文字を返します。



_関連：[eachChar](#grape-utility-string-eachChar)_


<a name="grape-utility-string-charCodeAt"></a>
### charCodeAt


JavaScriptのStringオブジェクトのメソッド、String.charAtと同一です。
指定文字数の指定位置の文字コード（バイトコード）を返します。
文字の位置は、1文字目を0として指定します。
文字の位置は、byte数ではなく、文字数であるため、マルチバイト文字も1文字として扱います。



String ret = charCodeAt( String str, Number num )


str : 
文字列を指定します

num : 
取得したい文字位置を指定します。

ret : 
指定位置の文字コードを返します。



_関連：[getByte](#grape-utility-string-getByte)、[eachByte](#grape-utility-string-eachByte)_


<a name="grape-utility-string-chomp"></a>
### chomp


文字列の末尾の改行コードを消した文字列を返します
\r, \n, \r\n は、いずれも1つの改行コードとして処理します。



String ret = chomp( String str )


str : 
末尾の改行コードを削除したい文字列を指定します。

ret : 
末尾の改行コードを削除した文字列を返します。


<a name="grape-utility-string-chop"></a>
### chop


文字列の末尾の文字を消した文字列を返します
ただし、末尾が\r\nによる2byteの改行コードだった場合には、2byte分を削除します。



String ret = chomp( String str )


str : 
末尾の文字を削除したい文字列を指定します。

ret : 
末尾の文字を削除した文字列を返します。


<a name="grape-utility-string-cjust"></a>
### cjust



_本メソッドは、[center](#grape-utility-string-center)の別名です。_


<a name="grape-utility-string-concat"></a>
### concat


JavaScriptのStringオブジェクトのメソッド、String.concatと同一です。
２つの文字列を連結して、１つの文字列にして返します。



String ret = concat( String org, String dest )


org : 
連結したい元の文字列を指定します。

dest : 
連結したい先の文字列を指定します。

ret : 
連結した文字列を返します。


<a name="grape-utility-string-count"></a>
### count


文字列中に含まれる、指定文字（正規表現文字列）の数を返します。
第三引数以降を指定した場合には、AND条件で対象を絞り込むことが可能です。
条件が複数存在する場合には、第四、第五引数など可変長引数での指定が可能で、これらの条件同士はANDとなります。
また、一致条件には文字列の他、正規表現を使用することが可能です。



Number ret = count( String str, String phraze, String conditions... )


str : 
検索元の文字列を指定します。

phraze : 
カウントしたい文字列（正規表現文字列）を指定します。

conditions : (option) 
絞り込み条件を追加指定します。

ret : 
カウント数を返します。


<a name="grape-utility-string-dec"></a>
### dec


文字列を10進数の整数（数値）に変換します。
文字列の先頭に¥または$を含むことができます。
また、文字列中に,を含むことができます。
小数点以下は無視されます。
数値に変換できない場合には、0を返します。



Number ret = dec( String str )


str : 
変換対象の文字列を指定します。

ret : 
変換した数値を返します。



_関連：[bin](#grape-utility-string-bin)、[float](#grape-utility-string-float)、[hex](#grape-utility-string-hex)、[oct](#grape-utility-string-oct)_


<a name="grape-utility-string-diff"></a>
### diff


指定した2つの文字列を比較し、同一部、追加部、削除部を出力します。
例えば、"apple"と"approach"を比較した場合に、
"apple"という文字列を編集して、"approach"という文字列にするために必要な、
編集内容が比較結果として出力されます。
具体的には、"app"は同一、"le"は削除。"roach"を追加、です。

比較結果は、以下の様なオブジェクトによる配列で返します。
配列に格納される順序は、比較元文字列を編集する順序と一致します。

    return_value = [
    {
    value: "app",
    type: "="
    },
    {
    value: "le",
    type: "-"
    },
    {
    value: "roach",
    type: "+"
    },
    ]

"value"のキー名には、編集内容の文字列が格納されます。
"type"のキー名には、編集方法が格納されます。
編集方法は、以下の3種類です。

\= : 編集なし。比較元と比較先で同一の文字列であることを示す。

\- : 比較元から削除される文字列

\+ : 比較先から追加された文字列



Array ret = diff( String org, String dest )


org : 
比較元の文字列を指定します。

dest : 
比較先の文字列を指定します。

ret : 
比較結果のオブジェクトによる配列を返します。



_関連：[diffLine](#grape-utility-string-diffLine)_


<a name="grape-utility-string-diffLine"></a>
### diffLine


指定した2つの文字列を比較し、行単位で同一部、追加部、削除部を出力します。
使用方法や戻り値の形式は、 <span class="relations">[diff](#grape-utility-string-diff)</span> と同様です。
本メソッドが異なる点は、行単位で差分を算出することであり、行内の文字の部分的な差位は出力しません。

比較結果は、以下の様なオブジェクトによる配列で返します。
配列に格納される順序は、比較元の行の順序と同一です。

    return_value = [
    {
    value: "1st line\n2nd line\n",
    type: "="
    },
    {
    value: "3rd line",
    type: "-"
    },
    {
    value: "4th line",
    type: "+"
    },
    ]

"value"のキー名には、行単位の文字列が配列で格納されます。
"type"のキー名には、編集方法が格納されます。
編集方法は、以下の3種類です。

\= : 編集なし。比較元と比較先で同一の行であることを示す。

\- : 比較元から削除される行

\+ : 比較先から追加された行



Array ret = diffLine( String org, String dest )


org : 
比較元の文字列を指定します。

dest : 
比較先の文字列を指定します。

ret : 
比較結果のオブジェクトによる配列を返します。



_関連：[diff](#grape-utility-string-diff)_


<a name="grape-utility-string-downto"></a>
### downto


開始文字列が、終了文字列になるまで「前の文字列」を繰り返し生成し、引数に指定の関数を実行します。
また、生成した「前の文字列」は、配列で戻り値として返します。
「前の文字列」がどの様に生成されるかは、 <span class="relations">[ante](#grape-utility-string-ante)、[prev](#grape-utility-string-prev)</span> を参照してください。
開始文字列から「前の文字列」を繰り返し生成する延長線上に終了文字列が無い場合には、生成される文字列は開始文字列のみとなります。
ただし、65535件を超えるて「前の文字列」は生成されません。



Array ret = downto( String org, String dest, Function block )


org : 
開始文字列を指定します。

dest : 
終了文字列を指定します。

ret : 
生成した文字列を配列で返します。


例：

    $ustr.downto( "d", "a" );
    > [ "d", "c", "b", "a" ]
    
    $ustr.upto( "b0b", "a9x", function( str ){ console.log(str) } );
    > "b0b"
    > "b0a"
    > "a9z"
    > "a9y"
    > "a9x"
    > [ "b0b", "b0a", "a9z", "a9y", "a9x" ]


_関連：[ante](#grape-utility-string-ante)、[prev](#grape-utility-string-prev)、[upto](#grape-utility-string-upto)_


<a name="grape-utility-string-each"></a>
### each


1行づつ取り出して、ブロックを実行します



each( String str, Function fnc )


str : 
文字列(複数行)を指定します。

fnc : 1
行につき1回、thisに取り出した文字列を引き渡して実行します。


例：

    $ustr.each( "abc\ndef", function(){ 
    console.log( this ) 
    } );
    > "abc"
    > "def"


_本メソッドは、[eachLine](#grape-utility-string-eachLine)、[lines](#grape-utility-string-lines)の別名です。
関連：[byteSize](#grape-utility-string-byteSize)、[eachByte](#grape-utility-string-eachByte)、[eachChar](#grape-utility-string-eachChar)_


<a name="grape-utility-string-eachByte"></a>
### eachByte


1byteづつ取り出して、ブロックを実行します



eachByte( String str, Function fnc )


str : 
文字列(複数行)を指定します。

fnc : 1byte
につき1回、thisに取り出したバイトコードを引き渡して実行します。


例：

    $ustr.eachByte( "abc", function(){ 
    console.log( this ) 
    } );
    > 0x61
    > 0x62
    > 0x63


_関連：[byteSize](#grape-utility-string-byteSize)、[each](#grape-utility-string-each)、[eachChar](#grape-utility-string-eachChar)、[toByteArray](#grape-utility-string-toByteArray)、[charCodeAt](#grape-utility-string-charCodeAt)_


<a name="grape-utility-string-eachChar"></a>
### eachChar


1文字づつ取り出して、ブロックを実行します。
ただし、¥r¥nによる改行コードは2文字として扱われます



eachChar( String str, Function fnc )


str : 
文字列(複数行)を指定します。

fnc : 1
文字につき1回、thisに取り出した文字列を引き渡して実行します。


例：

    $ustr.eachChar( "abc", function(){ 
    console.log( this ) 
    } );
    > "a"
    > "b"
    > "c"


_関連：[each](#grape-utility-string-each)、[eachByte](#grape-utility-string-eachByte)、[charAt](#grape-utility-string-charAt)_


<a name="grape-utility-string-eachLine"></a>
### eachLine



_本メソッドは、[each](#grape-utility-string-each)の別名です。_


<a name="grape-utility-string-em"></a>
### em


指定の文字列を全角文字に置換して返します。
変換対象は、カタカナ、数値、英字と一部の記号（半角）です。
対象外の文字はそのまま変換せずに返します。



String ret = em( String str )


str : 
変換したい文字列を指定します

ret : 
変換後の文字列を取得します



_関連：[hiragana](#grape-utility-string-hiragana)、[kana](#grape-utility-string-kana)、[en](#grape-utility-string-en)、[caesarCipher](#grape-utility-string-caesarCipher)、[leet](#grape-utility-string-leet)_


<a name="grape-utility-string-en"></a>
### en


指定の文字列を半角文字に置換して返します。
変換対象は、平仮名、カタカナ、数値、英字と一部の記号（全角）です。
対象外の文字はそのまま変換せずに返します。



String ret = en( String str )


str : 
変換したい文字列を指定します

ret : 
変換後の文字列を取得します



_関連：[hiragana](#grape-utility-string-hiragana)、[kana](#grape-utility-string-kana)、[em](#grape-utility-string-em)、[caesarCipher](#grape-utility-string-caesarCipher)、[leet](#grape-utility-string-leet)_


<a name="grape-utility-string-escapeHtml"></a>
### escapeHtml


文字列中の、以下の文字をエスケープ処理します。
&lt;（大なり）、&gt;（小なり）、&amp;（アンパサンド）、"（ダブルクォート）、'（シングルクォート）



String ret = escapeHtml( String str )


str : 
エスケープ対象の文字列を指定します。

ret : 
エスケープ後の文字列を返します。



_関連：[unescapeHtml](#grape-utility-string-unescapeHtml)_


<a name="grape-utility-string-fill"></a>
### fill



_本メソッドは、[padding](#grape-utility-string-padding)の別名です。_


<a name="grape-utility-string-findBlock"></a>
### findBlock


指定文字列中から、指定の囲み文字内の文字列を配列で取得します。
囲み文字の初期値は"(ダブルクォーテーション)です。
囲み文字を"(ダブルクォーテーション)とした場合に、""や¥"、\"といった記述でエスケープを許可するかどうかを指定することが可能です。
文字列中に囲み文字の開始が存在したが、終了が存在しなかった場合には、それらは囲み文字としては扱われません。
囲み文字列内が0文字であった場合（空文字）には、本メソッドの戻り値として空文字（を含んだ配列）が取得されます。
囲み文字が１つも取得されなかった場合には、空の配列が取得されます。



Array ret = findBlock( String str, String block, Boolean allowNest, Boolean isEscapeSameChar, Boolean isEscapeReverseSolidus )


str : 
検索対象の文字列を指定します。

block : (option)  
囲み文字を指定します。デフォルトは"（バックスラッシュ）。
2文字指定した場合には、1文字目を囲み文字の開始、2文字目を囲み文字の終了とみなします。

allowNest : (option)  
囲み文字が開始と終了で異なる場合に、ネストを許可するか？デフォルトはtrue 

isEscapeSameChar : (option) 
囲み文字と同じ文字を連続で2つ記述した場合にはエスケープとみなし、
通常の文字1文字分として扱います。（囲み文字として機能しません）デフォルトはtrue

isEscapeReverseSolidus : (option) 
¥や\（バックスラッシュ）をエスケープ文字として扱い、囲み文字の直前に記述された場合には、
囲み文字を通常の1文字分として扱います。（囲み文字として機能しません）デフォルトはfalse

ret : 
取得された囲み文字内の文字列（複数の場合あり）を配列で返します。


例：

    $ustr.findBlock( 'abc"def"ghi' );
    > [ 'def' ]
    $ustr.findBlock( 'ab"cd""e\"fg"hi', '"', true, true );
    > [ 'cd"e"fg' ]
    $ustr.findBlock( "abc<def>ghi<jkl>", "<>", false, false );
    > [ "def", "jkl" ]


<a name="grape-utility-string-findEmail"></a>
### findEmail


指定文字列中からメールアドレスのフォーマットと一致する文字列を抽出して、配列で返します。
strictフラグを指定した場合には、マッチさせるメールアドレスのフォーマットが厳格になります。
具体的には、HTMLのINPUT要素のTYPE=EMAILとした時に入力が許容されるフォーマットと一致します。
このフォーマット（strict時）は、RFC5322をベースとしていますが、過去に携帯電話向けのアドレス等で
規約に合致しないものが現在でも使用されている経緯があり、厳密にはRFC5322には準拠していません。
strictフラグのデフォルトはtrueです。



Array ret = findEmail( String str, Boolean strict )


str : 
対象の文字列を指定します。

strict : (option) 
できるだけ厳密にメールアドレスにマッチさせるか否かを指定します。

ret : 
抽出したメールアドレス文字列を配列で返します。



_関連：[findPhone](#grape-utility-string-findPhone)、[findIp](#grape-utility-string-findIp)、[findWord](#grape-utility-string-findWord)、[findUrl](#grape-utility-string-findUrl)_


<a name="grape-utility-string-findIp"></a>
### findIp


指定文字列中からIPアドレスのフォーマットと一致する文字列を抽出して、配列で返します。
本メソッドでは、IPv4及びIPv6両方のアドレスに対応し、CIDR表記にもマッチします。



Array ret = findIp( String str )


str : 
対象の文字列を指定します。

ret : 
抽出したURL文字列を配列で返します。



_関連：[findEmail](#grape-utility-string-findEmail)、[findIp4](#grape-utility-string-findIp4)、[findIp6](#grape-utility-string-findIp6)、[findPhone](#grape-utility-string-findPhone)、[findUrl](#grape-utility-string-findUrl)、[findWord](#grape-utility-string-findWord)_


<a name="grape-utility-string-findIp4"></a>
### findIp4


指定文字列中からIPv4のフォーマットと一致する文字列を抽出して、配列で返します。
本メソッドでは、IPv4のアドレスに対応し、CIDR表記にもマッチします。



Array ret = findIp4( String str )


str : 
対象の文字列を指定します。

ret : 
抽出したURL文字列を配列で返します。



_関連：[findEmail](#grape-utility-string-findEmail)、[findIp](#grape-utility-string-findIp)、[findIp6](#grape-utility-string-findIp6)、[findPhone](#grape-utility-string-findPhone)、[findUrl](#grape-utility-string-findUrl)、[findWord](#grape-utility-string-findWord)_


<a name="grape-utility-string-findIp6"></a>
### findIp6


指定文字列中からIPv6のフォーマットと一致する文字列を抽出して、配列で返します。
本メソッドでは、IPv6のアドレスに対応し、CIDR表記にもマッチします。



Array ret = findIp6( String str )


str : 
対象の文字列を指定します。

ret : 
抽出したURL文字列を配列で返します。



_関連：[findEmail](#grape-utility-string-findEmail)、[findIp](#grape-utility-string-findIp)、[findIp4](#grape-utility-string-findIp4)、[findPhone](#grape-utility-string-findPhone)、[findUrl](#grape-utility-string-findUrl)、[findWord](#grape-utility-string-findWord)_


<a name="grape-utility-string-findPhone"></a>
### findPhone


指定文字列中から電話番号のフォーマットと一致する文字列を抽出して、配列で返します。
電話番号のフォーマットは、日本の電話番号（携帯電話を含む）を対象とし、国際電話番号を含むことができます。
短縮ダイヤルなどの#（スクエア）や*（スター）には対応していません。
strictフラグを指定した場合には、マッチさせる電話番号のフォーマットが厳格になります。
具体的には、市外局番の無いものは電話番号とはみなしません。
また、先頭は国際電話番号で日本を表す「81」か国内電話番号を表す「0」に始まり、
固定電話では、市外局番と市内局番の合計が5桁、加入者番号が4桁である必要があります。
携帯電話・PHSでは、090または070の後に、４桁+4桁の計8桁の加入者番号が続く必要があります。
市外局番、市内局番、加入者番号間の、"-"や"(",")"は電話番号に含むことができます。
strictフラグのデフォルトはtrueです。



Array ret = findPhone( String str, Boolean strict )


str : 
対象の文字列を指定します。

strict : (option) 
できるだけ厳密に電話番号にマッチさせるか否かを指定します。

ret : 
抽出した電話番号文字列を配列で返します。



_関連：[findEmail](#grape-utility-string-findEmail)、[findWord](#grape-utility-string-findWord)、[findUrl](#grape-utility-string-findUrl)_


<a name="grape-utility-string-findTel"></a>
### findTel



_本メソッドは、[findPhone](#grape-utility-string-findPhone)の別名です。_


<a name="grape-utility-string-findUrl"></a>
### findUrl


指定文字列中からURLのフォーマットと一致する文字列を抽出して、配列で返します。
strictフラグを指定した場合には、マッチさせるURLのフォーマットが厳格になります。
具体的には、RFC2396/3986に準拠した、スキーマを含んだ絶対パスのURLとマッチします。
strictフラグのデフォルトはtrueです。
strictフラグがfalseの場合には、相対パスともマッチします。



Array ret = findUrl( String str, Boolean strict )


str : 
対象の文字列を指定します。

strict : (option) 
できるだけ厳密にURLにマッチさせるか否かを指定します。

ret : 
抽出したURL文字列を配列で返します。



_関連：[findEmail](#grape-utility-string-findEmail)、[findIp](#grape-utility-string-findIp)、[findPhone](#grape-utility-string-findPhone)、[findWord](#grape-utility-string-findWord)、[parseUrl](#grape-utility-string-parseUrl)_


<a name="grape-utility-string-findWord"></a>
### findWord


文字列（英文）を単語単位に分割して、配列で返します。



Array ret = findWord( String str )


str : 
分割対象の文字列を指定します。

ret : 
配列を返します。


例：

    $ustr.findWord( "This is commonFunctions" );
    > [ "This", "is", "common", "Functions" ]



_関連：[findEmail](#grape-utility-string-findEmail)、[findIp](#grape-utility-string-findIp)、[findPhone](#grape-utility-string-findPhone)、[findUrl](#grape-utility-string-findUrl)_


<a name="grape-utility-string-float"></a>
### float


文字列を実数（小数を含んだ数値）とみなして変換します。
文字列の先頭に¥または$を含むことができます。
また、文字列中に,を含むことができます。
変換できない場合には、0を返します。



Number ret = float( String str )


str : 
変換対象の文字列を指定します。

ret : 
変換した数値を返します。



_関連：[dec](#grape-utility-string-dec)_


<a name="grape-utility-string-formats"></a>
### formats


フォーマット文字列で指定した形式に従って、指定のパラメータを置換した文字列を返します。
フォーマット指定子の書式は以下の通りです。

%[ フラグディレクティブ ][ フィールド幅 ][ . ][ 小数部フィールド幅 ]フォーマット指定子
※ []はオプションです。

フォーマット文字列中に、上記のフォーマット指定子は任意の数だけ含むことが可能で、第二引数以降に指定のパラメータによって置換されます。
また、フォーマット文字列以外の形式の文字列は置換されずに、そのまま出力されます。

例:

    %d       // 整数に置換
    %-5d     // 左寄せの5桁の整数に置換
    %010d    // 0パディングされた10桁の整数に置換


使用可能なフラグディレクティブは以下の通り
<table class="type1">
<tbody><tr><th>フラグディレクティブ</th><th>説明</th></tr>
<tr><td>+</td><td>整数を表示する場合に符号を常に出力します。
この時、符号はフィールド幅に含む文字列としてカウントされます</td></tr>
<tr><td>-</td><td>出力値がフィールド幅に満たない時、出力文字の後方に空白が挿入されます。</td></tr>
<tr><td>0</td><td>出力値がフィールド幅に満たない時、出力文字の前方に0が挿入されます。</td></tr>
<tr><td>(半角空白)</td><td>出力値がフィールド幅に満たない時、符号と出力文字との間に空白が挿入されます。</td></tr>
<tr><td>#</td><td>フォーマット指定子が%o、%x、%Xの時、それぞれ先頭に0または0xが付与されます。
この時、0または0xはフィールド幅に含む文字列としてカウントされます</td></tr>
</tbody></table>
使用可能な指定子は以下の通り
<table class="type1">
<tbody><tr><th>指定子</th><th>説明</th></tr>
<tr><td>%d</td><td>数値を10進数で出力する。パラメータが日付型だった場合には、日（01〜31）を出力する。</td></tr>
<tr><td>%o</td><td>数値を8進数で出力する</td></tr>
<tr><td>%x</td><td>数値を16進数（a〜fは小文字）で出力する</td></tr>
<tr><td>%X</td><td>数値を16進数（A〜Fは大文字）で出力する</td></tr>
<tr><td>%f</td><td>実数を出力する</td></tr>
<tr><td>%g</td><td>実数を指数表示で出力する</td></tr>
<tr><td>%s</td><td>文字列を出力する</td></tr>
<tr><td>%Y</td><td>パラメータが日付型の時、西暦を出力する</td></tr>
<tr><td>%y</td><td>パラメータが日付型の時、西暦の下2桁を出力する</td></tr>
<tr><td>%m</td><td>パラメータが日付型の時、月（1〜12）を出力する</td></tr>
<tr><td>%B</td><td>パラメータが日付型の時、月の名称（January、February ...）を出力する</td></tr>
<tr><td>%b</td><td>パラメータが日付型の時、月の省略名（Jan、Feb ...）を出力する</td></tr>
<tr><td>%j</td><td>パラメータが日付型の時、年中の通算日（1〜366）を出力する</td></tr>
<tr><td>%w</td><td>パラメータが日付型の時、曜日を表す数（0〜6、0は日曜）を出力する</td></tr>
<tr><td>%A</td><td>パラメータが日付型の時、曜日の名称（Sunday、Monday ...）を出力する</td></tr>
<tr><td>%a</td><td>パラメータが日付型の時、曜日の省略名（Sun、Mon ...）を出力する</td></tr>
<tr><td>%V</td><td>パラメータが日付型の時、ISO8601形式の暦週。
最初の木曜日を含む週を第1週とした週を表す数（1〜53）を出力する</td></tr>
<tr><td>%U</td><td>パラメータが日付型の時、最初の日曜日を第1週とした週を表す数（0〜53）を出力する</td></tr>
<tr><td>%W</td><td>パラメータが日付型の時、最初の月曜日を第1週とした週を表す数（0〜53）を出力する</td></tr>
<tr><td>%H</td><td>パラメータが時刻型の時、24時間制の時（0〜23）を出力する</td></tr>
<tr><td>%l</td><td>パラメータが時刻型の時、12時間制の時（1〜12）を出力する</td></tr>
<tr><td>%M</td><td>パラメータが時刻型の時、分（0〜59）を出力する</td></tr>
<tr><td>%S</td><td>パラメータが時刻型の時、秒（0〜60、60はうるう秒）を出力する</td></tr>
<tr><td>%N</td><td>パラメータが時刻型の時、秒の小数点以下のミリ秒（0〜999）を出力する</td></tr>
<tr><td>%L</td><td>%Nに同じ</td></tr>
<tr><td>%P</td><td>パラメータが時刻型の時、午前または午後（am、pm）を出力する</td></tr>
<tr><td>%p</td><td>パラメータが時刻型の時、午前または午後（AM、PM）を出力する</td></tr>
<tr><td>%Z</td><td>タイムゾーン（JST）を出力する</td></tr>
<tr><td>%z</td><td>タイムゾーン。UTCからのオフセット値（09:00）を出力する</td></tr>
<tr><td>%F</td><td>"YYYY-mm-dd"形式の日付文字列を出力する（2017-10-16）</td></tr>
<tr><td>%D</td><td>"mm/dd/YYYY"形式の日付文字列を出力する（10/16/2017）</td></tr>
<tr><td>%v</td><td>"b-dd-YYYY"形式の日付文字列を出力する（Oct-16-2017）</td></tr>
<tr><td>%T</td><td>"HH:MM:SS"形式の24時間制の時刻文字列（23:48:19）を出力する</td></tr>
<tr><td>%R</td><td>"HH:MM"形式の24時間制の時刻文字列（23:48）を出力する</td></tr>
<tr><td>%r</td><td>"ll:MM:SS p"形式の12時間制の時刻文字列（11:53:06 AM）を出力する</td></tr>
</tbody></table>

フォーマット文字列中に記述したフォーマット指定子の数に対して、パラメータ数が不足している時、最後のパラメータ値が使いまわされます。
逆にパラメータが多い場合には、余ったパラメータ値は無視されます。

パラメータはフォーマット指定子に合わせて出力可能な形式に自動的に変換します。
例えば、%Y（西暦を出力）に対して、パラメータが4桁以下の数値の時には、そのまま西暦を表す数値とみなして出力します。
パラメータが5桁以上の数値である場合には、1970年1月1日 0時0分0秒を基準日とした、ミリ秒の指定とみなして日付に変換後、西暦を出力します。
パラメータが文字列で、全て数字で構成されている場合には、数値に変換後に上記と同様の処理を行います。
パラメータが文字列で、数字以外を含む場合には日付文字列として解析した上で、西暦を出力します。
パラメータが日付型である場合には、日付オブジェクトから西暦を出力します。
それ以外の形式で変換ができない場合には、本メソッドの実行は失敗し、NULLを返します。

フォーマット文字列中で"%"の文字列を使用したい場合には、"%%"として%を二重に記載することでエスケープ可能です。



String ret = formats( String format, String param ... )


format : 
フォーマット指定文字列を指定します

param : 
可変長引数。パラメータ値を指定します

ret : 
変換後の文字列を取得します

または、以下の形式で引数を指定可能です。


String ret = formats( Array format_and_params )


format_and_params : 
第一要素にフォーマット指定文字列、第二要素以降にパラメータ値を格納した配列を指定します

ret : 
変換後の文字列を取得します



String ret = formats( String format, Array params )


format : 
フォーマット指定文字列を指定します

params : 
パラメータを配列で指定します

ret : 
変換後の文字列を取得します


例：

    $ustr.formats( "%sさん", "山田太郎" );
    > "山田太郎さん"
    $ustr.formats( "%03d / %Y", 15, ( new Date() ) );
    > "035 / 2017"


<a name="grape-utility-string-getByte"></a>
### getByte


文字列の指定byte目の、任意のバイトコードを取得します。
位置は0オリジンで指定し、1byte目を0。2byte目を1とします。
マイナス値を指定した場合には、文字列の末尾から数えたbyte数となり、

\-1は末尾のバイトコードを、-2は末尾から2番目のバイトコードとなります。
範囲外の位置を指定した場合には、0を返します。



Number ret = getByte( String str, Number index )


str : 
対象の文字列を指定します。

index : 
取得したいbyte単位の位置

ret : 
バイトコードを返します。



_関連：[byteSize](#grape-utility-string-byteSize)、[eachByte](#grape-utility-string-eachByte)、[setByte](#grape-utility-string-setByte)、[toByteArray](#grape-utility-string-toByteArray)、[charAt](#grape-utility-string-charAt)、[charCodeAt](#grape-utility-string-charCodeAt)_


<a name="grape-utility-string-hex"></a>
### hex


文字列を16進数とみなし、整数（数値）に変換します。
文字列の先頭に0xを含むことができます。
数値に変換できない場合には、0を返します。



Number ret = hex( String str )


str : 
変換対象の文字列を指定します。

ret : 
変換した数値を返します。



_関連：[bin](#grape-utility-string-bin)、[dec](#grape-utility-string-dec)、[oct](#grape-utility-string-oct)_


<a name="grape-utility-string-hiragana"></a>
### hiragana


指定の文字列を平仮名に置換して返します。
変換対象は、カタカナ（全角）です。
対象外の文字はそのまま変換せずに返します。



String ret = hiragana( String str )


str : 
平仮名に変換したい文字列を指定します

ret : 
変換後の文字列を取得します



_関連：[kana](#grape-utility-string-kana)、[en](#grape-utility-string-en)、[em](#grape-utility-string-em)_


<a name="grape-utility-string-index"></a>
### index


文字列内に指定の文字列（正規表現文字列）が含まれているとき、最初に見つかった位置を返します。
文字の位置は、1文字目を0、2文字目を1とし、文字列が含まれていない時にはnullを返します。
offsetに文字位置を指定した場合には、それ以前の文字列を無視します。
offsetは文字列の先頭から数えて、1文字目を0、2文字目を1として指定します。
offsetに3を指定した場合には、3文字目以前を無視して処理します。



Number ret = index( String str, String phraze, Number offset )


str : 
判定対象の文字列を指定します。

phraze : 
判定対象に含まれる文字列（正規表現文字列）を指定します。

offset : (option) 
検索を開始する文字位置を指定します。

ret : str
内のphrazeを含む位置を返します。



_関連：[isInclude](#grape-utility-string-isInclude)、[rindex](#grape-utility-string-rindex)、[lastIndexOf](#grape-utility-string-lastIndexOf)、[search](#grape-utility-string-search)_


<a name="grape-utility-string-insert"></a>
### insert


文字列中の指定位置に文字列を挿入して返します。



String ret = insert( String str, Number index, String other )


str : 
挿入先の文字列を指定します。

index : 
挿入位置を指定します。0は文字の先頭。1は1文字目の後。-1は文末、-2は最後の文字の前に挿入します。

other : 
挿入したい文字列を指定します。

ret : 
挿入後の文字列を返します。


例：

    $ustr.insert( "aaa", 0, "_bbb_" );
    > "_bbb_aaa"
    $ustr.insert( "aaa", 1, "_bbb_" );
    > "a_bbb_aa"
    $ustr.insert( "aaa", -1, "_bbb_" );
    > "aaa_bbb_"

<a name="grape-utility-string-isBlank"></a>
### isBlank



_本メソッドは、[isEmpty](#grape-utility-string-isEmpty)の別名です。_


<a name="grape-utility-string-isEmpty"></a>
### isEmpty


文字列が空文字か否かを返します。



Boolean ret = isEmpty( String str )


str : 
判定対象の文字列を指定します。

ret : 
空文字（またはNULL、undefined）ならばtrue、そうでなければfalseを返します。


<a name="grape-utility-string-isEndWith"></a>
### isEndWith


文字列の末尾が指定の文字列（正規表現文字列）であるか否かを返す



Boolean ret = isEndWith( String str, String phraze )


str : 
判定対象の文字列を指定します。

phraze : 
末尾の文字列（正規表現文字列）を指定します。

ret : str
の末尾がphrazeであるならばtrue、そうでなければfalseを返します。


例：

    $ustr.isEndWith( "abc,def", "def" );
    > true


_関連：[isStartWith](#grape-utility-string-isStartWith)、[isInclude](#grape-utility-string-isInclude)_


<a name="grape-utility-string-isInclude"></a>
### isInclude


文字列内に指定の文字列（正規表現文字列）が含まれているか否かを返す



Boolean ret = isInclude( String str, String phraze )


str : 
判定対象の文字列を指定します。

phraze : 
判定対象に含まれる文字列（正規表現文字列）を指定します。

ret : str
内にphrazeを含むならばtrue、そうでなければfalseを返します。


例：

    $ustr.isInclude( "abc,def", "[\w]+" );
    > true


_関連：[isEndWith](#grape-utility-string-isEndWith)、[isStartWith](#grape-utility-string-isStartWith)、[index](#grape-utility-string-index)_


<a name="grape-utility-string-isStartWith"></a>
### isStartWith


文字列の先頭が指定の文字列（正規表現文字列）であるか否かを返す



Boolean ret = isStartWith( String str, String phraze )


str : 
判定対象の文字列を指定します。

phraze : 
先頭の文字列（正規表現文字列）を指定します。

ret : str
の先頭がphrazeであるならばtrue、そうでなければfalseを返します。


例：

    $ustr.isStartWith( "abc,def", "abc" );
    > true


_関連：[isInclude](#grape-utility-string-isInclude)、[isEndWith](#grape-utility-string-isEndWith)_


<a name="grape-utility-string-kana"></a>
### kana


指定の文字列をカタカナに置換して返します。
変換対象は、平仮名です。
対象外の文字はそのまま変換せずに返します。



String ret = kana( String str )


str : 
カタカナに変換したい文字列を指定します

ret : 
変換後の文字列を取得します



_関連：[hiragana](#grape-utility-string-hiragana)、[en](#grape-utility-string-en)、[em](#grape-utility-string-em)_


<a name="grape-utility-string-lastIndexOf"></a>
### lastIndexOf


JavaScriptのStringオブジェクトのメソッド、String.lastIndexOfと同一です。
指定文字列の後方から、最初に見つかった指定のフレーズと一致する文字位置を検索し、返します。
文字位置は1文字目を0とし、一致するフレーズが無い場合には-1を返します。
また、検索開始位置を指定した場合には、その文字位置よりも前方を検索します。



String ret = lastIndexOf( String str, String phraze, Number from )


str : 
検索したい文字列を指定します。

phraze : 
検索したいフレーズ文字列を指定します。

from : (option) 
検索開始位置を指定します。

ret : 
最初に一致した位置を返します。



_関連：[rindex](#grape-utility-string-rindex)、[isInclude](#grape-utility-string-isInclude)、[index](#grape-utility-string-index)、[search](#grape-utility-string-search)_


<a name="grape-utility-string-leet"></a>
### leet


指定の文字列をリート（所謂、ハッカー語）に変換します。
対象となる文字列は半角英字（小文字）のみです。



String ret = leet( String str )


str : 
変換したい文字列を指定します

ret : 
変換後の文字列を取得します



_関連：[hiragana](#grape-utility-string-hiragana)、[kana](#grape-utility-string-kana)、[en](#grape-utility-string-en)、[em](#grape-utility-string-em)、[caesarCipher](#grape-utility-string-caesarCipher)_


<a name="grape-utility-string-left"></a>
### left



_本メソッドは、[ljust](#grape-utility-string-ljust)の別名です。_


<a name="grape-utility-string-lines"></a>
### lines



_本メソッドは、[each](#grape-utility-string-each)の別名です。_


<a name="grape-utility-string-ljust"></a>
### ljust


文字列を指定文字数内で左寄せします。


String ret = ljust( String str, Number num, String pad = " " )

str : 
左寄せしたい文字列を指定します。

num : 
左寄せする行の最大文字数を指定します。

pad : (option) 
左寄せの際に埋める文字（デフォルトは空白文字）を指定します。

ret : 
左寄せした文字列を返します。


例：

    $ustr.ljust( "left", 10 );
    > "left      "
    $ustr.ljust( "left", 15, "-*" );
    > "left-*-*-*-*-*-"

<a name="grape-utility-string-lstrip"></a>
### lstrip


行頭の空白、タブ、改行コードを削除して返します。



String ret = lstrip( String str )


str : 
削除対象の文字列を指定します。

ret : 
削除後の文字列を返します。



_関連：[rstrip](#grape-utility-string-rstrip)、[strip](#grape-utility-string-strip)_


<a name="grape-utility-string-match"></a>
### match


JavaScriptのStringオブジェクトのメソッド、String.matchと同一です。
指定文字列中の、指定フレーズ（または正規表現オブジェクト）と一致する時、一致した部分の文字列を配列で返します。
一致しなかった場合には、nullを返します。



Array ret = match( String str, String phraze )


str : 
検索したい文字列を指定します。

phraze : 
検索したいフレーズ文字列（または正規表現オブジェクト）を指定します。

ret : 
一致した文字列を配列で返します。


<a name="grape-utility-string-mergePath"></a>
### mergePath


２つのパス文字列を合成して、１つの絶対パスのURLを生成します。
合成元になる絶対パスと、相対パスによる組み合わせで指定されることを想定しています。
２つとも絶対パスを指定した場合には合成をせず、２つ目のパスが優先されます。
２つとも相対パスであった場合には、１つ目のパスをカレントと見なして、合成します。
パスの最後が"/"ではない場合。例えば、"/foo/bar/baz"の時。
"baz"はファイルとみなされ、"/foo/bar/"がディレクトリとして扱われます。
"baz"をディレクトリとして扱いたい場合には、"baz/"の様に、最後に"/"を付ける必要があります。
合成元のパス（両方または片方）が、パスとして認識できなかった場合には、nullを返します。



String ret = mergePath( String path1, String path2 )


path1 : 
合成元のパス（１つ目）文字列を指定します。

path2 : 
合成元のパス（２つ目）文字列を指定します。

ret : 
合成結果のパスを返します。



_関連：[findUrl](#grape-utility-string-findUrl)、[parsePath](#grape-utility-string-parsePath)、[mergeUrl](#grape-utility-string-mergeUrl)_


<a name="grape-utility-string-mergeUrl"></a>
### mergeUrl


２つのURL文字列を合成して、１つの絶対パスのURLを生成します。
合成元になる絶対パスのURLと、相対パスによる組み合わせで指定されることを想定しています。
２つとも絶対パスのURLを指定した場合には合成をせず、２つ目のURLが優先されます。
２つとも相対パスであった場合には、１つ目のURL上のパスをカレントと見なして、合成します。
URLのパス部の最後が"/"ではない場合。例えば、"http://exsample.com/foo/bar"の時。
"bar"はファイルとみなされ、"/foo/"がカレントのパスとして扱われます。
"bar"をディレクトリとして扱いたい場合には、"bar/"の様に、最後に"/"を付ける必要があります。
合成元のURL（両方または片方）が、URLとして認識できなかった場合には、nullを返します。



String ret = mergeUrl( String url1, String url2 )


url1 : 
合成元のURL（１つ目）文字列を指定します。

url2 : 
合成元のURL（２つ目）文字列を指定します。

ret : 
合成結果のURLを返します。



_関連：[findUrl](#grape-utility-string-findUrl)、[parseUrl](#grape-utility-string-parseUrl)、[mergePath](#grape-utility-string-mergePath)_


<a name="grape-utility-string-next"></a>
### next


次の文字を生成して返します。
末尾の文字が半角英字の時、aはb、bはcに更新します。
数値ならば、0は1、1は2へと更新します。
zや9などであれば、繰り上げを行います。



String ret = next( String str )


str : 
次の文字を生成したい対象の文字列を指定します。

ret : 
次の文字を返します。


例：

    $ustr.next( "1" );
    > "2"
    $ustr.next( "2" );
    > "3"
    $ustr.next( "9" );
    > "10"
    $ustr.next( "a" );
    > "b"
    $ustr.next( "ZZ" );
    > "AAA"


_関連：[upto](#grape-utility-string-upto)_


_本メソッドは、[succ](#grape-utility-string-succ)の別名です。_


<a name="grape-utility-string-oct"></a>
### oct


文字列を8進数とみなし、整数（数値）に変換します。
文字列の先頭に0oを含むことができます。
数値に変換できない場合には、0を返します。



Number ret = oct( String str )


str : 
変換対象の文字列を指定します。

ret : 
変換した数値を返します。



_関連：[bin](#grape-utility-string-bin)、[dec](#grape-utility-string-dec)、[hex](#grape-utility-string-hex)_


<a name="grape-utility-string-padding"></a>
### padding


指定の文字列で、指定の文字数を埋めます。



String ret = padding( String str, Number  num )


str : 
埋める文字を指定します。

num : 
必要な文字数を指定します。

ret : 
指定文字で埋めた結果を返します。


例：

    $ustr.padding( "-", 5 );
    > "-----"
    $ustr.padding( "-*", 5 );
    > "-*-*-"


_本メソッドは、[fill](#grape-utility-string-fill)の別名です。_


_関連：[times](#grape-utility-string-times)_


<a name="grape-utility-string-parseCsv"></a>
### parseCsv


指定の文字列をCSV文字列として解析し、行・列を2次元配列にして返します。
区切り文字のデフォルトは"（ダブルクォート）ですが、任意の値を指定することが可能で、タブ文字を指定すればTSVにも対応可能です。
区切り文字間（列）に何も値がなかった場合は空文字が設定されます。
各行の列数は、実際のCSVの記述に準拠するため、行ごとに列数が異なる可能性があります。
第3引数の正規化を指定した場合には、最も大きい列数に合わせ、全行の列数と統一します。
この時、CSV上で値の指定が無かった列は、nullが設定されます。



Array ret = parseCsv( String str, String delimiter, Boolean isNormalization )


str : 
解析対象の文字列を指定します。

delimiter : (option) 
区切り文字を指定します。デフォルトは,（カンマ）

isNormalization: (option) 
正規化処理の有無。デフォルトはfalse

ret : 
CSVの解析結果を2次元配列で返します。


例：

    $ustr.parseCsv( '"col1", "col2", "col3"\n1,2,3' );
    > [ 
    [ "col1", "col2", "col3" ],
    [ "1"   , "2"   , "3"    ] 
    ]
    $ustr.parseCsv( '"col1",, ""\n1,2', ",", true );
    > [ 
    [ "col1", null,   ""   ],
    [ "1"   , "2"   , null ] 
    ]


<a name="grape-utility-string-parseFormula"></a>
### parseFormula


指定の文字列（計算式）を解析し、以下のJSON形式に変換します。

{ "operator" : [ Object, Object ] }
※ Objectには後述の”値”か、上記と同様の形式のObjectが再帰的に記述されます。



Object ret = parseFormula( String formula, Array operators, String tacitness_operator )


formula : 
変換対象の数式を指定します

operators: (option) 
演算子の文字列リストを優先順位順（高い順）で指定します（初期値・定義方法は後述）

tacitness_operator: (option) 
暗黙の演算子を指定します。（初期値は"*"）

ret : 
変換後の連想配列を返します


operatorsを指定しない場合、以下が演算子の初期値として利用されます。
配列のインデックス値が小さいものほど、優先度が高い演算子となります。
2次元配列で定義した場合には、配列の1次元目は優先度を定義し、
2次元目の配列内では、同じ優先度の演算子の文字列を記述します。

    [
    [ "sin", "cos", "tan" ],    // 最も優先度が高い（配列内の演算子は優先度が同じ）
    [ "!", "^" ],
    [ "%", "/" ],
    [ "*" ],
    [ "-", "+" ],   // 優先度が低い
    ]


上記演算子に定義が無い場合にも、”=”が最も低い優先度として定義されます。
また、”()”による丸括弧は数式解釈上、本メソッドでは特別な意味をもつため、演算子として定義することはできません。

数式に指定可能な文字は、大きく分けて以下の３種です。
・値
・演算子（関数）
・括弧

”1 + 2”という式があった場合、1や2は値。+は演算子に分類されます。
演算子と括弧以外の文字は、値として解釈されるため、”3 * N”の様な記述の時、Nも値として扱います。

”3N”の様に、値が隣接している場合、暗黙の演算子（初期値では”*”）があるものと解釈されます。
”3! + 1”の様に、演算子が隣接している場合、”!”は”3”に対して1つの値だけを取る演算子として解釈します。

数式を丸括弧で囲んだ場合には、括弧内の数式が全ての演算子に優先されます。
また、丸括弧左に隣接して記述された演算子は、関数として解釈されます。
例えば、”sin( 90 )”の様な記載は、関数として解釈されます。
関数の括弧内には、通常の括弧と同様に数式を記載することが可能です。

本メソッドは、演算子と関数を区別しないため、”+( 1 )”や”1 sin 2”の様な、
一般的な数式の構文としては成立しない記述も解釈してしまう点について注意してください。

数式を解釈できない場合には、NULLを返します。

例：

    $ustr.parseFormula( "1 + 2 =" );
    > { "=": [ 
    { "+": [ 
    1, 
    2 
    ] }
    ] }
    
    $ustr.parseFormula( "= ( X + 1 ) * 3" );
    > { "=": [
    { "*": [
    { "+": [
    X,
    1
    ] },
    3
    ] }
    ] }

<a name="grape-utility-string-parsePath"></a>
### parsePath


指定の文字列をパス（path。コンピュータ内の特定資源の場所を示すもの。ディレクトリ名とその階層、ファイル名などで構成）として解析し、
ルート（ディレクトリ）、ディレクトリ、ファイル、デリミタなどの各部ごとに分解した連想配列を返します。
取得される連想配列のキー名が、パスを分解した際の部位名となり、以下のキー名で取得されます。

    path : 解析しようとした元のpath全体
    root : ルート階層。windowsの場合は"c:¥"（"c:"が取得される）、linux系では"/root/"（"root"が取得される）など
    directory : ディレクトリ部の文字列。
    directories : ディレクトリ部を1階層ごとに分割し、配列化したもの
    file : ファイル名の文字列（拡張子を含む）
    extension : 拡張子
    delimiter : ディレクトリ階層を区切る文字。"/"または"¥"

連想配列の各部位の値は、パスから取得できなかった場合にはnullが設定されます。
また、指定の文字列をパスとして解析できなかった場合には、本メソッドはnullを返します。



Object ret = parsePath( String path )


path : 
解析対象のパス文字列を指定します。

ret : 
解析結果を連想配列で返します。



_関連：[findUrl](#grape-utility-string-findUrl)、[parseUrl](#grape-utility-string-parseUrl)、[mergePath](#grape-utility-string-mergePath)_


<a name="grape-utility-string-parseUrl"></a>
### parseUrl


指定の文字列をURLとして解析し、スキーマ、ドメイン、パス、フラグメント、クエリーなどの各部ごとに分解した連想配列を返します。
取得される連想配列のキー名が、URLを分解した際の部位名となり、以下のキー名で取得されます。

    url : 解析しようとした元のurl全体
    schema : スキーマの文字列（末尾の:は含まない）
    user : ユーザIDの文字列
    password : パスワードの文字列
    fqdn : ホスト＋ドメイン名、またはIPv4、IPv6の文字列
    host : ホスト名の文字列
    domain : ドメイン名の文字列
    ip4 : IPv4形式だった場合の該当部の文字列
    ip6 : IPv6形式だった場合の該当部の文字列
    port : ポート番号の文字列
    path : パスの文字列
    query : クエリの文字列
    queries : クエリの文字列をkey=value形式にした、連想配列
    fragment : フラグメントの文字列

連想配列の各部位の値は、URLから取得できなかった場合にはnullが設定されます。
また、指定の文字列をURLとして解析できなかった場合には、本メソッドはnullを返します。



Object ret = parseUrl( String url )


url : 
解析対象のURL文字列を指定します。

ret : 
解析結果を連想配列で返します。



_関連：[findUrl](#grape-utility-string-findUrl)、[parsePath](#grape-utility-string-parsePath)、[mergeUrl](#grape-utility-string-mergeUrl)_


<a name="grape-utility-string-partition"></a>
### partition


文字列中に指定文字（正規表現文字列）を含む場合には、その位置を中心に、
マッチした文字列の前、マッチした文字列、マッチした文字列の後の３つの文字列に分割し、配列で返します。
マッチする箇所が無い場合には、文字列の全体、空文字、空文字の３つの文字列を配列で返します。
マッチする箇所が複数存在する場合には、最初にマッチする位置が中心となります。



Array ret = partition( String str, String phraze )


str : 
分割対象の文字列を指定します。

phraze : 
分割の中心となる文字列（正規表現文字列）を指定します。

ret : 
分割結果の文字列を配列で返します。


例：

    $ustr.partition( "abcdef", "cd" );
    > [ "ab", "cd", "ef" ]
    $ustr.partition( "abcdef", "[fdc]" );
    > [ "ab", "c", "def" ]
    $ustr.partition( "abcdef", "CD" );
    > [ "abcdef", "", "" ]


_関連：[rpartition](#grape-utility-string-rpartition)、[separate](#grape-utility-string-separate)、[split](#grape-utility-string-split)_


<a name="grape-utility-string-plural"></a>
### plural


指定の文字列を複数形にして返します。
前提として指定の文字列は英単語の単数形である必要があります。
ただし、本メソッドは指定の文字を英単語として認識するのではなく、
単数形と複数形の変換ルールに従って機械的に処理するため、
固有名詞など、複数形の存在しない文字列を指定しても、複数形への変換処理を行います。
また、既に複数形になっている英単語を指定した場合にも同様です。



String ret = plural( String str )


str : 
複数形に変換したい英単語文字列を指定します

ret : 
変換後の文字列を取得します



_関連：[singular](#grape-utility-string-singular)_


<a name="grape-utility-string-prev"></a>
### prev


前の文字を生成して返します。
末尾の文字が半角英字の時、cはb、bはaに更新します。
数値ならば、2は1、1は0へと更新します。
1桁目がa、A、0の時、繰り下げが発生します。
これ以上繰り下げできない時（上記文字のみの時）、同じ文字を返します。



String ret = prev( String str )


str : 
前の文字を生成したい対象の文字列を指定します。

ret : 
前の文字を返します。


例：

    $ustr.prev( "2" );
    > "1"
    $ustr.next( "1" );
    > "0"
    $ustr.next( "10" );
    > "9"
    $ustr.next( "b" );
    > "a"
    $ustr.next( "AA" );
    > "Z"


_関連：[downto](#grape-utility-string-downto)、[prev](#grape-utility-string-prev)、[succ](#grape-utility-string-succ)、[upto](#grape-utility-string-upto)_


_本メソッドは、[ante](#grape-utility-string-ante)の別名です。_


<a name="grape-utility-string-remove"></a>
### remove


文字列から指定の文字（正規表現文字列）を削除して返します。



String ret = remove( String str, String phraze )


str : 
削除元の文字列を指定します。

phraze : 
削除したい文字列（正規表現文字列）を指定します。

ret : 
削除後の文字列を返します。


<a name="grape-utility-string-repeat"></a>
### repeat



_本メソッドは、[times](#grape-utility-string-times)の別名です。_


<a name="grape-utility-string-replace"></a>
### replace


JavaScriptのStringオブジェクトのメソッド、String.replaceと同一です。
指定文字列中の、指定フレーズ（または正規表現オブジェクト）と一致する時、一致した部分の文字列を指定文字列で置換し、
置換後の文字列を返します。



String ret = replace( String str, String phraze, String rep )


str : 
置換元の文字列を指定します。

phraze : 
置換したいフレーズ文字列（または正規表現オブジェクト）を指定します。

rep : 
置換する文字列を指定します。

ret : 
置換後の文字列を返します。


<a name="grape-utility-string-reverse"></a>
### reverse


指定文字列を逆転して返します。



String ret = reverse( String str )


str : 
逆転させたい文字列を指定します。

ret : 
逆転させた文字列を返します。


<a name="grape-utility-string-right"></a>
### right



_本メソッドは、[rjust](#grape-utility-string-rjust)の別名です。_


<a name="grape-utility-string-rindex"></a>
### rindex


文字列内に指定の文字列（正規表現文字列）が含まれているとき、最後に見つかった位置を返します。
文字の位置は、1文字目を0、2文字目を1とし、文字列が含まれていない時にはnullを返します。
offsetに文字位置を指定した場合には、それ以降の文字列を無視します。
offsetは文字列の先頭から数えて、1文字目を0、2文字目を1として指定します。
offsetに3を指定した場合には、4文字目以降を無視して処理します。



Number ret = index( String str, String phraze, Number offset )


str : 
判定対象の文字列を指定します。

phraze : 
判定対象に含まれる文字列（正規表現文字列）を指定します。

offset : (option) 
検索を開始する文字位置を指定します。

ret : str
内のphrazeを含む位置を返します。



_関連：[isInclude](#grape-utility-string-isInclude)、[index](#grape-utility-string-index)、[lastIndexOf](#grape-utility-string-lastIndexOf)、[search](#grape-utility-string-search)_


<a name="grape-utility-string-rjust"></a>
### rjust


文字列を指定文字数内で右寄せします。


String ret = rjust( String str, Number num, String pad = " " )

str : 
右寄せしたい文字列を指定します。

num : 
右寄せする行の最大文字数を指定します。

pad : (option) 
右寄せの際に埋める文字（デフォルトは空白文字）を指定します。


例：

    $ustr.rjust( "right", 10 );
    > "     right"
    $ustr.rjust( "right", 15, "-*" );
    > "-*-*-*-*-*right"

<a name="grape-utility-string-rpartition"></a>
### rpartition


文字列中に指定文字（正規表現文字列）を含む場合には、その位置を中心に、
マッチした文字列の前、マッチした文字列、マッチした文字列の後の３つの文字列に分割し、配列で返します。
マッチする箇所が無い場合には、文字列の全体、空文字、空文字の３つの文字列を配列で返します。
マッチする箇所が複数存在する場合には、最後にマッチする位置が中心となります。



Array ret = rpartition( String str, String phraze )


str : 
分割対象の文字列を指定します。

phraze : 
分割の中心となる文字列（正規表現文字列）を指定します。

ret : 
分割結果の文字列を配列で返します。


例：

    $ustr.rpartition( "abcdef", "cd" );
    > [ "ab", "cd", "ef" ]
    $ustr.rpartition( "abcdef", "[fdc]" );
    > [ "abcde", "f", "" ]
    $ustr.partition( "abcdef", "CD" );
    > [ "", "", "abcdef" ]


_関連：[partition](#grape-utility-string-partition)、[separate](#grape-utility-string-separate)、[split](#grape-utility-string-split)_


<a name="grape-utility-string-rstrip"></a>
### rstrip


行末の空白、タブ、改行コードを削除して返します。



String ret = rstrip( String str )


str : 
削除対象の文字列を指定します。

ret : 
削除後の文字列を返します。



_関連：[lstrip](#grape-utility-string-lstrip)、[strip](#grape-utility-string-strip)_


<a name="grape-utility-string-scan"></a>
### scan


文字列中の指定フレーズ（正規表現文字列）にマッチする箇所を、配列で返します。
マッチする箇所がなければ、空の配列を返します。
正規表現のパターンの中に()がある場合には、()内にマッチする箇所を、２次元配列にして返します。



Array ret = scan( String str, String phraze )


str : 
マッチ対象の文字列を指定します。

phraze : 
マッチさせたい文字列、または正規表現文字列を指定します。

ret : 
マッチした文字列を配列で返します。


例：

    $ustr.scan( "hello world!", "o" );
    > [ "o", "o" ]
    $ustr.scan( "hello world!", "([\w]+)" );
    > [ [ "hello" ], [ "world" ] ]
    $ustr.scan( "foo:bar, baz:qux", "([\w]+):([\w]+)" );
    > [ [ "foo", "bar" ], [ "baz", "qux" ] ]


<a name="grape-utility-string-search"></a>
### search


JavaScriptのStringオブジェクトのメソッド、String.searchと同一です。
指定文字の前方から、指定フレーズ（または正規表現オブジェクト）と一致する文字位置を検索し、返します。
一致しなかった場合には、-1を返します。



Number ret = search( String str, String phraze )


str : 
検索したい文字列を指定します。

phraze : 
検索したいフレーズ文字列（または正規表現オブジェクト）を指定します。

ret : 
一致した文字の位置を返します。



_関連：[rindex](#grape-utility-string-rindex)、[isInclude](#grape-utility-string-isInclude)、[index](#grape-utility-string-index)、[lastIndexOf](#grape-utility-string-lastIndexOf)_


<a name="grape-utility-string-separate"></a>
### separate


文字列を指定のフレーズで分割し、配列にして返します。
分割する文字列も配列に含むため、分割した文字列を全て結合すれば、元の文字列と同等になります。



Array ret = separate( String str, String phraze )


str : 
分割対象の文字列を指定します。

phraze : 
分割する文字列（正規表現文字列）を指定します。

ret : 
分割後の配列を返します


例：

    $ustr.separate( "abc123def456", "123" );
    > [ "abc", "123", "def", "456" ]
    
    $ustr.separate( "abc123def", /[0-9]/ );
    > [ "abc", "1", "2", "3", "def", "4", "5", "6" ]



_関連：[partition](#grape-utility-string-partition)、[rpartition](#grape-utility-string-rpartition)、[split](#grape-utility-string-split)_


<a name="grape-utility-string-setByte"></a>
### setByte


文字列の指定byte目を、任意のバイトコードに置き換えます。
位置は0オリジンで指定し、1byte目を0。2byte目を1とします。
マイナス値を指定した場合には、文字列の末尾から数えたbyte数となり、

\-1は末尾のバイトコードを、-2は末尾から2番目のバイトコードとなります。
範囲外の位置を指定した場合には、文字列の置き換えをせずに、
元のままの文字列が返します。



String ret = setByte( String str, Number index, Number code )


str : 
対象の文字列を指定します。

index : 
変更したいbyte単位の位置

code : 
置き換えるバイトコード

ret : 
置換後の文字列を返します


例：

    $ustr.setByte( "hello world", 1, 0x45 );
    > "hEllo world"
    $ustr.setByte( "hello world", -3, 0x52 );
    > "hello woRld"


_関連：[byteSize](#grape-utility-string-byteSize)、[eachByte](#grape-utility-string-eachByte)、[getByte](#grape-utility-string-getByte)、[toByteArray](#grape-utility-string-toByteArray)_


<a name="grape-utility-string-similarity"></a>
### similarity


2つの文字列の類似度を、レーベンシュタイン距離を用いて算出して返します。
類似度は0〜1の間の小数で、1を完全一致。0は完全に異なる場合となります。

以下の様なケースの時、0.5（類似度が50%)として判定されます。
"foobar"と"fooqux"
"foo"と"foobar"



Number ret = similarity( String org, String dest )


org : 
比較元の文字列を指定します。

dest : 
比較先の文字列を指定します。

ret : 
類似度を数値で返します。



_関連：[diff](#grape-utility-string-diff)_


<a name="grape-utility-string-singular"></a>
### singular


指定の文字列を単数形にして返します。
前提として指定の文字列は英単語の複数形である必要があります。
ただし、本メソッドは指定の文字を英単語として認識するのではなく、
単数形と複数形の変換ルールに従って機械的に処理するため、
固有名詞などで、たまたま語尾に"s"が付いていた場合にも、単数形への変換処理を行います。



String ret = singular( String str )


str : 
単数形に変換したい英単語文字列を指定します

ret : 
変換後の文字列を取得します



_関連：[plural](#grape-utility-string-plural)_


<a name="grape-utility-string-size"></a>
### size



_本メソッドは、[byteSize](#grape-utility-string-byteSize)の別名です。_


<a name="grape-utility-string-slice"></a>
### slice


JavaScriptのStringオブジェクトのメソッド、String.sliceと同一です。
指定文字の開始文字位置から後の文字列を取り出して返します。
開始文字位置は、1文字目を0として指定します。
負の数を指定した場合には、指定文字の後方から数えた位置から開始します。
この時、-1は最後の文字位置を示します。
文字を取り出す終了位置を指定しない場合には、開始位置以降の全ての文字列を取得します。
終了位置を指定した場合には、開始位置から終了位置の直前まで（つまり、終了位置の-1文字目まで）の文字列を取得します。



String ret = slice( String str, Number start, Number end )


str : 
元の文字列を指定します。

start : 
文字を取り出す開始位置を指定します。

end : (option) 
文字を取り出す終了位置を指定します。

ret : 
取り出した文字列を返します。



_関連：[substr](#grape-utility-string-substr)、[substring](#grape-utility-string-substring)_


<a name="grape-utility-string-split"></a>
### split


JavaScriptのStringオブジェクトのメソッド、String.splitと同一です。
指定文字を指定のフレーズ文字列と一致する箇所で分割し、分割後の文字列を配列で返します。
空文字を分割するフレーズ文字列として指定すると、全ての文字を1文字ごとに分割します。
フレーズ文字列を指定して分割した場合には、分割後の文字列に、フレーズ文字列は含まれません。
また、分割の最大数を指定した場合には、分割処理を全て行った後に、最大数分の配列だけを返します。
つまり、分割後の文字列が本来は3つなる場合に、最大数を2とした場合には、最初の2つの分割された文字列だけが帰ります。
この時、3つ目の分割後の文字列は取得されません。



Array ret = split( String str, String phraze, Number limit )


str : 
分割元の文字列を指定します。

pharze : 
分割したいフレーズを指定します。

limit : (option) 
分割する最大数を指定します。

ret : 
分割した文字列の配列を返します。



_関連：[partition](#grape-utility-string-partition)、[rpartition](#grape-utility-string-rpartition)、[separate](#grape-utility-string-separate)_


<a name="grape-utility-string-squeeze"></a>
### squeeze


文字列中の連続した同一文字を１つの文字にまとめた文字列を返します
第二引数以降を指定した場合には、一致する条件のみが短縮対象となります。
条件が複数存在する場合には、第三、第四引数など可変長引数での指定が可能で、これらの条件同士はANDとなります。
また、一致条件には文字列の他、正規表現を使用することが可能です。



String ret = squeeze( String str, String condition... )


str : 
対象の文字列を指定します。

condition : (option) 
一致条件を指定します。

ret : 
変換後の文字列を返します。


例：

    $ustr.squeeze( "hello  world" );
    > "helo world"
    $ustr.squeeze( "おおおかえちぜん" );
    > "おかえちぜん"
    $ustr.squeeze( "aaa   bbbc", /[a-z]/ );
    > "a   bc"
    $ustr.squeeze( "aaa   bbbc", /[a-z]/, "b" );
    > "aaa   bc"


<a name="grape-utility-string-strip"></a>
### strip


行末・行頭の空白、タブ、改行コードを削除して返します。



String ret = strip( String str )


str : 
削除対象の文字列を指定します。

ret : 
削除後の文字列を返します。



_関連：[lstrip](#grape-utility-string-lstrip)、[rstrip](#grape-utility-string-rstrip)_


<a name="grape-utility-string-substr"></a>
### substr


JavaScriptのStringオブジェクトのメソッド、String.substrと同一です。
指定文字の開始文字位置から後の文字列を取り出して返します。
開始文字位置は、1文字目を0として指定します。
負の数を指定した場合には、指定文字の後方から数えた位置から開始します。
この時、-1は最後の文字位置を示します。
文字数を指定しない場合には、開始位置以降の全ての文字列を取得します。
文字数を指定した場合には、開始位置から文字数分だけを取り出します。



String ret = substr( String str, Number index, Number len )


str : 
元の文字列を指定します。

index : 
文字を取り出す開始位置を指定します。

len : (option) 
取り出す文字数を指定します。

ret : 
取り出した文字列を返します。



_関連：[slice](#grape-utility-string-slice)、[substring](#grape-utility-string-substring)_


<a name="grape-utility-string-substring"></a>
### substring


JavaScriptのStringオブジェクトのメソッド、String.substringと同一です。
指定文字の開始文字位置から後の文字列を取り出して返します。
開始文字位置は、1文字目を0として指定します。
負の数を指定した場合には、最初の文字位置が指定されたものとみなします。
この時、-1は最後の文字位置を示します。
文字を取り出す終了位置を指定しない場合には、開始位置以降の全ての文字列を取得します。
終了位置を指定した場合には、開始位置から終了位置の直前まで（つまり、終了位置の-1文字目まで）の文字列を取得します。



String ret = substring( String str, Number start, Number end )


str : 
元の文字列を指定します。

start : 
文字を取り出す開始位置を指定します。

end : (option) 
文字を取り出す終了位置を指定します。

ret : 
取り出した文字列を返します。



_関連：[substr](#grape-utility-string-substr)、[slice](#grape-utility-string-slice)_


<a name="grape-utility-string-succ"></a>
### succ


succは、successorの略名。


_本メソッドは、[next](#grape-utility-string-next)の別名です。_


<a name="grape-utility-string-sum"></a>
### sum


文字列を元に、整数のチェックサム値を返します。
チェックサム値は、文字列の各byteを整数として合計し、下位ビットを取り出します。
特に指定が無い場合には、下位16bitを取得します。



Number ret = sum( String str, Number bits )


str : 
対象の文字列を指定します。

bits : (option) 
取得したい下位ビット数を指定します。デフォルトは16です。

ret : 
チェックサム値を返します。


<a name="grape-utility-string-swapcase"></a>
### swapcase


文字列中の英字を、大文字を小文字に、小文字を大文字に変換して返します。



String ret = swapcase( String str )


str : 
対象の文字列を指定します。

ret : 
変換後の文字列を返します。


例：

    $ustr.swapcase( "Hello World!" );
    > "hWLLO wORLD!"


<a name="grape-utility-string-times"></a>
### times


指定文字列を指定回数だけ繰り返した文字列を返します。
繰り返し回数に0を指定した場合には、空文字を返します。
繰り返し回数に負の数を指定した場合には、逆転した文字列を、繰り返し回数だけ生成します。



Array ret = times( String str, Number num )


str : 
繰り返したい文字列を指定します。

num : 
繰り返し回数を指定します。

ret : 
生成した文字列を配列で返します。


例：

    $ustr.times( "abc", 3 );
    > "abcabcabc"
    
    $ustr.times( "abc", -2 );
    > "cbacba"


_関連：[padding](#grape-utility-string-padding)_


_本メソッドは、[repeat](#grape-utility-string-repeat)の別名です。_


<a name="grape-utility-string-toByteArray"></a>
### toByteArray


文字列を1byteごとのバイトコードの配列に変換します。



Array ret = toByteArray( String str )


str : 
バイトコード配列に変換したい文字列を指定します。

ret : 
バイトコードの配列を返します。



_関連：[byteSize](#grape-utility-string-byteSize)、[eachByte](#grape-utility-string-eachByte)_


<a name="grape-utility-string-toF"></a>
### toF



_本メソッドは、[float](#grape-utility-string-float)の別名です。_


<a name="grape-utility-string-toI"></a>
### toI



_本メソッドは、[dec](#grape-utility-string-dec)の別名です。_


<a name="grape-utility-string-toLowerCase"></a>
### toLowerCase


JavaScriptのStringオブジェクトのメソッド、String.toLowerCaseと同一です。
指定文字列中の半角英字の大文字を、全て小文字に変換して返します。
他の文字については、何も変換せずに、そのまま返します。



String ret = toLowerCase( String str )


str : 
対象の文字列を指定します。

ret : 
変換後の文字列を返します。



_関連：[capitalize](#grape-utility-string-capitalize)、[casecmp](#grape-utility-string-casecmp)、[toUpperCase](#grape-utility-string-toUpperCase)_


<a name="grape-utility-string-toS"></a>
### toS



_本メソッドは、String.[toString](#grape-utility-string-toString)の別名です。_


<a name="grape-utility-string-toString"></a>
### toString


JavaScriptのStringオブジェクトのメソッド、String.toStringと同一です。



String ret = toString( String str )


str : 
文字列を指定します

ret : 
文字列オブジェクトを返します。



_本メソッドは、[toS](#grape-utility-string-toS)の別名です。_


<a name="grape-utility-string-toUpperCase"></a>
### toUpperCase


JavaScriptのStringオブジェクトのメソッド、String.toUpperCaseと同一です。
指定文字列中の半角英字の小文字を、全て大文字に変換して返します。
他の文字については、何も変換せずに、そのまま返します。



String ret = toUpperCase( String str )


str : 
対象の文字列を指定します。

ret : 
変換後の文字列を返します。



_関連：[capitalize](#grape-utility-string-capitalize)、[casecmp](#grape-utility-string-casecmp)、[toLowerCase](#grape-utility-string-toLowerCase)_


<a name="grape-utility-string-unescapeHtml"></a>
### unescapeHtml


文字列中の、以下のエスケープされた文字列を、元の文字列に戻します。
&amp;lt;、&amp;gt;、&amp;amp;、&amp;quot;、&amp;#039;



String ret = unescapeHtml( String str )


str : 
エスケープを戻す対象の文字列を指定します。

ret : 
エスケープを戻した後の文字列を返します。



_関連：[escapeHtml](#grape-utility-string-escapeHtml)_


<a name="grape-utility-string-upto"></a>
### upto


開始文字列が、終了文字列になるまで「次の文字列」を繰り返し生成し、引数に指定の関数を実行します。
また、生成した「次の文字列」は、配列で戻り値として返します。
「次の文字列」がどの様に生成されるかは、 <span class="relations">[next](#grape-utility-string-next)、[succ](#grape-utility-string-succ)</span> を参照してください。
開始文字列から「次の文字列」を繰り返し生成する延長線上に終了文字列が無い場合には、生成される文字列は開始文字列のみとなります。
ただし、65535件を超えて「次の文字列」は生成されません。



Array ret = upto( String org, String dest, Function block )


org : 
開始文字列を指定します。

dest : 
終了文字列を指定します。

ret : 
生成した文字列を配列で返します。


例：

    $ustr.upto( "a", "d" );
    > [ "a", "b", "c", "d" ]
    
    $ustr.upto( "a9x", "b0b", function( str ){ console.log(str) } );
    > "a9x"
    > "a9y"
    > "a9z"
    > "b0a"
    > "b0b"
    > [ "a9x", "a9y", "a9z", "b0a", "b0b" ]


_関連：[downto](#grape-utility-string-downto)、[next](#grape-utility-string-next)、[succ](#grape-utility-string-succ)_



## 数値

<a name="grape-utility-number"></a>

## 配列

<a name="grape-utility-array"></a>

## 日付

<a name="grape-utility-datetime"></a>

## 汎用アルゴリズム

<a name="grape-libraries-algorithm"></a><a name="grape-libraries-algorithm-getRouteByDijkstra"></a>
### getRouteByDijkstra


X軸とY軸によって構成される2次元空間上の、最短ルートをダイクストラ法によって取得します。
2次元空間は、数値による2次元配列によって表現するものとし、空間を以下の様な表にみたてて計算をします。

<table>
<tbody><tr><th>Y/X</th><th>0</th><th>1</th><th>2</th><th>3</th></tr>
<tr><th>0</th><td>0</td><td>-1</td><td>0</td><td>0</td></tr>
<tr><th>1</th><td>0</td><td>-1</td><td>2</td><td>1</td></tr>
<tr><th>2</th><td>0</td><td>0</td><td>0</td><td>0</td></tr>
</tbody></table>
上記は、X方向に4（0〜3）、Y方向に3（0〜2）の大きさの座標空間を表現しています。
数値の意味は、

\-1 : 移動できない。（このマスを通過できない）
0以上 : そのマスを通過するのに必要なコスト（大きいほどコストが高く、通過しづらいことを意味する）

開始地点を左上(X:0,Y:0)、終了地点を右上(X:3,y:0)とした場合に、
本メソッドはコストを考慮した上での最短ルートを、以下の様に返します。
(0,0) -&gt; (0,1) -&gt; (0,2) -&gt; (1,2) -&gt; (2,2) -&gt; (3,2) -&gt; (3,1) - &gt;(3,0)

具体的には、2次元空間として以下の様な2次元配列を本メソッドに指定します。
この時、2次元配列の添え字が、XY座標と対応し、1次元目をY座標、2次元目がX座標となります。

    var map = [
    [  0, -1,  0,  0 ],
    [  0, -1,  2,  1 ],
    [  0,  0,  0,  0 ]
    ];

戻り値は、最短ルートを表現した、以下の様な2次元配列で取得されます。

    [
    [ 0, 0 ],  // 開始地点のX,Y座標
    [ 0, 1 ],
    [ 0, 2 ],
    [ 1, 2 ],
    [ 2, 2 ],
    [ 3, 2 ],
    [ 3, 1 ],
    [ 3, 0 ]   // 終了地点のX,Y座標
    ]

開始地点から終了地点に到達できない場合は、nullが返されます。
本メソッドは移動コストの設定が複雑な場合に、2次元座標空間の大きさに応じて、処理コストが大きくなります。
100x100程度のサイズとなると、100ミリ秒以上の処理コストがかかる可能性があります。
（移動コストの設定状況や、実行環境のCPU性能等の影響を受けて処理コストは変化します）
移動コストの計算が不要な場合には、より高速に動作する <span class="relations">[getRouteFastByDijkstra](#grape-libraries-algorithm-getRouteFastByDijkstra)</span> を使用してください。



Array ret = getRouteByDijkstra( Array map, Number start_x, Number start_y, Number goal_x, Number goal_y )


map : 
座標空間を2次元配列で指定します。

start_x : 
開始X座標を指定します。この場合のX座標とは1つ目の引数の2次元配列の2次元目の添え字（配列のインデックス番号）に相当します。

start_y : 
開始Y座標を指定します。この場合のy座標とは1つ目の引数の2次元配列の1次元目の添え字（配列のインデックス番号）に相当します。

goal_x : 
終了X座標を指定します。座標の意味は開始X座標と同様。

goal_y : 
終了Y座標を指定します。座標の意味は開始Y座標と同様。

ret : 
最短経路を2次元配列で返します。



_関連：[getRouteFastByDijkstra](#grape-libraries-algorithm-getRouteFastByDijkstra)、[getRouteNodeByDijkstra](#grape-libraries-algorithm-getRouteNodeByDijkstra)_


<a name="grape-libraries-algorithm-getRouteFastByDijkstra"></a>
### getRouteFastByDijkstra


X軸とY軸によって構成される2次元空間上の、最短ルートをダイクストラ法によって取得します。
本メソッドは、 <span class="relations">[getRouteByDijkstra](#grape-libraries-algorithm-getRouteByDijkstra)</span> と同じ使用方法となりますます。
<span class="relations">[getRouteByDijkstra](#grape-libraries-algorithm-getRouteByDijkstra)</span> と異なる点は、移動コストを考慮せずに最短ルートを算出する点です。
そのため、より高速に処理することが可能です。



Array ret = getRouteFirstByDijkstra( Array map, Number start_x, Number start_y, Number goal_x, Number goal_y )


map : 
座標空間を2次元配列で指定します。

start_x : 
開始X座標を指定します。この場合のX座標とは1つ目の引数の2次元配列の2次元目の添え字に相当します。

start_y : 
開始Y座標を指定します。この場合のy座標とは1つ目の引数の2次元配列の1次元目の添え字に相当します。

goal_x : 
終了X座標を指定します。座標の意味は開始X座標と同様。

goal_y : 
終了Y座標を指定します。座標の意味は開始Y座標と同様。

ret : 
最短経路を2次元配列で返します。



_関連：[getRouteByDijkstra](#grape-libraries-algorithm-getRouteByDijkstra)_


<a name="grape-libraries-algorithm-getRouteNodeByDijkstra"></a>
### getRouteNodeByDijkstra


1対多のコネクションを持つノード間で、最短ルートをダイクストラ法によって取得します。
本メソッドは、 <span class="relations">[getRouteByDijkstra](#grape-libraries-algorithm-getRouteByDijkstra)</span> によるルート探索を、2次元配列ではなくノードによって行うものです。
ノードとコネクションは、以下に詳細を示す通り、JavaScriptのObject型（連想配列）である必要があります。
ただし、以下に示す以外のキー値等を保持することは制限しない。
また、Object型として（連想配列として）アクセス可能でさえあれば、prototype継承した別の型であっても良い。

    // ノード型
    node = {
    id : 0,           // Number または String型。このノードのID
    connections: []   // このノードから接続している、別ノードを格納するノード接続型オブジェクトによる配列
    };
    // ノード接続型
    node_connection = {
    cost : 0,         // Number型。0以上の数値による移動コスト値
    node : Object     // ノード型オブジェクト。接続先のノード
    };

ノードの接続は、循環構造になっていても良い。
ノードの接続から、ゴールにたどり着けない場合にはnullを返す。


Array ret = getRouteNodeByDijkstra( Object start_node,
Number(or String)
goal_id )

start_node : 
開始位置のノードオブジェクトを指定します。

goal_id : 
ゴール位置のノードのIDを指定します。

ret : 
最短経路をノードIDによる配列で返します。



_関連：[getRouteByDijkstra](#grape-libraries-algorithm-getRouteByDijkstra)_


