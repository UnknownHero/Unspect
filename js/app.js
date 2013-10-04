


/*Fixture for client code*/
var authManager = {

    isUser: function (user, password) {

        if (user == "Unknown" && password == "Hero") {
            return true;
        } else {
            return false;
        }

    }

}

/*Client code*/

//define aspects
var errorAspect = function (error) {
    if (error != true) {
        this.runNext();
    } else {
        alert('error');
    }

}


var authAspect = function (user, password) {

    var aspectParams = this.getAspectParams(),
        authManager = aspectParams.authManager;

    if (authManager.isUser(user, password)) {
        this.runNext();
    } else {
        alert('Access denied');

    }

}

//define functions
//var errorAspectedFunction = function (error) {
//    alert('done');
//}.aspect(errorAspect);
//
//var errorAspectedFunctionWithArgumentsMapping = function (a, b, error) {
//    alert('done');
//}.aspect(errorAspect, {}, [3]);
//
//
//var authAspectedFunction = function (user, password) {
//    alert('Some action for user ' + user);
//}.aspect(authAspect, {authManager: authManager});

//
//var mixedAspectedFunctionWithFucntionArgumentsMapping = function (date, user, password, error) {
//    alert('Some action for user ' + user + ' at ' + date);
//}.aspect(errorAspect, {}, [4]).
//  aspect(authAspect, {authManager: authManager}, function (arguments) {
//        return [arguments[1], arguments[2]]
//    });



//errorAspectedFunction(true);     //alert('error')
//errorAspectedFunction(false);    //alert('done')
//
//errorAspectedFunctionWithArgumentsMapping("Hello", {hello: "world"}, true);   //alert('error')
//errorAspectedFunctionWithArgumentsMapping("Hello", {hello: "world"}, false);   //alert('done')
//
//authAspectedFunction("Unknown", "Unhero");    //alert('Access denied')
//authAspectedFunction("Unknown", "Hero");      //alert('Some action for user Unknown')
//
//
//mixedAspectedFunctionWithFucntionArgumentsMapping(new Date(), "Unknown", "Unhero", false)   //alert('Access denied')
//mixedAspectedFunctionWithFucntionArgumentsMapping(new Date(), "Unknown", "Hero", true)     //alert('error')
//mixedAspectedFunctionWithFucntionArgumentsMapping(new Date(), "Unknown", "Hero", false)     //alert('Some action for user Unknown at {{Date}}')

var customClass = function(args){
    this.init(args);
}

customClass.prototype = {

    price: 1,

    init: function(args){
        this.price = args.price;
    },

    addPriceForUser: function(user,password,error){
        console.log(this.price == 5);
       // console.log('Add  Price for user ' + user + ' is ' + this.price + "$" );
    }.aspect(authAspect, {authManager: authManager}).aspect(errorAspect , {} , [3]).aspect(errorAspect , {} , [3]).aspect(authAspect, {authManager: authManager}),

    removePriceForUser: function(user){
        console.log(this.price == 5);
       // console.log('Remove  Price for user ' + user + ' is ' + this.price + "$" );
    }

}

var customObject = new customClass({
    price: 5
});



customObject.addPriceForUser("Unknown", "Hero",false);
