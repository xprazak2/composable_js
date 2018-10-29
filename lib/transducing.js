function isLongEnough(str) {
    return str.length >= 5;
}

function isShortEnough(str) {
    return str.length <= 10;
}

function strUppercase(str) { return str.toUpperCase(); }
function strConcat(str1,str2) { return str1 + str2; }

var curriedMapReducer =
    curry( function mapReducer(mapperFn,combinerFn){
        return function reducer(list,val){
            return combinerFn( list, mapperFn( val ) );
        };
    } );

var curriedFilterReducer =
    curry( function filterReducer(predicateFn,combinerFn){
        return function reducer(list,val){
            if (predicateFn( val )) return combinerFn( list, val );
            return list;
        };
    } );

function listCombine(list,val) {
    return [ ...list, val ];
}

var strToUppercaseReducer =
    curriedMapReducer( strUppercase )( listCombine );
var isLongEnoughReducer =
    curriedFilterReducer( isLongEnough )( listCombine );
var isShortEnoughReducer =
    curriedFilterReducer( isShortEnough )( listCombine );

var x = curriedMapReducer( strUppercase );
var y = curriedFilterReducer( isLongEnough );
var z = curriedFilterReducer( isShortEnough );

var upperReducer = x( listCombine );
var longEnoughReducer = y( listCombine );
var shortEnoughReducer = z( listCombine );

y(z(listCombine))

var shortEnoughReducer = z( listCombine );
var longAndShortEnoughReducer = y( shortEnoughReducer );

// shortEnoughReducer, from calling z(..):
function reducer(list,val) {
    if (isShortEnough( val )) return listCombine( list, val );
    return list;
}

// longAndShortEnoughReducer, from calling y(..):
function reducer(list,val) {
    if (isLongEnough( val )) return shortEnoughReducer( list, val );
    return list;
}