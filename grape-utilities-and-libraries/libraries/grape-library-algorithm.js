/*----------------------------------------------------------
grape-library-algorithm.js
  License    : MIT
  Written by : S.Murakoshi( grape@nona.dti.ne.jp )

Usage:
  $lalg.methodName( "bar" );
  // or
  foo = new $LAlg();
  foo.methodName( "bar" );

----------------------------------------------------------*/
function $LAlg() {
  /*----------------------------------------------------------
    private member
  ----------------------------------------------------------*/

  /*----------------------------------------------------------
    private methods
  ----------------------------------------------------------*/
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
  function getRoute( ary, sx, sy, gx, gy, find_flag ){
    find_flag = find_flag || false;
    var xn_ = ( ary[0] || [0] ).length;
    var yn_ = ary.length;
    var tmpAry_ = initialArray( yn_, xn_, null );
    if ( sx < 0 || gx < 0 || sx >= xn_ || gx >= xn_ ) return null;
    if ( sy < 0 || gy < 0 || sy >= yn_ || gy >= yn_ ) return null;
    if ( -1 == ary[sy][sx] || -1 == ary[gy][gx] ) return null;
    var x_,   y_;
    var fx_,  fy_;
    var cost_;
    var min_goal_cost_ = -1;
    var stack_=[[gx,gy,-1,-1]]; // search reverse route from goal to start.
    // set cost and from-points in each map.
    while(0<stack_.length){
      x_ =stack_[0][0]; y_ =stack_[0][1];
      fx_=stack_[0][2]; fy_=stack_[0][3];
      // calculate costs from prev point to here
      cost_=( -1==fx_ ? 0 : tmpAry_[fy_][fx_][0] || 0 );
      stack_.splice(0,1);
      if ( -1 != min_goal_cost_ && min_goal_cost_ <= cost_ ) continue;
      if ( x_ < 0 || x_ >= xn_ ) continue;
      if ( y_ < 0 || y_ >= yn_ ) continue;
      if ( -1 == ary[y_][x_] ) continue;
      tmpAry_[y_][x_] = tmpAry_[y_][x_] || [ null, 0, 0 ];
      // if the moving-cost is smaller than old results, override new(this) route.
      if ( null == tmpAry_[y_][x_][0] || ( find_flag && cost_+ary[y_][x_] < tmpAry_[y_][x_][0] ) ) {
        tmpAry_[y_][x_] = [ cost_+ary[y_][x_], fx_, fy_ ];
        if ( x_==sx && y_==sy ) {
          if ( -1 == min_goal_cost_ || min_goal_cost_ > tmpAry_[y_][x_][0] ) min_goal_cost_ == tmpAry_[y_][x_][0];
          if ( true == find_flag ) continue;
          break;
        };
        // reserve calculation next point
        stack_ = stack_.concat([
          [x_+1,y_+0,x_,y_],
          [x_-1,y_+0,x_,y_],
          [x_+0,y_+1,x_,y_],
          [x_+0,y_-1,x_,y_],
        ]);  
      }
    }
    // get route.
    var routes_=[];
    if ( null == tmpAry_[sy][sx] || null == tmpAry_[sy][sx][0] ) return null;
    if ( null == tmpAry_[gy][gx] || null == tmpAry_[gy][gx][0] ) return null;
    x_=sx;
    y_=sy;
    while( x_!=gx || y_!=gy ) {
      routes_[routes_.length]=[x_,y_];
      if ( routes_.length >= xn_*yn_ ) return null;
      fx_=x_;
      fy_=y_;
      x_=tmpAry_[fy_][fx_][1];
      y_=tmpAry_[fy_][fx_][2];
    }
    routes_[routes_.length]=[gx,gy];
    return routes_;
  }
  /*----------------------------------------------------------
    public methods
  ----------------------------------------------------------*/
  var lalg_ = {
    /*----------------------------------------------------------
      get routes by Dijkstra's algorithm with 2D-array
        ary[yn][xn] ... array as number
          -1 is impossible to pass.
          0 more than are possible to pass. and the number is cost.
          ex)
             0, 0, 0, 0
             0, 2,-1,-1
             0, 0, 0, 0
        sx ... start point of X
        sy ... start point of Y
        gx ... goal point of X
        gy ... goal point of Y
        return ... array of X and Y points from start to goal.
          ex)
            [ [3,0], [2,0], [1,0], [1,1], [1,2], [1,3], [2,3], [3,3] ]
    ----------------------------------------------------------*/
    getRouteByDijkstra: function( ary, sx, sy, gx, gy ){
      return getRoute( ary, sx, sy, gx, gy, true );
    },
    /*----------------------------------------------------------
      get routes of first find by Dijkstra's algorithm with 2D-array
    ----------------------------------------------------------*/
    getRouteFastByDijkstra: function( ary, sx, sy, gx, gy ){
      return getRoute( ary, sx, sy, gx, gy, false );      
    },
    /*----------------------------------------------------------
      get routes by Dijkstra's algorithm with node
        this method require the below node-object
          {
            id : Strings or Number. node id
            connections : [
              {
                cost: Number. moving cost.
                node: Object. other node object
              }
            ]
          }
    ----------------------------------------------------------*/
    getRouteNodeByDijkstra: function( start_node, goal_node_id ){
      function isNotNode( node ) {
        if ( "object" != typeof node ) return true;
        if ( "number" != typeof node.id && "string" != typeof node.id ) return true;
        if ( null != node.connections && Object.prototype.toString.call(node.connections) !== '[object Array]' ) return true;
        return false;
      }
      function isNotConnection( con ) {
        if ( "object" != typeof con ) return true;
        if ( "number" != typeof con.cost || 0 > con.cost ) return true;
        if ( "object" != typeof con.node ) return true;
        return false;
      }
      if ( isNotNode( start_node ) ) return null;
      if ( "number" != typeof goal_node_id && "string" != typeof goal_node_id ) return null;
      var dirty_={};
      var stack_=[ [ start_node, 0 ] ];
      var node_;
      var route_;
      var cost_;
      var old_cost_;
      var new_cost_;
      var is_find_goal_=false;
      while ( 0 < stack_.length ){
        node_ = stack_[0][0];
        cost_ = stack_[0][1];
        stack_.splice( 0, 1 );
        if ( isNotNode( node_ ) ) continue;
        if ( goal_node_id == node_.id ) {
          is_find_goal_ = true;
          continue;
        }
        if ( null == node_.connections ) continue;
        for ( var i_=0; i_<node_.connections.length; i_++ ) {
          if ( isNotConnection( node_.connections[i_] ) ) continue;
          if ( isNotNode( node_.connections[i_].node ) ) continue;
          route = dirty_[ node_.connections[i_].node.id ];
          old_cost_ = ( route || [null,-1] )[1];
          new_cost_ = cost_ + node_.connections[i_].cost;
          if ( -1 == old_cost_ || new_cost_ < old_cost_ ) {
            dirty_[ node_.connections[i_].node.id ] = [ node_, new_cost_ ];
            stack_[ stack_.length ] = [ node_.connections[i_].node, new_cost_ ];
          }
        }
      }
      if ( !is_find_goal_ ) return null;
      var ret_ = [ goal_node_id ];
      node_ = dirty_[ goal_node_id ][0];
      while( start_node.id != node_.id ){
        ret_[ ret_.length ] = node_.id;
        node_ = dirty_[ node_.id ][0];
      }
      ret_[ ret_.length ] = start_node.id;
      return ret_.reverse();
    },
  };
  /*----------------------------------------------------------
    Define prototype functions.
  ----------------------------------------------------------*/
  for ( var key_ in lalg_ ) {
    $LAlg.prototype[key_] = lalg_[key_];
  }
}
if ( "undefined" == typeof $lalg ) {
  var $lalg = new $LAlg();
}
