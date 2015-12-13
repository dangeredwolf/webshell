/*!
 * jQuery JavaScript Library v2.1.4
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2015-04-28T16:01Z
 */

(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Support: Firefox 18+
// Can't be in strict mode, several libs including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
//

var arr = [];

var slice = arr.slice;

var concat = arr.concat;

var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	// Use the correct document accordingly with window argument (sandbox)
	document = window.document,

	version = "2.1.4",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {
	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function( elem, i ) {
			return callback.call( elem, i, elem );
		}));
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor(null);
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend({
	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	isFunction: function( obj ) {
		return jQuery.type(obj) === "function";
	},

	isArray: Array.isArray,

	isWindow: function( obj ) {
		return obj != null && obj === obj.window;
	},

	isNumeric: function( obj ) {
		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		// adding 1 corrects loss of precision from parseFloat (#15100)
		return !jQuery.isArray( obj ) && (obj - parseFloat( obj ) + 1) >= 0;
	},

	isPlainObject: function( obj ) {
		// Not plain objects:
		// - Any object or value whose internal [[Class]] property is not "[object Object]"
		// - DOM nodes
		// - window
		if ( jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		if ( obj.constructor &&
				!hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
			return false;
		}

		// If the function hasn't returned already, we're confident that
		// |obj| is a plain object, created by {} or constructed with new Object
		return true;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		// Support: Android<4.0, iOS<6 (functionish RegExp)
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call(obj) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	globalEval: function( code ) {
		var script,
			indirect = eval;

		code = jQuery.trim( code );

		if ( code ) {
			// If the code includes a valid, prologue position
			// strict mode pragma, execute code by injecting a
			// script tag into the document.
			if ( code.indexOf("use strict") === 1 ) {
				script = document.createElement("script");
				script.text = code;
				document.head.appendChild( script ).parentNode.removeChild( script );
			} else {
			// Otherwise, avoid the DOM node creation, insertion
			// and removal by using an indirect global eval
				indirect( code );
			}
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Support: IE9-11+
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	// args is for internal usage only
	each: function( obj, callback, args ) {
		var value,
			i = 0,
			length = obj.length,
			isArray = isArraylike( obj );

		if ( args ) {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			}

		// A special, fast, case for the most common use of each
		} else {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArraylike( Object(arr) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var value,
			i = 0,
			length = elems.length,
			isArray = isArraylike( elems ),
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArray ) {
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var tmp, args, proxy;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: Date.now,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
});

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

function isArraylike( obj ) {

	// Support: iOS 8.2 (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = "length" in obj && obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	if ( obj.nodeType === 1 && length ) {
		return true;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.2.0-pre
 * http://sizzlejs.com/
 *
 * Copyright 2008, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-12-16
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// http://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",
	// http://www.w3.org/TR/css3-syntax/#characters
	characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Loosely modeled on CSS identifier characters
	// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
	// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = characterEncoding.replace( "w", "w#" ),

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + characterEncoding + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + characterEncoding + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + characterEncoding + ")" ),
		"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
		"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var match, elem, m, nodeType,
		// QSA vars
		i, groups, old, nid, newContext, newSelector;

	if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
		setDocument( context );
	}

	context = context || document;
	results = results || [];
	nodeType = context.nodeType;

	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	if ( !seed && documentIsHTML ) {

		// Try to shortcut find operations when possible (e.g., not under DocumentFragment)
		if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {
			// Speed-up: Sizzle("#ID")
			if ( (m = match[1]) ) {
				if ( nodeType === 9 ) {
					elem = context.getElementById( m );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document (jQuery #6963)
					if ( elem && elem.parentNode ) {
						// Handle the case where IE, Opera, and Webkit return items
						// by name instead of ID
						if ( elem.id === m ) {
							results.push( elem );
							return results;
						}
					} else {
						return results;
					}
				} else {
					// Context is not a document
					if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
						contains( context, elem ) && elem.id === m ) {
						results.push( elem );
						return results;
					}
				}

			// Speed-up: Sizzle("TAG")
			} else if ( match[2] ) {
				push.apply( results, context.getElementsByTagName( selector ) );
				return results;

			// Speed-up: Sizzle(".CLASS")
			} else if ( (m = match[3]) && support.getElementsByClassName ) {
				push.apply( results, context.getElementsByClassName( m ) );
				return results;
			}
		}

		// QSA path
		if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
			nid = old = expando;
			newContext = context;
			newSelector = nodeType !== 1 && selector;

			// qSA works strangely on Element-rooted queries
			// We can work around this by specifying an extra ID on the root
			// and working up from there (Thanks to Andrew Dupont for the technique)
			// IE 8 doesn't work on object elements
			if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
				groups = tokenize( selector );

				if ( (old = context.getAttribute("id")) ) {
					nid = old.replace( rescape, "\\$&" );
				} else {
					context.setAttribute( "id", nid );
				}
				nid = "[id='" + nid + "'] ";

				i = groups.length;
				while ( i-- ) {
					groups[i] = nid + toSelector( groups[i] );
				}
				newContext = rsibling.test( selector ) && testContext( context.parentNode ) || context;
				newSelector = groups.join(",");
			}

			if ( newSelector ) {
				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results;
				} catch(qsaError) {
				} finally {
					if ( !old ) {
						context.removeAttribute("id");
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = attrs.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, parent,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// If no document and documentElement is available, return
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Set our document
	document = doc;
	docElem = doc.documentElement;
	parent = doc.defaultView;

	// Support: IE>8
	// If iframe document is assigned to "document" variable and if iframe has been reloaded,
	// IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
	// IE6-8 do not support the defaultView property so parent will be undefined
	if ( parent && parent !== parent.top ) {
		// IE11 does not have attachEvent, so all must suffer
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", unloadHandler, false );
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Support tests
	---------------------------------------------------------------------- */
	documentIsHTML = !isXML( doc );

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( doc.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( doc.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !doc.getElementsByName || !doc.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var m = context.getElementById( id );
				// Check parentNode to catch when Blackberry 4.6 returns
				// nodes that are no longer in the document #6963
				return m && m.parentNode ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( doc.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\f]' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.2+, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.7+
			if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibing-combinator selector` fails
			if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = doc.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully does not implement inclusive descendent
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === doc ? -1 :
				b === doc ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return doc;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA	 || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, outerCache, node, diff, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {
							// Seek `elem` from a previously-cached index
							outerCache = parent[ expando ] || (parent[ expando ] = {});
							cache = outerCache[ type ] || [];
							nodeIndex = cache[0] === dirruns && cache[1];
							diff = cache[0] === dirruns && cache[2];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									outerCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						// Use previously-cached element index if available
						} else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
							diff = cache[1];

						// xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
						} else {
							// Use the same loop as above to seek `elem` from the start
							while ( (node = ++nodeIndex && node && node[ dir ] ||
								(diff = nodeIndex = 0) || start.pop()) ) {

								if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
									// Cache the index of each encountered element
									if ( useCache ) {
										(node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
									}

									if ( node === elem ) {
										break;
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});
						if ( (oldCache = outerCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							outerCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context !== document && context;
			}

			// Add elements passing elementMatchers directly to results
			// Keep `i` a string if there are no elements so `matchedCount` will be "00" below
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context, xml ) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// Apply set filters to unmatched elements
			matchedCount += i;
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is no seed and only one group
	if ( match.length === 1 ) {

		// Take a shortcut and set the context if the root selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.pseudos;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = (/^<(\w+)\s*\/?>(?:<\/\1>|)$/);



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		});

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		});

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( indexOf.call( qualifier, elem ) >= 0 ) !== not;
	});
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		}));
};

jQuery.fn.extend({
	find: function( selector ) {
		var i,
			len = this.length,
			ret = [],
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter(function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			}) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow(this, selector || [], false) );
	},
	not: function( selector ) {
		return this.pushStack( winnow(this, selector || [], true) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
});


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[0] === "<" && selector[ selector.length - 1 ] === ">" && selector.length >= 3 ) {
				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] ) {
					context = context instanceof jQuery ? context[0] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[1],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {
							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[2] );

					// Support: Blackberry 4.6
					// gEBID returns nodes no longer in the document (#6963)
					if ( elem && elem.parentNode ) {
						// Inject the element directly into the jQuery object
						this.length = 1;
						this[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || rootjQuery ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof rootjQuery.ready !== "undefined" ?
				rootjQuery.ready( selector ) :
				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,
	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.extend({
	dir: function( elem, dir, until ) {
		var matched = [],
			truncate = until !== undefined;

		while ( (elem = elem[ dir ]) && elem.nodeType !== 9 ) {
			if ( elem.nodeType === 1 ) {
				if ( truncate && jQuery( elem ).is( until ) ) {
					break;
				}
				matched.push( elem );
			}
		}
		return matched;
	},

	sibling: function( n, elem ) {
		var matched = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				matched.push( n );
			}
		}

		return matched;
	}
});

jQuery.fn.extend({
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter(function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[i] ) ) {
					return true;
				}
			}
		});
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[i]; cur && cur !== context; cur = cur.parentNode ) {
				// Always skip document fragments
				if ( cur.nodeType < 11 && (pos ?
					pos.index(cur) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector(cur, selectors)) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.unique( matched ) : matched );
	},

	// Determine the position of an element within the set
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// Index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.unique(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter(selector)
		);
	}
});

function sibling( cur, dir ) {
	while ( (cur = cur[dir]) && cur.nodeType !== 1 ) {}
	return cur;
}

jQuery.each({
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return jQuery.dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return jQuery.dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return jQuery.dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return jQuery.sibling( elem.firstChild );
	},
	contents: function( elem ) {
		return elem.contentDocument || jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {
			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.unique( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
});
var rnotwhite = (/\S+/g);



// String to Object options format cache
var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
function createOptions( options ) {
	var object = optionsCache[ options ] = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	});
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		( optionsCache[ options ] || createOptions( options ) ) :
		jQuery.extend( {}, options );

	var // Last fire value (for non-forgettable lists)
		memory,
		// Flag to know if list was already fired
		fired,
		// Flag to know if list is currently firing
		firing,
		// First callback to fire (used internally by add and fireWith)
		firingStart,
		// End of the loop when firing
		firingLength,
		// Index of currently firing callback (modified by remove if needed)
		firingIndex,
		// Actual callback list
		list = [],
		// Stack of fire calls for repeatable lists
		stack = !options.once && [],
		// Fire callbacks
		fire = function( data ) {
			memory = options.memory && data;
			fired = true;
			firingIndex = firingStart || 0;
			firingStart = 0;
			firingLength = list.length;
			firing = true;
			for ( ; list && firingIndex < firingLength; firingIndex++ ) {
				if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
					memory = false; // To prevent further calls using add
					break;
				}
			}
			firing = false;
			if ( list ) {
				if ( stack ) {
					if ( stack.length ) {
						fire( stack.shift() );
					}
				} else if ( memory ) {
					list = [];
				} else {
					self.disable();
				}
			}
		},
		// Actual Callbacks object
		self = {
			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {
					// First, we save the current length
					var start = list.length;
					(function add( args ) {
						jQuery.each( args, function( _, arg ) {
							var type = jQuery.type( arg );
							if ( type === "function" ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && type !== "string" ) {
								// Inspect recursively
								add( arg );
							}
						});
					})( arguments );
					// Do we need to add the callbacks to the
					// current firing batch?
					if ( firing ) {
						firingLength = list.length;
					// With memory, if we're not firing then
					// we should call right away
					} else if ( memory ) {
						firingStart = start;
						fire( memory );
					}
				}
				return this;
			},
			// Remove a callback from the list
			remove: function() {
				if ( list ) {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );
							// Handle firing indexes
							if ( firing ) {
								if ( index <= firingLength ) {
									firingLength--;
								}
								if ( index <= firingIndex ) {
									firingIndex--;
								}
							}
						}
					});
				}
				return this;
			},
			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ? jQuery.inArray( fn, list ) > -1 : !!( list && list.length );
			},
			// Remove all callbacks from the list
			empty: function() {
				list = [];
				firingLength = 0;
				return this;
			},
			// Have the list do nothing anymore
			disable: function() {
				list = stack = memory = undefined;
				return this;
			},
			// Is it disabled?
			disabled: function() {
				return !list;
			},
			// Lock the list in its current state
			lock: function() {
				stack = undefined;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			// Is it locked?
			locked: function() {
				return !stack;
			},
			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( list && ( !fired || stack ) ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					if ( firing ) {
						stack.push( args );
					} else {
						fire( args );
					}
				}
				return this;
			},
			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},
			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend({

	Deferred: function( func ) {
		var tuples = [
				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks("memory") ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred(function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[1] ](function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.done( newDefer.resolve )
										.fail( newDefer.reject )
										.progress( newDefer.notify );
								} else {
									newDefer[ tuple[ 0 ] + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
								}
							});
						});
						fns = null;
					}).promise();
				},
				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[1] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(function() {
					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[0] ] = function() {
				deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[0] + "With" ] = list.fireWith;
		});

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );
					} else if ( !( --remaining ) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// Add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject )
						.progress( updateFunc( i, progressContexts, progressValues ) );
				} else {
					--remaining;
				}
			}
		}

		// If we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
});


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {
	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend({
	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
});

/**
 * The ready event handler and self cleanup method
 */
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed, false );
	window.removeEventListener( "load", completed, false );
	jQuery.ready();
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called after the browser event has already occurred.
		// We once tried to use readyState "interactive" here, but it caused issues like the one
		// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
		if ( document.readyState === "complete" ) {
			// Handle it asynchronously to allow scripts the opportunity to delay ready
			setTimeout( jQuery.ready );

		} else {

			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed, false );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed, false );
		}
	}
	return readyList.promise( obj );
};

// Kick off the DOM ready check even if the user does not
jQuery.ready.promise();




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = jQuery.access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {
			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			len ? fn( elems[0], key ) : emptyGet;
};


/**
 * Determines whether an object can have data
 */
jQuery.acceptData = function( owner ) {
	// Accepts only:
	//  - Node
	//	- Node.ELEMENT_NODE
	//	- Node.DOCUMENT_NODE
	//  - Object
	//	- Any
	/* jshint -W018 */
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};


function Data() {
	// Support: Android<4,
	// Old WebKit does not have Object.preventExtensions/freeze method,
	// return new empty object instead with no [[set]] accessor
	Object.defineProperty( this.cache = {}, 0, {
		get: function() {
			return {};
		}
	});

	this.expando = jQuery.expando + Data.uid++;
}

Data.uid = 1;
Data.accepts = jQuery.acceptData;

Data.prototype = {
	key: function( owner ) {
		// We can accept data for non-element nodes in modern browsers,
		// but we should not, see #8335.
		// Always return the key for a frozen object.
		if ( !Data.accepts( owner ) ) {
			return 0;
		}

		var descriptor = {},
			// Check if the owner object already has a cache key
			unlock = owner[ this.expando ];

		// If not, create one
		if ( !unlock ) {
			unlock = Data.uid++;

			// Secure it in a non-enumerable, non-writable property
			try {
				descriptor[ this.expando ] = { value: unlock };
				Object.defineProperties( owner, descriptor );

			// Support: Android<4
			// Fallback to a less secure definition
			} catch ( e ) {
				descriptor[ this.expando ] = unlock;
				jQuery.extend( owner, descriptor );
			}
		}

		// Ensure the cache object
		if ( !this.cache[ unlock ] ) {
			this.cache[ unlock ] = {};
		}

		return unlock;
	},
	set: function( owner, data, value ) {
		var prop,
			// There may be an unlock assigned to this node,
			// if there is no entry for this "owner", create one inline
			// and set the unlock as though an owner entry had always existed
			unlock = this.key( owner ),
			cache = this.cache[ unlock ];

		// Handle: [ owner, key, value ] args
		if ( typeof data === "string" ) {
			cache[ data ] = value;

		// Handle: [ owner, { properties } ] args
		} else {
			// Fresh assignments by object are shallow copied
			if ( jQuery.isEmptyObject( cache ) ) {
				jQuery.extend( this.cache[ unlock ], data );
			// Otherwise, copy the properties one-by-one to the cache object
			} else {
				for ( prop in data ) {
					cache[ prop ] = data[ prop ];
				}
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		// Either a valid cache is found, or will be created.
		// New caches will be created and the unlock returned,
		// allowing direct access to the newly created
		// empty data object. A valid owner object must be provided.
		var cache = this.cache[ this.key( owner ) ];

		return key === undefined ?
			cache : cache[ key ];
	},
	access: function( owner, key, value ) {
		var stored;
		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				((key && typeof key === "string") && value === undefined) ) {

			stored = this.get( owner, key );

			return stored !== undefined ?
				stored : this.get( owner, jQuery.camelCase(key) );
		}

		// [*]When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i, name, camel,
			unlock = this.key( owner ),
			cache = this.cache[ unlock ];

		if ( key === undefined ) {
			this.cache[ unlock ] = {};

		} else {
			// Support array or space separated string of keys
			if ( jQuery.isArray( key ) ) {
				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = key.concat( key.map( jQuery.camelCase ) );
			} else {
				camel = jQuery.camelCase( key );
				// Try the string as a key before any manipulation
				if ( key in cache ) {
					name = [ key, camel ];
				} else {
					// If a key with the spaces exists, use it.
					// Otherwise, create an array by matching non-whitespace
					name = camel;
					name = name in cache ?
						[ name ] : ( name.match( rnotwhite ) || [] );
				}
			}

			i = name.length;
			while ( i-- ) {
				delete cache[ name[ i ] ];
			}
		}
	},
	hasData: function( owner ) {
		return !jQuery.isEmptyObject(
			this.cache[ owner[ this.expando ] ] || {}
		);
	},
	discard: function( owner ) {
		if ( owner[ this.expando ] ) {
			delete this.cache[ owner[ this.expando ] ];
		}
	}
};
var data_priv = new Data();

var data_user = new Data();



//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :
					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch( e ) {}

			// Make sure we set the data so it isn't changed later
			data_user.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend({
	hasData: function( elem ) {
		return data_user.hasData( elem ) || data_priv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return data_user.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		data_user.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to data_priv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return data_priv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		data_priv.remove( elem, name );
	}
});

jQuery.fn.extend({
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = data_user.get( elem );

				if ( elem.nodeType === 1 && !data_priv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice(5) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					data_priv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each(function() {
				data_user.set( this, key );
			});
		}

		return access( this, function( value ) {
			var data,
				camelKey = jQuery.camelCase( key );

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {
				// Attempt to get data from the cache
				// with the key as-is
				data = data_user.get( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to get data from the cache
				// with the key camelized
				data = data_user.get( elem, camelKey );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, camelKey, undefined );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			this.each(function() {
				// First, attempt to store a copy or reference of any
				// data that might've been store with a camelCased key.
				var data = data_user.get( this, camelKey );

				// For HTML5 data-* attribute interop, we have to
				// store property names with dashes in a camelCase form.
				// This might not apply to all properties...*
				data_user.set( this, camelKey, value );

				// *... In the case of properties that might _actually_
				// have dashes, we need to also store a copy of that
				// unchanged property.
				if ( key.indexOf("-") !== -1 && data !== undefined ) {
					data_user.set( this, key, value );
				}
			});
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each(function() {
			data_user.remove( this, key );
		});
	}
});


jQuery.extend({
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = data_priv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray( data ) ) {
					queue = data_priv.access( elem, type, jQuery.makeArray(data) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// Clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// Not public - generate a queueHooks object, or return the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return data_priv.get( elem, key ) || data_priv.access( elem, key, {
			empty: jQuery.Callbacks("once memory").add(function() {
				data_priv.remove( elem, [ type + "queue", key ] );
			})
		});
	}
});

jQuery.fn.extend({
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[0], type );
		}

		return data === undefined ?
			this :
			this.each(function() {
				var queue = jQuery.queue( this, type, data );

				// Ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[0] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			});
	},
	dequeue: function( type ) {
		return this.each(function() {
			jQuery.dequeue( this, type );
		});
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},
	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = data_priv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
});
var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;

var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {
		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
	};

var rcheckableType = (/^(?:checkbox|radio)$/i);



(function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// Support: Safari<=5.1
	// Check state lost if the name is set (#11217)
	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Safari<=5.1, Android<4.2
	// Older WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<=11+
	// Make sure textarea (and checkbox) defaultValue is properly cloned
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
})();
var strundefined = typeof undefined;



support.focusinBubbles = "onfocusin" in window;


var
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = data_priv.get( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !(events = elemData.events) ) {
			events = elemData.events = {};
		}
		if ( !(eventHandle = elemData.handle) ) {
			eventHandle = elemData.handle = function( e ) {
				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== strundefined && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend({
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join(".")
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !(handlers = events[ type ]) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = data_priv.hasData( elem ) && data_priv.get( elem );

		if ( !elemData || !(events = elemData.events) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[2] && new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;
			data_priv.remove( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split(".") : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf(".") >= 0 ) {
			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split(".");
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf(":") < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join(".");
		event.namespace_re = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === (elem.ownerDocument || document) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( data_priv.get( cur, "events" ) || {} )[ event.type ] && data_priv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && jQuery.acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( (!special._default || special._default.apply( eventPath.pop(), data ) === false) &&
				jQuery.acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && jQuery.isFunction( elem[ type ] ) && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					elem[ type ]();
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, j, ret, matched, handleObj,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( data_priv.get( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[0] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
							.apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( (event.result = ret) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, matches, sel, handleObj,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		// Avoid non-left-click bubbling in Firefox (#3861)
		if ( delegateCount && cur.nodeType && (!event.button || event.type !== "click") ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.disabled !== true || event.type !== "click" ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) >= 0 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push({ elem: cur, handlers: matches });
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });
		}

		return handlerQueue;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split(" "),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
		filter: function( event, original ) {
			var eventDoc, doc, body,
				button = original.button;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: Cordova 2.5 (WebKit) (#13255)
		// All events should have a target; Cordova deviceready doesn't
		if ( !event.target ) {
			event.target = document;
		}

		// Support: Safari 6.0+, Chrome<28
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	special: {
		load: {
			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {
			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					this.focus();
					return false;
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {
			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( this.type === "checkbox" && this.click && jQuery.nodeName( this, "input" ) ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	simulate: function( type, elem, event, bubble ) {
		// Piggyback on a donor event to simulate a different one.
		// Fake originalEvent to avoid donor's stopPropagation, but if the
		// simulated event prevents default then we do the same on the donor.
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true,
				originalEvent: {}
			}
		);
		if ( bubble ) {
			jQuery.event.trigger( e, null, elem );
		} else {
			jQuery.event.dispatch.call( elem, e );
		}
		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = function( elem, type, handle ) {
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle, false );
	}
};

jQuery.Event = function( src, props ) {
	// Allow instantiation without the 'new' keyword
	if ( !(this instanceof jQuery.Event) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&
				// Support: Android<4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e && e.preventDefault ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e && e.stopPropagation ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
// Support: Chrome 15+
jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mousenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
});

// Support: Firefox, Chrome, Safari
// Create "bubbling" focus and blur events
if ( !support.focusinBubbles ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
			};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = data_priv.access( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				data_priv.access( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = data_priv.access( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					data_priv.remove( doc, fix );

				} else {
					data_priv.access( doc, fix, attaches );
				}
			}
		};
	});
}

jQuery.fn.extend({

	on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
		var origFn, type;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {
			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {
				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				this.on( type, selector, data, types[ type ], one );
			}
			return this;
		}

		if ( data == null && fn == null ) {
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return this;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {
				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return this.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		});
	},
	one: function( types, selector, data, fn ) {
		return this.on( types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {
			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {
			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {
			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each(function() {
			jQuery.event.remove( this, types, fn, selector );
		});
	},

	trigger: function( type, data ) {
		return this.each(function() {
			jQuery.event.trigger( type, data, this );
		});
	},
	triggerHandler: function( type, data ) {
		var elem = this[0];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
});


var
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	rtagName = /<([\w:]+)/,
	rhtml = /<|&#?\w+;/,
	rnoInnerhtml = /<(?:script|style|link)/i,
	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptType = /^$|\/(?:java|ecma)script/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,

	// We have to close these tags to support XHTML (#13200)
	wrapMap = {

		// Support: IE9
		option: [ 1, "<select multiple='multiple'>", "</select>" ],

		thead: [ 1, "<table>", "</table>" ],
		col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

		_default: [ 0, "", "" ]
	};

// Support: IE9
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

// Support: 1.x compatibility
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName("tbody")[0] ||
			elem.appendChild( elem.ownerDocument.createElement("tbody") ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = (elem.getAttribute("type") !== null) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );

	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute("type");
	}

	return elem;
}

// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		data_priv.set(
			elems[ i ], "globalEval", !refElements || data_priv.get( refElements[ i ], "globalEval" )
		);
	}
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( data_priv.hasData( src ) ) {
		pdataOld = data_priv.access( src );
		pdataCur = data_priv.set( dest, pdataOld );
		events = pdataOld.events;

		if ( events ) {
			delete pdataCur.handle;
			pdataCur.events = {};

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( data_user.hasData( src ) ) {
		udataOld = data_user.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		data_user.set( dest, udataCur );
	}
}

function getAll( context, tag ) {
	var ret = context.getElementsByTagName ? context.getElementsByTagName( tag || "*" ) :
			context.querySelectorAll ? context.querySelectorAll( tag || "*" ) :
			[];

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], ret ) :
		ret;
}

// Fix IE bugs, see support tests
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

jQuery.extend({
	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = jQuery.contains( elem.ownerDocument, elem );

		// Fix IE cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	buildFragment: function( elems, context, scripts, selection ) {
		var elem, tmp, tag, wrap, contains, j,
			fragment = context.createDocumentFragment(),
			nodes = [],
			i = 0,
			l = elems.length;

		for ( ; i < l; i++ ) {
			elem = elems[ i ];

			if ( elem || elem === 0 ) {

				// Add nodes directly
				if ( jQuery.type( elem ) === "object" ) {
					// Support: QtWebKit, PhantomJS
					// push.apply(_, arraylike) throws on ancient WebKit
					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

				// Convert non-html into a text node
				} else if ( !rhtml.test( elem ) ) {
					nodes.push( context.createTextNode( elem ) );

				// Convert html into DOM nodes
				} else {
					tmp = tmp || fragment.appendChild( context.createElement("div") );

					// Deserialize a standard representation
					tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;
					tmp.innerHTML = wrap[ 1 ] + elem.replace( rxhtmlTag, "<$1></$2>" ) + wrap[ 2 ];

					// Descend through wrappers to the right content
					j = wrap[ 0 ];
					while ( j-- ) {
						tmp = tmp.lastChild;
					}

					// Support: QtWebKit, PhantomJS
					// push.apply(_, arraylike) throws on ancient WebKit
					jQuery.merge( nodes, tmp.childNodes );

					// Remember the top-level container
					tmp = fragment.firstChild;

					// Ensure the created nodes are orphaned (#12392)
					tmp.textContent = "";
				}
			}
		}

		// Remove wrapper from fragment
		fragment.textContent = "";

		i = 0;
		while ( (elem = nodes[ i++ ]) ) {

			// #4087 - If origin and destination elements are the same, and this is
			// that element, do not do anything
			if ( selection && jQuery.inArray( elem, selection ) !== -1 ) {
				continue;
			}

			contains = jQuery.contains( elem.ownerDocument, elem );

			// Append to fragment
			tmp = getAll( fragment.appendChild( elem ), "script" );

			// Preserve script evaluation history
			if ( contains ) {
				setGlobalEval( tmp );
			}

			// Capture executables
			if ( scripts ) {
				j = 0;
				while ( (elem = tmp[ j++ ]) ) {
					if ( rscriptType.test( elem.type || "" ) ) {
						scripts.push( elem );
					}
				}
			}
		}

		return fragment;
	},

	cleanData: function( elems ) {
		var data, elem, type, key,
			special = jQuery.event.special,
			i = 0;

		for ( ; (elem = elems[ i ]) !== undefined; i++ ) {
			if ( jQuery.acceptData( elem ) ) {
				key = elem[ data_priv.expando ];

				if ( key && (data = data_priv.cache[ key ]) ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}
					if ( data_priv.cache[ key ] ) {
						// Discard any remaining `private` data
						delete data_priv.cache[ key ];
					}
				}
			}
			// Discard any remaining `user` data
			delete data_user.cache[ elem[ data_user.expando ] ];
		}
	}
});

jQuery.fn.extend({
	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each(function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				});
		}, null, value, arguments.length );
	},

	append: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		});
	},

	prepend: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		});
	},

	before: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		});
	},

	after: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		});
	},

	remove: function( selector, keepData /* Internal Use Only */ ) {
		var elem,
			elems = selector ? jQuery.filter( selector, this ) : this,
			i = 0;

		for ( ; (elem = elems[i]) != null; i++ ) {
			if ( !keepData && elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem ) );
			}

			if ( elem.parentNode ) {
				if ( keepData && jQuery.contains( elem.ownerDocument, elem ) ) {
					setGlobalEval( getAll( elem, "script" ) );
				}
				elem.parentNode.removeChild( elem );
			}
		}

		return this;
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; (elem = this[i]) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map(function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		});
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = value.replace( rxhtmlTag, "<$1></$2>" );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var arg = arguments[ 0 ];

		// Make the changes, replacing each context element with the new content
		this.domManip( arguments, function( elem ) {
			arg = this.parentNode;

			jQuery.cleanData( getAll( this ) );

			if ( arg ) {
				arg.replaceChild( elem, this );
			}
		});

		// Force removal if there was no new content (e.g., from empty arguments)
		return arg && (arg.length || arg.nodeType) ? this : this.remove();
	},

	detach: function( selector ) {
		return this.remove( selector, true );
	},

	domManip: function( args, callback ) {

		// Flatten any nested arrays
		args = concat.apply( [], args );

		var fragment, first, scripts, hasScripts, node, doc,
			i = 0,
			l = this.length,
			set = this,
			iNoClone = l - 1,
			value = args[ 0 ],
			isFunction = jQuery.isFunction( value );

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( isFunction ||
				( l > 1 && typeof value === "string" &&
					!support.checkClone && rchecked.test( value ) ) ) {
			return this.each(function( index ) {
				var self = set.eq( index );
				if ( isFunction ) {
					args[ 0 ] = value.call( this, index, self.html() );
				}
				self.domManip( args, callback );
			});
		}

		if ( l ) {
			fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, this );
			first = fragment.firstChild;

			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}

			if ( first ) {
				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
				hasScripts = scripts.length;

				// Use the original fragment for the last item instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for ( ; i < l; i++ ) {
					node = fragment;

					if ( i !== iNoClone ) {
						node = jQuery.clone( node, true, true );

						// Keep references to cloned scripts for later restoration
						if ( hasScripts ) {
							// Support: QtWebKit
							// jQuery.merge because push.apply(_, arraylike) throws
							jQuery.merge( scripts, getAll( node, "script" ) );
						}
					}

					callback.call( this[ i ], node, i );
				}

				if ( hasScripts ) {
					doc = scripts[ scripts.length - 1 ].ownerDocument;

					// Reenable scripts
					jQuery.map( scripts, restoreScript );

					// Evaluate executable scripts on first document insertion
					for ( i = 0; i < hasScripts; i++ ) {
						node = scripts[ i ];
						if ( rscriptType.test( node.type || "" ) &&
							!data_priv.access( node, "globalEval" ) && jQuery.contains( doc, node ) ) {

							if ( node.src ) {
								// Optional AJAX dependency, but won't run scripts if not present
								if ( jQuery._evalUrl ) {
									jQuery._evalUrl( node.src );
								}
							} else {
								jQuery.globalEval( node.textContent.replace( rcleanScript, "" ) );
							}
						}
					}
				}
			}
		}

		return this;
	}
});

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: QtWebKit
			// .get() because push.apply(_, arraylike) throws
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
});


var iframe,
	elemdisplay = {};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */
// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var style,
		elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		// getDefaultComputedStyle might be reliably used only on attached element
		display = window.getDefaultComputedStyle && ( style = window.getDefaultComputedStyle( elem[ 0 ] ) ) ?

			// Use of this method is a temporary fix (more like optimization) until something better comes along,
			// since it was removed from specification and supported only in FF
			style.display : jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = (iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" )).appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = iframe[ 0 ].contentDocument;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}
var rmargin = (/^margin/);

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var getStyles = function( elem ) {
		// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		if ( elem.ownerDocument.defaultView.opener ) {
			return elem.ownerDocument.defaultView.getComputedStyle( elem, null );
		}

		return window.getComputedStyle( elem, null );
	};



function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,
		style = elem.style;

	computed = computed || getStyles( elem );

	// Support: IE9
	// getPropertyValue is only needed for .css('filter') (#12537)
	if ( computed ) {
		ret = computed.getPropertyValue( name ) || computed[ name ];
	}

	if ( computed ) {

		if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		// Support: iOS < 6
		// A tribute to the "awesome hack by Dean Edwards"
		// iOS < 6 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
		// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
		if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret !== undefined ?
		// Support: IE
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
}


function addGetHookIf( conditionFn, hookFn ) {
	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {
				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return (this.get = hookFn).apply( this, arguments );
		}
	};
}


(function() {
	var pixelPositionVal, boxSizingReliableVal,
		docElem = document.documentElement,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	if ( !div.style ) {
		return;
	}

	// Support: IE9-11+
	// Style of cloned element affects source element cloned (#8908)
	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container.style.cssText = "border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;" +
		"position:absolute";
	container.appendChild( div );

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computePixelPositionAndBoxSizingReliable() {
		div.style.cssText =
			// Support: Firefox<29, Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;" +
			"box-sizing:border-box;display:block;margin-top:1%;top:1%;" +
			"border:1px;padding:1px;width:4px;position:absolute";
		div.innerHTML = "";
		docElem.appendChild( container );

		var divStyle = window.getComputedStyle( div, null );
		pixelPositionVal = divStyle.top !== "1%";
		boxSizingReliableVal = divStyle.width === "4px";

		docElem.removeChild( container );
	}

	// Support: node.js jsdom
	// Don't assume that getComputedStyle is a property of the global object
	if ( window.getComputedStyle ) {
		jQuery.extend( support, {
			pixelPosition: function() {

				// This test is executed only once but we still do memoizing
				// since we can use the boxSizingReliable pre-computing.
				// No need to check if the test was already performed, though.
				computePixelPositionAndBoxSizingReliable();
				return pixelPositionVal;
			},
			boxSizingReliable: function() {
				if ( boxSizingReliableVal == null ) {
					computePixelPositionAndBoxSizingReliable();
				}
				return boxSizingReliableVal;
			},
			reliableMarginRight: function() {

				// Support: Android 2.3
				// Check if div with explicit width and no margin-right incorrectly
				// gets computed margin-right based on width of container. (#3333)
				// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
				// This support function is only executed once so no memoizing is needed.
				var ret,
					marginDiv = div.appendChild( document.createElement( "div" ) );

				// Reset CSS: box-sizing; display; margin; border; padding
				marginDiv.style.cssText = div.style.cssText =
					// Support: Firefox<29, Android 2.3
					// Vendor-prefix box-sizing
					"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
					"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
				marginDiv.style.marginRight = marginDiv.style.width = "0";
				div.style.width = "1px";
				docElem.appendChild( container );

				ret = !parseFloat( window.getComputedStyle( marginDiv, null ).marginRight );

				docElem.removeChild( container );
				div.removeChild( marginDiv );

				return ret;
			}
		});
	}
})();


// A method for quickly swapping in/out CSS properties to get correct calculations.
jQuery.swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var
	// Swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),
	rrelNum = new RegExp( "^([+-])=(" + pnum + ")", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];

// Return a css property mapped to a potentially vendor prefixed property
function vendorPropName( style, name ) {

	// Shortcut for names that are not vendor prefixed
	if ( name in style ) {
		return name;
	}

	// Check for vendor prefixed names
	var capName = name[0].toUpperCase() + name.slice(1),
		origName = name,
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in style ) {
			return name;
		}
	}

	return origName;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?
		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?
		// If we already have the right measurement, avoid augmentation
		4 :
		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {
		// Both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {
			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// At this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {
			// At this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// At this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// Some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {
		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test(val) ) {
			return val;
		}

		// Check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox &&
			( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// Use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = data_priv.get( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {
			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] = data_priv.access( elem, "olddisplay", defaultDisplay(elem.nodeName) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display !== "none" || !hidden ) {
				data_priv.set( elem, "olddisplay", hidden ? display : jQuery.css( elem, "display" ) );
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

jQuery.extend({

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		"float": "cssFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

		// Gets hook for the prefixed version, then unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && (ret = rrelNum.exec( value )) ) {
				value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set (#7116)
			if ( value == null || value !== value ) {
				return;
			}

			// If a number, add 'px' to the (except for certain CSS properties)
			if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
				value += "px";
			}

			// Support: IE9-11+
			// background-* props affect original clone's values
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {
				style[ name ] = value;
			}

		} else {
			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

		// Try prefixed name followed by the unprefixed name
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		// Convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Make numeric if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || jQuery.isNumeric( num ) ? num || 0 : val;
		}
		return val;
	}
});

jQuery.each([ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// Certain elements can have dimension info if we invisibly show them
				// but it must have a current display style that would benefit
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) && elem.offsetWidth === 0 ?
					jQuery.swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, name, extra );
					}) :
					getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
});

// Support: Android 2.3
jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			return jQuery.swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each({
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split(" ") : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
});

jQuery.fn.extend({
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each(function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		});
	}
});


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || "swing";
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			if ( tween.elem[ tween.prop ] != null &&
				(!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
				return tween.elem[ tween.prop ];
			}

			// Passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails.
			// Simple values such as "10px" are parsed to Float;
			// complex values such as "rotate(1rad)" are returned as-is.
			result = jQuery.css( tween.elem, tween.prop, "" );
			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {
			// Use step hook for back compat.
			// Use cssHook if its there.
			// Use .style if available and use plain properties where available.
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE9
// Panic based approach to setting things on disconnected nodes
Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	}
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" ),
	rrun = /queueHooks$/,
	animationPrefilters = [ defaultPrefilter ],
	tweeners = {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value ),
				target = tween.cur(),
				parts = rfxnum.exec( value ),
				unit = parts && parts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

				// Starting value computation is required for potential unit mismatches
				start = ( jQuery.cssNumber[ prop ] || unit !== "px" && +target ) &&
					rfxnum.exec( jQuery.css( tween.elem, prop ) ),
				scale = 1,
				maxIterations = 20;

			if ( start && start[ 3 ] !== unit ) {
				// Trust units reported by jQuery.css
				unit = unit || start[ 3 ];

				// Make sure we update the tween properties later on
				parts = parts || [];

				// Iteratively approximate from a nonzero starting point
				start = +target || 1;

				do {
					// If previous iteration zeroed out, double until we get *something*.
					// Use string for doubling so we don't accidentally see scale as unchanged below
					scale = scale || ".5";

					// Adjust and apply
					start = start / scale;
					jQuery.style( tween.elem, prop, start + unit );

				// Update scale, tolerating zero or NaN from tween.cur(),
				// break the loop if scale is unchanged or perfect, or if we've just had enough
				} while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
			}

			// Update tween properties
			if ( parts ) {
				start = tween.start = +start || +target || 0;
				tween.unit = unit;
				// If a +=/-= token was provided, we're doing a relative animation
				tween.end = parts[ 1 ] ?
					start + ( parts[ 1 ] + 1 ) * parts[ 2 ] :
					+parts[ 2 ];
			}

			return tween;
		} ]
	};

// Animations created synchronously will run synchronously
function createFxNow() {
	setTimeout(function() {
		fxNow = undefined;
	});
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		i = 0,
		attrs = { height: type };

	// If we include width, step value is 1 to do all cssExpand values,
	// otherwise step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( (tween = collection[ index ].call( animation, prop, value )) ) {

			// We're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = data_priv.get( elem, "fxshow" );

	// Handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always(function() {
			// Ensure the complete handler is called before this completes
			anim.always(function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			});
		});
	}

	// Height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE9-10 do not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			data_priv.get( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {
			style.display = "inline-block";
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always(function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		});
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = data_priv.access( elem, "fxshow", {} );
		}

		// Store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done(function() {
				jQuery( elem ).hide();
			});
		}
		anim.done(function() {
			var prop;

			data_priv.remove( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		});
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( (display === "none" ? defaultDisplay( elem.nodeName ) : display) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// Not quite $.extend, this won't overwrite existing keys.
			// Reusing 'index' because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = animationPrefilters.length,
		deferred = jQuery.Deferred().always( function() {
			// Don't match elem in the :animated selector
			delete tick.elem;
		}),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
				// Support: Android 2.3
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ]);

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise({
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, { specialEasing: {} }, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,
					// If we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// Resolve when we played the last frame; otherwise, reject
				if ( gotoEnd ) {
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		}),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		})
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.split(" ");
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			tweeners[ prop ] = tweeners[ prop ] || [];
			tweeners[ prop ].unshift( callback );
		}
	},

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			animationPrefilters.unshift( callback );
		} else {
			animationPrefilters.push( callback );
		}
	}
});

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// Normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend({
	fadeTo: function( speed, to, easing, callback ) {

		// Show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// Animate to the value specified
			.end().animate({ opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {
				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || data_priv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each(function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = data_priv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// Start the next in the queue if the last step wasn't forced.
			// Timers currently will call their complete callbacks, which
			// will dequeue but only if they were gotoEnd.
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		});
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each(function() {
			var index,
				data = data_priv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// Enable finishing flag on private data
			data.finish = true;

			// Empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// Look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// Look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// Turn off finishing flag
			delete data.finish;
		});
	}
});

jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
});

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx("show"),
	slideUp: genFx("hide"),
	slideToggle: genFx("toggle"),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
});

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		i = 0,
		timers = jQuery.timers;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];
		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,
	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = setTimeout( next, time );
		hooks.stop = function() {
			clearTimeout( timeout );
		};
	});
};


(function() {
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: iOS<=5.1, Android<=4.2+
	// Default value for a checkbox should be "on"
	support.checkOn = input.value !== "";

	// Support: IE<=11+
	// Must access selectedIndex to make default options select
	support.optSelected = opt.selected;

	// Support: Android<=2.3
	// Options inside disabled selects are incorrectly marked as disabled
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE<=11+
	// An input loses its value after becoming a radio
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
})();


var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend({
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each(function() {
			jQuery.removeAttr( this, name );
		});
	}
});

jQuery.extend({
	attr: function( elem, name, value ) {
		var hooks, ret,
			nType = elem.nodeType;

		// don't get/set attributes on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === strundefined ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {

			if ( value === null ) {
				jQuery.removeAttr( elem, name );

			} else if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				elem.setAttribute( name, value + "" );
				return value;
			}

		} else if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
			return ret;

		} else {
			ret = jQuery.find.attr( elem, name );

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ?
				undefined :
				ret;
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( (name = attrNames[i++]) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {
					// Set corresponding property to false
					elem[ propName ] = false;
				}

				elem.removeAttribute( name );
			}
		}
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					jQuery.nodeName( elem, "input" ) ) {
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	}
});

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {
			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};
jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle;
		if ( !isXML ) {
			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ name ];
			attrHandle[ name ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				name.toLowerCase() :
				null;
			attrHandle[ name ] = handle;
		}
		return ret;
	};
});




var rfocusable = /^(?:input|select|textarea|button)$/i;

jQuery.fn.extend({
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each(function() {
			delete this[ jQuery.propFix[ name ] || name ];
		});
	}
});

jQuery.extend({
	propFix: {
		"for": "htmlFor",
		"class": "className"
	},

	prop: function( elem, name, value ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		if ( notxml ) {
			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			return hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ?
				ret :
				( elem[ name ] = value );

		} else {
			return hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ?
				ret :
				elem[ name ];
		}
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {
				return elem.hasAttribute( "tabindex" ) || rfocusable.test( elem.nodeName ) || elem.href ?
					elem.tabIndex :
					-1;
			}
		}
	}
});

if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		}
	};
}

jQuery.each([
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
});




var rclass = /[\t\r\n\f]/g;

jQuery.fn.extend({
	addClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			proceed = typeof value === "string" && value,
			i = 0,
			len = this.length;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).addClass( value.call( this, j, this.className ) );
			});
		}

		if ( proceed ) {
			// The disjunction here is for better compressibility (see removeClass)
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					" "
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			proceed = arguments.length === 0 || typeof value === "string" && value,
			i = 0,
			len = this.length;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).removeClass( value.call( this, j, this.className ) );
			});
		}
		if ( proceed ) {
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					""
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = value ? jQuery.trim( cur ) : "";
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( i ) {
				jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
			});
		}

		return this.each(function() {
			if ( type === "string" ) {
				// Toggle individual class names
				var className,
					i = 0,
					self = jQuery( this ),
					classNames = value.match( rnotwhite ) || [];

				while ( (className = classNames[ i++ ]) ) {
					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( type === strundefined || type === "boolean" ) {
				if ( this.className ) {
					// store className if set
					data_priv.set( this, "__className__", this.className );
				}

				// If the element has a class name or if we're passed `false`,
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				this.className = this.className || value === false ? "" : data_priv.get( this, "__className__" ) || "";
			}
		});
	},

	hasClass: function( selector ) {
		var className = " " + selector + " ",
			i = 0,
			l = this.length;
		for ( ; i < l; i++ ) {
			if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
				return true;
			}
		}

		return false;
	}
});




var rreturn = /\r/g;

jQuery.fn.extend({
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[0];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?
					// Handle most common string cases
					ret.replace(rreturn, "") :
					// Handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each(function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				});
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		});
	}
});

jQuery.extend({
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :
					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					jQuery.trim( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// IE6-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&
							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ? !option.disabled : option.getAttribute( "disabled" ) === null ) &&
							( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];
					if ( (option.selected = jQuery.inArray( option.value, values ) >= 0) ) {
						optionSet = true;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
});

// Radios and checkboxes getter/setter
jQuery.each([ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute("value") === null ? "on" : elem.value;
		};
	}
});




// Return jQuery for attributes-only inclusion


jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
});

jQuery.fn.extend({
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	},

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {
		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
	}
});


var nonce = jQuery.now();

var rquery = (/\?/);



// Support: Android 2.3
// Workaround failure to string-cast null input
jQuery.parseJSON = function( data ) {
	return JSON.parse( data + "" );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}

	// Support: IE9
	try {
		tmp = new DOMParser();
		xml = tmp.parseFromString( data, "text/xml" );
	} catch ( e ) {
		xml = undefined;
	}

	if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,
	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *	- BEFORE asking for a transport
	 *	- AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Document location
	ajaxLocation = window.location.href,

	// Segment location into parts
	ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {
			// For each dataType in the dataTypeExpression
			while ( (dataType = dataTypes[i++]) ) {
				// Prepend if requested
				if ( dataType[0] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					(structure[ dataType ] = structure[ dataType ] || []).unshift( func );

				// Otherwise append
				} else {
					(structure[ dataType ] = structure[ dataType ] || []).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {
				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		});
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {
		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}
		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},
		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

		// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {
								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend({

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /xml/,
			html: /html/,
			json: /json/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var transport,
			// URL without anti-cache param
			cacheURL,
			// Response headers
			responseHeadersString,
			responseHeaders,
			// timeout handle
			timeoutTimer,
			// Cross-domain detection vars
			parts,
			// To know if global events are to be dispatched
			fireGlobals,
			// Loop variable
			i,
			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),
			// Callbacks context
			callbackContext = s.context || s,
			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?
				jQuery( callbackContext ) :
				jQuery.event,
			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks("once memory"),
			// Status-dependent callbacks
			statusCode = s.statusCode || {},
			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},
			// The jqXHR state
			state = 0,
			// Default abort message
			strAbort = "canceled",
			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( (match = rheaders.exec( responseHeadersString )) ) {
								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {
								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {
							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace( rhash, "" )
			.replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger("ajaxStart");
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
				s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
			// Abort if not done already and return
			return jqXHR.abort();
		}

		// Aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}
			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = setTimeout(function() {
					jqXHR.abort("timeout");
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {
				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );
				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader("Last-Modified");
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader("etag");
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {
				// Extract error from statusText and normalize for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger("ajaxStop");
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
});

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {
		// Shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		return jQuery.ajax({
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		});
	};
});


jQuery._evalUrl = function( url ) {
	return jQuery.ajax({
		url: url,
		type: "GET",
		dataType: "script",
		async: false,
		global: false,
		"throws": true
	});
};


jQuery.fn.extend({
	wrapAll: function( html ) {
		var wrap;

		if ( jQuery.isFunction( html ) ) {
			return this.each(function( i ) {
				jQuery( this ).wrapAll( html.call(this, i) );
			});
		}

		if ( this[ 0 ] ) {

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map(function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			}).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function( i ) {
				jQuery( this ).wrapInner( html.call(this, i) );
			});
		}

		return this.each(function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		});
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each(function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
		});
	},

	unwrap: function() {
		return this.parent().each(function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		}).end();
	}
});


jQuery.expr.filters.hidden = function( elem ) {
	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return elem.offsetWidth <= 0 && elem.offsetHeight <= 0;
};
jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {
		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {
				// Treat each array item as a scalar.
				add( prefix, v );

			} else {
				// Item is non-scalar (array or object), encode its numeric index.
				buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
			}
		});

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {
		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {
		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {
			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		});

	} else {
		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend({
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map(function() {
			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		})
		.filter(function() {
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		})
		.map(function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					}) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		}).get();
	}
});


jQuery.ajaxSettings.xhr = function() {
	try {
		return new XMLHttpRequest();
	} catch( e ) {}
};

var xhrId = 0,
	xhrCallbacks = {},
	xhrSuccessStatus = {
		// file protocol always yields status code 0, assume 200
		0: 200,
		// Support: IE9
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE9
// Open requests must be manually aborted on unload (#5280)
// See https://support.microsoft.com/kb/2856746 for more info
if ( window.attachEvent ) {
	window.attachEvent( "onunload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]();
		}
	});
}

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport(function( options ) {
	var callback;

	// Cross domain only allowed if supported through XMLHttpRequest
	if ( support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i,
					xhr = options.xhr(),
					id = ++xhrId;

				xhr.open( options.type, options.url, options.async, options.username, options.password );

				// Apply custom fields if provided
				if ( options.xhrFields ) {
					for ( i in options.xhrFields ) {
						xhr[ i ] = options.xhrFields[ i ];
					}
				}

				// Override mime type if needed
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}

				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers["X-Requested-With"] ) {
					headers["X-Requested-With"] = "XMLHttpRequest";
				}

				// Set headers
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}

				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							delete xhrCallbacks[ id ];
							callback = xhr.onload = xhr.onerror = null;

							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {
								complete(
									// file: protocol always yields status 0; see #8605, #14207
									xhr.status,
									xhr.statusText
								);
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,
									// Support: IE9
									// Accessing binary-data responseText throws an exception
									// (#11426)
									typeof xhr.responseText === "string" ? {
										text: xhr.responseText
									} : undefined,
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};

				// Listen to events
				xhr.onload = callback();
				xhr.onerror = callback("error");

				// Create the abort callback
				callback = xhrCallbacks[ id ] = callback("abort");

				try {
					// Do send the request (this may raise an exception)
					xhr.send( options.hasContent && options.data || null );
				} catch ( e ) {
					// #14683: Only rethrow if this hasn't been notified as an error yet
					if ( callback ) {
						throw e;
					}
				}
			},

			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
});




// Install script dataType
jQuery.ajaxSetup({
	accepts: {
		script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /(?:java|ecma)script/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
});

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
});

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {
	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery("<script>").prop({
					async: true,
					charset: s.scriptCharset,
					src: s.url
				}).on(
					"load error",
					callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					}
				);
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
});




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup({
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
});

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" && !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") && rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters["script json"] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always(function() {
			// Restore preexisting value
			window[ callbackName ] = overwritten;

			// Save back as free
			if ( s[ callbackName ] ) {
				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		});

		// Delegate to script
		return "script";
	}
});




// data: string of html
// context (optional): If specified, the fragment will be created in this context, defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[1] ) ];
	}

	parsed = jQuery.buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, type, response,
		self = this,
		off = url.indexOf(" ");

	if ( off >= 0 ) {
		selector = jQuery.trim( url.slice( off ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax({
			url: url,

			// if "type" variable is undefined, then "GET" method will be used
			type: type,
			dataType: "html",
			data: params
		}).done(function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery("<div>").append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		}).complete( callback && function( jqXHR, status ) {
			self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
		});
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
});




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep(jQuery.timers, function( fn ) {
		return elem === fn.elem;
	}).length;
};




var docElem = window.document.documentElement;

/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ? elem : elem.nodeType === 9 && elem.defaultView;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf("auto") > -1;

		// Need to be able to calculate position if either
		// top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {
			options = options.call( elem, i, curOffset );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend({
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each(function( i ) {
					jQuery.offset.setOffset( this, options, i );
				});
		}

		var docElem, win,
			elem = this[ 0 ],
			box = { top: 0, left: 0 },
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// Support: BlackBerry 5, iOS 3 (original iPhone)
		// If we don't have gBCR, just use 0,0 rather than error
		if ( typeof elem.getBoundingClientRect !== strundefined ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top + win.pageYOffset - docElem.clientTop,
			left: box.left + win.pageXOffset - docElem.clientLeft
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {
			// Assume getBoundingClientRect is there when computed position is fixed
			offset = elem.getBoundingClientRect();

		} else {
			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	offsetParent: function() {
		return this.map(function() {
			var offsetParent = this.offsetParent || docElem;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) && jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || docElem;
		});
	}
});

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : window.pageXOffset,
					top ? val : window.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
});

// Support: Safari<7+, Chrome<37+
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://code.google.com/p/chromium/issues/detail?id=229280
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );
				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
});


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
		// Margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {
					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?
					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	});
});


// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof dontdefine === "function" && dontdefine.amd ) {
	dontdefine( "jquery", [], function() {
		return jQuery;
	});
}

var
	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( typeof noGlobal === strundefined ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;

}));


// org.webshell.system.utils
// (c) 2016, The WebShell Foundation
// Code released under the GPL (GNU Public License)

// NOTE TO SELF: Keep function wrappers, otherwise illegal invocation error http://stackoverflow.com/questions/7213369/uncaught-typeerror-illegal-invocation-on-addeventlistener

os.sendShutdownSignal = function(){os.close()};
os.delay = function(a,b){setTimeout(a,b||500)};
os.enterKeyCode = 13;
os.randomCharConst = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","0","1","2","3","4","5","6","7","8","9","!","@","#","$","%","^","&","*","(",")","_","-","=","+","[","]","{","}","\\","|","'","\"",";",":","<",">",".",",","/","?","~","`"];
os.body = $(document.body);
os.root = $(window);
os.doc = $(document);
os.head = $("head");
os.html = $("html");

os.isCurrentlyShuttingDown = false;
os.storage = [];

os.__killWindowWithDelay = function(selectedWindow,delayAmount) {
	os.delay(function(){
		$(selectedWindow).addClass("windowclosed");
	},delayAmount);
}

os.shutdown = function() {
	if (os.isCurrentlyShuttingDown) {
		throw "The OS is already shutting down.";
	}

	os.isCurrentlyShuttingDown = true;

	var windowList = $(".window");
	var delayAmount = 0;

	for (var i = 0; i < windowList.length; i++) {
		delayAmount += 150;
		os.__killWindowWithDelay(windowList[i],delayAmount);
	}
	
	os.delay(os.sendShutdownSignal,delayAmount)
}

os.formatMonth = function(monthString) {
	switch (monthString) {
		case "Jan":
			return "January";
		case "Feb":
			return "February";
		case "Mar":
			return "March";
		case "Apr":
			return "April";
		case "May":
			return "May";
		case "Jun":
			return "June";
		case "Jul":
			return "July";
		case "Aug":
			return "August";
		case "Sep":
			return "September";
		case "Oct":
			return "October";
		case "Nov":
			return "November";
		case "Dec":
			return "December";
		default:
			return "Month";	
	}
}

os.parseBool = function(a) {
	return a === "true";
}

os.fpsStatusParseHelper = function(fps) {
	return fps > 50 && "Doing Great!" || fps > 40 && "Doing Well!" || fps > 30 && "Doing OK!" || fps > 20 && "Doing Poorly" || "Doing Bad"
}

os.make = function(thing) {
	return $(document.createElement(thing));
}

os.randomChar = function() {
	return randomCharConst[Math.floor(Math.random() * randomCharConst.length)];
}

os.randomChars = function(charCount) {
	var randomGenChars = "";
	for (var i = 0; i < charCount; i++) {
		randomGenChars += os.randomChar();
	}

	return randomGenChars;
}


/*! jQuery UI - v1.11.4 - 2015-12-09
* http://jqueryui.com
* Includes: core.js, widget.js, mouse.js, position.js, draggable.js, droppable.js, resizable.js, selectable.js, sortable.js
* Copyright jQuery Foundation and other contributors; Licensed MIT */

(function( factory ) {
	if ( typeof dontdefine === "function" && dontdefine.amd ) {

		// AMD. Register as an anonymous module.
		dontdefine([ "jquery" ], factory );
	} else {

		// Browser globals
		factory( jQuery );
	}
}(function( $ ) {
/*!
 * jQuery UI Core 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/category/ui-core/
 */


// $.ui might exist from components with no dependencies, e.g., $.ui.position
$.ui = $.ui || {};

$.extend( $.ui, {
	version: "1.11.4",

	keyCode: {
		BACKSPACE: 8,
		COMMA: 188,
		DELETE: 46,
		DOWN: 40,
		END: 35,
		ENTER: 13,
		ESCAPE: 27,
		HOME: 36,
		LEFT: 37,
		PAGE_DOWN: 34,
		PAGE_UP: 33,
		PERIOD: 190,
		RIGHT: 39,
		SPACE: 32,
		TAB: 9,
		UP: 38
	}
});

// plugins
$.fn.extend({
	scrollParent: function( includeHidden ) {
		var position = this.css( "position" ),
			excludeStaticParent = position === "absolute",
			overflowRegex = includeHidden ? /(auto|scroll|hidden)/ : /(auto|scroll)/,
			scrollParent = this.parents().filter( function() {
				var parent = $( this );
				if ( excludeStaticParent && parent.css( "position" ) === "static" ) {
					return false;
				}
				return overflowRegex.test( parent.css( "overflow" ) + parent.css( "overflow-y" ) + parent.css( "overflow-x" ) );
			}).eq( 0 );

		return position === "fixed" || !scrollParent.length ? $( this[ 0 ].ownerDocument || document ) : scrollParent;
	},

	uniqueId: (function() {
		var uuid = 0;

		return function() {
			return this.each(function() {
				if ( !this.id ) {
					this.id = "ui-id-" + ( ++uuid );
				}
			});
		};
	})(),

	removeUniqueId: function() {
		return this.each(function() {
			if ( /^ui-id-\d+$/.test( this.id ) ) {
				$( this ).removeAttr( "id" );
			}
		});
	}
});

// selectors
function focusable( element, isTabIndexNotNaN ) {
	var map, mapName, img,
		nodeName = element.nodeName.toLowerCase();
	if ( "area" === nodeName ) {
		map = element.parentNode;
		mapName = map.name;
		if ( !element.href || !mapName || map.nodeName.toLowerCase() !== "map" ) {
			return false;
		}
		img = $( "img[usemap='#" + mapName + "']" )[ 0 ];
		return !!img && visible( img );
	}
	return ( /^(input|select|textarea|button|object)$/.test( nodeName ) ?
		!element.disabled :
		"a" === nodeName ?
			element.href || isTabIndexNotNaN :
			isTabIndexNotNaN) &&
		// the element and all of its ancestors must be visible
		visible( element );
}

function visible( element ) {
	return $.expr.filters.visible( element ) &&
		!$( element ).parents().addBack().filter(function() {
			return $.css( this, "visibility" ) === "hidden";
		}).length;
}

$.extend( $.expr[ ":" ], {
	data: $.expr.createPseudo ?
		$.expr.createPseudo(function( dataName ) {
			return function( elem ) {
				return !!$.data( elem, dataName );
			};
		}) :
		// support: jQuery <1.8
		function( elem, i, match ) {
			return !!$.data( elem, match[ 3 ] );
		},

	focusable: function( element ) {
		return focusable( element, !isNaN( $.attr( element, "tabindex" ) ) );
	},

	tabbable: function( element ) {
		var tabIndex = $.attr( element, "tabindex" ),
			isTabIndexNaN = isNaN( tabIndex );
		return ( isTabIndexNaN || tabIndex >= 0 ) && focusable( element, !isTabIndexNaN );
	}
});

// support: jQuery <1.8
if ( !$( "<a>" ).outerWidth( 1 ).jquery ) {
	$.each( [ "Width", "Height" ], function( i, name ) {
		var side = name === "Width" ? [ "Left", "Right" ] : [ "Top", "Bottom" ],
			type = name.toLowerCase(),
			orig = {
				innerWidth: $.fn.innerWidth,
				innerHeight: $.fn.innerHeight,
				outerWidth: $.fn.outerWidth,
				outerHeight: $.fn.outerHeight
			};

		function reduce( elem, size, border, margin ) {
			$.each( side, function() {
				size -= parseFloat( $.css( elem, "padding" + this ) ) || 0;
				if ( border ) {
					size -= parseFloat( $.css( elem, "border" + this + "Width" ) ) || 0;
				}
				if ( margin ) {
					size -= parseFloat( $.css( elem, "margin" + this ) ) || 0;
				}
			});
			return size;
		}

		$.fn[ "inner" + name ] = function( size ) {
			if ( size === undefined ) {
				return orig[ "inner" + name ].call( this );
			}

			return this.each(function() {
				$( this ).css( type, reduce( this, size ) + "px" );
			});
		};

		$.fn[ "outer" + name] = function( size, margin ) {
			if ( typeof size !== "number" ) {
				return orig[ "outer" + name ].call( this, size );
			}

			return this.each(function() {
				$( this).css( type, reduce( this, size, true, margin ) + "px" );
			});
		};
	});
}

// support: jQuery <1.8
if ( !$.fn.addBack ) {
	$.fn.addBack = function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	};
}

// support: jQuery 1.6.1, 1.6.2 (http://bugs.jquery.com/ticket/9413)
if ( $( "<a>" ).data( "a-b", "a" ).removeData( "a-b" ).data( "a-b" ) ) {
	$.fn.removeData = (function( removeData ) {
		return function( key ) {
			if ( arguments.length ) {
				return removeData.call( this, $.camelCase( key ) );
			} else {
				return removeData.call( this );
			}
		};
	})( $.fn.removeData );
}

$.fn.extend({
	focus: (function( orig ) {
		return function( delay, fn ) {
			return typeof delay === "number" ?
				this.each(function() {
					var elem = this;
					setTimeout(function() {
						$( elem ).focus();
						if ( fn ) {
							fn.call( elem );
						}
					}, delay );
				}) :
				orig.apply( this, arguments );
		};
	})( $.fn.focus ),

	disableSelection: (function() {
		var eventType = "onselectstart" in document.createElement( "div" ) ?
			"selectstart" :
			"mousedown";

		return function() {
			return this.bind( eventType + ".ui-disableSelection", function( event ) {
				event.preventDefault();
			});
		};
	})(),

	enableSelection: function() {
		return this.unbind( ".ui-disableSelection" );
	},

	zIndex: function( zIndex ) {
		if ( zIndex !== undefined ) {
			return this.css( "zIndex", zIndex );
		}

		if ( this.length ) {
			var elem = $( this[ 0 ] ), position, value;
			while ( elem.length && elem[ 0 ] !== document ) {
				// Ignore z-index if position is set to a value where z-index is ignored by the browser
				// This makes behavior of this function consistent across browsers
				// WebKit always returns auto if the element is positioned
				position = elem.css( "position" );
				if ( position === "absolute" || position === "relative" || position === "fixed" ) {
					// IE returns 0 when zIndex is not specified
					// other browsers return a string
					// we ignore the case of nested elements with an explicit value of 0
					// <div style="z-index: -10;"><div style="z-index: 0;"></div></div>
					value = parseInt( elem.css( "zIndex" ), 10 );
					if ( !isNaN( value ) && value !== 0 ) {
						return value;
					}
				}
				elem = elem.parent();
			}
		}

		return 0;
	}
});

// $.ui.plugin is deprecated. Use $.widget() extensions instead.
$.ui.plugin = {
	add: function( module, option, set ) {
		var i,
			proto = $.ui[ module ].prototype;
		for ( i in set ) {
			proto.plugins[ i ] = proto.plugins[ i ] || [];
			proto.plugins[ i ].push( [ option, set[ i ] ] );
		}
	},
	call: function( instance, name, args, allowDisconnected ) {
		var i,
			set = instance.plugins[ name ];

		if ( !set ) {
			return;
		}

		if ( !allowDisconnected && ( !instance.element[ 0 ].parentNode || instance.element[ 0 ].parentNode.nodeType === 11 ) ) {
			return;
		}

		for ( i = 0; i < set.length; i++ ) {
			if ( instance.options[ set[ i ][ 0 ] ] ) {
				set[ i ][ 1 ].apply( instance.element, args );
			}
		}
	}
};


/*!
 * jQuery UI Widget 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/jQuery.widget/
 */


var widget_uuid = 0,
	widget_slice = Array.prototype.slice;

$.cleanData = (function( orig ) {
	return function( elems ) {
		var events, elem, i;
		for ( i = 0; (elem = elems[i]) != null; i++ ) {
			try {

				// Only trigger remove when necessary to save time
				events = $._data( elem, "events" );
				if ( events && events.remove ) {
					$( elem ).triggerHandler( "remove" );
				}

			// http://bugs.jquery.com/ticket/8235
			} catch ( e ) {}
		}
		orig( elems );
	};
})( $.cleanData );

$.widget = function( name, base, prototype ) {
	var fullName, existingConstructor, constructor, basePrototype,
		// proxiedPrototype allows the provided prototype to remain unmodified
		// so that it can be used as a mixin for multiple widgets (#8876)
		proxiedPrototype = {},
		namespace = name.split( "." )[ 0 ];

	name = name.split( "." )[ 1 ];
	fullName = namespace + "-" + name;

	if ( !prototype ) {
		prototype = base;
		base = $.Widget;
	}

	// create selector for plugin
	$.expr[ ":" ][ fullName.toLowerCase() ] = function( elem ) {
		return !!$.data( elem, fullName );
	};

	$[ namespace ] = $[ namespace ] || {};
	existingConstructor = $[ namespace ][ name ];
	constructor = $[ namespace ][ name ] = function( options, element ) {
		// allow instantiation without "new" keyword
		if ( !this._createWidget ) {
			return new constructor( options, element );
		}

		// allow instantiation without initializing for simple inheritance
		// must use "new" keyword (the code above always passes args)
		if ( arguments.length ) {
			this._createWidget( options, element );
		}
	};
	// extend with the existing constructor to carry over any static properties
	$.extend( constructor, existingConstructor, {
		version: prototype.version,
		// copy the object used to create the prototype in case we need to
		// redefine the widget later
		_proto: $.extend( {}, prototype ),
		// track widgets that inherit from this widget in case this widget is
		// redefined after a widget inherits from it
		_childConstructors: []
	});

	basePrototype = new base();
	// we need to make the options hash a property directly on the new instance
	// otherwise we'll modify the options hash on the prototype that we're
	// inheriting from
	basePrototype.options = $.widget.extend( {}, basePrototype.options );
	$.each( prototype, function( prop, value ) {
		if ( !$.isFunction( value ) ) {
			proxiedPrototype[ prop ] = value;
			return;
		}
		proxiedPrototype[ prop ] = (function() {
			var _super = function() {
					return base.prototype[ prop ].apply( this, arguments );
				},
				_superApply = function( args ) {
					return base.prototype[ prop ].apply( this, args );
				};
			return function() {
				var __super = this._super,
					__superApply = this._superApply,
					returnValue;

				this._super = _super;
				this._superApply = _superApply;

				returnValue = value.apply( this, arguments );

				this._super = __super;
				this._superApply = __superApply;

				return returnValue;
			};
		})();
	});
	constructor.prototype = $.widget.extend( basePrototype, {
		// TODO: remove support for widgetEventPrefix
		// always use the name + a colon as the prefix, e.g., draggable:start
		// don't prefix for widgets that aren't DOM-based
		widgetEventPrefix: existingConstructor ? (basePrototype.widgetEventPrefix || name) : name
	}, proxiedPrototype, {
		constructor: constructor,
		namespace: namespace,
		widgetName: name,
		widgetFullName: fullName
	});

	// If this widget is being redefined then we need to find all widgets that
	// are inheriting from it and redefine all of them so that they inherit from
	// the new version of this widget. We're essentially trying to replace one
	// level in the prototype chain.
	if ( existingConstructor ) {
		$.each( existingConstructor._childConstructors, function( i, child ) {
			var childPrototype = child.prototype;

			// redefine the child widget using the same prototype that was
			// originally used, but inherit from the new version of the base
			$.widget( childPrototype.namespace + "." + childPrototype.widgetName, constructor, child._proto );
		});
		// remove the list of existing child constructors from the old constructor
		// so the old child constructors can be garbage collected
		delete existingConstructor._childConstructors;
	} else {
		base._childConstructors.push( constructor );
	}

	$.widget.bridge( name, constructor );

	return constructor;
};

$.widget.extend = function( target ) {
	var input = widget_slice.call( arguments, 1 ),
		inputIndex = 0,
		inputLength = input.length,
		key,
		value;
	for ( ; inputIndex < inputLength; inputIndex++ ) {
		for ( key in input[ inputIndex ] ) {
			value = input[ inputIndex ][ key ];
			if ( input[ inputIndex ].hasOwnProperty( key ) && value !== undefined ) {
				// Clone objects
				if ( $.isPlainObject( value ) ) {
					target[ key ] = $.isPlainObject( target[ key ] ) ?
						$.widget.extend( {}, target[ key ], value ) :
						// Don't extend strings, arrays, etc. with objects
						$.widget.extend( {}, value );
				// Copy everything else by reference
				} else {
					target[ key ] = value;
				}
			}
		}
	}
	return target;
};

$.widget.bridge = function( name, object ) {
	var fullName = object.prototype.widgetFullName || name;
	$.fn[ name ] = function( options ) {
		var isMethodCall = typeof options === "string",
			args = widget_slice.call( arguments, 1 ),
			returnValue = this;

		if ( isMethodCall ) {
			this.each(function() {
				var methodValue,
					instance = $.data( this, fullName );
				if ( options === "instance" ) {
					returnValue = instance;
					return false;
				}
				if ( !instance ) {
					return $.error( "cannot call methods on " + name + " prior to initialization; " +
						"attempted to call method '" + options + "'" );
				}
				if ( !$.isFunction( instance[options] ) || options.charAt( 0 ) === "_" ) {
					return $.error( "no such method '" + options + "' for " + name + " widget instance" );
				}
				methodValue = instance[ options ].apply( instance, args );
				if ( methodValue !== instance && methodValue !== undefined ) {
					returnValue = methodValue && methodValue.jquery ?
						returnValue.pushStack( methodValue.get() ) :
						methodValue;
					return false;
				}
			});
		} else {

			// Allow multiple hashes to be passed on init
			if ( args.length ) {
				options = $.widget.extend.apply( null, [ options ].concat(args) );
			}

			this.each(function() {
				var instance = $.data( this, fullName );
				if ( instance ) {
					instance.option( options || {} );
					if ( instance._init ) {
						instance._init();
					}
				} else {
					$.data( this, fullName, new object( options, this ) );
				}
			});
		}

		return returnValue;
	};
};

$.Widget = function( /* options, element */ ) {};
$.Widget._childConstructors = [];

$.Widget.prototype = {
	widgetName: "widget",
	widgetEventPrefix: "",
	defaultElement: "<div>",
	options: {
		disabled: false,

		// callbacks
		create: null
	},
	_createWidget: function( options, element ) {
		element = $( element || this.defaultElement || this )[ 0 ];
		this.element = $( element );
		this.uuid = widget_uuid++;
		this.eventNamespace = "." + this.widgetName + this.uuid;

		this.bindings = $();
		this.hoverable = $();
		this.focusable = $();

		if ( element !== this ) {
			$.data( element, this.widgetFullName, this );
			this._on( true, this.element, {
				remove: function( event ) {
					if ( event.target === element ) {
						this.destroy();
					}
				}
			});
			this.document = $( element.style ?
				// element within the document
				element.ownerDocument :
				// element is window or document
				element.document || element );
			this.window = $( this.document[0].defaultView || this.document[0].parentWindow );
		}

		this.options = $.widget.extend( {},
			this.options,
			this._getCreateOptions(),
			options );

		this._create();
		this._trigger( "create", null, this._getCreateEventData() );
		this._init();
	},
	_getCreateOptions: $.noop,
	_getCreateEventData: $.noop,
	_create: $.noop,
	_init: $.noop,

	destroy: function() {
		this._destroy();
		// we can probably remove the unbind calls in 2.0
		// all event bindings should go through this._on()
		this.element
			.unbind( this.eventNamespace )
			.removeData( this.widgetFullName )
			// support: jquery <1.6.3
			// http://bugs.jquery.com/ticket/9413
			.removeData( $.camelCase( this.widgetFullName ) );
		this.widget()
			.unbind( this.eventNamespace )
			.removeAttr( "aria-disabled" )
			.removeClass(
				this.widgetFullName + "-disabled " +
				"ui-state-disabled" );

		// clean up events and states
		this.bindings.unbind( this.eventNamespace );
		this.hoverable.removeClass( "ui-state-hover" );
		this.focusable.removeClass( "ui-state-focus" );
	},
	_destroy: $.noop,

	widget: function() {
		return this.element;
	},

	option: function( key, value ) {
		var options = key,
			parts,
			curOption,
			i;

		if ( arguments.length === 0 ) {
			// don't return a reference to the internal hash
			return $.widget.extend( {}, this.options );
		}

		if ( typeof key === "string" ) {
			// handle nested keys, e.g., "foo.bar" => { foo: { bar: ___ } }
			options = {};
			parts = key.split( "." );
			key = parts.shift();
			if ( parts.length ) {
				curOption = options[ key ] = $.widget.extend( {}, this.options[ key ] );
				for ( i = 0; i < parts.length - 1; i++ ) {
					curOption[ parts[ i ] ] = curOption[ parts[ i ] ] || {};
					curOption = curOption[ parts[ i ] ];
				}
				key = parts.pop();
				if ( arguments.length === 1 ) {
					return curOption[ key ] === undefined ? null : curOption[ key ];
				}
				curOption[ key ] = value;
			} else {
				if ( arguments.length === 1 ) {
					return this.options[ key ] === undefined ? null : this.options[ key ];
				}
				options[ key ] = value;
			}
		}

		this._setOptions( options );

		return this;
	},
	_setOptions: function( options ) {
		var key;

		for ( key in options ) {
			this._setOption( key, options[ key ] );
		}

		return this;
	},
	_setOption: function( key, value ) {
		this.options[ key ] = value;

		if ( key === "disabled" ) {
			this.widget()
				.toggleClass( this.widgetFullName + "-disabled", !!value );

			// If the widget is becoming disabled, then nothing is interactive
			if ( value ) {
				this.hoverable.removeClass( "ui-state-hover" );
				this.focusable.removeClass( "ui-state-focus" );
			}
		}

		return this;
	},

	enable: function() {
		return this._setOptions({ disabled: false });
	},
	disable: function() {
		return this._setOptions({ disabled: true });
	},

	_on: function( suppressDisabledCheck, element, handlers ) {
		var delegateElement,
			instance = this;

		// no suppressDisabledCheck flag, shuffle arguments
		if ( typeof suppressDisabledCheck !== "boolean" ) {
			handlers = element;
			element = suppressDisabledCheck;
			suppressDisabledCheck = false;
		}

		// no element argument, shuffle and use this.element
		if ( !handlers ) {
			handlers = element;
			element = this.element;
			delegateElement = this.widget();
		} else {
			element = delegateElement = $( element );
			this.bindings = this.bindings.add( element );
		}

		$.each( handlers, function( event, handler ) {
			function handlerProxy() {
				// allow widgets to customize the disabled handling
				// - disabled as an array instead of boolean
				// - disabled class as method for disabling individual parts
				if ( !suppressDisabledCheck &&
						( instance.options.disabled === true ||
							$( this ).hasClass( "ui-state-disabled" ) ) ) {
					return;
				}
				return ( typeof handler === "string" ? instance[ handler ] : handler )
					.apply( instance, arguments );
			}

			// copy the guid so direct unbinding works
			if ( typeof handler !== "string" ) {
				handlerProxy.guid = handler.guid =
					handler.guid || handlerProxy.guid || $.guid++;
			}

			var match = event.match( /^([\w:-]*)\s*(.*)$/ ),
				eventName = match[1] + instance.eventNamespace,
				selector = match[2];
			if ( selector ) {
				delegateElement.delegate( selector, eventName, handlerProxy );
			} else {
				element.bind( eventName, handlerProxy );
			}
		});
	},

	_off: function( element, eventName ) {
		eventName = (eventName || "").split( " " ).join( this.eventNamespace + " " ) +
			this.eventNamespace;
		element.unbind( eventName ).undelegate( eventName );

		// Clear the stack to avoid memory leaks (#10056)
		this.bindings = $( this.bindings.not( element ).get() );
		this.focusable = $( this.focusable.not( element ).get() );
		this.hoverable = $( this.hoverable.not( element ).get() );
	},

	_delay: function( handler, delay ) {
		function handlerProxy() {
			return ( typeof handler === "string" ? instance[ handler ] : handler )
				.apply( instance, arguments );
		}
		var instance = this;
		return setTimeout( handlerProxy, delay || 0 );
	},

	_hoverable: function( element ) {
		this.hoverable = this.hoverable.add( element );
		this._on( element, {
			mouseenter: function( event ) {
				$( event.currentTarget ).addClass( "ui-state-hover" );
			},
			mouseleave: function( event ) {
				$( event.currentTarget ).removeClass( "ui-state-hover" );
			}
		});
	},

	_focusable: function( element ) {
		this.focusable = this.focusable.add( element );
		this._on( element, {
			focusin: function( event ) {
				$( event.currentTarget ).addClass( "ui-state-focus" );
			},
			focusout: function( event ) {
				$( event.currentTarget ).removeClass( "ui-state-focus" );
			}
		});
	},

	_trigger: function( type, event, data ) {
		var prop, orig,
			callback = this.options[ type ];

		data = data || {};
		event = $.Event( event );
		event.type = ( type === this.widgetEventPrefix ?
			type :
			this.widgetEventPrefix + type ).toLowerCase();
		// the original event may come from any element
		// so we need to reset the target on the new event
		event.target = this.element[ 0 ];

		// copy original event properties over to the new event
		orig = event.originalEvent;
		if ( orig ) {
			for ( prop in orig ) {
				if ( !( prop in event ) ) {
					event[ prop ] = orig[ prop ];
				}
			}
		}

		this.element.trigger( event, data );
		return !( $.isFunction( callback ) &&
			callback.apply( this.element[0], [ event ].concat( data ) ) === false ||
			event.isDefaultPrevented() );
	}
};

$.each( { show: "fadeIn", hide: "fadeOut" }, function( method, defaultEffect ) {
	$.Widget.prototype[ "_" + method ] = function( element, options, callback ) {
		if ( typeof options === "string" ) {
			options = { effect: options };
		}
		var hasOptions,
			effectName = !options ?
				method :
				options === true || typeof options === "number" ?
					defaultEffect :
					options.effect || defaultEffect;
		options = options || {};
		if ( typeof options === "number" ) {
			options = { duration: options };
		}
		hasOptions = !$.isEmptyObject( options );
		options.complete = callback;
		if ( options.delay ) {
			element.delay( options.delay );
		}
		if ( hasOptions && $.effects && $.effects.effect[ effectName ] ) {
			element[ method ]( options );
		} else if ( effectName !== method && element[ effectName ] ) {
			element[ effectName ]( options.duration, options.easing, callback );
		} else {
			element.queue(function( next ) {
				$( this )[ method ]();
				if ( callback ) {
					callback.call( element[ 0 ] );
				}
				next();
			});
		}
	};
});

var widget = $.widget;


/*!
 * jQuery UI Mouse 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/mouse/
 */


var mouseHandled = false;
$( document ).mouseup( function() {
	mouseHandled = false;
});

var mouse = $.widget("ui.mouse", {
	version: "1.11.4",
	options: {
		cancel: "input,textarea,button,select,option",
		distance: 1,
		delay: 0
	},
	_mouseInit: function() {
		var that = this;

		this.element
			.bind("mousedown." + this.widgetName, function(event) {
				return that._mouseDown(event);
			})
			.bind("click." + this.widgetName, function(event) {
				if (true === $.data(event.target, that.widgetName + ".preventClickEvent")) {
					$.removeData(event.target, that.widgetName + ".preventClickEvent");
					event.stopImmediatePropagation();
					return false;
				}
			});

		this.started = false;
	},

	// TODO: make sure destroying one instance of mouse doesn't mess with
	// other instances of mouse
	_mouseDestroy: function() {
		this.element.unbind("." + this.widgetName);
		if ( this._mouseMoveDelegate ) {
			this.document
				.unbind("mousemove." + this.widgetName, this._mouseMoveDelegate)
				.unbind("mouseup." + this.widgetName, this._mouseUpDelegate);
		}
	},

	_mouseDown: function(event) {
		// don't let more than one widget handle mouseStart
		if ( mouseHandled ) {
			return;
		}

		this._mouseMoved = false;

		// we may have missed mouseup (out of window)
		(this._mouseStarted && this._mouseUp(event));

		this._mouseDownEvent = event;

		var that = this,
			btnIsLeft = (event.which === 1),
			// event.target.nodeName works around a bug in IE 8 with
			// disabled inputs (#7620)
			elIsCancel = (typeof this.options.cancel === "string" && event.target.nodeName ? $(event.target).closest(this.options.cancel).length : false);
		if (!btnIsLeft || elIsCancel || !this._mouseCapture(event)) {
			return true;
		}

		this.mouseDelayMet = !this.options.delay;
		if (!this.mouseDelayMet) {
			this._mouseDelayTimer = setTimeout(function() {
				that.mouseDelayMet = true;
			}, this.options.delay);
		}

		if (this._mouseDistanceMet(event) && this._mouseDelayMet(event)) {
			this._mouseStarted = (this._mouseStart(event) !== false);
			if (!this._mouseStarted) {
				event.preventDefault();
				return true;
			}
		}

		// Click event may never have fired (Gecko & Opera)
		if (true === $.data(event.target, this.widgetName + ".preventClickEvent")) {
			$.removeData(event.target, this.widgetName + ".preventClickEvent");
		}

		// these delegates are required to keep context
		this._mouseMoveDelegate = function(event) {
			return that._mouseMove(event);
		};
		this._mouseUpDelegate = function(event) {
			return that._mouseUp(event);
		};

		this.document
			.bind( "mousemove." + this.widgetName, this._mouseMoveDelegate )
			.bind( "mouseup." + this.widgetName, this._mouseUpDelegate );

		event.preventDefault();

		mouseHandled = true;
		return true;
	},

	_mouseMove: function(event) {
		// Only check for mouseups outside the document if you've moved inside the document
		// at least once. This prevents the firing of mouseup in the case of IE<9, which will
		// fire a mousemove event if content is placed under the cursor. See #7778
		// Support: IE <9
		if ( this._mouseMoved ) {
			// IE mouseup check - mouseup happened when mouse was out of window
			if ($.ui.ie && ( !document.documentMode || document.documentMode < 9 ) && !event.button) {
				return this._mouseUp(event);

			// Iframe mouseup check - mouseup occurred in another document
			} else if ( !event.which ) {
				return this._mouseUp( event );
			}
		}

		if ( event.which || event.button ) {
			this._mouseMoved = true;
		}

		if (this._mouseStarted) {
			this._mouseDrag(event);
			return event.preventDefault();
		}

		if (this._mouseDistanceMet(event) && this._mouseDelayMet(event)) {
			this._mouseStarted =
				(this._mouseStart(this._mouseDownEvent, event) !== false);
			(this._mouseStarted ? this._mouseDrag(event) : this._mouseUp(event));
		}

		return !this._mouseStarted;
	},

	_mouseUp: function(event) {
		this.document
			.unbind( "mousemove." + this.widgetName, this._mouseMoveDelegate )
			.unbind( "mouseup." + this.widgetName, this._mouseUpDelegate );

		if (this._mouseStarted) {
			this._mouseStarted = false;

			if (event.target === this._mouseDownEvent.target) {
				$.data(event.target, this.widgetName + ".preventClickEvent", true);
			}

			this._mouseStop(event);
		}

		mouseHandled = false;
		return false;
	},

	_mouseDistanceMet: function(event) {
		return (Math.max(
				Math.abs(this._mouseDownEvent.pageX - event.pageX),
				Math.abs(this._mouseDownEvent.pageY - event.pageY)
			) >= this.options.distance
		);
	},

	_mouseDelayMet: function(/* event */) {
		return this.mouseDelayMet;
	},

	// These are placeholder methods, to be overriden by extending plugin
	_mouseStart: function(/* event */) {},
	_mouseDrag: function(/* event */) {},
	_mouseStop: function(/* event */) {},
	_mouseCapture: function(/* event */) { return true; }
});


/*!
 * jQuery UI Position 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/position/
 */

(function() {

$.ui = $.ui || {};

var cachedScrollbarWidth, supportsOffsetFractions,
	max = Math.max,
	abs = Math.abs,
	round = Math.round,
	rhorizontal = /left|center|right/,
	rvertical = /top|center|bottom/,
	roffset = /[\+\-]\d+(\.[\d]+)?%?/,
	rposition = /^\w+/,
	rpercent = /%$/,
	_position = $.fn.position;

function getOffsets( offsets, width, height ) {
	return [
		parseFloat( offsets[ 0 ] ) * ( rpercent.test( offsets[ 0 ] ) ? width / 100 : 1 ),
		parseFloat( offsets[ 1 ] ) * ( rpercent.test( offsets[ 1 ] ) ? height / 100 : 1 )
	];
}

function parseCss( element, property ) {
	return parseInt( $.css( element, property ), 10 ) || 0;
}

function getDimensions( elem ) {
	var raw = elem[0];
	if ( raw.nodeType === 9 ) {
		return {
			width: elem.width(),
			height: elem.height(),
			offset: { top: 0, left: 0 }
		};
	}
	if ( $.isWindow( raw ) ) {
		return {
			width: elem.width(),
			height: elem.height(),
			offset: { top: elem.scrollTop(), left: elem.scrollLeft() }
		};
	}
	if ( raw.preventDefault ) {
		return {
			width: 0,
			height: 0,
			offset: { top: raw.pageY, left: raw.pageX }
		};
	}
	return {
		width: elem.outerWidth(),
		height: elem.outerHeight(),
		offset: elem.offset()
	};
}

$.position = {
	scrollbarWidth: function() {
		if ( cachedScrollbarWidth !== undefined ) {
			return cachedScrollbarWidth;
		}
		var w1, w2,
			div = $( "<div style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>" ),
			innerDiv = div.children()[0];

		$( "body" ).append( div );
		w1 = innerDiv.offsetWidth;
		div.css( "overflow", "scroll" );

		w2 = innerDiv.offsetWidth;

		if ( w1 === w2 ) {
			w2 = div[0].clientWidth;
		}

		div.remove();

		return (cachedScrollbarWidth = w1 - w2);
	},
	getScrollInfo: function( within ) {
		var overflowX = within.isWindow || within.isDocument ? "" :
				within.element.css( "overflow-x" ),
			overflowY = within.isWindow || within.isDocument ? "" :
				within.element.css( "overflow-y" ),
			hasOverflowX = overflowX === "scroll" ||
				( overflowX === "auto" && within.width < within.element[0].scrollWidth ),
			hasOverflowY = overflowY === "scroll" ||
				( overflowY === "auto" && within.height < within.element[0].scrollHeight );
		return {
			width: hasOverflowY ? $.position.scrollbarWidth() : 0,
			height: hasOverflowX ? $.position.scrollbarWidth() : 0
		};
	},
	getWithinInfo: function( element ) {
		var withinElement = $( element || window ),
			isWindow = $.isWindow( withinElement[0] ),
			isDocument = !!withinElement[ 0 ] && withinElement[ 0 ].nodeType === 9;
		return {
			element: withinElement,
			isWindow: isWindow,
			isDocument: isDocument,
			offset: withinElement.offset() || { left: 0, top: 0 },
			scrollLeft: withinElement.scrollLeft(),
			scrollTop: withinElement.scrollTop(),

			// support: jQuery 1.6.x
			// jQuery 1.6 doesn't support .outerWidth/Height() on documents or windows
			width: isWindow || isDocument ? withinElement.width() : withinElement.outerWidth(),
			height: isWindow || isDocument ? withinElement.height() : withinElement.outerHeight()
		};
	}
};

$.fn.position = function( options ) {
	if ( !options || !options.of ) {
		return _position.apply( this, arguments );
	}

	// make a copy, we don't want to modify arguments
	options = $.extend( {}, options );

	var atOffset, targetWidth, targetHeight, targetOffset, basePosition, dimensions,
		target = $( options.of ),
		within = $.position.getWithinInfo( options.within ),
		scrollInfo = $.position.getScrollInfo( within ),
		collision = ( options.collision || "flip" ).split( " " ),
		offsets = {};

	dimensions = getDimensions( target );
	if ( target[0].preventDefault ) {
		// force left top to allow flipping
		options.at = "left top";
	}
	targetWidth = dimensions.width;
	targetHeight = dimensions.height;
	targetOffset = dimensions.offset;
	// clone to reuse original targetOffset later
	basePosition = $.extend( {}, targetOffset );

	// force my and at to have valid horizontal and vertical positions
	// if a value is missing or invalid, it will be converted to center
	$.each( [ "my", "at" ], function() {
		var pos = ( options[ this ] || "" ).split( " " ),
			horizontalOffset,
			verticalOffset;

		if ( pos.length === 1) {
			pos = rhorizontal.test( pos[ 0 ] ) ?
				pos.concat( [ "center" ] ) :
				rvertical.test( pos[ 0 ] ) ?
					[ "center" ].concat( pos ) :
					[ "center", "center" ];
		}
		pos[ 0 ] = rhorizontal.test( pos[ 0 ] ) ? pos[ 0 ] : "center";
		pos[ 1 ] = rvertical.test( pos[ 1 ] ) ? pos[ 1 ] : "center";

		// calculate offsets
		horizontalOffset = roffset.exec( pos[ 0 ] );
		verticalOffset = roffset.exec( pos[ 1 ] );
		offsets[ this ] = [
			horizontalOffset ? horizontalOffset[ 0 ] : 0,
			verticalOffset ? verticalOffset[ 0 ] : 0
		];

		// reduce to just the positions without the offsets
		options[ this ] = [
			rposition.exec( pos[ 0 ] )[ 0 ],
			rposition.exec( pos[ 1 ] )[ 0 ]
		];
	});

	// normalize collision option
	if ( collision.length === 1 ) {
		collision[ 1 ] = collision[ 0 ];
	}

	if ( options.at[ 0 ] === "right" ) {
		basePosition.left += targetWidth;
	} else if ( options.at[ 0 ] === "center" ) {
		basePosition.left += targetWidth / 2;
	}

	if ( options.at[ 1 ] === "bottom" ) {
		basePosition.top += targetHeight;
	} else if ( options.at[ 1 ] === "center" ) {
		basePosition.top += targetHeight / 2;
	}

	atOffset = getOffsets( offsets.at, targetWidth, targetHeight );
	basePosition.left += atOffset[ 0 ];
	basePosition.top += atOffset[ 1 ];

	return this.each(function() {
		var collisionPosition, using,
			elem = $( this ),
			elemWidth = elem.outerWidth(),
			elemHeight = elem.outerHeight(),
			marginLeft = parseCss( this, "marginLeft" ),
			marginTop = parseCss( this, "marginTop" ),
			collisionWidth = elemWidth + marginLeft + parseCss( this, "marginRight" ) + scrollInfo.width,
			collisionHeight = elemHeight + marginTop + parseCss( this, "marginBottom" ) + scrollInfo.height,
			position = $.extend( {}, basePosition ),
			myOffset = getOffsets( offsets.my, elem.outerWidth(), elem.outerHeight() );

		if ( options.my[ 0 ] === "right" ) {
			position.left -= elemWidth;
		} else if ( options.my[ 0 ] === "center" ) {
			position.left -= elemWidth / 2;
		}

		if ( options.my[ 1 ] === "bottom" ) {
			position.top -= elemHeight;
		} else if ( options.my[ 1 ] === "center" ) {
			position.top -= elemHeight / 2;
		}

		position.left += myOffset[ 0 ];
		position.top += myOffset[ 1 ];

		// if the browser doesn't support fractions, then round for consistent results
		if ( !supportsOffsetFractions ) {
			position.left = round( position.left );
			position.top = round( position.top );
		}

		collisionPosition = {
			marginLeft: marginLeft,
			marginTop: marginTop
		};

		$.each( [ "left", "top" ], function( i, dir ) {
			if ( $.ui.position[ collision[ i ] ] ) {
				$.ui.position[ collision[ i ] ][ dir ]( position, {
					targetWidth: targetWidth,
					targetHeight: targetHeight,
					elemWidth: elemWidth,
					elemHeight: elemHeight,
					collisionPosition: collisionPosition,
					collisionWidth: collisionWidth,
					collisionHeight: collisionHeight,
					offset: [ atOffset[ 0 ] + myOffset[ 0 ], atOffset [ 1 ] + myOffset[ 1 ] ],
					my: options.my,
					at: options.at,
					within: within,
					elem: elem
				});
			}
		});

		if ( options.using ) {
			// adds feedback as second argument to using callback, if present
			using = function( props ) {
				var left = targetOffset.left - position.left,
					right = left + targetWidth - elemWidth,
					top = targetOffset.top - position.top,
					bottom = top + targetHeight - elemHeight,
					feedback = {
						target: {
							element: target,
							left: targetOffset.left,
							top: targetOffset.top,
							width: targetWidth,
							height: targetHeight
						},
						element: {
							element: elem,
							left: position.left,
							top: position.top,
							width: elemWidth,
							height: elemHeight
						},
						horizontal: right < 0 ? "left" : left > 0 ? "right" : "center",
						vertical: bottom < 0 ? "top" : top > 0 ? "bottom" : "middle"
					};
				if ( targetWidth < elemWidth && abs( left + right ) < targetWidth ) {
					feedback.horizontal = "center";
				}
				if ( targetHeight < elemHeight && abs( top + bottom ) < targetHeight ) {
					feedback.vertical = "middle";
				}
				if ( max( abs( left ), abs( right ) ) > max( abs( top ), abs( bottom ) ) ) {
					feedback.important = "horizontal";
				} else {
					feedback.important = "vertical";
				}
				options.using.call( this, props, feedback );
			};
		}

		elem.offset( $.extend( position, { using: using } ) );
	});
};

$.ui.position = {
	fit: {
		left: function( position, data ) {
			var within = data.within,
				withinOffset = within.isWindow ? within.scrollLeft : within.offset.left,
				outerWidth = within.width,
				collisionPosLeft = position.left - data.collisionPosition.marginLeft,
				overLeft = withinOffset - collisionPosLeft,
				overRight = collisionPosLeft + data.collisionWidth - outerWidth - withinOffset,
				newOverRight;

			// element is wider than within
			if ( data.collisionWidth > outerWidth ) {
				// element is initially over the left side of within
				if ( overLeft > 0 && overRight <= 0 ) {
					newOverRight = position.left + overLeft + data.collisionWidth - outerWidth - withinOffset;
					position.left += overLeft - newOverRight;
				// element is initially over right side of within
				} else if ( overRight > 0 && overLeft <= 0 ) {
					position.left = withinOffset;
				// element is initially over both left and right sides of within
				} else {
					if ( overLeft > overRight ) {
						position.left = withinOffset + outerWidth - data.collisionWidth;
					} else {
						position.left = withinOffset;
					}
				}
			// too far left -> align with left edge
			} else if ( overLeft > 0 ) {
				position.left += overLeft;
			// too far right -> align with right edge
			} else if ( overRight > 0 ) {
				position.left -= overRight;
			// adjust based on position and margin
			} else {
				position.left = max( position.left - collisionPosLeft, position.left );
			}
		},
		top: function( position, data ) {
			var within = data.within,
				withinOffset = within.isWindow ? within.scrollTop : within.offset.top,
				outerHeight = data.within.height,
				collisionPosTop = position.top - data.collisionPosition.marginTop,
				overTop = withinOffset - collisionPosTop,
				overBottom = collisionPosTop + data.collisionHeight - outerHeight - withinOffset,
				newOverBottom;

			// element is taller than within
			if ( data.collisionHeight > outerHeight ) {
				// element is initially over the top of within
				if ( overTop > 0 && overBottom <= 0 ) {
					newOverBottom = position.top + overTop + data.collisionHeight - outerHeight - withinOffset;
					position.top += overTop - newOverBottom;
				// element is initially over bottom of within
				} else if ( overBottom > 0 && overTop <= 0 ) {
					position.top = withinOffset;
				// element is initially over both top and bottom of within
				} else {
					if ( overTop > overBottom ) {
						position.top = withinOffset + outerHeight - data.collisionHeight;
					} else {
						position.top = withinOffset;
					}
				}
			// too far up -> align with top
			} else if ( overTop > 0 ) {
				position.top += overTop;
			// too far down -> align with bottom edge
			} else if ( overBottom > 0 ) {
				position.top -= overBottom;
			// adjust based on position and margin
			} else {
				position.top = max( position.top - collisionPosTop, position.top );
			}
		}
	},
	flip: {
		left: function( position, data ) {
			var within = data.within,
				withinOffset = within.offset.left + within.scrollLeft,
				outerWidth = within.width,
				offsetLeft = within.isWindow ? within.scrollLeft : within.offset.left,
				collisionPosLeft = position.left - data.collisionPosition.marginLeft,
				overLeft = collisionPosLeft - offsetLeft,
				overRight = collisionPosLeft + data.collisionWidth - outerWidth - offsetLeft,
				myOffset = data.my[ 0 ] === "left" ?
					-data.elemWidth :
					data.my[ 0 ] === "right" ?
						data.elemWidth :
						0,
				atOffset = data.at[ 0 ] === "left" ?
					data.targetWidth :
					data.at[ 0 ] === "right" ?
						-data.targetWidth :
						0,
				offset = -2 * data.offset[ 0 ],
				newOverRight,
				newOverLeft;

			if ( overLeft < 0 ) {
				newOverRight = position.left + myOffset + atOffset + offset + data.collisionWidth - outerWidth - withinOffset;
				if ( newOverRight < 0 || newOverRight < abs( overLeft ) ) {
					position.left += myOffset + atOffset + offset;
				}
			} else if ( overRight > 0 ) {
				newOverLeft = position.left - data.collisionPosition.marginLeft + myOffset + atOffset + offset - offsetLeft;
				if ( newOverLeft > 0 || abs( newOverLeft ) < overRight ) {
					position.left += myOffset + atOffset + offset;
				}
			}
		},
		top: function( position, data ) {
			var within = data.within,
				withinOffset = within.offset.top + within.scrollTop,
				outerHeight = within.height,
				offsetTop = within.isWindow ? within.scrollTop : within.offset.top,
				collisionPosTop = position.top - data.collisionPosition.marginTop,
				overTop = collisionPosTop - offsetTop,
				overBottom = collisionPosTop + data.collisionHeight - outerHeight - offsetTop,
				top = data.my[ 1 ] === "top",
				myOffset = top ?
					-data.elemHeight :
					data.my[ 1 ] === "bottom" ?
						data.elemHeight :
						0,
				atOffset = data.at[ 1 ] === "top" ?
					data.targetHeight :
					data.at[ 1 ] === "bottom" ?
						-data.targetHeight :
						0,
				offset = -2 * data.offset[ 1 ],
				newOverTop,
				newOverBottom;
			if ( overTop < 0 ) {
				newOverBottom = position.top + myOffset + atOffset + offset + data.collisionHeight - outerHeight - withinOffset;
				if ( newOverBottom < 0 || newOverBottom < abs( overTop ) ) {
					position.top += myOffset + atOffset + offset;
				}
			} else if ( overBottom > 0 ) {
				newOverTop = position.top - data.collisionPosition.marginTop + myOffset + atOffset + offset - offsetTop;
				if ( newOverTop > 0 || abs( newOverTop ) < overBottom ) {
					position.top += myOffset + atOffset + offset;
				}
			}
		}
	},
	flipfit: {
		left: function() {
			$.ui.position.flip.left.apply( this, arguments );
			$.ui.position.fit.left.apply( this, arguments );
		},
		top: function() {
			$.ui.position.flip.top.apply( this, arguments );
			$.ui.position.fit.top.apply( this, arguments );
		}
	}
};

// fraction support test
(function() {
	var testElement, testElementParent, testElementStyle, offsetLeft, i,
		body = document.getElementsByTagName( "body" )[ 0 ],
		div = document.createElement( "div" );

	//Create a "fake body" for testing based on method used in jQuery.support
	testElement = document.createElement( body ? "div" : "body" );
	testElementStyle = {
		visibility: "hidden",
		width: 0,
		height: 0,
		border: 0,
		margin: 0,
		background: "none"
	};
	if ( body ) {
		$.extend( testElementStyle, {
			position: "absolute",
			left: "-1000px",
			top: "-1000px"
		});
	}
	for ( i in testElementStyle ) {
		testElement.style[ i ] = testElementStyle[ i ];
	}
	testElement.appendChild( div );
	testElementParent = body || document.documentElement;
	testElementParent.insertBefore( testElement, testElementParent.firstChild );

	div.style.cssText = "position: absolute; left: 10.7432222px;";

	offsetLeft = $( div ).offset().left;
	supportsOffsetFractions = offsetLeft > 10 && offsetLeft < 11;

	testElement.innerHTML = "";
	testElementParent.removeChild( testElement );
})();

})();

var position = $.ui.position;


/*!
 * jQuery UI Draggable 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/draggable/
 */


$.widget("ui.draggable", $.ui.mouse, {
	version: "1.11.4",
	widgetEventPrefix: "drag",
	options: {
		addClasses: true,
		appendTo: "parent",
		axis: false,
		connectToSortable: false,
		containment: false,
		cursor: "auto",
		cursorAt: false,
		grid: false,
		handle: false,
		helper: "original",
		iframeFix: false,
		opacity: false,
		refreshPositions: false,
		revert: false,
		revertDuration: 500,
		scope: "default",
		scroll: true,
		scrollSensitivity: 20,
		scrollSpeed: 20,
		snap: false,
		snapMode: "both",
		snapTolerance: 20,
		stack: false,
		zIndex: false,

		// callbacks
		drag: null,
		start: null,
		stop: null
	},
	_create: function() {

		if ( this.options.helper === "original" ) {
			this._setPositionRelative();
		}
		if (this.options.addClasses){
			this.element.addClass("ui-draggable");
		}
		if (this.options.disabled){
			this.element.addClass("ui-draggable-disabled");
		}
		this._setHandleClassName();

		this._mouseInit();
	},

	_setOption: function( key, value ) {
		this._super( key, value );
		if ( key === "handle" ) {
			this._removeHandleClassName();
			this._setHandleClassName();
		}
	},

	_destroy: function() {
		if ( ( this.helper || this.element ).is( ".ui-draggable-dragging" ) ) {
			this.destroyOnClear = true;
			return;
		}
		this.element.removeClass( "ui-draggable ui-draggable-dragging ui-draggable-disabled" );
		this._removeHandleClassName();
		this._mouseDestroy();
	},

	_mouseCapture: function(event) {
		var o = this.options;

		this._blurActiveElement( event );

		// among others, prevent a drag on a resizable-handle
		if (this.helper || o.disabled || $(event.target).closest(".ui-resizable-handle").length > 0) {
			return false;
		}

		//Quit if we're not on a valid handle
		this.handle = this._getHandle(event);
		if (!this.handle) {
			return false;
		}

		this._blockFrames( o.iframeFix === true ? "iframe" : o.iframeFix );

		return true;

	},

	_blockFrames: function( selector ) {
		this.iframeBlocks = this.document.find( selector ).map(function() {
			var iframe = $( this );

			return $( "<div>" )
				.css( "position", "absolute" )
				.appendTo( iframe.parent() )
				.outerWidth( iframe.outerWidth() )
				.outerHeight( iframe.outerHeight() )
				.offset( iframe.offset() )[ 0 ];
		});
	},

	_unblockFrames: function() {
		if ( this.iframeBlocks ) {
			this.iframeBlocks.remove();
			delete this.iframeBlocks;
		}
	},

	_blurActiveElement: function( event ) {
		var document = this.document[ 0 ];

		// Only need to blur if the event occurred on the draggable itself, see #10527
		if ( !this.handleElement.is( event.target ) ) {
			return;
		}

		// support: IE9
		// IE9 throws an "Unspecified error" accessing document.activeElement from an <iframe>
		try {

			// Support: IE9, IE10
			// If the <body> is blurred, IE will switch windows, see #9520
			if ( document.activeElement && document.activeElement.nodeName.toLowerCase() !== "body" ) {

				// Blur any element that currently has focus, see #4261
				$( document.activeElement ).blur();
			}
		} catch ( error ) {}
	},

	_mouseStart: function(event) {

		var o = this.options;

		//Create and append the visible helper
		this.helper = this._createHelper(event);

		this.helper.addClass("ui-draggable-dragging");

		//Cache the helper size
		this._cacheHelperProportions();

		//If ddmanager is used for droppables, set the global draggable
		if ($.ui.ddmanager) {
			$.ui.ddmanager.current = this;
		}

		/*
		 * - Position generation -
		 * This block generates everything position related - it's the core of draggables.
		 */

		//Cache the margins of the original element
		this._cacheMargins();

		//Store the helper's css position
		this.cssPosition = this.helper.css( "position" );
		this.scrollParent = this.helper.scrollParent( true );
		this.offsetParent = this.helper.offsetParent();
		this.hasFixedAncestor = this.helper.parents().filter(function() {
				return $( this ).css( "position" ) === "fixed";
			}).length > 0;

		//The element's absolute position on the page minus margins
		this.positionAbs = this.element.offset();
		this._refreshOffsets( event );

		//Generate the original position
		this.originalPosition = this.position = this._generatePosition( event, false );
		this.originalPageX = event.pageX;
		this.originalPageY = event.pageY;

		//Adjust the mouse offset relative to the helper if "cursorAt" is supplied
		(o.cursorAt && this._adjustOffsetFromHelper(o.cursorAt));

		//Set a containment if given in the options
		this._setContainment();

		//Trigger event + callbacks
		if (this._trigger("start", event) === false) {
			this._clear();
			return false;
		}

		//Recache the helper size
		this._cacheHelperProportions();

		//Prepare the droppable offsets
		if ($.ui.ddmanager && !o.dropBehaviour) {
			$.ui.ddmanager.prepareOffsets(this, event);
		}

		// Reset helper's right/bottom css if they're set and set explicit width/height instead
		// as this prevents resizing of elements with right/bottom set (see #7772)
		this._normalizeRightBottom();

		this._mouseDrag(event, true); //Execute the drag once - this causes the helper not to be visible before getting its correct position

		//If the ddmanager is used for droppables, inform the manager that dragging has started (see #5003)
		if ( $.ui.ddmanager ) {
			$.ui.ddmanager.dragStart(this, event);
		}

		return true;
	},

	_refreshOffsets: function( event ) {
		this.offset = {
			top: this.positionAbs.top - this.margins.top,
			left: this.positionAbs.left - this.margins.left,
			scroll: false,
			parent: this._getParentOffset(),
			relative: this._getRelativeOffset()
		};

		this.offset.click = {
			left: event.pageX - this.offset.left,
			top: event.pageY - this.offset.top
		};
	},

	_mouseDrag: function(event, noPropagation) {
		// reset any necessary cached properties (see #5009)
		if ( this.hasFixedAncestor ) {
			this.offset.parent = this._getParentOffset();
		}

		//Compute the helpers position
		this.position = this._generatePosition( event, true );
		this.positionAbs = this._convertPositionTo("absolute");

		//Call plugins and callbacks and use the resulting position if something is returned
		if (!noPropagation) {
			var ui = this._uiHash();
			if (this._trigger("drag", event, ui) === false) {
				this._mouseUp({});
				return false;
			}
			this.position = ui.position;
		}

		this.helper[ 0 ].style.left = this.position.left + "px";
		this.helper[ 0 ].style.top = this.position.top + "px";

		if ($.ui.ddmanager) {
			$.ui.ddmanager.drag(this, event);
		}

		return false;
	},

	_mouseStop: function(event) {

		//If we are using droppables, inform the manager about the drop
		var that = this,
			dropped = false;
		if ($.ui.ddmanager && !this.options.dropBehaviour) {
			dropped = $.ui.ddmanager.drop(this, event);
		}

		//if a drop comes from outside (a sortable)
		if (this.dropped) {
			dropped = this.dropped;
			this.dropped = false;
		}

		if ((this.options.revert === "invalid" && !dropped) || (this.options.revert === "valid" && dropped) || this.options.revert === true || ($.isFunction(this.options.revert) && this.options.revert.call(this.element, dropped))) {
			$(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function() {
				if (that._trigger("stop", event) !== false) {
					that._clear();
				}
			});
		} else {
			if (this._trigger("stop", event) !== false) {
				this._clear();
			}
		}

		return false;
	},

	_mouseUp: function( event ) {
		this._unblockFrames();

		//If the ddmanager is used for droppables, inform the manager that dragging has stopped (see #5003)
		if ( $.ui.ddmanager ) {
			$.ui.ddmanager.dragStop(this, event);
		}

		// Only need to focus if the event occurred on the draggable itself, see #10527
		if ( this.handleElement.is( event.target ) ) {
			// The interaction is over; whether or not the click resulted in a drag, focus the element
			this.element.focus();
		}

		return $.ui.mouse.prototype._mouseUp.call(this, event);
	},

	cancel: function() {

		if (this.helper.is(".ui-draggable-dragging")) {
			this._mouseUp({});
		} else {
			this._clear();
		}

		return this;

	},

	_getHandle: function(event) {
		return this.options.handle ?
			!!$( event.target ).closest( this.element.find( this.options.handle ) ).length :
			true;
	},

	_setHandleClassName: function() {
		this.handleElement = this.options.handle ?
			this.element.find( this.options.handle ) : this.element;
		this.handleElement.addClass( "ui-draggable-handle" );
	},

	_removeHandleClassName: function() {
		this.handleElement.removeClass( "ui-draggable-handle" );
	},

	_createHelper: function(event) {

		var o = this.options,
			helperIsFunction = $.isFunction( o.helper ),
			helper = helperIsFunction ?
				$( o.helper.apply( this.element[ 0 ], [ event ] ) ) :
				( o.helper === "clone" ?
					this.element.clone().removeAttr( "id" ) :
					this.element );

		if (!helper.parents("body").length) {
			helper.appendTo((o.appendTo === "parent" ? this.element[0].parentNode : o.appendTo));
		}

		// http://bugs.jqueryui.com/ticket/9446
		// a helper function can return the original element
		// which wouldn't have been set to relative in _create
		if ( helperIsFunction && helper[ 0 ] === this.element[ 0 ] ) {
			this._setPositionRelative();
		}

		if (helper[0] !== this.element[0] && !(/(fixed|absolute)/).test(helper.css("position"))) {
			helper.css("position", "absolute");
		}

		return helper;

	},

	_setPositionRelative: function() {
		if ( !( /^(?:r|a|f)/ ).test( this.element.css( "position" ) ) ) {
			this.element[ 0 ].style.position = "relative";
		}
	},

	_adjustOffsetFromHelper: function(obj) {
		if (typeof obj === "string") {
			obj = obj.split(" ");
		}
		if ($.isArray(obj)) {
			obj = { left: +obj[0], top: +obj[1] || 0 };
		}
		if ("left" in obj) {
			this.offset.click.left = obj.left + this.margins.left;
		}
		if ("right" in obj) {
			this.offset.click.left = this.helperProportions.width - obj.right + this.margins.left;
		}
		if ("top" in obj) {
			this.offset.click.top = obj.top + this.margins.top;
		}
		if ("bottom" in obj) {
			this.offset.click.top = this.helperProportions.height - obj.bottom + this.margins.top;
		}
	},

	_isRootNode: function( element ) {
		return ( /(html|body)/i ).test( element.tagName ) || element === this.document[ 0 ];
	},

	_getParentOffset: function() {

		//Get the offsetParent and cache its position
		var po = this.offsetParent.offset(),
			document = this.document[ 0 ];

		// This is a special case where we need to modify a offset calculated on start, since the following happened:
		// 1. The position of the helper is absolute, so it's position is calculated based on the next positioned parent
		// 2. The actual offset parent is a child of the scroll parent, and the scroll parent isn't the document, which means that
		//	the scroll is included in the initial calculation of the offset of the parent, and never recalculated upon drag
		if (this.cssPosition === "absolute" && this.scrollParent[0] !== document && $.contains(this.scrollParent[0], this.offsetParent[0])) {
			po.left += this.scrollParent.scrollLeft();
			po.top += this.scrollParent.scrollTop();
		}

		if ( this._isRootNode( this.offsetParent[ 0 ] ) ) {
			po = { top: 0, left: 0 };
		}

		return {
			top: po.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
			left: po.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
		};

	},

	_getRelativeOffset: function() {
		if ( this.cssPosition !== "relative" ) {
			return { top: 0, left: 0 };
		}

		var p = this.element.position(),
			scrollIsRootNode = this._isRootNode( this.scrollParent[ 0 ] );

		return {
			top: p.top - ( parseInt(this.helper.css( "top" ), 10) || 0 ) + ( !scrollIsRootNode ? this.scrollParent.scrollTop() : 0 ),
			left: p.left - ( parseInt(this.helper.css( "left" ), 10) || 0 ) + ( !scrollIsRootNode ? this.scrollParent.scrollLeft() : 0 )
		};

	},

	_cacheMargins: function() {
		this.margins = {
			left: (parseInt(this.element.css("marginLeft"), 10) || 0),
			top: (parseInt(this.element.css("marginTop"), 10) || 0),
			right: (parseInt(this.element.css("marginRight"), 10) || 0),
			bottom: (parseInt(this.element.css("marginBottom"), 10) || 0)
		};
	},

	_cacheHelperProportions: function() {
		this.helperProportions = {
			width: this.helper.outerWidth(),
			height: this.helper.outerHeight()
		};
	},

	_setContainment: function() {

		var isUserScrollable, c, ce,
			o = this.options,
			document = this.document[ 0 ];

		this.relativeContainer = null;

		if ( !o.containment ) {
			this.containment = null;
			return;
		}

		if ( o.containment === "window" ) {
			this.containment = [
				$( window ).scrollLeft() - this.offset.relative.left - this.offset.parent.left,
				$( window ).scrollTop() - this.offset.relative.top - this.offset.parent.top,
				$( window ).scrollLeft() + $( window ).width() - this.helperProportions.width - this.margins.left,
				$( window ).scrollTop() + ( $( window ).height() || document.body.parentNode.scrollHeight ) - this.helperProportions.height - this.margins.top
			];
			return;
		}

		if ( o.containment === "document") {
			this.containment = [
				0,
				0,
				$( document ).width() - this.helperProportions.width - this.margins.left,
				( $( document ).height() || document.body.parentNode.scrollHeight ) - this.helperProportions.height - this.margins.top
			];
			return;
		}

		if ( o.containment.constructor === Array ) {
			this.containment = o.containment;
			return;
		}

		if ( o.containment === "parent" ) {
			o.containment = this.helper[ 0 ].parentNode;
		}

		c = $( o.containment );
		ce = c[ 0 ];

		if ( !ce ) {
			return;
		}

		isUserScrollable = /(scroll|auto)/.test( c.css( "overflow" ) );

		this.containment = [
			( parseInt( c.css( "borderLeftWidth" ), 10 ) || 0 ) + ( parseInt( c.css( "paddingLeft" ), 10 ) || 0 ),
			( parseInt( c.css( "borderTopWidth" ), 10 ) || 0 ) + ( parseInt( c.css( "paddingTop" ), 10 ) || 0 ),
			( isUserScrollable ? Math.max( ce.scrollWidth, ce.offsetWidth ) : ce.offsetWidth ) -
				( parseInt( c.css( "borderRightWidth" ), 10 ) || 0 ) -
				( parseInt( c.css( "paddingRight" ), 10 ) || 0 ) -
				this.helperProportions.width -
				this.margins.left -
				this.margins.right,
			( isUserScrollable ? Math.max( ce.scrollHeight, ce.offsetHeight ) : ce.offsetHeight ) -
				( parseInt( c.css( "borderBottomWidth" ), 10 ) || 0 ) -
				( parseInt( c.css( "paddingBottom" ), 10 ) || 0 ) -
				this.helperProportions.height -
				this.margins.top -
				this.margins.bottom
		];
		this.relativeContainer = c;
	},

	_convertPositionTo: function(d, pos) {

		if (!pos) {
			pos = this.position;
		}

		var mod = d === "absolute" ? 1 : -1,
			scrollIsRootNode = this._isRootNode( this.scrollParent[ 0 ] );

		return {
			top: (
				pos.top	+																// The absolute mouse position
				this.offset.relative.top * mod +										// Only for relative positioned nodes: Relative offset from element to offset parent
				this.offset.parent.top * mod -										// The offsetParent's offset without borders (offset + border)
				( ( this.cssPosition === "fixed" ? -this.offset.scroll.top : ( scrollIsRootNode ? 0 : this.offset.scroll.top ) ) * mod)
			),
			left: (
				pos.left +																// The absolute mouse position
				this.offset.relative.left * mod +										// Only for relative positioned nodes: Relative offset from element to offset parent
				this.offset.parent.left * mod	-										// The offsetParent's offset without borders (offset + border)
				( ( this.cssPosition === "fixed" ? -this.offset.scroll.left : ( scrollIsRootNode ? 0 : this.offset.scroll.left ) ) * mod)
			)
		};

	},

	_generatePosition: function( event, constrainPosition ) {

		var containment, co, top, left,
			o = this.options,
			scrollIsRootNode = this._isRootNode( this.scrollParent[ 0 ] ),
			pageX = event.pageX,
			pageY = event.pageY;

		// Cache the scroll
		if ( !scrollIsRootNode || !this.offset.scroll ) {
			this.offset.scroll = {
				top: this.scrollParent.scrollTop(),
				left: this.scrollParent.scrollLeft()
			};
		}

		/*
		 * - Position constraining -
		 * Constrain the position to a mix of grid, containment.
		 */

		// If we are not dragging yet, we won't check for options
		if ( constrainPosition ) {
			if ( this.containment ) {
				if ( this.relativeContainer ){
					co = this.relativeContainer.offset();
					containment = [
						this.containment[ 0 ] + co.left,
						this.containment[ 1 ] + co.top,
						this.containment[ 2 ] + co.left,
						this.containment[ 3 ] + co.top
					];
				} else {
					containment = this.containment;
				}

				if (event.pageX - this.offset.click.left < containment[0]) {
					pageX = containment[0] + this.offset.click.left;
				}
				if (event.pageY - this.offset.click.top < containment[1]) {
					pageY = containment[1] + this.offset.click.top;
				}
				if (event.pageX - this.offset.click.left > containment[2]) {
					pageX = containment[2] + this.offset.click.left;
				}
				if (event.pageY - this.offset.click.top > containment[3]) {
					pageY = containment[3] + this.offset.click.top;
				}
			}

			if (o.grid) {
				//Check for grid elements set to 0 to prevent divide by 0 error causing invalid argument errors in IE (see ticket #6950)
				top = o.grid[1] ? this.originalPageY + Math.round((pageY - this.originalPageY) / o.grid[1]) * o.grid[1] : this.originalPageY;
				pageY = containment ? ((top - this.offset.click.top >= containment[1] || top - this.offset.click.top > containment[3]) ? top : ((top - this.offset.click.top >= containment[1]) ? top - o.grid[1] : top + o.grid[1])) : top;

				left = o.grid[0] ? this.originalPageX + Math.round((pageX - this.originalPageX) / o.grid[0]) * o.grid[0] : this.originalPageX;
				pageX = containment ? ((left - this.offset.click.left >= containment[0] || left - this.offset.click.left > containment[2]) ? left : ((left - this.offset.click.left >= containment[0]) ? left - o.grid[0] : left + o.grid[0])) : left;
			}

			if ( o.axis === "y" ) {
				pageX = this.originalPageX;
			}

			if ( o.axis === "x" ) {
				pageY = this.originalPageY;
			}
		}

		return {
			top: (
				pageY -																	// The absolute mouse position
				this.offset.click.top	-												// Click offset (relative to the element)
				this.offset.relative.top -												// Only for relative positioned nodes: Relative offset from element to offset parent
				this.offset.parent.top +												// The offsetParent's offset without borders (offset + border)
				( this.cssPosition === "fixed" ? -this.offset.scroll.top : ( scrollIsRootNode ? 0 : this.offset.scroll.top ) )
			),
			left: (
				pageX -																	// The absolute mouse position
				this.offset.click.left -												// Click offset (relative to the element)
				this.offset.relative.left -												// Only for relative positioned nodes: Relative offset from element to offset parent
				this.offset.parent.left +												// The offsetParent's offset without borders (offset + border)
				( this.cssPosition === "fixed" ? -this.offset.scroll.left : ( scrollIsRootNode ? 0 : this.offset.scroll.left ) )
			)
		};

	},

	_clear: function() {
		this.helper.removeClass("ui-draggable-dragging");
		if (this.helper[0] !== this.element[0] && !this.cancelHelperRemoval) {
			this.helper.remove();
		}
		this.helper = null;
		this.cancelHelperRemoval = false;
		if ( this.destroyOnClear ) {
			this.destroy();
		}
	},

	_normalizeRightBottom: function() {
		if ( this.options.axis !== "y" && this.helper.css( "right" ) !== "auto" ) {
			this.helper.width( this.helper.width() );
			this.helper.css( "right", "auto" );
		}
		if ( this.options.axis !== "x" && this.helper.css( "bottom" ) !== "auto" ) {
			this.helper.height( this.helper.height() );
			this.helper.css( "bottom", "auto" );
		}
	},

	// From now on bulk stuff - mainly helpers

	_trigger: function( type, event, ui ) {
		ui = ui || this._uiHash();
		$.ui.plugin.call( this, type, [ event, ui, this ], true );

		// Absolute position and offset (see #6884 ) have to be recalculated after plugins
		if ( /^(drag|start|stop)/.test( type ) ) {
			this.positionAbs = this._convertPositionTo( "absolute" );
			ui.offset = this.positionAbs;
		}
		return $.Widget.prototype._trigger.call( this, type, event, ui );
	},

	plugins: {},

	_uiHash: function() {
		return {
			helper: this.helper,
			position: this.position,
			originalPosition: this.originalPosition,
			offset: this.positionAbs
		};
	}

});

$.ui.plugin.add( "draggable", "connectToSortable", {
	start: function( event, ui, draggable ) {
		var uiSortable = $.extend( {}, ui, {
			item: draggable.element
		});

		draggable.sortables = [];
		$( draggable.options.connectToSortable ).each(function() {
			var sortable = $( this ).sortable( "instance" );

			if ( sortable && !sortable.options.disabled ) {
				draggable.sortables.push( sortable );

				// refreshPositions is called at drag start to refresh the containerCache
				// which is used in drag. This ensures it's initialized and synchronized
				// with any changes that might have happened on the page since initialization.
				sortable.refreshPositions();
				sortable._trigger("activate", event, uiSortable);
			}
		});
	},
	stop: function( event, ui, draggable ) {
		var uiSortable = $.extend( {}, ui, {
			item: draggable.element
		});

		draggable.cancelHelperRemoval = false;

		$.each( draggable.sortables, function() {
			var sortable = this;

			if ( sortable.isOver ) {
				sortable.isOver = 0;

				// Allow this sortable to handle removing the helper
				draggable.cancelHelperRemoval = true;
				sortable.cancelHelperRemoval = false;

				// Use _storedCSS To restore properties in the sortable,
				// as this also handles revert (#9675) since the draggable
				// may have modified them in unexpected ways (#8809)
				sortable._storedCSS = {
					position: sortable.placeholder.css( "position" ),
					top: sortable.placeholder.css( "top" ),
					left: sortable.placeholder.css( "left" )
				};

				sortable._mouseStop(event);

				// Once drag has ended, the sortable should return to using
				// its original helper, not the shared helper from draggable
				sortable.options.helper = sortable.options._helper;
			} else {
				// Prevent this Sortable from removing the helper.
				// However, don't set the draggable to remove the helper
				// either as another connected Sortable may yet handle the removal.
				sortable.cancelHelperRemoval = true;

				sortable._trigger( "deactivate", event, uiSortable );
			}
		});
	},
	drag: function( event, ui, draggable ) {
		$.each( draggable.sortables, function() {
			var innermostIntersecting = false,
				sortable = this;

			// Copy over variables that sortable's _intersectsWith uses
			sortable.positionAbs = draggable.positionAbs;
			sortable.helperProportions = draggable.helperProportions;
			sortable.offset.click = draggable.offset.click;

			if ( sortable._intersectsWith( sortable.containerCache ) ) {
				innermostIntersecting = true;

				$.each( draggable.sortables, function() {
					// Copy over variables that sortable's _intersectsWith uses
					this.positionAbs = draggable.positionAbs;
					this.helperProportions = draggable.helperProportions;
					this.offset.click = draggable.offset.click;

					if ( this !== sortable &&
							this._intersectsWith( this.containerCache ) &&
							$.contains( sortable.element[ 0 ], this.element[ 0 ] ) ) {
						innermostIntersecting = false;
					}

					return innermostIntersecting;
				});
			}

			if ( innermostIntersecting ) {
				// If it intersects, we use a little isOver variable and set it once,
				// so that the move-in stuff gets fired only once.
				if ( !sortable.isOver ) {
					sortable.isOver = 1;

					// Store draggable's parent in case we need to reappend to it later.
					draggable._parent = ui.helper.parent();

					sortable.currentItem = ui.helper
						.appendTo( sortable.element )
						.data( "ui-sortable-item", true );

					// Store helper option to later restore it
					sortable.options._helper = sortable.options.helper;

					sortable.options.helper = function() {
						return ui.helper[ 0 ];
					};

					// Fire the start events of the sortable with our passed browser event,
					// and our own helper (so it doesn't create a new one)
					event.target = sortable.currentItem[ 0 ];
					sortable._mouseCapture( event, true );
					sortable._mouseStart( event, true, true );

					// Because the browser event is way off the new appended portlet,
					// modify necessary variables to reflect the changes
					sortable.offset.click.top = draggable.offset.click.top;
					sortable.offset.click.left = draggable.offset.click.left;
					sortable.offset.parent.left -= draggable.offset.parent.left -
						sortable.offset.parent.left;
					sortable.offset.parent.top -= draggable.offset.parent.top -
						sortable.offset.parent.top;

					draggable._trigger( "toSortable", event );

					// Inform draggable that the helper is in a valid drop zone,
					// used solely in the revert option to handle "valid/invalid".
					draggable.dropped = sortable.element;

					// Need to refreshPositions of all sortables in the case that
					// adding to one sortable changes the location of the other sortables (#9675)
					$.each( draggable.sortables, function() {
						this.refreshPositions();
					});

					// hack so receive/update callbacks work (mostly)
					draggable.currentItem = draggable.element;
					sortable.fromOutside = draggable;
				}

				if ( sortable.currentItem ) {
					sortable._mouseDrag( event );
					// Copy the sortable's position because the draggable's can potentially reflect
					// a relative position, while sortable is always absolute, which the dragged
					// element has now become. (#8809)
					ui.position = sortable.position;
				}
			} else {
				// If it doesn't intersect with the sortable, and it intersected before,
				// we fake the drag stop of the sortable, but make sure it doesn't remove
				// the helper by using cancelHelperRemoval.
				if ( sortable.isOver ) {

					sortable.isOver = 0;
					sortable.cancelHelperRemoval = true;

					// Calling sortable's mouseStop would trigger a revert,
					// so revert must be temporarily false until after mouseStop is called.
					sortable.options._revert = sortable.options.revert;
					sortable.options.revert = false;

					sortable._trigger( "out", event, sortable._uiHash( sortable ) );
					sortable._mouseStop( event, true );

					// restore sortable behaviors that were modfied
					// when the draggable entered the sortable area (#9481)
					sortable.options.revert = sortable.options._revert;
					sortable.options.helper = sortable.options._helper;

					if ( sortable.placeholder ) {
						sortable.placeholder.remove();
					}

					// Restore and recalculate the draggable's offset considering the sortable
					// may have modified them in unexpected ways. (#8809, #10669)
					ui.helper.appendTo( draggable._parent );
					draggable._refreshOffsets( event );
					ui.position = draggable._generatePosition( event, true );

					draggable._trigger( "fromSortable", event );

					// Inform draggable that the helper is no longer in a valid drop zone
					draggable.dropped = false;

					// Need to refreshPositions of all sortables just in case removing
					// from one sortable changes the location of other sortables (#9675)
					$.each( draggable.sortables, function() {
						this.refreshPositions();
					});
				}
			}
		});
	}
});

$.ui.plugin.add("draggable", "cursor", {
	start: function( event, ui, instance ) {
		var t = $( "body" ),
			o = instance.options;

		if (t.css("cursor")) {
			o._cursor = t.css("cursor");
		}
		t.css("cursor", o.cursor);
	},
	stop: function( event, ui, instance ) {
		var o = instance.options;
		if (o._cursor) {
			$("body").css("cursor", o._cursor);
		}
	}
});

$.ui.plugin.add("draggable", "opacity", {
	start: function( event, ui, instance ) {
		var t = $( ui.helper ),
			o = instance.options;
		if (t.css("opacity")) {
			o._opacity = t.css("opacity");
		}
		t.css("opacity", o.opacity);
	},
	stop: function( event, ui, instance ) {
		var o = instance.options;
		if (o._opacity) {
			$(ui.helper).css("opacity", o._opacity);
		}
	}
});

$.ui.plugin.add("draggable", "scroll", {
	start: function( event, ui, i ) {
		if ( !i.scrollParentNotHidden ) {
			i.scrollParentNotHidden = i.helper.scrollParent( false );
		}

		if ( i.scrollParentNotHidden[ 0 ] !== i.document[ 0 ] && i.scrollParentNotHidden[ 0 ].tagName !== "HTML" ) {
			i.overflowOffset = i.scrollParentNotHidden.offset();
		}
	},
	drag: function( event, ui, i  ) {

		var o = i.options,
			scrolled = false,
			scrollParent = i.scrollParentNotHidden[ 0 ],
			document = i.document[ 0 ];

		if ( scrollParent !== document && scrollParent.tagName !== "HTML" ) {
			if ( !o.axis || o.axis !== "x" ) {
				if ( ( i.overflowOffset.top + scrollParent.offsetHeight ) - event.pageY < o.scrollSensitivity ) {
					scrollParent.scrollTop = scrolled = scrollParent.scrollTop + o.scrollSpeed;
				} else if ( event.pageY - i.overflowOffset.top < o.scrollSensitivity ) {
					scrollParent.scrollTop = scrolled = scrollParent.scrollTop - o.scrollSpeed;
				}
			}

			if ( !o.axis || o.axis !== "y" ) {
				if ( ( i.overflowOffset.left + scrollParent.offsetWidth ) - event.pageX < o.scrollSensitivity ) {
					scrollParent.scrollLeft = scrolled = scrollParent.scrollLeft + o.scrollSpeed;
				} else if ( event.pageX - i.overflowOffset.left < o.scrollSensitivity ) {
					scrollParent.scrollLeft = scrolled = scrollParent.scrollLeft - o.scrollSpeed;
				}
			}

		} else {

			if (!o.axis || o.axis !== "x") {
				if (event.pageY - $(document).scrollTop() < o.scrollSensitivity) {
					scrolled = $(document).scrollTop($(document).scrollTop() - o.scrollSpeed);
				} else if ($(window).height() - (event.pageY - $(document).scrollTop()) < o.scrollSensitivity) {
					scrolled = $(document).scrollTop($(document).scrollTop() + o.scrollSpeed);
				}
			}

			if (!o.axis || o.axis !== "y") {
				if (event.pageX - $(document).scrollLeft() < o.scrollSensitivity) {
					scrolled = $(document).scrollLeft($(document).scrollLeft() - o.scrollSpeed);
				} else if ($(window).width() - (event.pageX - $(document).scrollLeft()) < o.scrollSensitivity) {
					scrolled = $(document).scrollLeft($(document).scrollLeft() + o.scrollSpeed);
				}
			}

		}

		if (scrolled !== false && $.ui.ddmanager && !o.dropBehaviour) {
			$.ui.ddmanager.prepareOffsets(i, event);
		}

	}
});

$.ui.plugin.add("draggable", "snap", {
	start: function( event, ui, i ) {

		var o = i.options;

		i.snapElements = [];

		$(o.snap.constructor !== String ? ( o.snap.items || ":data(ui-draggable)" ) : o.snap).each(function() {
			var $t = $(this),
				$o = $t.offset();
			if (this !== i.element[0]) {
				i.snapElements.push({
					item: this,
					width: $t.outerWidth(), height: $t.outerHeight(),
					top: $o.top, left: $o.left
				});
			}
		});

	},
	drag: function( event, ui, inst ) {

		var ts, bs, ls, rs, l, r, t, b, i, first,
			o = inst.options,
			d = o.snapTolerance,
			x1 = ui.offset.left, x2 = x1 + inst.helperProportions.width,
			y1 = ui.offset.top, y2 = y1 + inst.helperProportions.height;

		for (i = inst.snapElements.length - 1; i >= 0; i--){

			l = inst.snapElements[i].left - inst.margins.left;
			r = l + inst.snapElements[i].width;
			t = inst.snapElements[i].top - inst.margins.top;
			b = t + inst.snapElements[i].height;

			if ( x2 < l - d || x1 > r + d || y2 < t - d || y1 > b + d || !$.contains( inst.snapElements[ i ].item.ownerDocument, inst.snapElements[ i ].item ) ) {
				if (inst.snapElements[i].snapping) {
					(inst.options.snap.release && inst.options.snap.release.call(inst.element, event, $.extend(inst._uiHash(), { snapItem: inst.snapElements[i].item })));
				}
				inst.snapElements[i].snapping = false;
				continue;
			}

			if (o.snapMode !== "inner") {
				ts = Math.abs(t - y2) <= d;
				bs = Math.abs(b - y1) <= d;
				ls = Math.abs(l - x2) <= d;
				rs = Math.abs(r - x1) <= d;
				if (ts) {
					ui.position.top = inst._convertPositionTo("relative", { top: t - inst.helperProportions.height, left: 0 }).top;
				}
				if (bs) {
					ui.position.top = inst._convertPositionTo("relative", { top: b, left: 0 }).top;
				}
				if (ls) {
					ui.position.left = inst._convertPositionTo("relative", { top: 0, left: l - inst.helperProportions.width }).left;
				}
				if (rs) {
					ui.position.left = inst._convertPositionTo("relative", { top: 0, left: r }).left;
				}
			}

			first = (ts || bs || ls || rs);

			if (o.snapMode !== "outer") {
				ts = Math.abs(t - y1) <= d;
				bs = Math.abs(b - y2) <= d;
				ls = Math.abs(l - x1) <= d;
				rs = Math.abs(r - x2) <= d;
				if (ts) {
					ui.position.top = inst._convertPositionTo("relative", { top: t, left: 0 }).top;
				}
				if (bs) {
					ui.position.top = inst._convertPositionTo("relative", { top: b - inst.helperProportions.height, left: 0 }).top;
				}
				if (ls) {
					ui.position.left = inst._convertPositionTo("relative", { top: 0, left: l }).left;
				}
				if (rs) {
					ui.position.left = inst._convertPositionTo("relative", { top: 0, left: r - inst.helperProportions.width }).left;
				}
			}

			if (!inst.snapElements[i].snapping && (ts || bs || ls || rs || first)) {
				(inst.options.snap.snap && inst.options.snap.snap.call(inst.element, event, $.extend(inst._uiHash(), { snapItem: inst.snapElements[i].item })));
			}
			inst.snapElements[i].snapping = (ts || bs || ls || rs || first);

		}

	}
});

$.ui.plugin.add("draggable", "stack", {
	start: function( event, ui, instance ) {
		var min,
			o = instance.options,
			group = $.makeArray($(o.stack)).sort(function(a, b) {
				return (parseInt($(a).css("zIndex"), 10) || 0) - (parseInt($(b).css("zIndex"), 10) || 0);
			});

		if (!group.length) { return; }

		min = parseInt($(group[0]).css("zIndex"), 10) || 0;
		$(group).each(function(i) {
			$(this).css("zIndex", min + i);
		});
		this.css("zIndex", (min + group.length));
	}
});

$.ui.plugin.add("draggable", "zIndex", {
	start: function( event, ui, instance ) {
		var t = $( ui.helper ),
			o = instance.options;

		if (t.css("zIndex")) {
			o._zIndex = t.css("zIndex");
		}
		t.css("zIndex", o.zIndex);
	},
	stop: function( event, ui, instance ) {
		var o = instance.options;

		if (o._zIndex) {
			$(ui.helper).css("zIndex", o._zIndex);
		}
	}
});

var draggable = $.ui.draggable;


/*!
 * jQuery UI Droppable 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/droppable/
 */


$.widget( "ui.droppable", {
	version: "1.11.4",
	widgetEventPrefix: "drop",
	options: {
		accept: "*",
		activeClass: false,
		addClasses: true,
		greedy: false,
		hoverClass: false,
		scope: "default",
		tolerance: "intersect",

		// callbacks
		activate: null,
		deactivate: null,
		drop: null,
		out: null,
		over: null
	},
	_create: function() {

		var proportions,
			o = this.options,
			accept = o.accept;

		this.isover = false;
		this.isout = true;

		this.accept = $.isFunction( accept ) ? accept : function( d ) {
			return d.is( accept );
		};

		this.proportions = function( /* valueToWrite */ ) {
			if ( arguments.length ) {
				// Store the droppable's proportions
				proportions = arguments[ 0 ];
			} else {
				// Retrieve or derive the droppable's proportions
				return proportions ?
					proportions :
					proportions = {
						width: this.element[ 0 ].offsetWidth,
						height: this.element[ 0 ].offsetHeight
					};
			}
		};

		this._addToManager( o.scope );

		o.addClasses && this.element.addClass( "ui-droppable" );

	},

	_addToManager: function( scope ) {
		// Add the reference and positions to the manager
		$.ui.ddmanager.droppables[ scope ] = $.ui.ddmanager.droppables[ scope ] || [];
		$.ui.ddmanager.droppables[ scope ].push( this );
	},

	_splice: function( drop ) {
		var i = 0;
		for ( ; i < drop.length; i++ ) {
			if ( drop[ i ] === this ) {
				drop.splice( i, 1 );
			}
		}
	},

	_destroy: function() {
		var drop = $.ui.ddmanager.droppables[ this.options.scope ];

		this._splice( drop );

		this.element.removeClass( "ui-droppable ui-droppable-disabled" );
	},

	_setOption: function( key, value ) {

		if ( key === "accept" ) {
			this.accept = $.isFunction( value ) ? value : function( d ) {
				return d.is( value );
			};
		} else if ( key === "scope" ) {
			var drop = $.ui.ddmanager.droppables[ this.options.scope ];

			this._splice( drop );
			this._addToManager( value );
		}

		this._super( key, value );
	},

	_activate: function( event ) {
		var draggable = $.ui.ddmanager.current;
		if ( this.options.activeClass ) {
			this.element.addClass( this.options.activeClass );
		}
		if ( draggable ){
			this._trigger( "activate", event, this.ui( draggable ) );
		}
	},

	_deactivate: function( event ) {
		var draggable = $.ui.ddmanager.current;
		if ( this.options.activeClass ) {
			this.element.removeClass( this.options.activeClass );
		}
		if ( draggable ){
			this._trigger( "deactivate", event, this.ui( draggable ) );
		}
	},

	_over: function( event ) {

		var draggable = $.ui.ddmanager.current;

		// Bail if draggable and droppable are same element
		if ( !draggable || ( draggable.currentItem || draggable.element )[ 0 ] === this.element[ 0 ] ) {
			return;
		}

		if ( this.accept.call( this.element[ 0 ], ( draggable.currentItem || draggable.element ) ) ) {
			if ( this.options.hoverClass ) {
				this.element.addClass( this.options.hoverClass );
			}
			this._trigger( "over", event, this.ui( draggable ) );
		}

	},

	_out: function( event ) {

		var draggable = $.ui.ddmanager.current;

		// Bail if draggable and droppable are same element
		if ( !draggable || ( draggable.currentItem || draggable.element )[ 0 ] === this.element[ 0 ] ) {
			return;
		}

		if ( this.accept.call( this.element[ 0 ], ( draggable.currentItem || draggable.element ) ) ) {
			if ( this.options.hoverClass ) {
				this.element.removeClass( this.options.hoverClass );
			}
			this._trigger( "out", event, this.ui( draggable ) );
		}

	},

	_drop: function( event, custom ) {

		var draggable = custom || $.ui.ddmanager.current,
			childrenIntersection = false;

		// Bail if draggable and droppable are same element
		if ( !draggable || ( draggable.currentItem || draggable.element )[ 0 ] === this.element[ 0 ] ) {
			return false;
		}

		this.element.find( ":data(ui-droppable)" ).not( ".ui-draggable-dragging" ).each(function() {
			var inst = $( this ).droppable( "instance" );
			if (
				inst.options.greedy &&
				!inst.options.disabled &&
				inst.options.scope === draggable.options.scope &&
				inst.accept.call( inst.element[ 0 ], ( draggable.currentItem || draggable.element ) ) &&
				$.ui.intersect( draggable, $.extend( inst, { offset: inst.element.offset() } ), inst.options.tolerance, event )
			) { childrenIntersection = true; return false; }
		});
		if ( childrenIntersection ) {
			return false;
		}

		if ( this.accept.call( this.element[ 0 ], ( draggable.currentItem || draggable.element ) ) ) {
			if ( this.options.activeClass ) {
				this.element.removeClass( this.options.activeClass );
			}
			if ( this.options.hoverClass ) {
				this.element.removeClass( this.options.hoverClass );
			}
			this._trigger( "drop", event, this.ui( draggable ) );
			return this.element;
		}

		return false;

	},

	ui: function( c ) {
		return {
			draggable: ( c.currentItem || c.element ),
			helper: c.helper,
			position: c.position,
			offset: c.positionAbs
		};
	}

});

$.ui.intersect = (function() {
	function isOverAxis( x, reference, size ) {
		return ( x >= reference ) && ( x < ( reference + size ) );
	}

	return function( draggable, droppable, toleranceMode, event ) {

		if ( !droppable.offset ) {
			return false;
		}

		var x1 = ( draggable.positionAbs || draggable.position.absolute ).left + draggable.margins.left,
			y1 = ( draggable.positionAbs || draggable.position.absolute ).top + draggable.margins.top,
			x2 = x1 + draggable.helperProportions.width,
			y2 = y1 + draggable.helperProportions.height,
			l = droppable.offset.left,
			t = droppable.offset.top,
			r = l + droppable.proportions().width,
			b = t + droppable.proportions().height;

		switch ( toleranceMode ) {
		case "fit":
			return ( l <= x1 && x2 <= r && t <= y1 && y2 <= b );
		case "intersect":
			return ( l < x1 + ( draggable.helperProportions.width / 2 ) && // Right Half
				x2 - ( draggable.helperProportions.width / 2 ) < r && // Left Half
				t < y1 + ( draggable.helperProportions.height / 2 ) && // Bottom Half
				y2 - ( draggable.helperProportions.height / 2 ) < b ); // Top Half
		case "pointer":
			return isOverAxis( event.pageY, t, droppable.proportions().height ) && isOverAxis( event.pageX, l, droppable.proportions().width );
		case "touch":
			return (
				( y1 >= t && y1 <= b ) || // Top edge touching
				( y2 >= t && y2 <= b ) || // Bottom edge touching
				( y1 < t && y2 > b ) // Surrounded vertically
			) && (
				( x1 >= l && x1 <= r ) || // Left edge touching
				( x2 >= l && x2 <= r ) || // Right edge touching
				( x1 < l && x2 > r ) // Surrounded horizontally
			);
		default:
			return false;
		}
	};
})();

/*
	This manager tracks offsets of draggables and droppables
*/
$.ui.ddmanager = {
	current: null,
	droppables: { "default": [] },
	prepareOffsets: function( t, event ) {

		var i, j,
			m = $.ui.ddmanager.droppables[ t.options.scope ] || [],
			type = event ? event.type : null, // workaround for #2317
			list = ( t.currentItem || t.element ).find( ":data(ui-droppable)" ).addBack();

		droppablesLoop: for ( i = 0; i < m.length; i++ ) {

			// No disabled and non-accepted
			if ( m[ i ].options.disabled || ( t && !m[ i ].accept.call( m[ i ].element[ 0 ], ( t.currentItem || t.element ) ) ) ) {
				continue;
			}

			// Filter out elements in the current dragged item
			for ( j = 0; j < list.length; j++ ) {
				if ( list[ j ] === m[ i ].element[ 0 ] ) {
					m[ i ].proportions().height = 0;
					continue droppablesLoop;
				}
			}

			m[ i ].visible = m[ i ].element.css( "display" ) !== "none";
			if ( !m[ i ].visible ) {
				continue;
			}

			// Activate the droppable if used directly from draggables
			if ( type === "mousedown" ) {
				m[ i ]._activate.call( m[ i ], event );
			}

			m[ i ].offset = m[ i ].element.offset();
			m[ i ].proportions({ width: m[ i ].element[ 0 ].offsetWidth, height: m[ i ].element[ 0 ].offsetHeight });

		}

	},
	drop: function( draggable, event ) {

		var dropped = false;
		// Create a copy of the droppables in case the list changes during the drop (#9116)
		$.each( ( $.ui.ddmanager.droppables[ draggable.options.scope ] || [] ).slice(), function() {

			if ( !this.options ) {
				return;
			}
			if ( !this.options.disabled && this.visible && $.ui.intersect( draggable, this, this.options.tolerance, event ) ) {
				dropped = this._drop.call( this, event ) || dropped;
			}

			if ( !this.options.disabled && this.visible && this.accept.call( this.element[ 0 ], ( draggable.currentItem || draggable.element ) ) ) {
				this.isout = true;
				this.isover = false;
				this._deactivate.call( this, event );
			}

		});
		return dropped;

	},
	dragStart: function( draggable, event ) {
		// Listen for scrolling so that if the dragging causes scrolling the position of the droppables can be recalculated (see #5003)
		draggable.element.parentsUntil( "body" ).bind( "scroll.droppable", function() {
			if ( !draggable.options.refreshPositions ) {
				$.ui.ddmanager.prepareOffsets( draggable, event );
			}
		});
	},
	drag: function( draggable, event ) {

		// If you have a highly dynamic page, you might try this option. It renders positions every time you move the mouse.
		if ( draggable.options.refreshPositions ) {
			$.ui.ddmanager.prepareOffsets( draggable, event );
		}

		// Run through all droppables and check their positions based on specific tolerance options
		$.each( $.ui.ddmanager.droppables[ draggable.options.scope ] || [], function() {

			if ( this.options.disabled || this.greedyChild || !this.visible ) {
				return;
			}

			var parentInstance, scope, parent,
				intersects = $.ui.intersect( draggable, this, this.options.tolerance, event ),
				c = !intersects && this.isover ? "isout" : ( intersects && !this.isover ? "isover" : null );
			if ( !c ) {
				return;
			}

			if ( this.options.greedy ) {
				// find droppable parents with same scope
				scope = this.options.scope;
				parent = this.element.parents( ":data(ui-droppable)" ).filter(function() {
					return $( this ).droppable( "instance" ).options.scope === scope;
				});

				if ( parent.length ) {
					parentInstance = $( parent[ 0 ] ).droppable( "instance" );
					parentInstance.greedyChild = ( c === "isover" );
				}
			}

			// we just moved into a greedy child
			if ( parentInstance && c === "isover" ) {
				parentInstance.isover = false;
				parentInstance.isout = true;
				parentInstance._out.call( parentInstance, event );
			}

			this[ c ] = true;
			this[c === "isout" ? "isover" : "isout"] = false;
			this[c === "isover" ? "_over" : "_out"].call( this, event );

			// we just moved out of a greedy child
			if ( parentInstance && c === "isout" ) {
				parentInstance.isout = false;
				parentInstance.isover = true;
				parentInstance._over.call( parentInstance, event );
			}
		});

	},
	dragStop: function( draggable, event ) {
		draggable.element.parentsUntil( "body" ).unbind( "scroll.droppable" );
		// Call prepareOffsets one final time since IE does not fire return scroll events when overflow was caused by drag (see #5003)
		if ( !draggable.options.refreshPositions ) {
			$.ui.ddmanager.prepareOffsets( draggable, event );
		}
	}
};

var droppable = $.ui.droppable;


/*!
 * jQuery UI Resizable 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/resizable/
 */


$.widget("ui.resizable", $.ui.mouse, {
	version: "1.11.4",
	widgetEventPrefix: "resize",
	options: {
		alsoResize: false,
		animate: false,
		animateDuration: "slow",
		animateEasing: "swing",
		aspectRatio: false,
		autoHide: false,
		containment: false,
		ghost: false,
		grid: false,
		handles: "e,s,se",
		helper: false,
		maxHeight: null,
		maxWidth: null,
		minHeight: 10,
		minWidth: 10,
		// See #7960
		zIndex: 90,

		// callbacks
		resize: null,
		start: null,
		stop: null
	},

	_num: function( value ) {
		return parseInt( value, 10 ) || 0;
	},

	_isNumber: function( value ) {
		return !isNaN( parseInt( value, 10 ) );
	},

	_hasScroll: function( el, a ) {

		if ( $( el ).css( "overflow" ) === "hidden") {
			return false;
		}

		var scroll = ( a && a === "left" ) ? "scrollLeft" : "scrollTop",
			has = false;

		if ( el[ scroll ] > 0 ) {
			return true;
		}

		// TODO: determine which cases actually cause this to happen
		// if the element doesn't have the scroll set, see if it's possible to
		// set the scroll
		el[ scroll ] = 1;
		has = ( el[ scroll ] > 0 );
		el[ scroll ] = 0;
		return has;
	},

	_create: function() {

		var n, i, handle, axis, hname,
			that = this,
			o = this.options;
		this.element.addClass("ui-resizable");

		$.extend(this, {
			_aspectRatio: !!(o.aspectRatio),
			aspectRatio: o.aspectRatio,
			originalElement: this.element,
			_proportionallyResizeElements: [],
			_helper: o.helper || o.ghost || o.animate ? o.helper || "ui-resizable-helper" : null
		});

		// Wrap the element if it cannot hold child nodes
		if (this.element[0].nodeName.match(/^(canvas|textarea|input|select|button|img)$/i)) {

			this.element.wrap(
				$("<div class='ui-wrapper' style='overflow: hidden;'></div>").css({
					position: this.element.css("position"),
					width: this.element.outerWidth(),
					height: this.element.outerHeight(),
					top: this.element.css("top"),
					left: this.element.css("left")
				})
			);

			this.element = this.element.parent().data(
				"ui-resizable", this.element.resizable( "instance" )
			);

			this.elementIsWrapper = true;

			this.element.css({
				marginLeft: this.originalElement.css("marginLeft"),
				marginTop: this.originalElement.css("marginTop"),
				marginRight: this.originalElement.css("marginRight"),
				marginBottom: this.originalElement.css("marginBottom")
			});
			this.originalElement.css({
				marginLeft: 0,
				marginTop: 0,
				marginRight: 0,
				marginBottom: 0
			});
			// support: Safari
			// Prevent Safari textarea resize
			this.originalResizeStyle = this.originalElement.css("resize");
			this.originalElement.css("resize", "none");

			this._proportionallyResizeElements.push( this.originalElement.css({
				position: "static",
				zoom: 1,
				display: "block"
			}) );

			// support: IE9
			// avoid IE jump (hard set the margin)
			this.originalElement.css({ margin: this.originalElement.css("margin") });

			this._proportionallyResize();
		}

		this.handles = o.handles ||
			( !$(".ui-resizable-handle", this.element).length ?
				"e,s,se" : {
					n: ".ui-resizable-n",
					e: ".ui-resizable-e",
					s: ".ui-resizable-s",
					w: ".ui-resizable-w",
					se: ".ui-resizable-se",
					sw: ".ui-resizable-sw",
					ne: ".ui-resizable-ne",
					nw: ".ui-resizable-nw"
				} );

		this._handles = $();
		if ( this.handles.constructor === String ) {

			if ( this.handles === "all") {
				this.handles = "n,e,s,w,se,sw,ne,nw";
			}

			n = this.handles.split(",");
			this.handles = {};

			for (i = 0; i < n.length; i++) {

				handle = $.trim(n[i]);
				hname = "ui-resizable-" + handle;
				axis = $("<div class='ui-resizable-handle " + hname + "'></div>");

				axis.css({ zIndex: o.zIndex });

				// TODO : What's going on here?
				if ("se" === handle) {
					axis.addClass("ui-icon ui-icon-gripsmall-diagonal-se");
				}

				this.handles[handle] = ".ui-resizable-" + handle;
				this.element.append(axis);
			}

		}

		this._renderAxis = function(target) {

			var i, axis, padPos, padWrapper;

			target = target || this.element;

			for (i in this.handles) {

				if (this.handles[i].constructor === String) {
					this.handles[i] = this.element.children( this.handles[ i ] ).first().show();
				} else if ( this.handles[ i ].jquery || this.handles[ i ].nodeType ) {
					this.handles[ i ] = $( this.handles[ i ] );
					this._on( this.handles[ i ], { "mousedown": that._mouseDown });
				}

				if (this.elementIsWrapper && this.originalElement[0].nodeName.match(/^(textarea|input|select|button)$/i)) {

					axis = $(this.handles[i], this.element);

					padWrapper = /sw|ne|nw|se|n|s/.test(i) ? axis.outerHeight() : axis.outerWidth();

					padPos = [ "padding",
						/ne|nw|n/.test(i) ? "Top" :
						/se|sw|s/.test(i) ? "Bottom" :
						/^e$/.test(i) ? "Right" : "Left" ].join("");

					target.css(padPos, padWrapper);

					this._proportionallyResize();
				}

				this._handles = this._handles.add( this.handles[ i ] );
			}
		};

		// TODO: make renderAxis a prototype function
		this._renderAxis(this.element);

		this._handles = this._handles.add( this.element.find( ".ui-resizable-handle" ) );
		this._handles.disableSelection();

		this._handles.mouseover(function() {
			if (!that.resizing) {
				if (this.className) {
					axis = this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i);
				}
				that.axis = axis && axis[1] ? axis[1] : "se";
			}
		});

		if (o.autoHide) {
			this._handles.hide();
			$(this.element)
				.addClass("ui-resizable-autohide")
				.mouseenter(function() {
					if (o.disabled) {
						return;
					}
					$(this).removeClass("ui-resizable-autohide");
					that._handles.show();
				})
				.mouseleave(function() {
					if (o.disabled) {
						return;
					}
					if (!that.resizing) {
						$(this).addClass("ui-resizable-autohide");
						that._handles.hide();
					}
				});
		}

		this._mouseInit();
	},

	_destroy: function() {

		this._mouseDestroy();

		var wrapper,
			_destroy = function(exp) {
				$(exp)
					.removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing")
					.removeData("resizable")
					.removeData("ui-resizable")
					.unbind(".resizable")
					.find(".ui-resizable-handle")
						.remove();
			};

		// TODO: Unwrap at same DOM position
		if (this.elementIsWrapper) {
			_destroy(this.element);
			wrapper = this.element;
			this.originalElement.css({
				position: wrapper.css("position"),
				width: wrapper.outerWidth(),
				height: wrapper.outerHeight(),
				top: wrapper.css("top"),
				left: wrapper.css("left")
			}).insertAfter( wrapper );
			wrapper.remove();
		}

		this.originalElement.css("resize", this.originalResizeStyle);
		_destroy(this.originalElement);

		return this;
	},

	_mouseCapture: function(event) {
		var i, handle,
			capture = false;

		for (i in this.handles) {
			handle = $(this.handles[i])[0];
			if (handle === event.target || $.contains(handle, event.target)) {
				capture = true;
			}
		}

		return !this.options.disabled && capture;
	},

	_mouseStart: function(event) {

		var curleft, curtop, cursor,
			o = this.options,
			el = this.element;

		this.resizing = true;

		this._renderProxy();

		curleft = this._num(this.helper.css("left"));
		curtop = this._num(this.helper.css("top"));

		if (o.containment) {
			curleft += $(o.containment).scrollLeft() || 0;
			curtop += $(o.containment).scrollTop() || 0;
		}

		this.offset = this.helper.offset();
		this.position = { left: curleft, top: curtop };

		this.size = this._helper ? {
				width: this.helper.width(),
				height: this.helper.height()
			} : {
				width: el.width(),
				height: el.height()
			};

		this.originalSize = this._helper ? {
				width: el.outerWidth(),
				height: el.outerHeight()
			} : {
				width: el.width(),
				height: el.height()
			};

		this.sizeDiff = {
			width: el.outerWidth() - el.width(),
			height: el.outerHeight() - el.height()
		};

		this.originalPosition = { left: curleft, top: curtop };
		this.originalMousePosition = { left: event.pageX, top: event.pageY };

		this.aspectRatio = (typeof o.aspectRatio === "number") ?
			o.aspectRatio :
			((this.originalSize.width / this.originalSize.height) || 1);

		cursor = $(".ui-resizable-" + this.axis).css("cursor");
		$("body").css("cursor", cursor === "auto" ? this.axis + "-resize" : cursor);

		el.addClass("ui-resizable-resizing");
		this._propagate("start", event);
		return true;
	},

	_mouseDrag: function(event) {

		var data, props,
			smp = this.originalMousePosition,
			a = this.axis,
			dx = (event.pageX - smp.left) || 0,
			dy = (event.pageY - smp.top) || 0,
			trigger = this._change[a];

		this._updatePrevProperties();

		if (!trigger) {
			return false;
		}

		data = trigger.apply(this, [ event, dx, dy ]);

		this._updateVirtualBoundaries(event.shiftKey);
		if (this._aspectRatio || event.shiftKey) {
			data = this._updateRatio(data, event);
		}

		data = this._respectSize(data, event);

		this._updateCache(data);

		this._propagate("resize", event);

		props = this._applyChanges();

		if ( !this._helper && this._proportionallyResizeElements.length ) {
			this._proportionallyResize();
		}

		if ( !$.isEmptyObject( props ) ) {
			this._updatePrevProperties();
			this._trigger( "resize", event, this.ui() );
			this._applyChanges();
		}

		return false;
	},

	_mouseStop: function(event) {

		this.resizing = false;
		var pr, ista, soffseth, soffsetw, s, left, top,
			o = this.options, that = this;

		if (this._helper) {

			pr = this._proportionallyResizeElements;
			ista = pr.length && (/textarea/i).test(pr[0].nodeName);
			soffseth = ista && this._hasScroll(pr[0], "left") ? 0 : that.sizeDiff.height;
			soffsetw = ista ? 0 : that.sizeDiff.width;

			s = {
				width: (that.helper.width()  - soffsetw),
				height: (that.helper.height() - soffseth)
			};
			left = (parseInt(that.element.css("left"), 10) +
				(that.position.left - that.originalPosition.left)) || null;
			top = (parseInt(that.element.css("top"), 10) +
				(that.position.top - that.originalPosition.top)) || null;

			if (!o.animate) {
				this.element.css($.extend(s, { top: top, left: left }));
			}

			that.helper.height(that.size.height);
			that.helper.width(that.size.width);

			if (this._helper && !o.animate) {
				this._proportionallyResize();
			}
		}

		$("body").css("cursor", "auto");

		this.element.removeClass("ui-resizable-resizing");

		this._propagate("stop", event);

		if (this._helper) {
			this.helper.remove();
		}

		return false;

	},

	_updatePrevProperties: function() {
		this.prevPosition = {
			top: this.position.top,
			left: this.position.left
		};
		this.prevSize = {
			width: this.size.width,
			height: this.size.height
		};
	},

	_applyChanges: function() {
		var props = {};

		if ( this.position.top !== this.prevPosition.top ) {
			props.top = this.position.top + "px";
		}
		if ( this.position.left !== this.prevPosition.left ) {
			props.left = this.position.left + "px";
		}
		if ( this.size.width !== this.prevSize.width ) {
			props.width = this.size.width + "px";
		}
		if ( this.size.height !== this.prevSize.height ) {
			props.height = this.size.height + "px";
		}

		this.helper.css( props );

		return props;
	},

	_updateVirtualBoundaries: function(forceAspectRatio) {
		var pMinWidth, pMaxWidth, pMinHeight, pMaxHeight, b,
			o = this.options;

		b = {
			minWidth: this._isNumber(o.minWidth) ? o.minWidth : 0,
			maxWidth: this._isNumber(o.maxWidth) ? o.maxWidth : Infinity,
			minHeight: this._isNumber(o.minHeight) ? o.minHeight : 0,
			maxHeight: this._isNumber(o.maxHeight) ? o.maxHeight : Infinity
		};

		if (this._aspectRatio || forceAspectRatio) {
			pMinWidth = b.minHeight * this.aspectRatio;
			pMinHeight = b.minWidth / this.aspectRatio;
			pMaxWidth = b.maxHeight * this.aspectRatio;
			pMaxHeight = b.maxWidth / this.aspectRatio;

			if (pMinWidth > b.minWidth) {
				b.minWidth = pMinWidth;
			}
			if (pMinHeight > b.minHeight) {
				b.minHeight = pMinHeight;
			}
			if (pMaxWidth < b.maxWidth) {
				b.maxWidth = pMaxWidth;
			}
			if (pMaxHeight < b.maxHeight) {
				b.maxHeight = pMaxHeight;
			}
		}
		this._vBoundaries = b;
	},

	_updateCache: function(data) {
		this.offset = this.helper.offset();
		if (this._isNumber(data.left)) {
			this.position.left = data.left;
		}
		if (this._isNumber(data.top)) {
			this.position.top = data.top;
		}
		if (this._isNumber(data.height)) {
			this.size.height = data.height;
		}
		if (this._isNumber(data.width)) {
			this.size.width = data.width;
		}
	},

	_updateRatio: function( data ) {

		var cpos = this.position,
			csize = this.size,
			a = this.axis;

		if (this._isNumber(data.height)) {
			data.width = (data.height * this.aspectRatio);
		} else if (this._isNumber(data.width)) {
			data.height = (data.width / this.aspectRatio);
		}

		if (a === "sw") {
			data.left = cpos.left + (csize.width - data.width);
			data.top = null;
		}
		if (a === "nw") {
			data.top = cpos.top + (csize.height - data.height);
			data.left = cpos.left + (csize.width - data.width);
		}

		return data;
	},

	_respectSize: function( data ) {

		var o = this._vBoundaries,
			a = this.axis,
			ismaxw = this._isNumber(data.width) && o.maxWidth && (o.maxWidth < data.width),
			ismaxh = this._isNumber(data.height) && o.maxHeight && (o.maxHeight < data.height),
			isminw = this._isNumber(data.width) && o.minWidth && (o.minWidth > data.width),
			isminh = this._isNumber(data.height) && o.minHeight && (o.minHeight > data.height),
			dw = this.originalPosition.left + this.originalSize.width,
			dh = this.position.top + this.size.height,
			cw = /sw|nw|w/.test(a), ch = /nw|ne|n/.test(a);
		if (isminw) {
			data.width = o.minWidth;
		}
		if (isminh) {
			data.height = o.minHeight;
		}
		if (ismaxw) {
			data.width = o.maxWidth;
		}
		if (ismaxh) {
			data.height = o.maxHeight;
		}

		if (isminw && cw) {
			data.left = dw - o.minWidth;
		}
		if (ismaxw && cw) {
			data.left = dw - o.maxWidth;
		}
		if (isminh && ch) {
			data.top = dh - o.minHeight;
		}
		if (ismaxh && ch) {
			data.top = dh - o.maxHeight;
		}

		// Fixing jump error on top/left - bug #2330
		if (!data.width && !data.height && !data.left && data.top) {
			data.top = null;
		} else if (!data.width && !data.height && !data.top && data.left) {
			data.left = null;
		}

		return data;
	},

	_getPaddingPlusBorderDimensions: function( element ) {
		var i = 0,
			widths = [],
			borders = [
				element.css( "borderTopWidth" ),
				element.css( "borderRightWidth" ),
				element.css( "borderBottomWidth" ),
				element.css( "borderLeftWidth" )
			],
			paddings = [
				element.css( "paddingTop" ),
				element.css( "paddingRight" ),
				element.css( "paddingBottom" ),
				element.css( "paddingLeft" )
			];

		for ( ; i < 4; i++ ) {
			widths[ i ] = ( parseInt( borders[ i ], 10 ) || 0 );
			widths[ i ] += ( parseInt( paddings[ i ], 10 ) || 0 );
		}

		return {
			height: widths[ 0 ] + widths[ 2 ],
			width: widths[ 1 ] + widths[ 3 ]
		};
	},

	_proportionallyResize: function() {

		if (!this._proportionallyResizeElements.length) {
			return;
		}

		var prel,
			i = 0,
			element = this.helper || this.element;

		for ( ; i < this._proportionallyResizeElements.length; i++) {

			prel = this._proportionallyResizeElements[i];

			// TODO: Seems like a bug to cache this.outerDimensions
			// considering that we are in a loop.
			if (!this.outerDimensions) {
				this.outerDimensions = this._getPaddingPlusBorderDimensions( prel );
			}

			prel.css({
				height: (element.height() - this.outerDimensions.height) || 0,
				width: (element.width() - this.outerDimensions.width) || 0
			});

		}

	},

	_renderProxy: function() {

		var el = this.element, o = this.options;
		this.elementOffset = el.offset();

		if (this._helper) {

			this.helper = this.helper || $("<div style='overflow:hidden;'></div>");

			this.helper.addClass(this._helper).css({
				width: this.element.outerWidth() - 1,
				height: this.element.outerHeight() - 1,
				position: "absolute",
				left: this.elementOffset.left + "px",
				top: this.elementOffset.top + "px",
				zIndex: ++o.zIndex //TODO: Don't modify option
			});

			this.helper
				.appendTo("body")
				.disableSelection();

		} else {
			this.helper = this.element;
		}

	},

	_change: {
		e: function(event, dx) {
			return { width: this.originalSize.width + dx };
		},
		w: function(event, dx) {
			var cs = this.originalSize, sp = this.originalPosition;
			return { left: sp.left + dx, width: cs.width - dx };
		},
		n: function(event, dx, dy) {
			var cs = this.originalSize, sp = this.originalPosition;
			return { top: sp.top + dy, height: cs.height - dy };
		},
		s: function(event, dx, dy) {
			return { height: this.originalSize.height + dy };
		},
		se: function(event, dx, dy) {
			return $.extend(this._change.s.apply(this, arguments),
				this._change.e.apply(this, [ event, dx, dy ]));
		},
		sw: function(event, dx, dy) {
			return $.extend(this._change.s.apply(this, arguments),
				this._change.w.apply(this, [ event, dx, dy ]));
		},
		ne: function(event, dx, dy) {
			return $.extend(this._change.n.apply(this, arguments),
				this._change.e.apply(this, [ event, dx, dy ]));
		},
		nw: function(event, dx, dy) {
			return $.extend(this._change.n.apply(this, arguments),
				this._change.w.apply(this, [ event, dx, dy ]));
		}
	},

	_propagate: function(n, event) {
		$.ui.plugin.call(this, n, [ event, this.ui() ]);
		(n !== "resize" && this._trigger(n, event, this.ui()));
	},

	plugins: {},

	ui: function() {
		return {
			originalElement: this.originalElement,
			element: this.element,
			helper: this.helper,
			position: this.position,
			size: this.size,
			originalSize: this.originalSize,
			originalPosition: this.originalPosition
		};
	}

});

/*
 * Resizable Extensions
 */

$.ui.plugin.add("resizable", "animate", {

	stop: function( event ) {
		var that = $(this).resizable( "instance" ),
			o = that.options,
			pr = that._proportionallyResizeElements,
			ista = pr.length && (/textarea/i).test(pr[0].nodeName),
			soffseth = ista && that._hasScroll(pr[0], "left") ? 0 : that.sizeDiff.height,
			soffsetw = ista ? 0 : that.sizeDiff.width,
			style = { width: (that.size.width - soffsetw), height: (that.size.height - soffseth) },
			left = (parseInt(that.element.css("left"), 10) +
				(that.position.left - that.originalPosition.left)) || null,
			top = (parseInt(that.element.css("top"), 10) +
				(that.position.top - that.originalPosition.top)) || null;

		that.element.animate(
			$.extend(style, top && left ? { top: top, left: left } : {}), {
				duration: o.animateDuration,
				easing: o.animateEasing,
				step: function() {

					var data = {
						width: parseInt(that.element.css("width"), 10),
						height: parseInt(that.element.css("height"), 10),
						top: parseInt(that.element.css("top"), 10),
						left: parseInt(that.element.css("left"), 10)
					};

					if (pr && pr.length) {
						$(pr[0]).css({ width: data.width, height: data.height });
					}

					// propagating resize, and updating values for each animation step
					that._updateCache(data);
					that._propagate("resize", event);

				}
			}
		);
	}

});

$.ui.plugin.add( "resizable", "containment", {

	start: function() {
		var element, p, co, ch, cw, width, height,
			that = $( this ).resizable( "instance" ),
			o = that.options,
			el = that.element,
			oc = o.containment,
			ce = ( oc instanceof $ ) ? oc.get( 0 ) : ( /parent/.test( oc ) ) ? el.parent().get( 0 ) : oc;

		if ( !ce ) {
			return;
		}

		that.containerElement = $( ce );

		if ( /document/.test( oc ) || oc === document ) {
			that.containerOffset = {
				left: 0,
				top: 0
			};
			that.containerPosition = {
				left: 0,
				top: 0
			};

			that.parentData = {
				element: $( document ),
				left: 0,
				top: 0,
				width: $( document ).width(),
				height: $( document ).height() || document.body.parentNode.scrollHeight
			};
		} else {
			element = $( ce );
			p = [];
			$([ "Top", "Right", "Left", "Bottom" ]).each(function( i, name ) {
				p[ i ] = that._num( element.css( "padding" + name ) );
			});

			that.containerOffset = element.offset();
			that.containerPosition = element.position();
			that.containerSize = {
				height: ( element.innerHeight() - p[ 3 ] ),
				width: ( element.innerWidth() - p[ 1 ] )
			};

			co = that.containerOffset;
			ch = that.containerSize.height;
			cw = that.containerSize.width;
			width = ( that._hasScroll ( ce, "left" ) ? ce.scrollWidth : cw );
			height = ( that._hasScroll ( ce ) ? ce.scrollHeight : ch ) ;

			that.parentData = {
				element: ce,
				left: co.left,
				top: co.top,
				width: width,
				height: height
			};
		}
	},

	resize: function( event ) {
		var woset, hoset, isParent, isOffsetRelative,
			that = $( this ).resizable( "instance" ),
			o = that.options,
			co = that.containerOffset,
			cp = that.position,
			pRatio = that._aspectRatio || event.shiftKey,
			cop = {
				top: 0,
				left: 0
			},
			ce = that.containerElement,
			continueResize = true;

		if ( ce[ 0 ] !== document && ( /static/ ).test( ce.css( "position" ) ) ) {
			cop = co;
		}

		if ( cp.left < ( that._helper ? co.left : 0 ) ) {
			that.size.width = that.size.width +
				( that._helper ?
					( that.position.left - co.left ) :
					( that.position.left - cop.left ) );

			if ( pRatio ) {
				that.size.height = that.size.width / that.aspectRatio;
				continueResize = false;
			}
			that.position.left = o.helper ? co.left : 0;
		}

		if ( cp.top < ( that._helper ? co.top : 0 ) ) {
			that.size.height = that.size.height +
				( that._helper ?
					( that.position.top - co.top ) :
					that.position.top );

			if ( pRatio ) {
				that.size.width = that.size.height * that.aspectRatio;
				continueResize = false;
			}
			that.position.top = that._helper ? co.top : 0;
		}

		isParent = that.containerElement.get( 0 ) === that.element.parent().get( 0 );
		isOffsetRelative = /relative|absolute/.test( that.containerElement.css( "position" ) );

		if ( isParent && isOffsetRelative ) {
			that.offset.left = that.parentData.left + that.position.left;
			that.offset.top = that.parentData.top + that.position.top;
		} else {
			that.offset.left = that.element.offset().left;
			that.offset.top = that.element.offset().top;
		}

		woset = Math.abs( that.sizeDiff.width +
			(that._helper ?
				that.offset.left - cop.left :
				(that.offset.left - co.left)) );

		hoset = Math.abs( that.sizeDiff.height +
			(that._helper ?
				that.offset.top - cop.top :
				(that.offset.top - co.top)) );

		if ( woset + that.size.width >= that.parentData.width ) {
			that.size.width = that.parentData.width - woset;
			if ( pRatio ) {
				that.size.height = that.size.width / that.aspectRatio;
				continueResize = false;
			}
		}

		if ( hoset + that.size.height >= that.parentData.height ) {
			that.size.height = that.parentData.height - hoset;
			if ( pRatio ) {
				that.size.width = that.size.height * that.aspectRatio;
				continueResize = false;
			}
		}

		if ( !continueResize ) {
			that.position.left = that.prevPosition.left;
			that.position.top = that.prevPosition.top;
			that.size.width = that.prevSize.width;
			that.size.height = that.prevSize.height;
		}
	},

	stop: function() {
		var that = $( this ).resizable( "instance" ),
			o = that.options,
			co = that.containerOffset,
			cop = that.containerPosition,
			ce = that.containerElement,
			helper = $( that.helper ),
			ho = helper.offset(),
			w = helper.outerWidth() - that.sizeDiff.width,
			h = helper.outerHeight() - that.sizeDiff.height;

		if ( that._helper && !o.animate && ( /relative/ ).test( ce.css( "position" ) ) ) {
			$( this ).css({
				left: ho.left - cop.left - co.left,
				width: w,
				height: h
			});
		}

		if ( that._helper && !o.animate && ( /static/ ).test( ce.css( "position" ) ) ) {
			$( this ).css({
				left: ho.left - cop.left - co.left,
				width: w,
				height: h
			});
		}
	}
});

$.ui.plugin.add("resizable", "alsoResize", {

	start: function() {
		var that = $(this).resizable( "instance" ),
			o = that.options;

		$(o.alsoResize).each(function() {
			var el = $(this);
			el.data("ui-resizable-alsoresize", {
				width: parseInt(el.width(), 10), height: parseInt(el.height(), 10),
				left: parseInt(el.css("left"), 10), top: parseInt(el.css("top"), 10)
			});
		});
	},

	resize: function(event, ui) {
		var that = $(this).resizable( "instance" ),
			o = that.options,
			os = that.originalSize,
			op = that.originalPosition,
			delta = {
				height: (that.size.height - os.height) || 0,
				width: (that.size.width - os.width) || 0,
				top: (that.position.top - op.top) || 0,
				left: (that.position.left - op.left) || 0
			};

			$(o.alsoResize).each(function() {
				var el = $(this), start = $(this).data("ui-resizable-alsoresize"), style = {},
					css = el.parents(ui.originalElement[0]).length ?
							[ "width", "height" ] :
							[ "width", "height", "top", "left" ];

				$.each(css, function(i, prop) {
					var sum = (start[prop] || 0) + (delta[prop] || 0);
					if (sum && sum >= 0) {
						style[prop] = sum || null;
					}
				});

				el.css(style);
			});
	},

	stop: function() {
		$(this).removeData("resizable-alsoresize");
	}
});

$.ui.plugin.add("resizable", "ghost", {

	start: function() {

		var that = $(this).resizable( "instance" ), o = that.options, cs = that.size;

		that.ghost = that.originalElement.clone();
		that.ghost
			.css({
				opacity: 0.25,
				display: "block",
				position: "relative",
				height: cs.height,
				width: cs.width,
				margin: 0,
				left: 0,
				top: 0
			})
			.addClass("ui-resizable-ghost")
			.addClass(typeof o.ghost === "string" ? o.ghost : "");

		that.ghost.appendTo(that.helper);

	},

	resize: function() {
		var that = $(this).resizable( "instance" );
		if (that.ghost) {
			that.ghost.css({
				position: "relative",
				height: that.size.height,
				width: that.size.width
			});
		}
	},

	stop: function() {
		var that = $(this).resizable( "instance" );
		if (that.ghost && that.helper) {
			that.helper.get(0).removeChild(that.ghost.get(0));
		}
	}

});

$.ui.plugin.add("resizable", "grid", {

	resize: function() {
		var outerDimensions,
			that = $(this).resizable( "instance" ),
			o = that.options,
			cs = that.size,
			os = that.originalSize,
			op = that.originalPosition,
			a = that.axis,
			grid = typeof o.grid === "number" ? [ o.grid, o.grid ] : o.grid,
			gridX = (grid[0] || 1),
			gridY = (grid[1] || 1),
			ox = Math.round((cs.width - os.width) / gridX) * gridX,
			oy = Math.round((cs.height - os.height) / gridY) * gridY,
			newWidth = os.width + ox,
			newHeight = os.height + oy,
			isMaxWidth = o.maxWidth && (o.maxWidth < newWidth),
			isMaxHeight = o.maxHeight && (o.maxHeight < newHeight),
			isMinWidth = o.minWidth && (o.minWidth > newWidth),
			isMinHeight = o.minHeight && (o.minHeight > newHeight);

		o.grid = grid;

		if (isMinWidth) {
			newWidth += gridX;
		}
		if (isMinHeight) {
			newHeight += gridY;
		}
		if (isMaxWidth) {
			newWidth -= gridX;
		}
		if (isMaxHeight) {
			newHeight -= gridY;
		}

		if (/^(se|s|e)$/.test(a)) {
			that.size.width = newWidth;
			that.size.height = newHeight;
		} else if (/^(ne)$/.test(a)) {
			that.size.width = newWidth;
			that.size.height = newHeight;
			that.position.top = op.top - oy;
		} else if (/^(sw)$/.test(a)) {
			that.size.width = newWidth;
			that.size.height = newHeight;
			that.position.left = op.left - ox;
		} else {
			if ( newHeight - gridY <= 0 || newWidth - gridX <= 0) {
				outerDimensions = that._getPaddingPlusBorderDimensions( this );
			}

			if ( newHeight - gridY > 0 ) {
				that.size.height = newHeight;
				that.position.top = op.top - oy;
			} else {
				newHeight = gridY - outerDimensions.height;
				that.size.height = newHeight;
				that.position.top = op.top + os.height - newHeight;
			}
			if ( newWidth - gridX > 0 ) {
				that.size.width = newWidth;
				that.position.left = op.left - ox;
			} else {
				newWidth = gridX - outerDimensions.width;
				that.size.width = newWidth;
				that.position.left = op.left + os.width - newWidth;
			}
		}
	}

});

var resizable = $.ui.resizable;


/*!
 * jQuery UI Selectable 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/selectable/
 */


var selectable = $.widget("ui.selectable", $.ui.mouse, {
	version: "1.11.4",
	options: {
		appendTo: "body",
		autoRefresh: true,
		distance: 0,
		filter: "*",
		tolerance: "touch",

		// callbacks
		selected: null,
		selecting: null,
		start: null,
		stop: null,
		unselected: null,
		unselecting: null
	},
	_create: function() {
		var selectees,
			that = this;

		this.element.addClass("ui-selectable");

		this.dragged = false;

		// cache selectee children based on filter
		this.refresh = function() {
			selectees = $(that.options.filter, that.element[0]);
			selectees.addClass("ui-selectee");
			selectees.each(function() {
				var $this = $(this),
					pos = $this.offset();
				$.data(this, "selectable-item", {
					element: this,
					$element: $this,
					left: pos.left,
					top: pos.top,
					right: pos.left + $this.outerWidth(),
					bottom: pos.top + $this.outerHeight(),
					startselected: false,
					selected: $this.hasClass("ui-selected"),
					selecting: $this.hasClass("ui-selecting"),
					unselecting: $this.hasClass("ui-unselecting")
				});
			});
		};
		this.refresh();

		this.selectees = selectees.addClass("ui-selectee");

		this._mouseInit();

		this.helper = $("<div class='ui-selectable-helper'></div>");
	},

	_destroy: function() {
		this.selectees
			.removeClass("ui-selectee")
			.removeData("selectable-item");
		this.element
			.removeClass("ui-selectable ui-selectable-disabled");
		this._mouseDestroy();
	},

	_mouseStart: function(event) {
		var that = this,
			options = this.options;

		this.opos = [ event.pageX, event.pageY ];

		if (this.options.disabled) {
			return;
		}

		this.selectees = $(options.filter, this.element[0]);

		this._trigger("start", event);

		$(options.appendTo).append(this.helper);
		// position helper (lasso)
		this.helper.css({
			"left": event.pageX,
			"top": event.pageY,
			"width": 0,
			"height": 0
		});

		if (options.autoRefresh) {
			this.refresh();
		}

		this.selectees.filter(".ui-selected").each(function() {
			var selectee = $.data(this, "selectable-item");
			selectee.startselected = true;
			if (!event.metaKey && !event.ctrlKey) {
				selectee.$element.removeClass("ui-selected");
				selectee.selected = false;
				selectee.$element.addClass("ui-unselecting");
				selectee.unselecting = true;
				// selectable UNSELECTING callback
				that._trigger("unselecting", event, {
					unselecting: selectee.element
				});
			}
		});

		$(event.target).parents().addBack().each(function() {
			var doSelect,
				selectee = $.data(this, "selectable-item");
			if (selectee) {
				doSelect = (!event.metaKey && !event.ctrlKey) || !selectee.$element.hasClass("ui-selected");
				selectee.$element
					.removeClass(doSelect ? "ui-unselecting" : "ui-selected")
					.addClass(doSelect ? "ui-selecting" : "ui-unselecting");
				selectee.unselecting = !doSelect;
				selectee.selecting = doSelect;
				selectee.selected = doSelect;
				// selectable (UN)SELECTING callback
				if (doSelect) {
					that._trigger("selecting", event, {
						selecting: selectee.element
					});
				} else {
					that._trigger("unselecting", event, {
						unselecting: selectee.element
					});
				}
				return false;
			}
		});

	},

	_mouseDrag: function(event) {

		this.dragged = true;

		if (this.options.disabled) {
			return;
		}

		var tmp,
			that = this,
			options = this.options,
			x1 = this.opos[0],
			y1 = this.opos[1],
			x2 = event.pageX,
			y2 = event.pageY;

		if (x1 > x2) { tmp = x2; x2 = x1; x1 = tmp; }
		if (y1 > y2) { tmp = y2; y2 = y1; y1 = tmp; }
		this.helper.css({ left: x1, top: y1, width: x2 - x1, height: y2 - y1 });

		this.selectees.each(function() {
			var selectee = $.data(this, "selectable-item"),
				hit = false;

			//prevent helper from being selected if appendTo: selectable
			if (!selectee || selectee.element === that.element[0]) {
				return;
			}

			if (options.tolerance === "touch") {
				hit = ( !(selectee.left > x2 || selectee.right < x1 || selectee.top > y2 || selectee.bottom < y1) );
			} else if (options.tolerance === "fit") {
				hit = (selectee.left > x1 && selectee.right < x2 && selectee.top > y1 && selectee.bottom < y2);
			}

			if (hit) {
				// SELECT
				if (selectee.selected) {
					selectee.$element.removeClass("ui-selected");
					selectee.selected = false;
				}
				if (selectee.unselecting) {
					selectee.$element.removeClass("ui-unselecting");
					selectee.unselecting = false;
				}
				if (!selectee.selecting) {
					selectee.$element.addClass("ui-selecting");
					selectee.selecting = true;
					// selectable SELECTING callback
					that._trigger("selecting", event, {
						selecting: selectee.element
					});
				}
			} else {
				// UNSELECT
				if (selectee.selecting) {
					if ((event.metaKey || event.ctrlKey) && selectee.startselected) {
						selectee.$element.removeClass("ui-selecting");
						selectee.selecting = false;
						selectee.$element.addClass("ui-selected");
						selectee.selected = true;
					} else {
						selectee.$element.removeClass("ui-selecting");
						selectee.selecting = false;
						if (selectee.startselected) {
							selectee.$element.addClass("ui-unselecting");
							selectee.unselecting = true;
						}
						// selectable UNSELECTING callback
						that._trigger("unselecting", event, {
							unselecting: selectee.element
						});
					}
				}
				if (selectee.selected) {
					if (!event.metaKey && !event.ctrlKey && !selectee.startselected) {
						selectee.$element.removeClass("ui-selected");
						selectee.selected = false;

						selectee.$element.addClass("ui-unselecting");
						selectee.unselecting = true;
						// selectable UNSELECTING callback
						that._trigger("unselecting", event, {
							unselecting: selectee.element
						});
					}
				}
			}
		});

		return false;
	},

	_mouseStop: function(event) {
		var that = this;

		this.dragged = false;

		$(".ui-unselecting", this.element[0]).each(function() {
			var selectee = $.data(this, "selectable-item");
			selectee.$element.removeClass("ui-unselecting");
			selectee.unselecting = false;
			selectee.startselected = false;
			that._trigger("unselected", event, {
				unselected: selectee.element
			});
		});
		$(".ui-selecting", this.element[0]).each(function() {
			var selectee = $.data(this, "selectable-item");
			selectee.$element.removeClass("ui-selecting").addClass("ui-selected");
			selectee.selecting = false;
			selectee.selected = true;
			selectee.startselected = true;
			that._trigger("selected", event, {
				selected: selectee.element
			});
		});
		this._trigger("stop", event);

		this.helper.remove();

		return false;
	}

});


/*!
 * jQuery UI Sortable 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/sortable/
 */


var sortable = $.widget("ui.sortable", $.ui.mouse, {
	version: "1.11.4",
	widgetEventPrefix: "sort",
	ready: false,
	options: {
		appendTo: "parent",
		axis: false,
		connectWith: false,
		containment: false,
		cursor: "auto",
		cursorAt: false,
		dropOnEmpty: true,
		forcePlaceholderSize: false,
		forceHelperSize: false,
		grid: false,
		handle: false,
		helper: "original",
		items: "> *",
		opacity: false,
		placeholder: false,
		revert: false,
		scroll: true,
		scrollSensitivity: 20,
		scrollSpeed: 20,
		scope: "default",
		tolerance: "intersect",
		zIndex: 1000,

		// callbacks
		activate: null,
		beforeStop: null,
		change: null,
		deactivate: null,
		out: null,
		over: null,
		receive: null,
		remove: null,
		sort: null,
		start: null,
		stop: null,
		update: null
	},

	_isOverAxis: function( x, reference, size ) {
		return ( x >= reference ) && ( x < ( reference + size ) );
	},

	_isFloating: function( item ) {
		return (/left|right/).test(item.css("float")) || (/inline|table-cell/).test(item.css("display"));
	},

	_create: function() {
		this.containerCache = {};
		this.element.addClass("ui-sortable");

		//Get the items
		this.refresh();

		//Let's determine the parent's offset
		this.offset = this.element.offset();

		//Initialize mouse events for interaction
		this._mouseInit();

		this._setHandleClassName();

		//We're ready to go
		this.ready = true;

	},

	_setOption: function( key, value ) {
		this._super( key, value );

		if ( key === "handle" ) {
			this._setHandleClassName();
		}
	},

	_setHandleClassName: function() {
		this.element.find( ".ui-sortable-handle" ).removeClass( "ui-sortable-handle" );
		$.each( this.items, function() {
			( this.instance.options.handle ?
				this.item.find( this.instance.options.handle ) : this.item )
				.addClass( "ui-sortable-handle" );
		});
	},

	_destroy: function() {
		this.element
			.removeClass( "ui-sortable ui-sortable-disabled" )
			.find( ".ui-sortable-handle" )
				.removeClass( "ui-sortable-handle" );
		this._mouseDestroy();

		for ( var i = this.items.length - 1; i >= 0; i-- ) {
			this.items[i].item.removeData(this.widgetName + "-item");
		}

		return this;
	},

	_mouseCapture: function(event, overrideHandle) {
		var currentItem = null,
			validHandle = false,
			that = this;

		if (this.reverting) {
			return false;
		}

		if(this.options.disabled || this.options.type === "static") {
			return false;
		}

		//We have to refresh the items data once first
		this._refreshItems(event);

		//Find out if the clicked node (or one of its parents) is a actual item in this.items
		$(event.target).parents().each(function() {
			if($.data(this, that.widgetName + "-item") === that) {
				currentItem = $(this);
				return false;
			}
		});
		if($.data(event.target, that.widgetName + "-item") === that) {
			currentItem = $(event.target);
		}

		if(!currentItem) {
			return false;
		}
		if(this.options.handle && !overrideHandle) {
			$(this.options.handle, currentItem).find("*").addBack().each(function() {
				if(this === event.target) {
					validHandle = true;
				}
			});
			if(!validHandle) {
				return false;
			}
		}

		this.currentItem = currentItem;
		this._removeCurrentsFromItems();
		return true;

	},

	_mouseStart: function(event, overrideHandle, noActivation) {

		var i, body,
			o = this.options;

		this.currentContainer = this;

		//We only need to call refreshPositions, because the refreshItems call has been moved to mouseCapture
		this.refreshPositions();

		//Create and append the visible helper
		this.helper = this._createHelper(event);

		//Cache the helper size
		this._cacheHelperProportions();

		/*
		 * - Position generation -
		 * This block generates everything position related - it's the core of draggables.
		 */

		//Cache the margins of the original element
		this._cacheMargins();

		//Get the next scrolling parent
		this.scrollParent = this.helper.scrollParent();

		//The element's absolute position on the page minus margins
		this.offset = this.currentItem.offset();
		this.offset = {
			top: this.offset.top - this.margins.top,
			left: this.offset.left - this.margins.left
		};

		$.extend(this.offset, {
			click: { //Where the click happened, relative to the element
				left: event.pageX - this.offset.left,
				top: event.pageY - this.offset.top
			},
			parent: this._getParentOffset(),
			relative: this._getRelativeOffset() //This is a relative to absolute position minus the actual position calculation - only used for relative positioned helper
		});

		// Only after we got the offset, we can change the helper's position to absolute
		// TODO: Still need to figure out a way to make relative sorting possible
		this.helper.css("position", "absolute");
		this.cssPosition = this.helper.css("position");

		//Generate the original position
		this.originalPosition = this._generatePosition(event);
		this.originalPageX = event.pageX;
		this.originalPageY = event.pageY;

		//Adjust the mouse offset relative to the helper if "cursorAt" is supplied
		(o.cursorAt && this._adjustOffsetFromHelper(o.cursorAt));

		//Cache the former DOM position
		this.domPosition = { prev: this.currentItem.prev()[0], parent: this.currentItem.parent()[0] };

		//If the helper is not the original, hide the original so it's not playing any role during the drag, won't cause anything bad this way
		if(this.helper[0] !== this.currentItem[0]) {
			this.currentItem.hide();
		}

		//Create the placeholder
		this._createPlaceholder();

		//Set a containment if given in the options
		if(o.containment) {
			this._setContainment();
		}

		if( o.cursor && o.cursor !== "auto" ) { // cursor option
			body = this.document.find( "body" );

			// support: IE
			this.storedCursor = body.css( "cursor" );
			body.css( "cursor", o.cursor );

			this.storedStylesheet = $( "<style>*{ cursor: "+o.cursor+" !important; }</style>" ).appendTo( body );
		}

		if(o.opacity) { // opacity option
			if (this.helper.css("opacity")) {
				this._storedOpacity = this.helper.css("opacity");
			}
			this.helper.css("opacity", o.opacity);
		}

		if(o.zIndex) { // zIndex option
			if (this.helper.css("zIndex")) {
				this._storedZIndex = this.helper.css("zIndex");
			}
			this.helper.css("zIndex", o.zIndex);
		}

		//Prepare scrolling
		if(this.scrollParent[0] !== this.document[0] && this.scrollParent[0].tagName !== "HTML") {
			this.overflowOffset = this.scrollParent.offset();
		}

		//Call callbacks
		this._trigger("start", event, this._uiHash());

		//Recache the helper size
		if(!this._preserveHelperProportions) {
			this._cacheHelperProportions();
		}


		//Post "activate" events to possible containers
		if( !noActivation ) {
			for ( i = this.containers.length - 1; i >= 0; i-- ) {
				this.containers[ i ]._trigger( "activate", event, this._uiHash( this ) );
			}
		}

		//Prepare possible droppables
		if($.ui.ddmanager) {
			$.ui.ddmanager.current = this;
		}

		if ($.ui.ddmanager && !o.dropBehaviour) {
			$.ui.ddmanager.prepareOffsets(this, event);
		}

		this.dragging = true;

		this.helper.addClass("ui-sortable-helper");
		this._mouseDrag(event); //Execute the drag once - this causes the helper not to be visible before getting its correct position
		return true;

	},

	_mouseDrag: function(event) {
		var i, item, itemElement, intersection,
			o = this.options,
			scrolled = false;

		//Compute the helpers position
		this.position = this._generatePosition(event);
		this.positionAbs = this._convertPositionTo("absolute");

		if (!this.lastPositionAbs) {
			this.lastPositionAbs = this.positionAbs;
		}

		//Do scrolling
		if(this.options.scroll) {
			if(this.scrollParent[0] !== this.document[0] && this.scrollParent[0].tagName !== "HTML") {

				if((this.overflowOffset.top + this.scrollParent[0].offsetHeight) - event.pageY < o.scrollSensitivity) {
					this.scrollParent[0].scrollTop = scrolled = this.scrollParent[0].scrollTop + o.scrollSpeed;
				} else if(event.pageY - this.overflowOffset.top < o.scrollSensitivity) {
					this.scrollParent[0].scrollTop = scrolled = this.scrollParent[0].scrollTop - o.scrollSpeed;
				}

				if((this.overflowOffset.left + this.scrollParent[0].offsetWidth) - event.pageX < o.scrollSensitivity) {
					this.scrollParent[0].scrollLeft = scrolled = this.scrollParent[0].scrollLeft + o.scrollSpeed;
				} else if(event.pageX - this.overflowOffset.left < o.scrollSensitivity) {
					this.scrollParent[0].scrollLeft = scrolled = this.scrollParent[0].scrollLeft - o.scrollSpeed;
				}

			} else {

				if(event.pageY - this.document.scrollTop() < o.scrollSensitivity) {
					scrolled = this.document.scrollTop(this.document.scrollTop() - o.scrollSpeed);
				} else if(this.window.height() - (event.pageY - this.document.scrollTop()) < o.scrollSensitivity) {
					scrolled = this.document.scrollTop(this.document.scrollTop() + o.scrollSpeed);
				}

				if(event.pageX - this.document.scrollLeft() < o.scrollSensitivity) {
					scrolled = this.document.scrollLeft(this.document.scrollLeft() - o.scrollSpeed);
				} else if(this.window.width() - (event.pageX - this.document.scrollLeft()) < o.scrollSensitivity) {
					scrolled = this.document.scrollLeft(this.document.scrollLeft() + o.scrollSpeed);
				}

			}

			if(scrolled !== false && $.ui.ddmanager && !o.dropBehaviour) {
				$.ui.ddmanager.prepareOffsets(this, event);
			}
		}

		//Regenerate the absolute position used for position checks
		this.positionAbs = this._convertPositionTo("absolute");

		//Set the helper position
		if(!this.options.axis || this.options.axis !== "y") {
			this.helper[0].style.left = this.position.left+"px";
		}
		if(!this.options.axis || this.options.axis !== "x") {
			this.helper[0].style.top = this.position.top+"px";
		}

		//Rearrange
		for (i = this.items.length - 1; i >= 0; i--) {

			//Cache variables and intersection, continue if no intersection
			item = this.items[i];
			itemElement = item.item[0];
			intersection = this._intersectsWithPointer(item);
			if (!intersection) {
				continue;
			}

			// Only put the placeholder inside the current Container, skip all
			// items from other containers. This works because when moving
			// an item from one container to another the
			// currentContainer is switched before the placeholder is moved.
			//
			// Without this, moving items in "sub-sortables" can cause
			// the placeholder to jitter between the outer and inner container.
			if (item.instance !== this.currentContainer) {
				continue;
			}

			// cannot intersect with itself
			// no useless actions that have been done before
			// no action if the item moved is the parent of the item checked
			if (itemElement !== this.currentItem[0] &&
				this.placeholder[intersection === 1 ? "next" : "prev"]()[0] !== itemElement &&
				!$.contains(this.placeholder[0], itemElement) &&
				(this.options.type === "semi-dynamic" ? !$.contains(this.element[0], itemElement) : true)
			) {

				this.direction = intersection === 1 ? "down" : "up";

				if (this.options.tolerance === "pointer" || this._intersectsWithSides(item)) {
					this._rearrange(event, item);
				} else {
					break;
				}

				this._trigger("change", event, this._uiHash());
				break;
			}
		}

		//Post events to containers
		this._contactContainers(event);

		//Interconnect with droppables
		if($.ui.ddmanager) {
			$.ui.ddmanager.drag(this, event);
		}

		//Call callbacks
		this._trigger("sort", event, this._uiHash());

		this.lastPositionAbs = this.positionAbs;
		return false;

	},

	_mouseStop: function(event, noPropagation) {

		if(!event) {
			return;
		}

		//If we are using droppables, inform the manager about the drop
		if ($.ui.ddmanager && !this.options.dropBehaviour) {
			$.ui.ddmanager.drop(this, event);
		}

		if(this.options.revert) {
			var that = this,
				cur = this.placeholder.offset(),
				axis = this.options.axis,
				animation = {};

			if ( !axis || axis === "x" ) {
				animation.left = cur.left - this.offset.parent.left - this.margins.left + (this.offsetParent[0] === this.document[0].body ? 0 : this.offsetParent[0].scrollLeft);
			}
			if ( !axis || axis === "y" ) {
				animation.top = cur.top - this.offset.parent.top - this.margins.top + (this.offsetParent[0] === this.document[0].body ? 0 : this.offsetParent[0].scrollTop);
			}
			this.reverting = true;
			$(this.helper).animate( animation, parseInt(this.options.revert, 10) || 500, function() {
				that._clear(event);
			});
		} else {
			this._clear(event, noPropagation);
		}

		return false;

	},

	cancel: function() {

		if(this.dragging) {

			this._mouseUp({ target: null });

			if(this.options.helper === "original") {
				this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper");
			} else {
				this.currentItem.show();
			}

			//Post deactivating events to containers
			for (var i = this.containers.length - 1; i >= 0; i--){
				this.containers[i]._trigger("deactivate", null, this._uiHash(this));
				if(this.containers[i].containerCache.over) {
					this.containers[i]._trigger("out", null, this._uiHash(this));
					this.containers[i].containerCache.over = 0;
				}
			}

		}

		if (this.placeholder) {
			//$(this.placeholder[0]).remove(); would have been the jQuery way - unfortunately, it unbinds ALL events from the original node!
			if(this.placeholder[0].parentNode) {
				this.placeholder[0].parentNode.removeChild(this.placeholder[0]);
			}
			if(this.options.helper !== "original" && this.helper && this.helper[0].parentNode) {
				this.helper.remove();
			}

			$.extend(this, {
				helper: null,
				dragging: false,
				reverting: false,
				_noFinalSort: null
			});

			if(this.domPosition.prev) {
				$(this.domPosition.prev).after(this.currentItem);
			} else {
				$(this.domPosition.parent).prepend(this.currentItem);
			}
		}

		return this;

	},

	serialize: function(o) {

		var items = this._getItemsAsjQuery(o && o.connected),
			str = [];
		o = o || {};

		$(items).each(function() {
			var res = ($(o.item || this).attr(o.attribute || "id") || "").match(o.expression || (/(.+)[\-=_](.+)/));
			if (res) {
				str.push((o.key || res[1]+"[]")+"="+(o.key && o.expression ? res[1] : res[2]));
			}
		});

		if(!str.length && o.key) {
			str.push(o.key + "=");
		}

		return str.join("&");

	},

	toArray: function(o) {

		var items = this._getItemsAsjQuery(o && o.connected),
			ret = [];

		o = o || {};

		items.each(function() { ret.push($(o.item || this).attr(o.attribute || "id") || ""); });
		return ret;

	},

	/* Be careful with the following core functions */
	_intersectsWith: function(item) {

		var x1 = this.positionAbs.left,
			x2 = x1 + this.helperProportions.width,
			y1 = this.positionAbs.top,
			y2 = y1 + this.helperProportions.height,
			l = item.left,
			r = l + item.width,
			t = item.top,
			b = t + item.height,
			dyClick = this.offset.click.top,
			dxClick = this.offset.click.left,
			isOverElementHeight = ( this.options.axis === "x" ) || ( ( y1 + dyClick ) > t && ( y1 + dyClick ) < b ),
			isOverElementWidth = ( this.options.axis === "y" ) || ( ( x1 + dxClick ) > l && ( x1 + dxClick ) < r ),
			isOverElement = isOverElementHeight && isOverElementWidth;

		if ( this.options.tolerance === "pointer" ||
			this.options.forcePointerForContainers ||
			(this.options.tolerance !== "pointer" && this.helperProportions[this.floating ? "width" : "height"] > item[this.floating ? "width" : "height"])
		) {
			return isOverElement;
		} else {

			return (l < x1 + (this.helperProportions.width / 2) && // Right Half
				x2 - (this.helperProportions.width / 2) < r && // Left Half
				t < y1 + (this.helperProportions.height / 2) && // Bottom Half
				y2 - (this.helperProportions.height / 2) < b ); // Top Half

		}
	},

	_intersectsWithPointer: function(item) {

		var isOverElementHeight = (this.options.axis === "x") || this._isOverAxis(this.positionAbs.top + this.offset.click.top, item.top, item.height),
			isOverElementWidth = (this.options.axis === "y") || this._isOverAxis(this.positionAbs.left + this.offset.click.left, item.left, item.width),
			isOverElement = isOverElementHeight && isOverElementWidth,
			verticalDirection = this._getDragVerticalDirection(),
			horizontalDirection = this._getDragHorizontalDirection();

		if (!isOverElement) {
			return false;
		}

		return this.floating ?
			( ((horizontalDirection && horizontalDirection === "right") || verticalDirection === "down") ? 2 : 1 )
			: ( verticalDirection && (verticalDirection === "down" ? 2 : 1) );

	},

	_intersectsWithSides: function(item) {

		var isOverBottomHalf = this._isOverAxis(this.positionAbs.top + this.offset.click.top, item.top + (item.height/2), item.height),
			isOverRightHalf = this._isOverAxis(this.positionAbs.left + this.offset.click.left, item.left + (item.width/2), item.width),
			verticalDirection = this._getDragVerticalDirection(),
			horizontalDirection = this._getDragHorizontalDirection();

		if (this.floating && horizontalDirection) {
			return ((horizontalDirection === "right" && isOverRightHalf) || (horizontalDirection === "left" && !isOverRightHalf));
		} else {
			return verticalDirection && ((verticalDirection === "down" && isOverBottomHalf) || (verticalDirection === "up" && !isOverBottomHalf));
		}

	},

	_getDragVerticalDirection: function() {
		var delta = this.positionAbs.top - this.lastPositionAbs.top;
		return delta !== 0 && (delta > 0 ? "down" : "up");
	},

	_getDragHorizontalDirection: function() {
		var delta = this.positionAbs.left - this.lastPositionAbs.left;
		return delta !== 0 && (delta > 0 ? "right" : "left");
	},

	refresh: function(event) {
		this._refreshItems(event);
		this._setHandleClassName();
		this.refreshPositions();
		return this;
	},

	_connectWith: function() {
		var options = this.options;
		return options.connectWith.constructor === String ? [options.connectWith] : options.connectWith;
	},

	_getItemsAsjQuery: function(connected) {

		var i, j, cur, inst,
			items = [],
			queries = [],
			connectWith = this._connectWith();

		if(connectWith && connected) {
			for (i = connectWith.length - 1; i >= 0; i--){
				cur = $(connectWith[i], this.document[0]);
				for ( j = cur.length - 1; j >= 0; j--){
					inst = $.data(cur[j], this.widgetFullName);
					if(inst && inst !== this && !inst.options.disabled) {
						queries.push([$.isFunction(inst.options.items) ? inst.options.items.call(inst.element) : $(inst.options.items, inst.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), inst]);
					}
				}
			}
		}

		queries.push([$.isFunction(this.options.items) ? this.options.items.call(this.element, null, { options: this.options, item: this.currentItem }) : $(this.options.items, this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), this]);

		function addItems() {
			items.push( this );
		}
		for (i = queries.length - 1; i >= 0; i--){
			queries[i][0].each( addItems );
		}

		return $(items);

	},

	_removeCurrentsFromItems: function() {

		var list = this.currentItem.find(":data(" + this.widgetName + "-item)");

		this.items = $.grep(this.items, function (item) {
			for (var j=0; j < list.length; j++) {
				if(list[j] === item.item[0]) {
					return false;
				}
			}
			return true;
		});

	},

	_refreshItems: function(event) {

		this.items = [];
		this.containers = [this];

		var i, j, cur, inst, targetData, _queries, item, queriesLength,
			items = this.items,
			queries = [[$.isFunction(this.options.items) ? this.options.items.call(this.element[0], event, { item: this.currentItem }) : $(this.options.items, this.element), this]],
			connectWith = this._connectWith();

		if(connectWith && this.ready) { //Shouldn't be run the first time through due to massive slow-down
			for (i = connectWith.length - 1; i >= 0; i--){
				cur = $(connectWith[i], this.document[0]);
				for (j = cur.length - 1; j >= 0; j--){
					inst = $.data(cur[j], this.widgetFullName);
					if(inst && inst !== this && !inst.options.disabled) {
						queries.push([$.isFunction(inst.options.items) ? inst.options.items.call(inst.element[0], event, { item: this.currentItem }) : $(inst.options.items, inst.element), inst]);
						this.containers.push(inst);
					}
				}
			}
		}

		for (i = queries.length - 1; i >= 0; i--) {
			targetData = queries[i][1];
			_queries = queries[i][0];

			for (j=0, queriesLength = _queries.length; j < queriesLength; j++) {
				item = $(_queries[j]);

				item.data(this.widgetName + "-item", targetData); // Data for target checking (mouse manager)

				items.push({
					item: item,
					instance: targetData,
					width: 0, height: 0,
					left: 0, top: 0
				});
			}
		}

	},

	refreshPositions: function(fast) {

		// Determine whether items are being displayed horizontally
		this.floating = this.items.length ?
			this.options.axis === "x" || this._isFloating( this.items[ 0 ].item ) :
			false;

		//This has to be redone because due to the item being moved out/into the offsetParent, the offsetParent's position will change
		if(this.offsetParent && this.helper) {
			this.offset.parent = this._getParentOffset();
		}

		var i, item, t, p;

		for (i = this.items.length - 1; i >= 0; i--){
			item = this.items[i];

			//We ignore calculating positions of all connected containers when we're not over them
			if(item.instance !== this.currentContainer && this.currentContainer && item.item[0] !== this.currentItem[0]) {
				continue;
			}

			t = this.options.toleranceElement ? $(this.options.toleranceElement, item.item) : item.item;

			if (!fast) {
				item.width = t.outerWidth();
				item.height = t.outerHeight();
			}

			p = t.offset();
			item.left = p.left;
			item.top = p.top;
		}

		if(this.options.custom && this.options.custom.refreshContainers) {
			this.options.custom.refreshContainers.call(this);
		} else {
			for (i = this.containers.length - 1; i >= 0; i--){
				p = this.containers[i].element.offset();
				this.containers[i].containerCache.left = p.left;
				this.containers[i].containerCache.top = p.top;
				this.containers[i].containerCache.width = this.containers[i].element.outerWidth();
				this.containers[i].containerCache.height = this.containers[i].element.outerHeight();
			}
		}

		return this;
	},

	_createPlaceholder: function(that) {
		that = that || this;
		var className,
			o = that.options;

		if(!o.placeholder || o.placeholder.constructor === String) {
			className = o.placeholder;
			o.placeholder = {
				element: function() {

					var nodeName = that.currentItem[0].nodeName.toLowerCase(),
						element = $( "<" + nodeName + ">", that.document[0] )
							.addClass(className || that.currentItem[0].className+" ui-sortable-placeholder")
							.removeClass("ui-sortable-helper");

					if ( nodeName === "tbody" ) {
						that._createTrPlaceholder(
							that.currentItem.find( "tr" ).eq( 0 ),
							$( "<tr>", that.document[ 0 ] ).appendTo( element )
						);
					} else if ( nodeName === "tr" ) {
						that._createTrPlaceholder( that.currentItem, element );
					} else if ( nodeName === "img" ) {
						element.attr( "src", that.currentItem.attr( "src" ) );
					}

					if ( !className ) {
						element.css( "visibility", "hidden" );
					}

					return element;
				},
				update: function(container, p) {

					// 1. If a className is set as 'placeholder option, we don't force sizes - the class is responsible for that
					// 2. The option 'forcePlaceholderSize can be enabled to force it even if a class name is specified
					if(className && !o.forcePlaceholderSize) {
						return;
					}

					//If the element doesn't have a actual height by itself (without styles coming from a stylesheet), it receives the inline height from the dragged item
					if(!p.height()) { p.height(that.currentItem.innerHeight() - parseInt(that.currentItem.css("paddingTop")||0, 10) - parseInt(that.currentItem.css("paddingBottom")||0, 10)); }
					if(!p.width()) { p.width(that.currentItem.innerWidth() - parseInt(that.currentItem.css("paddingLeft")||0, 10) - parseInt(that.currentItem.css("paddingRight")||0, 10)); }
				}
			};
		}

		//Create the placeholder
		that.placeholder = $(o.placeholder.element.call(that.element, that.currentItem));

		//Append it after the actual current item
		that.currentItem.after(that.placeholder);

		//Update the size of the placeholder (TODO: Logic to fuzzy, see line 316/317)
		o.placeholder.update(that, that.placeholder);

	},

	_createTrPlaceholder: function( sourceTr, targetTr ) {
		var that = this;

		sourceTr.children().each(function() {
			$( "<td>&#160;</td>", that.document[ 0 ] )
				.attr( "colspan", $( this ).attr( "colspan" ) || 1 )
				.appendTo( targetTr );
		});
	},

	_contactContainers: function(event) {
		var i, j, dist, itemWithLeastDistance, posProperty, sizeProperty, cur, nearBottom, floating, axis,
			innermostContainer = null,
			innermostIndex = null;

		// get innermost container that intersects with item
		for (i = this.containers.length - 1; i >= 0; i--) {

			// never consider a container that's located within the item itself
			if($.contains(this.currentItem[0], this.containers[i].element[0])) {
				continue;
			}

			if(this._intersectsWith(this.containers[i].containerCache)) {

				// if we've already found a container and it's more "inner" than this, then continue
				if(innermostContainer && $.contains(this.containers[i].element[0], innermostContainer.element[0])) {
					continue;
				}

				innermostContainer = this.containers[i];
				innermostIndex = i;

			} else {
				// container doesn't intersect. trigger "out" event if necessary
				if(this.containers[i].containerCache.over) {
					this.containers[i]._trigger("out", event, this._uiHash(this));
					this.containers[i].containerCache.over = 0;
				}
			}

		}

		// if no intersecting containers found, return
		if(!innermostContainer) {
			return;
		}

		// move the item into the container if it's not there already
		if(this.containers.length === 1) {
			if (!this.containers[innermostIndex].containerCache.over) {
				this.containers[innermostIndex]._trigger("over", event, this._uiHash(this));
				this.containers[innermostIndex].containerCache.over = 1;
			}
		} else {

			//When entering a new container, we will find the item with the least distance and append our item near it
			dist = 10000;
			itemWithLeastDistance = null;
			floating = innermostContainer.floating || this._isFloating(this.currentItem);
			posProperty = floating ? "left" : "top";
			sizeProperty = floating ? "width" : "height";
			axis = floating ? "clientX" : "clientY";

			for (j = this.items.length - 1; j >= 0; j--) {
				if(!$.contains(this.containers[innermostIndex].element[0], this.items[j].item[0])) {
					continue;
				}
				if(this.items[j].item[0] === this.currentItem[0]) {
					continue;
				}

				cur = this.items[j].item.offset()[posProperty];
				nearBottom = false;
				if ( event[ axis ] - cur > this.items[ j ][ sizeProperty ] / 2 ) {
					nearBottom = true;
				}

				if ( Math.abs( event[ axis ] - cur ) < dist ) {
					dist = Math.abs( event[ axis ] - cur );
					itemWithLeastDistance = this.items[ j ];
					this.direction = nearBottom ? "up": "down";
				}
			}

			//Check if dropOnEmpty is enabled
			if(!itemWithLeastDistance && !this.options.dropOnEmpty) {
				return;
			}

			if(this.currentContainer === this.containers[innermostIndex]) {
				if ( !this.currentContainer.containerCache.over ) {
					this.containers[ innermostIndex ]._trigger( "over", event, this._uiHash() );
					this.currentContainer.containerCache.over = 1;
				}
				return;
			}

			itemWithLeastDistance ? this._rearrange(event, itemWithLeastDistance, null, true) : this._rearrange(event, null, this.containers[innermostIndex].element, true);
			this._trigger("change", event, this._uiHash());
			this.containers[innermostIndex]._trigger("change", event, this._uiHash(this));
			this.currentContainer = this.containers[innermostIndex];

			//Update the placeholder
			this.options.placeholder.update(this.currentContainer, this.placeholder);

			this.containers[innermostIndex]._trigger("over", event, this._uiHash(this));
			this.containers[innermostIndex].containerCache.over = 1;
		}


	},

	_createHelper: function(event) {

		var o = this.options,
			helper = $.isFunction(o.helper) ? $(o.helper.apply(this.element[0], [event, this.currentItem])) : (o.helper === "clone" ? this.currentItem.clone() : this.currentItem);

		//Add the helper to the DOM if that didn't happen already
		if(!helper.parents("body").length) {
			$(o.appendTo !== "parent" ? o.appendTo : this.currentItem[0].parentNode)[0].appendChild(helper[0]);
		}

		if(helper[0] === this.currentItem[0]) {
			this._storedCSS = { width: this.currentItem[0].style.width, height: this.currentItem[0].style.height, position: this.currentItem.css("position"), top: this.currentItem.css("top"), left: this.currentItem.css("left") };
		}

		if(!helper[0].style.width || o.forceHelperSize) {
			helper.width(this.currentItem.width());
		}
		if(!helper[0].style.height || o.forceHelperSize) {
			helper.height(this.currentItem.height());
		}

		return helper;

	},

	_adjustOffsetFromHelper: function(obj) {
		if (typeof obj === "string") {
			obj = obj.split(" ");
		}
		if ($.isArray(obj)) {
			obj = {left: +obj[0], top: +obj[1] || 0};
		}
		if ("left" in obj) {
			this.offset.click.left = obj.left + this.margins.left;
		}
		if ("right" in obj) {
			this.offset.click.left = this.helperProportions.width - obj.right + this.margins.left;
		}
		if ("top" in obj) {
			this.offset.click.top = obj.top + this.margins.top;
		}
		if ("bottom" in obj) {
			this.offset.click.top = this.helperProportions.height - obj.bottom + this.margins.top;
		}
	},

	_getParentOffset: function() {


		//Get the offsetParent and cache its position
		this.offsetParent = this.helper.offsetParent();
		var po = this.offsetParent.offset();

		// This is a special case where we need to modify a offset calculated on start, since the following happened:
		// 1. The position of the helper is absolute, so it's position is calculated based on the next positioned parent
		// 2. The actual offset parent is a child of the scroll parent, and the scroll parent isn't the document, which means that
		//	the scroll is included in the initial calculation of the offset of the parent, and never recalculated upon drag
		if(this.cssPosition === "absolute" && this.scrollParent[0] !== this.document[0] && $.contains(this.scrollParent[0], this.offsetParent[0])) {
			po.left += this.scrollParent.scrollLeft();
			po.top += this.scrollParent.scrollTop();
		}

		// This needs to be actually done for all browsers, since pageX/pageY includes this information
		// with an ugly IE fix
		if( this.offsetParent[0] === this.document[0].body || (this.offsetParent[0].tagName && this.offsetParent[0].tagName.toLowerCase() === "html" && $.ui.ie)) {
			po = { top: 0, left: 0 };
		}

		return {
			top: po.top + (parseInt(this.offsetParent.css("borderTopWidth"),10) || 0),
			left: po.left + (parseInt(this.offsetParent.css("borderLeftWidth"),10) || 0)
		};

	},

	_getRelativeOffset: function() {

		if(this.cssPosition === "relative") {
			var p = this.currentItem.position();
			return {
				top: p.top - (parseInt(this.helper.css("top"),10) || 0) + this.scrollParent.scrollTop(),
				left: p.left - (parseInt(this.helper.css("left"),10) || 0) + this.scrollParent.scrollLeft()
			};
		} else {
			return { top: 0, left: 0 };
		}

	},

	_cacheMargins: function() {
		this.margins = {
			left: (parseInt(this.currentItem.css("marginLeft"),10) || 0),
			top: (parseInt(this.currentItem.css("marginTop"),10) || 0)
		};
	},

	_cacheHelperProportions: function() {
		this.helperProportions = {
			width: this.helper.outerWidth(),
			height: this.helper.outerHeight()
		};
	},

	_setContainment: function() {

		var ce, co, over,
			o = this.options;
		if(o.containment === "parent") {
			o.containment = this.helper[0].parentNode;
		}
		if(o.containment === "document" || o.containment === "window") {
			this.containment = [
				0 - this.offset.relative.left - this.offset.parent.left,
				0 - this.offset.relative.top - this.offset.parent.top,
				o.containment === "document" ? this.document.width() : this.window.width() - this.helperProportions.width - this.margins.left,
				(o.containment === "document" ? this.document.width() : this.window.height() || this.document[0].body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top
			];
		}

		if(!(/^(document|window|parent)$/).test(o.containment)) {
			ce = $(o.containment)[0];
			co = $(o.containment).offset();
			over = ($(ce).css("overflow") !== "hidden");

			this.containment = [
				co.left + (parseInt($(ce).css("borderLeftWidth"),10) || 0) + (parseInt($(ce).css("paddingLeft"),10) || 0) - this.margins.left,
				co.top + (parseInt($(ce).css("borderTopWidth"),10) || 0) + (parseInt($(ce).css("paddingTop"),10) || 0) - this.margins.top,
				co.left+(over ? Math.max(ce.scrollWidth,ce.offsetWidth) : ce.offsetWidth) - (parseInt($(ce).css("borderLeftWidth"),10) || 0) - (parseInt($(ce).css("paddingRight"),10) || 0) - this.helperProportions.width - this.margins.left,
				co.top+(over ? Math.max(ce.scrollHeight,ce.offsetHeight) : ce.offsetHeight) - (parseInt($(ce).css("borderTopWidth"),10) || 0) - (parseInt($(ce).css("paddingBottom"),10) || 0) - this.helperProportions.height - this.margins.top
			];
		}

	},

	_convertPositionTo: function(d, pos) {

		if(!pos) {
			pos = this.position;
		}
		var mod = d === "absolute" ? 1 : -1,
			scroll = this.cssPosition === "absolute" && !(this.scrollParent[0] !== this.document[0] && $.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent,
			scrollIsRootNode = (/(html|body)/i).test(scroll[0].tagName);

		return {
			top: (
				pos.top	+																// The absolute mouse position
				this.offset.relative.top * mod +										// Only for relative positioned nodes: Relative offset from element to offset parent
				this.offset.parent.top * mod -											// The offsetParent's offset without borders (offset + border)
				( ( this.cssPosition === "fixed" ? -this.scrollParent.scrollTop() : ( scrollIsRootNode ? 0 : scroll.scrollTop() ) ) * mod)
			),
			left: (
				pos.left +																// The absolute mouse position
				this.offset.relative.left * mod +										// Only for relative positioned nodes: Relative offset from element to offset parent
				this.offset.parent.left * mod	-										// The offsetParent's offset without borders (offset + border)
				( ( this.cssPosition === "fixed" ? -this.scrollParent.scrollLeft() : scrollIsRootNode ? 0 : scroll.scrollLeft() ) * mod)
			)
		};

	},

	_generatePosition: function(event) {

		var top, left,
			o = this.options,
			pageX = event.pageX,
			pageY = event.pageY,
			scroll = this.cssPosition === "absolute" && !(this.scrollParent[0] !== this.document[0] && $.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent, scrollIsRootNode = (/(html|body)/i).test(scroll[0].tagName);

		// This is another very weird special case that only happens for relative elements:
		// 1. If the css position is relative
		// 2. and the scroll parent is the document or similar to the offset parent
		// we have to refresh the relative offset during the scroll so there are no jumps
		if(this.cssPosition === "relative" && !(this.scrollParent[0] !== this.document[0] && this.scrollParent[0] !== this.offsetParent[0])) {
			this.offset.relative = this._getRelativeOffset();
		}

		/*
		 * - Position constraining -
		 * Constrain the position to a mix of grid, containment.
		 */

		if(this.originalPosition) { //If we are not dragging yet, we won't check for options

			if(this.containment) {
				if(event.pageX - this.offset.click.left < this.containment[0]) {
					pageX = this.containment[0] + this.offset.click.left;
				}
				if(event.pageY - this.offset.click.top < this.containment[1]) {
					pageY = this.containment[1] + this.offset.click.top;
				}
				if(event.pageX - this.offset.click.left > this.containment[2]) {
					pageX = this.containment[2] + this.offset.click.left;
				}
				if(event.pageY - this.offset.click.top > this.containment[3]) {
					pageY = this.containment[3] + this.offset.click.top;
				}
			}

			if(o.grid) {
				top = this.originalPageY + Math.round((pageY - this.originalPageY) / o.grid[1]) * o.grid[1];
				pageY = this.containment ? ( (top - this.offset.click.top >= this.containment[1] && top - this.offset.click.top <= this.containment[3]) ? top : ((top - this.offset.click.top >= this.containment[1]) ? top - o.grid[1] : top + o.grid[1])) : top;

				left = this.originalPageX + Math.round((pageX - this.originalPageX) / o.grid[0]) * o.grid[0];
				pageX = this.containment ? ( (left - this.offset.click.left >= this.containment[0] && left - this.offset.click.left <= this.containment[2]) ? left : ((left - this.offset.click.left >= this.containment[0]) ? left - o.grid[0] : left + o.grid[0])) : left;
			}

		}

		return {
			top: (
				pageY -																// The absolute mouse position
				this.offset.click.top -													// Click offset (relative to the element)
				this.offset.relative.top	-											// Only for relative positioned nodes: Relative offset from element to offset parent
				this.offset.parent.top +												// The offsetParent's offset without borders (offset + border)
				( ( this.cssPosition === "fixed" ? -this.scrollParent.scrollTop() : ( scrollIsRootNode ? 0 : scroll.scrollTop() ) ))
			),
			left: (
				pageX -																// The absolute mouse position
				this.offset.click.left -												// Click offset (relative to the element)
				this.offset.relative.left	-											// Only for relative positioned nodes: Relative offset from element to offset parent
				this.offset.parent.left +												// The offsetParent's offset without borders (offset + border)
				( ( this.cssPosition === "fixed" ? -this.scrollParent.scrollLeft() : scrollIsRootNode ? 0 : scroll.scrollLeft() ))
			)
		};

	},

	_rearrange: function(event, i, a, hardRefresh) {

		a ? a[0].appendChild(this.placeholder[0]) : i.item[0].parentNode.insertBefore(this.placeholder[0], (this.direction === "down" ? i.item[0] : i.item[0].nextSibling));

		//Various things done here to improve the performance:
		// 1. we create a setTimeout, that calls refreshPositions
		// 2. on the instance, we have a counter variable, that get's higher after every append
		// 3. on the local scope, we copy the counter variable, and check in the timeout, if it's still the same
		// 4. this lets only the last addition to the timeout stack through
		this.counter = this.counter ? ++this.counter : 1;
		var counter = this.counter;

		this._delay(function() {
			if(counter === this.counter) {
				this.refreshPositions(!hardRefresh); //Precompute after each DOM insertion, NOT on mousemove
			}
		});

	},

	_clear: function(event, noPropagation) {

		this.reverting = false;
		// We delay all events that have to be triggered to after the point where the placeholder has been removed and
		// everything else normalized again
		var i,
			delayedTriggers = [];

		// We first have to update the dom position of the actual currentItem
		// Note: don't do it if the current item is already removed (by a user), or it gets reappended (see #4088)
		if(!this._noFinalSort && this.currentItem.parent().length) {
			this.placeholder.before(this.currentItem);
		}
		this._noFinalSort = null;

		if(this.helper[0] === this.currentItem[0]) {
			for(i in this._storedCSS) {
				if(this._storedCSS[i] === "auto" || this._storedCSS[i] === "static") {
					this._storedCSS[i] = "";
				}
			}
			this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper");
		} else {
			this.currentItem.show();
		}

		if(this.fromOutside && !noPropagation) {
			delayedTriggers.push(function(event) { this._trigger("receive", event, this._uiHash(this.fromOutside)); });
		}
		if((this.fromOutside || this.domPosition.prev !== this.currentItem.prev().not(".ui-sortable-helper")[0] || this.domPosition.parent !== this.currentItem.parent()[0]) && !noPropagation) {
			delayedTriggers.push(function(event) { this._trigger("update", event, this._uiHash()); }); //Trigger update callback if the DOM position has changed
		}

		// Check if the items Container has Changed and trigger appropriate
		// events.
		if (this !== this.currentContainer) {
			if(!noPropagation) {
				delayedTriggers.push(function(event) { this._trigger("remove", event, this._uiHash()); });
				delayedTriggers.push((function(c) { return function(event) { c._trigger("receive", event, this._uiHash(this)); };  }).call(this, this.currentContainer));
				delayedTriggers.push((function(c) { return function(event) { c._trigger("update", event, this._uiHash(this));  }; }).call(this, this.currentContainer));
			}
		}


		//Post events to containers
		function delayEvent( type, instance, container ) {
			return function( event ) {
				container._trigger( type, event, instance._uiHash( instance ) );
			};
		}
		for (i = this.containers.length - 1; i >= 0; i--){
			if (!noPropagation) {
				delayedTriggers.push( delayEvent( "deactivate", this, this.containers[ i ] ) );
			}
			if(this.containers[i].containerCache.over) {
				delayedTriggers.push( delayEvent( "out", this, this.containers[ i ] ) );
				this.containers[i].containerCache.over = 0;
			}
		}

		//Do what was originally in plugins
		if ( this.storedCursor ) {
			this.document.find( "body" ).css( "cursor", this.storedCursor );
			this.storedStylesheet.remove();
		}
		if(this._storedOpacity) {
			this.helper.css("opacity", this._storedOpacity);
		}
		if(this._storedZIndex) {
			this.helper.css("zIndex", this._storedZIndex === "auto" ? "" : this._storedZIndex);
		}

		this.dragging = false;

		if(!noPropagation) {
			this._trigger("beforeStop", event, this._uiHash());
		}

		//$(this.placeholder[0]).remove(); would have been the jQuery way - unfortunately, it unbinds ALL events from the original node!
		this.placeholder[0].parentNode.removeChild(this.placeholder[0]);

		if ( !this.cancelHelperRemoval ) {
			if ( this.helper[ 0 ] !== this.currentItem[ 0 ] ) {
				this.helper.remove();
			}
			this.helper = null;
		}

		if(!noPropagation) {
			for (i=0; i < delayedTriggers.length; i++) {
				delayedTriggers[i].call(this, event);
			} //Trigger all delayed events
			this._trigger("stop", event, this._uiHash());
		}

		this.fromOutside = false;
		return !this.cancelHelperRemoval;

	},

	_trigger: function() {
		if ($.Widget.prototype._trigger.apply(this, arguments) === false) {
			this.cancel();
		}
	},

	_uiHash: function(_inst) {
		var inst = _inst || this;
		return {
			helper: inst.helper,
			placeholder: inst.placeholder || $([]),
			position: inst.position,
			originalPosition: inst.originalPosition,
			offset: inst.positionAbs,
			item: inst.currentItem,
			sender: _inst ? _inst.element : null
		};
	}

})}));

!function(e,t,r){"function"==typeof define_?define_(t):"undefined"!=typeof module&&module.exports?module.exports=t():r[e]=t()}("IDBStore",function(){var e=function(e){throw e},t=function(){},r={storeName:"Store",storePrefix:"IDBWrapper-",dbVersion:1,keyPath:"id",autoIncrement:!0,onStoreReady:function(){},onError:e,indexes:[]},n=function(e,t){"undefined"==typeof t&&"function"==typeof e&&(t=e),"[object Object]"!=Object.prototype.toString.call(e)&&(e={});for(var n in r)this[n]="undefined"!=typeof e[n]?e[n]:r[n];this.dbName=this.storePrefix+this.storeName,this.dbVersion=parseInt(this.dbVersion,10)||1,t&&(this.onStoreReady=t),n="object"==typeof window?window:self,this.idb=n.shimIndexedDB||n.indexedDB||n.webkitIndexedDB||n.mozIndexedDB,this.keyRange=n.IDBKeyRange||n.webkitIDBKeyRange||n.mozIDBKeyRange,this.consts={READ_ONLY:"readonly",READ_WRITE:"readwrite",VERSION_CHANGE:"versionchange",NEXT:"next",NEXT_NO_DUPLICATE:"nextunique",PREV:"prev",PREV_NO_DUPLICATE:"prevunique"},this.openDB()};n.prototype={constructor:n,version:"1.6.0",db:null,dbName:null,dbVersion:null,store:null,storeName:null,storePrefix:null,keyPath:null,autoIncrement:null,indexes:null,onStoreReady:null,onError:null,_insertIdCount:0,openDB:function(){var e=this.idb.open(this.dbName,this.dbVersion),t=!1;e.onerror=function(e){var t=!1;"error"in e.target?t="VersionError"==e.target.error.name:"errorCode"in e.target&&(t=12==e.target.errorCode),t?this.onError(Error("The version number provided is lower than the existing one.")):this.onError(e)}.bind(this),e.onsuccess=function(e){if(!t)if(this.db)this.onStoreReady();else if(this.db=e.target.result,"string"==typeof this.db.version)this.onError(Error("The IndexedDB implementation in this browser is outdated. Please upgrade your browser."));else if(this.db.objectStoreNames.contains(this.storeName)){this.store=this.db.transaction([this.storeName],this.consts.READ_ONLY).objectStore(this.storeName);var r=Array.prototype.slice.call(this.getIndexList());this.indexes.forEach(function(e){var n=e.name;n?(this.normalizeIndexData(e),this.hasIndex(n)?(this.indexComplies(this.store.index(n),e)||(t=!0,this.onError(Error('Cannot modify index "'+n+'" for current version. Please bump version number to '+(this.dbVersion+1)+"."))),r.splice(r.indexOf(n),1)):(t=!0,this.onError(Error('Cannot create new index "'+n+'" for current version. Please bump version number to '+(this.dbVersion+1)+".")))):(t=!0,this.onError(Error("Cannot create index: No index name given.")))},this),r.length&&(t=!0,this.onError(Error('Cannot delete index(es) "'+r.toString()+'" for current version. Please bump version number to '+(this.dbVersion+1)+"."))),t||this.onStoreReady()}else this.onError(Error("Something is wrong with the IndexedDB implementation in this browser. Please upgrade your browser."))}.bind(this),e.onupgradeneeded=function(e){this.db=e.target.result,this.db.objectStoreNames.contains(this.storeName)?this.store=e.target.transaction.objectStore(this.storeName):(e={autoIncrement:this.autoIncrement},null!==this.keyPath&&(e.keyPath=this.keyPath),this.store=this.db.createObjectStore(this.storeName,e));var r=Array.prototype.slice.call(this.getIndexList());this.indexes.forEach(function(e){var n=e.name;n||(t=!0,this.onError(Error("Cannot create index: No index name given."))),this.normalizeIndexData(e),this.hasIndex(n)?(this.indexComplies(this.store.index(n),e)||(this.store.deleteIndex(n),this.store.createIndex(n,e.keyPath,{unique:e.unique,multiEntry:e.multiEntry})),r.splice(r.indexOf(n),1)):this.store.createIndex(n,e.keyPath,{unique:e.unique,multiEntry:e.multiEntry})},this),r.length&&r.forEach(function(e){this.store.deleteIndex(e)},this)}.bind(this)},deleteDatabase:function(e,t){if(this.idb.deleteDatabase){this.db.close();var r=this.idb.deleteDatabase(this.dbName);r.onsuccess=e,r.onerror=t}else t(Error("Browser does not support IndexedDB deleteDatabase!"))},put:function(r,n,o,i){null!==this.keyPath&&(i=o,o=n,n=r),i||(i=e),o||(o=t);var s=!1,a=null,u=this.db.transaction([this.storeName],this.consts.READ_WRITE);return u.oncomplete=function(){(s?o:i)(a)},u.onabort=i,u.onerror=i,null!==this.keyPath?(this._addIdPropertyIfNeeded(n),r=u.objectStore(this.storeName).put(n)):r=u.objectStore(this.storeName).put(n,r),r.onsuccess=function(e){s=!0,a=e.target.result},r.onerror=i,u},get:function(r,n,o){o||(o=e),n||(n=t);var i=!1,s=null,a=this.db.transaction([this.storeName],this.consts.READ_ONLY);return a.oncomplete=function(){(i?n:o)(s)},a.onabort=o,a.onerror=o,r=a.objectStore(this.storeName).get(r),r.onsuccess=function(e){i=!0,s=e.target.result},r.onerror=o,a},remove:function(r,n,o){o||(o=e),n||(n=t);var i=!1,s=null,a=this.db.transaction([this.storeName],this.consts.READ_WRITE);return a.oncomplete=function(){(i?n:o)(s)},a.onabort=o,a.onerror=o,r=a.objectStore(this.storeName)["delete"](r),r.onsuccess=function(e){i=!0,s=e.target.result},r.onerror=o,a},batch:function(r,n,o){if(o||(o=e),n||(n=t),"[object Array]"!=Object.prototype.toString.call(r))o(Error("dataArray argument must be of type Array."));else if(0===r.length)return n(!0);var i=this.db.transaction([this.storeName],this.consts.READ_WRITE);i.oncomplete=function(){(u?n:o)(u)},i.onabort=o,i.onerror=o;var s=r.length,a=!1,u=!1,c=function(){s--,0===s&&!a&&(u=a=!0)};return r.forEach(function(e){var t=e.type,r=e.key,n=e.value,e=function(e){i.abort(),a||(a=!0,o(e,t,r))};"remove"==t?(n=i.objectStore(this.storeName)["delete"](r),n.onsuccess=c,n.onerror=e):"put"==t&&(null!==this.keyPath?(this._addIdPropertyIfNeeded(n),n=i.objectStore(this.storeName).put(n)):n=i.objectStore(this.storeName).put(n,r),n.onsuccess=c,n.onerror=e)},this),i},putBatch:function(e,t,r){return this.batch(e.map(function(e){return{type:"put",value:e}}),t,r)},upsertBatch:function(r,n,o,i){"function"==typeof n&&(i=o=n,n={}),i||(i=e),o||(o=t),n||(n={}),"[object Array]"!=Object.prototype.toString.call(r)&&i(Error("dataArray argument must be of type Array."));var s=this.db.transaction([this.storeName],this.consts.READ_WRITE);s.oncomplete=function(){h?o(r):i(!1)},s.onabort=i,s.onerror=i;var a=n.keyField||this.keyPath,u=r.length,c=!1,h=!1,l=0,d=function(e){r[l++][a]=e.target.result,u--,0===u&&!c&&(h=c=!0)};return r.forEach(function(e){var t=e.key;null!==this.keyPath?(this._addIdPropertyIfNeeded(e),e=s.objectStore(this.storeName).put(e)):e=s.objectStore(this.storeName).put(e,t),e.onsuccess=d,e.onerror=function(e){s.abort(),c||(c=!0,i(e))}},this),s},removeBatch:function(e,t,r){return this.batch(e.map(function(e){return{type:"remove",key:e}}),t,r)},getBatch:function(r,n,o,i){if(o||(o=e),n||(n=t),i||(i="sparse"),"[object Array]"!=Object.prototype.toString.call(r))o(Error("keyArray argument must be of type Array."));else if(0===r.length)return n([]);var s=this.db.transaction([this.storeName],this.consts.READ_ONLY);s.oncomplete=function(){(c?n:o)(h)},s.onabort=o,s.onerror=o;var a=[],u=r.length,c=!1,h=null,l=function(e){e.target.result||"dense"==i?a.push(e.target.result):"sparse"==i&&a.length++,u--,0===u&&(c=!0,h=a)};return r.forEach(function(e){e=s.objectStore(this.storeName).get(e),e.onsuccess=l,e.onerror=function(e){h=e,o(e),s.abort()}},this),s},getAll:function(r,n){n||(n=e),r||(r=t);var o=this.db.transaction([this.storeName],this.consts.READ_ONLY),i=o.objectStore(this.storeName);return i.getAll?this._getAllNative(o,i,r,n):this._getAllCursor(o,i,r,n),o},_getAllNative:function(e,t,r,n){var o=!1,i=null;e.oncomplete=function(){(o?r:n)(i)},e.onabort=n,e.onerror=n,e=t.getAll(),e.onsuccess=function(e){o=!0,i=e.target.result},e.onerror=n},_getAllCursor:function(e,t,r,n){var o=[],i=!1,s=null;e.oncomplete=function(){(i?r:n)(s)},e.onabort=n,e.onerror=n,e=t.openCursor(),e.onsuccess=function(e){(e=e.target.result)?(o.push(e.value),e["continue"]()):(i=!0,s=o)},e.onError=n},clear:function(r,n){n||(n=e),r||(r=t);var o=!1,i=null,s=this.db.transaction([this.storeName],this.consts.READ_WRITE);s.oncomplete=function(){(o?r:n)(i)},s.onabort=n,s.onerror=n;var a=s.objectStore(this.storeName).clear();return a.onsuccess=function(e){o=!0,i=e.target.result},a.onerror=n,s},_addIdPropertyIfNeeded:function(e){"undefined"==typeof e[this.keyPath]&&(e[this.keyPath]=this._insertIdCount++ +Date.now())},getIndexList:function(){return this.store.indexNames},hasIndex:function(e){return this.store.indexNames.contains(e)},normalizeIndexData:function(e){e.keyPath=e.keyPath||e.name,e.unique=!!e.unique,e.multiEntry=!!e.multiEntry},indexComplies:function(e,t){return["keyPath","unique","multiEntry"].every(function(r){if("multiEntry"==r&&void 0===e[r]&&!1===t[r])return!0;if("keyPath"==r&&"[object Array]"==Object.prototype.toString.call(t[r])){var r=t.keyPath,n=e.keyPath;if("string"==typeof n)return r.toString()==n;if("function"!=typeof n.contains&&"function"!=typeof n.indexOf||n.length!==r.length)return!1;for(var o=0,i=r.length;i>o;o++)if(!(n.contains&&n.contains(r[o])||n.indexOf(-1!==r[o])))return!1;return!0}return t[r]==e[r]})},iterate:function(t,r){var r=i({index:null,order:"ASC",autoContinue:!0,filterDuplicates:!1,keyRange:null,writeAccess:!1,onEnd:null,onError:e,limit:1/0,offset:0},r||{}),n="desc"==r.order.toLowerCase()?"PREV":"NEXT";r.filterDuplicates&&(n+="_NO_DUPLICATE");var o=!1,s=this.db.transaction([this.storeName],this.consts[r.writeAccess?"READ_WRITE":"READ_ONLY"]),a=s.objectStore(this.storeName);r.index&&(a=a.index(r.index));var u=0;return s.oncomplete=function(){o?r.onEnd?r.onEnd():t(null):r.onError(null)},s.onabort=r.onError,s.onerror=r.onError,n=a.openCursor(r.keyRange,this.consts[n]),n.onerror=r.onError,n.onsuccess=function(e){(e=e.target.result)?r.offset?(e.advance(r.offset),r.offset=0):(t(e.value,e,s),u++,r.autoContinue&&(u+r.offset<r.limit?e["continue"]():o=!0)):o=!0},s},query:function(e,t){var r=[],t=t||{};return t.autoContinue=!0,t.writeAccess=!1,t.onEnd=function(){e(r)},this.iterate(function(e){r.push(e)},t)},count:function(t,r){var r=i({index:null,keyRange:null},r||{}),n=r.onError||e,o=!1,s=null,a=this.db.transaction([this.storeName],this.consts.READ_ONLY);a.oncomplete=function(){(o?t:n)(s)},a.onabort=n,a.onerror=n;var u=a.objectStore(this.storeName);return r.index&&(u=u.index(r.index)),u=u.count(r.keyRange),u.onsuccess=function(e){o=!0,s=e.target.result},u.onError=n,a},makeKeyRange:function(e){var t="undefined"!=typeof e.lower,r="undefined"!=typeof e.upper,n="undefined"!=typeof e.only;switch(!0){case n:e=this.keyRange.only(e.only);break;case t&&r:e=this.keyRange.bound(e.lower,e.upper,e.excludeLower,e.excludeUpper);break;case t:e=this.keyRange.lowerBound(e.lower,e.excludeLower);break;case r:e=this.keyRange.upperBound(e.upper,e.excludeUpper);break;default:throw Error('Cannot create KeyRange. Provide one or both of "lower" or "upper" value, or an "only" value.')}return e}};var o={},i=function(e,t){var r,n;for(r in t)n=t[r],n!==o[r]&&n!==e[r]&&(e[r]=n);return e};return n.version=n.prototype.version,n},this);

/*global window:false, self:false, define:false, module:false */

var CryptoJS = function(t, e) {
	var r = {},
		i = r.lib = {},
		n = function() {},
		o = i.Base = {
			extend: function(t) {
				n.prototype = this;
				var e = new n;
				return t && e.mixIn(t), e.hasOwnProperty("init") || (e.init = function() {
					e.$super.init.apply(this, arguments)
				}), e.init.prototype = e, e.$super = this, e
			},
			create: function() {
				var t = this.extend();
				return t.init.apply(t, arguments), t
			},
			init: function() {},
			mixIn: function(t) {
				for (var e in t) t.hasOwnProperty(e) && (this[e] = t[e]);
				t.hasOwnProperty("toString") && (this.toString = t.toString)
			},
			clone: function() {
				return this.init.prototype.extend(this)
			}
		},
		s = i.WordArray = o.extend({
			init: function(t, r) {
				t = this.words = t || [], this.sigBytes = r != e ? r : 4 * t.length
			},
			toString: function(t) {
				return (t || a).stringify(this)
			},
			concat: function(t) {
				var e = this.words,
					r = t.words,
					i = this.sigBytes;
				if (t = t.sigBytes, this.clamp(), i % 4)
					for (var n = 0; t > n; n++) e[i + n >>> 2] |= (r[n >>> 2] >>> 24 - 8 * (n % 4) & 255) << 24 - 8 * ((i + n) % 4);
				else if (65535 < r.length)
					for (n = 0; t > n; n += 4) e[i + n >>> 2] = r[n >>> 2];
				else e.push.apply(e, r);
				return this.sigBytes += t, this
			},
			clamp: function() {
				var e = this.words,
					r = this.sigBytes;
				e[r >>> 2] &= 4294967295 << 32 - 8 * (r % 4), e.length = t.ceil(r / 4)
			},
			clone: function() {
				var t = o.clone.call(this);
				return t.words = this.words.slice(0), t
			},
			random: function(e) {
				for (var r = [], i = 0; e > i; i += 4) r.push(4294967296 * t.random() | 0);
				return new s.init(r, e)
			}
		}),
		c = r.enc = {},
		a = c.Hex = {
			stringify: function(t) {
				var e = t.words;
				t = t.sigBytes;
				for (var r = [], i = 0; t > i; i++) {
					var n = e[i >>> 2] >>> 24 - 8 * (i % 4) & 255;
					r.push((n >>> 4).toString(16)), r.push((15 & n).toString(16))
				}
				return r.join("")
			},
			parse: function(t) {
				for (var e = t.length, r = [], i = 0; e > i; i += 2) r[i >>> 3] |= parseInt(t.substr(i, 2), 16) << 24 - 4 * (i % 8);
				return new s.init(r, e / 2)
			}
		},
		h = c.Latin1 = {
			stringify: function(t) {
				var e = t.words;
				t = t.sigBytes;
				for (var r = [], i = 0; t > i; i++) r.push(String.fromCharCode(e[i >>> 2] >>> 24 - 8 * (i % 4) & 255));
				return r.join("")
			},
			parse: function(t) {
				for (var e = t.length, r = [], i = 0; e > i; i++) r[i >>> 2] |= (255 & t.charCodeAt(i)) << 24 - 8 * (i % 4);
				return new s.init(r, e)
			}
		},
		f = c.Utf8 = {
			stringify: function(t) {
				try {
					return decodeURIComponent(escape(h.stringify(t)))
				} catch (e) {
					throw Error("Malformed UTF-8 data")
				}
			},
			parse: function(t) {
				return h.parse(unescape(encodeURIComponent(t)))
			}
		},
		u = i.BufferedBlockAlgorithm = o.extend({
			reset: function() {
				this._data = new s.init, this._nDataBytes = 0
			},
			_append: function(t) {
				"string" == typeof t && (t = f.parse(t)), this._data.concat(t), this._nDataBytes += t.sigBytes
			},
			_process: function(e) {
				var r = this._data,
					i = r.words,
					n = r.sigBytes,
					o = this.blockSize,
					c = n / (4 * o),
					c = e ? t.ceil(c) : t.max((0 | c) - this._minBufferSize, 0);
				if (e = c * o, n = t.min(4 * e, n), e) {
					for (var a = 0; e > a; a += o) this._doProcessBlock(i, a);
					a = i.splice(0, e), r.sigBytes -= n
				}
				return new s.init(a, n)
			},
			clone: function() {
				var t = o.clone.call(this);
				return t._data = this._data.clone(), t
			},
			_minBufferSize: 0
		});
	i.Hasher = u.extend({
		cfg: o.extend(),
		init: function(t) {
			this.cfg = this.cfg.extend(t), this.reset()
		},
		reset: function() {
			u.reset.call(this), this._doReset()
		},
		update: function(t) {
			return this._append(t), this._process(), this
		},
		finalize: function(t) {
			return t && this._append(t), this._doFinalize()
		},
		blockSize: 16,
		_createHelper: function(t) {
			return function(e, r) {
				return new t.init(r).finalize(e)
			}
		},
		_createHmacHelper: function(t) {
			return function(e, r) {
				return new l.HMAC.init(t, r).finalize(e)
			}
		}
	});
	var l = r.algo = {};
	return r
}(Math);
! function() {
	var t = CryptoJS,
		e = t.lib.WordArray;
	t.enc.Base64 = {
		stringify: function(t) {
			var e = t.words,
				r = t.sigBytes,
				i = this._map;
			t.clamp(), t = [];
			for (var n = 0; r > n; n += 3)
				for (var o = (e[n >>> 2] >>> 24 - 8 * (n % 4) & 255) << 16 | (e[n + 1 >>> 2] >>> 24 - 8 * ((n + 1) % 4) & 255) << 8 | e[n + 2 >>> 2] >>> 24 - 8 * ((n + 2) % 4) & 255, s = 0; 4 > s && r > n + .75 * s; s++) t.push(i.charAt(o >>> 6 * (3 - s) & 63));
			if (e = i.charAt(64))
				for (; t.length % 4;) t.push(e);
			return t.join("")
		},
		parse: function(t) {
			var r = t.length,
				i = this._map,
				n = i.charAt(64);
			n && (n = t.indexOf(n), -1 != n && (r = n));
			for (var n = [], o = 0, s = 0; r > s; s++)
				if (s % 4) {
					var c = i.indexOf(t.charAt(s - 1)) << 2 * (s % 4),
						a = i.indexOf(t.charAt(s)) >>> 6 - 2 * (s % 4);
					n[o >>> 2] |= (c | a) << 24 - 8 * (o % 4), o++
				}
			return e.create(n, o)
		},
		_map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
	}
}(),
function(t) {
	function e(t, e, r, i, n, o, s) {
		return t = t + (e & r | ~e & i) + n + s, (t << o | t >>> 32 - o) + e
	}

	function r(t, e, r, i, n, o, s) {
		return t = t + (e & i | r & ~i) + n + s, (t << o | t >>> 32 - o) + e
	}

	function i(t, e, r, i, n, o, s) {
		return t = t + (e ^ r ^ i) + n + s, (t << o | t >>> 32 - o) + e
	}

	function n(t, e, r, i, n, o, s) {
		return t = t + (r ^ (e | ~i)) + n + s, (t << o | t >>> 32 - o) + e
	}
	for (var o = CryptoJS, s = o.lib, c = s.WordArray, a = s.Hasher, s = o.algo, h = [], f = 0; 64 > f; f++) h[f] = 4294967296 * t.abs(t.sin(f + 1)) | 0;
	s = s.MD5 = a.extend({
		_doReset: function() {
			this._hash = new c.init([1732584193, 4023233417, 2562383102, 271733878])
		},
		_doProcessBlock: function(t, o) {
			for (var s = 0; 16 > s; s++) {
				var c = o + s,
					a = t[c];
				t[c] = 16711935 & (a << 8 | a >>> 24) | 4278255360 & (a << 24 | a >>> 8)
			}
			var s = this._hash.words,
				c = t[o + 0],
				a = t[o + 1],
				f = t[o + 2],
				u = t[o + 3],
				l = t[o + 4],
				p = t[o + 5],
				d = t[o + 6],
				g = t[o + 7],
				y = t[o + 8],
				_ = t[o + 9],
				v = t[o + 10],
				B = t[o + 11],
				S = t[o + 12],
				w = t[o + 13],
				x = t[o + 14],
				k = t[o + 15],
				m = s[0],
				z = s[1],
				C = s[2],
				M = s[3],
				m = e(m, z, C, M, c, 7, h[0]),
				M = e(M, m, z, C, a, 12, h[1]),
				C = e(C, M, m, z, f, 17, h[2]),
				z = e(z, C, M, m, u, 22, h[3]),
				m = e(m, z, C, M, l, 7, h[4]),
				M = e(M, m, z, C, p, 12, h[5]),
				C = e(C, M, m, z, d, 17, h[6]),
				z = e(z, C, M, m, g, 22, h[7]),
				m = e(m, z, C, M, y, 7, h[8]),
				M = e(M, m, z, C, _, 12, h[9]),
				C = e(C, M, m, z, v, 17, h[10]),
				z = e(z, C, M, m, B, 22, h[11]),
				m = e(m, z, C, M, S, 7, h[12]),
				M = e(M, m, z, C, w, 12, h[13]),
				C = e(C, M, m, z, x, 17, h[14]),
				z = e(z, C, M, m, k, 22, h[15]),
				m = r(m, z, C, M, a, 5, h[16]),
				M = r(M, m, z, C, d, 9, h[17]),
				C = r(C, M, m, z, B, 14, h[18]),
				z = r(z, C, M, m, c, 20, h[19]),
				m = r(m, z, C, M, p, 5, h[20]),
				M = r(M, m, z, C, v, 9, h[21]),
				C = r(C, M, m, z, k, 14, h[22]),
				z = r(z, C, M, m, l, 20, h[23]),
				m = r(m, z, C, M, _, 5, h[24]),
				M = r(M, m, z, C, x, 9, h[25]),
				C = r(C, M, m, z, u, 14, h[26]),
				z = r(z, C, M, m, y, 20, h[27]),
				m = r(m, z, C, M, w, 5, h[28]),
				M = r(M, m, z, C, f, 9, h[29]),
				C = r(C, M, m, z, g, 14, h[30]),
				z = r(z, C, M, m, S, 20, h[31]),
				m = i(m, z, C, M, p, 4, h[32]),
				M = i(M, m, z, C, y, 11, h[33]),
				C = i(C, M, m, z, B, 16, h[34]),
				z = i(z, C, M, m, x, 23, h[35]),
				m = i(m, z, C, M, a, 4, h[36]),
				M = i(M, m, z, C, l, 11, h[37]),
				C = i(C, M, m, z, g, 16, h[38]),
				z = i(z, C, M, m, v, 23, h[39]),
				m = i(m, z, C, M, w, 4, h[40]),
				M = i(M, m, z, C, c, 11, h[41]),
				C = i(C, M, m, z, u, 16, h[42]),
				z = i(z, C, M, m, d, 23, h[43]),
				m = i(m, z, C, M, _, 4, h[44]),
				M = i(M, m, z, C, S, 11, h[45]),
				C = i(C, M, m, z, k, 16, h[46]),
				z = i(z, C, M, m, f, 23, h[47]),
				m = n(m, z, C, M, c, 6, h[48]),
				M = n(M, m, z, C, g, 10, h[49]),
				C = n(C, M, m, z, x, 15, h[50]),
				z = n(z, C, M, m, p, 21, h[51]),
				m = n(m, z, C, M, S, 6, h[52]),
				M = n(M, m, z, C, u, 10, h[53]),
				C = n(C, M, m, z, v, 15, h[54]),
				z = n(z, C, M, m, a, 21, h[55]),
				m = n(m, z, C, M, y, 6, h[56]),
				M = n(M, m, z, C, k, 10, h[57]),
				C = n(C, M, m, z, d, 15, h[58]),
				z = n(z, C, M, m, w, 21, h[59]),
				m = n(m, z, C, M, l, 6, h[60]),
				M = n(M, m, z, C, B, 10, h[61]),
				C = n(C, M, m, z, f, 15, h[62]),
				z = n(z, C, M, m, _, 21, h[63]);
			s[0] = s[0] + m | 0, s[1] = s[1] + z | 0, s[2] = s[2] + C | 0, s[3] = s[3] + M | 0
		},
		_doFinalize: function() {
			var e = this._data,
				r = e.words,
				i = 8 * this._nDataBytes,
				n = 8 * e.sigBytes;
			r[n >>> 5] |= 128 << 24 - n % 32;
			var o = t.floor(i / 4294967296);
			for (r[(n + 64 >>> 9 << 4) + 15] = 16711935 & (o << 8 | o >>> 24) | 4278255360 & (o << 24 | o >>> 8), r[(n + 64 >>> 9 << 4) + 14] = 16711935 & (i << 8 | i >>> 24) | 4278255360 & (i << 24 | i >>> 8), e.sigBytes = 4 * (r.length + 1), this._process(), e = this._hash, r = e.words, i = 0; 4 > i; i++) n = r[i], r[i] = 16711935 & (n << 8 | n >>> 24) | 4278255360 & (n << 24 | n >>> 8);
			return e
		},
		clone: function() {
			var t = a.clone.call(this);
			return t._hash = this._hash.clone(), t
		}
	}), o.MD5 = a._createHelper(s), o.HmacMD5 = a._createHmacHelper(s)
}(Math),
function() {
	var t = CryptoJS,
		e = t.lib,
		r = e.Base,
		i = e.WordArray,
		e = t.algo,
		n = e.EvpKDF = r.extend({
			cfg: r.extend({
				keySize: 4,
				hasher: e.MD5,
				iterations: 1
			}),
			init: function(t) {
				this.cfg = this.cfg.extend(t)
			},
			compute: function(t, e) {
				for (var r = this.cfg, n = r.hasher.create(), o = i.create(), s = o.words, c = r.keySize, r = r.iterations; s.length < c;) {
					a && n.update(a);
					var a = n.update(t).finalize(e);
					n.reset();
					for (var h = 1; r > h; h++) a = n.finalize(a), n.reset();
					o.concat(a)
				}
				return o.sigBytes = 4 * c, o
			}
		});
	t.EvpKDF = function(t, e, r) {
		return n.create(r).compute(t, e)
	}
}(), CryptoJS.lib.Cipher || function(t) {
		var e = CryptoJS,
			r = e.lib,
			i = r.Base,
			n = r.WordArray,
			o = r.BufferedBlockAlgorithm,
			s = e.enc.Base64,
			c = e.algo.EvpKDF,
			a = r.Cipher = o.extend({
				cfg: i.extend(),
				createEncryptor: function(t, e) {
					return this.create(this._ENC_XFORM_MODE, t, e)
				},
				createDecryptor: function(t, e) {
					return this.create(this._DEC_XFORM_MODE, t, e)
				},
				init: function(t, e, r) {
					this.cfg = this.cfg.extend(r), this._xformMode = t, this._key = e, this.reset()
				},
				reset: function() {
					o.reset.call(this), this._doReset()
				},
				process: function(t) {
					return this._append(t), this._process()
				},
				finalize: function(t) {
					return t && this._append(t), this._doFinalize()
				},
				keySize: 4,
				ivSize: 4,
				_ENC_XFORM_MODE: 1,
				_DEC_XFORM_MODE: 2,
				_createHelper: function(t) {
					return {
						encrypt: function(e, r, i) {
							return ("string" == typeof r ? d : p).encrypt(t, e, r, i)
						},
						decrypt: function(e, r, i) {
							return ("string" == typeof r ? d : p).decrypt(t, e, r, i)
						}
					}
				}
			});
		r.StreamCipher = a.extend({
			_doFinalize: function() {
				return this._process(!0)
			},
			blockSize: 1
		});
		var h = e.mode = {},
			f = function(e, r, i) {
				var n = this._iv;
				n ? this._iv = t : n = this._prevBlock;
				for (var o = 0; i > o; o++) e[r + o] ^= n[o]
			},
			u = (r.BlockCipherMode = i.extend({
				createEncryptor: function(t, e) {
					return this.Encryptor.create(t, e)
				},
				createDecryptor: function(t, e) {
					return this.Decryptor.create(t, e)
				},
				init: function(t, e) {
					this._cipher = t, this._iv = e
				}
			})).extend();
		u.Encryptor = u.extend({
			processBlock: function(t, e) {
				var r = this._cipher,
					i = r.blockSize;
				f.call(this, t, e, i), r.encryptBlock(t, e), this._prevBlock = t.slice(e, e + i)
			}
		}), u.Decryptor = u.extend({
			processBlock: function(t, e) {
				var r = this._cipher,
					i = r.blockSize,
					n = t.slice(e, e + i);
				r.decryptBlock(t, e), f.call(this, t, e, i), this._prevBlock = n
			}
		}), h = h.CBC = u, u = (e.pad = {}).Pkcs7 = {
			pad: function(t, e) {
				for (var r = 4 * e, r = r - t.sigBytes % r, i = r << 24 | r << 16 | r << 8 | r, o = [], s = 0; r > s; s += 4) o.push(i);
				r = n.create(o, r), t.concat(r)
			},
			unpad: function(t) {
				t.sigBytes -= 255 & t.words[t.sigBytes - 1 >>> 2]
			}
		}, r.BlockCipher = a.extend({
			cfg: a.cfg.extend({
				mode: h,
				padding: u
			}),
			reset: function() {
				a.reset.call(this);
				var t = this.cfg,
					e = t.iv,
					t = t.mode;
				if (this._xformMode == this._ENC_XFORM_MODE) var r = t.createEncryptor;
				else r = t.createDecryptor, this._minBufferSize = 1;
				this._mode = r.call(t, this, e && e.words)
			},
			_doProcessBlock: function(t, e) {
				this._mode.processBlock(t, e)
			},
			_doFinalize: function() {
				var t = this.cfg.padding;
				if (this._xformMode == this._ENC_XFORM_MODE) {
					t.pad(this._data, this.blockSize);
					var e = this._process(!0)
				} else e = this._process(!0), t.unpad(e);
				return e
			},
			blockSize: 4
		});
		var l = r.CipherParams = i.extend({
				init: function(t) {
					this.mixIn(t)
				},
				toString: function(t) {
					return (t || this.formatter).stringify(this)
				}
			}),
			h = (e.format = {}).OpenSSL = {
				stringify: function(t) {
					var e = t.ciphertext;
					return t = t.salt, (t ? n.create([1398893684, 1701076831]).concat(t).concat(e) : e).toString(s)
				},
				parse: function(t) {
					t = s.parse(t);
					var e = t.words;
					if (1398893684 == e[0] && 1701076831 == e[1]) {
						var r = n.create(e.slice(2, 4));
						e.splice(0, 4), t.sigBytes -= 16
					}
					return l.create({
						ciphertext: t,
						salt: r
					})
				}
			},
			p = r.SerializableCipher = i.extend({
				cfg: i.extend({
					format: h
				}),
				encrypt: function(t, e, r, i) {
					i = this.cfg.extend(i);
					var n = t.createEncryptor(r, i);
					return e = n.finalize(e), n = n.cfg, l.create({
						ciphertext: e,
						key: r,
						iv: n.iv,
						algorithm: t,
						mode: n.mode,
						padding: n.padding,
						blockSize: t.blockSize,
						formatter: i.format
					})
				},
				decrypt: function(t, e, r, i) {
					return i = this.cfg.extend(i), e = this._parse(e, i.format), t.createDecryptor(r, i).finalize(e.ciphertext)
				},
				_parse: function(t, e) {
					return "string" == typeof t ? e.parse(t, this) : t
				}
			}),
			e = (e.kdf = {}).OpenSSL = {
				execute: function(t, e, r, i) {
					return i || (i = n.random(8)), t = c.create({
						keySize: e + r
					}).compute(t, i), r = n.create(t.words.slice(e), 4 * r), t.sigBytes = 4 * e, l.create({
						key: t,
						iv: r,
						salt: i
					})
				}
			},
			d = r.PasswordBasedCipher = p.extend({
				cfg: p.cfg.extend({
					kdf: e
				}),
				encrypt: function(t, e, r, i) {
					return i = this.cfg.extend(i), r = i.kdf.execute(r, t.keySize, t.ivSize), i.iv = r.iv, t = p.encrypt.call(this, t, e, r.key, i), t.mixIn(r), t
				},
				decrypt: function(t, e, r, i) {
					return i = this.cfg.extend(i), e = this._parse(e, i.format), r = i.kdf.execute(r, t.keySize, t.ivSize, e.salt), i.iv = r.iv, p.decrypt.call(this, t, e, r.key, i)
				}
			})
	}(),
	function() {
		for (var t = CryptoJS, e = t.lib.BlockCipher, r = t.algo, i = [], n = [], o = [], s = [], c = [], a = [], h = [], f = [], u = [], l = [], p = [], d = 0; 256 > d; d++) p[d] = 128 > d ? d << 1 : d << 1 ^ 283;
		for (var g = 0, y = 0, d = 0; 256 > d; d++) {
			var _ = y ^ y << 1 ^ y << 2 ^ y << 3 ^ y << 4,
				_ = _ >>> 8 ^ 255 & _ ^ 99;
			i[g] = _, n[_] = g;
			var v = p[g],
				B = p[v],
				S = p[B],
				w = 257 * p[_] ^ 16843008 * _;
			o[g] = w << 24 | w >>> 8, s[g] = w << 16 | w >>> 16, c[g] = w << 8 | w >>> 24, a[g] = w, w = 16843009 * S ^ 65537 * B ^ 257 * v ^ 16843008 * g, h[_] = w << 24 | w >>> 8, f[_] = w << 16 | w >>> 16, u[_] = w << 8 | w >>> 24, l[_] = w, g ? (g = v ^ p[p[p[S ^ v]]], y ^= p[p[y]]) : g = y = 1
		}
		var x = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54],
			r = r.AES = e.extend({
				_doReset: function() {
					for (var t = this._key, e = t.words, r = t.sigBytes / 4, t = 4 * ((this._nRounds = r + 6) + 1), n = this._keySchedule = [], o = 0; t > o; o++)
						if (r > o) n[o] = e[o];
						else {
							var s = n[o - 1];
							o % r ? r > 6 && 4 == o % r && (s = i[s >>> 24] << 24 | i[s >>> 16 & 255] << 16 | i[s >>> 8 & 255] << 8 | i[255 & s]) : (s = s << 8 | s >>> 24, s = i[s >>> 24] << 24 | i[s >>> 16 & 255] << 16 | i[s >>> 8 & 255] << 8 | i[255 & s], s ^= x[o / r | 0] << 24), n[o] = n[o - r] ^ s
						}
					for (e = this._invKeySchedule = [], r = 0; t > r; r++) o = t - r, s = r % 4 ? n[o] : n[o - 4], e[r] = 4 > r || 4 >= o ? s : h[i[s >>> 24]] ^ f[i[s >>> 16 & 255]] ^ u[i[s >>> 8 & 255]] ^ l[i[255 & s]]
				},
				encryptBlock: function(t, e) {
					this._doCryptBlock(t, e, this._keySchedule, o, s, c, a, i)
				},
				decryptBlock: function(t, e) {
					var r = t[e + 1];
					t[e + 1] = t[e + 3], t[e + 3] = r, this._doCryptBlock(t, e, this._invKeySchedule, h, f, u, l, n), r = t[e + 1], t[e + 1] = t[e + 3], t[e + 3] = r
				},
				_doCryptBlock: function(t, e, r, i, n, o, s, c) {
					for (var a = this._nRounds, h = t[e] ^ r[0], f = t[e + 1] ^ r[1], u = t[e + 2] ^ r[2], l = t[e + 3] ^ r[3], p = 4, d = 1; a > d; d++) var g = i[h >>> 24] ^ n[f >>> 16 & 255] ^ o[u >>> 8 & 255] ^ s[255 & l] ^ r[p++],
						y = i[f >>> 24] ^ n[u >>> 16 & 255] ^ o[l >>> 8 & 255] ^ s[255 & h] ^ r[p++],
						_ = i[u >>> 24] ^ n[l >>> 16 & 255] ^ o[h >>> 8 & 255] ^ s[255 & f] ^ r[p++],
						l = i[l >>> 24] ^ n[h >>> 16 & 255] ^ o[f >>> 8 & 255] ^ s[255 & u] ^ r[p++],
						h = g,
						f = y,
						u = _;
					g = (c[h >>> 24] << 24 | c[f >>> 16 & 255] << 16 | c[u >>> 8 & 255] << 8 | c[255 & l]) ^ r[p++], y = (c[f >>> 24] << 24 | c[u >>> 16 & 255] << 16 | c[l >>> 8 & 255] << 8 | c[255 & h]) ^ r[p++], _ = (c[u >>> 24] << 24 | c[l >>> 16 & 255] << 16 | c[h >>> 8 & 255] << 8 | c[255 & f]) ^ r[p++], l = (c[l >>> 24] << 24 | c[h >>> 16 & 255] << 16 | c[f >>> 8 & 255] << 8 | c[255 & u]) ^ r[p++], t[e] = g, t[e + 1] = y, t[e + 2] = _, t[e + 3] = l
				},
				keySize: 8
			});
		t.AES = e._createHelper(r)
	}(),
	function(t) {
		var e = CryptoJS,
			r = e.lib,
			i = r.Base,
			n = r.WordArray,
			e = e.x64 = {};
		e.Word = i.extend({
			init: function(t, e) {
				this.high = t, this.low = e
			}
		}), e.WordArray = i.extend({
			init: function(e, r) {
				e = this.words = e || [], this.sigBytes = r != t ? r : 8 * e.length
			},
			toX32: function() {
				for (var t = this.words, e = t.length, r = [], i = 0; e > i; i++) {
					var o = t[i];
					r.push(o.high), r.push(o.low)
				}
				return n.create(r, this.sigBytes)
			},
			clone: function() {
				for (var t = i.clone.call(this), e = t.words = this.words.slice(0), r = e.length, n = 0; r > n; n++) e[n] = e[n].clone();
				return t
			}
		})
	}(),
	function(t) {
		for (var e = CryptoJS, r = e.lib, i = r.WordArray, n = r.Hasher, o = e.x64.Word, r = e.algo, s = [], c = [], a = [], h = 1, f = 0, u = 0; 24 > u; u++) {
			s[h + 5 * f] = (u + 1) * (u + 2) / 2 % 64;
			var l = (2 * h + 3 * f) % 5,
				h = f % 5,
				f = l
		}
		for (h = 0; 5 > h; h++)
			for (f = 0; 5 > f; f++) c[h + 5 * f] = f + 5 * ((2 * h + 3 * f) % 5);
		for (h = 1, f = 0; 24 > f; f++) {
			for (var p = l = u = 0; 7 > p; p++) {
				if (1 & h) {
					var d = (1 << p) - 1;
					32 > d ? l ^= 1 << d : u ^= 1 << d - 32
				}
				h = 128 & h ? h << 1 ^ 113 : h << 1
			}
			a[f] = o.create(u, l)
		}
		for (var g = [], h = 0; 25 > h; h++) g[h] = o.create();
		r = r.SHA3 = n.extend({
			cfg: n.cfg.extend({
				outputLength: 256
			}),
			_doReset: function() {
				for (var t = this._state = [], e = 0; 25 > e; e++) t[e] = new o.init;
				this.blockSize = this.cfg.outputLength / 322
			},
			_doProcessBlock: function(t, e) {
				for (var r = this._state, i = this.blockSize / 2, n = 0; i > n; n++) {
					var o = t[e + 2 * n],
						h = t[e + 2 * n + 1],
						o = 16711935 & (o << 8 | o >>> 24) | 4278255360 & (o << 24 | o >>> 8),
						h = 16711935 & (h << 8 | h >>> 24) | 4278255360 & (h << 24 | h >>> 8),
						f = r[n];
					f.high ^= h, f.low ^= o
				}
				for (i = 0; 24 > i; i++) {
					for (n = 0; 5 > n; n++) {
						for (var u = o = 0, l = 0; 5 > l; l++) f = r[n + 5 * l], o ^= f.high, u ^= f.low;
						f = g[n], f.high = o, f.low = u
					}
					for (n = 0; 5 > n; n++)
						for (f = g[(n + 4) % 5], o = g[(n + 1) % 5], h = o.high, l = o.low, o = f.high ^ (h << 1 | l >>> 31), u = f.low ^ (l << 1 | h >>> 31), l = 0; 5 > l; l++) f = r[n + 5 * l], f.high ^= o, f.low ^= u;
					for (h = 1; 25 > h; h++) f = r[h], n = f.high, f = f.low, l = s[h], 32 > l ? (o = n << l | f >>> 32 - l, u = f << l | n >>> 32 - l) : (o = f << l - 32 | n >>> 64 - l, u = n << l - 32 | f >>> 64 - l), f = g[c[h]], f.high = o, f.low = u;
					for (f = g[0], n = r[0], f.high = n.high, f.low = n.low, n = 0; 5 > n; n++)
						for (l = 0; 5 > l; l++) h = n + 5 * l, f = r[h], o = g[h], h = g[(n + 1) % 5 + 5 * l], u = g[(n + 2) % 5 + 5 * l], f.high = o.high ^ ~h.high & u.high, f.low = o.low ^ ~h.low & u.low;
					f = r[0], n = a[i], f.high ^= n.high, f.low ^= n.low
				}
			},
			_doFinalize: function() {
				var e = this._data,
					r = e.words,
					n = 8 * e.sigBytes,
					o = 32 * this.blockSize;
				r[n >>> 5] |= 1 << 24 - n % 32, r[(t.ceil((n + 1) / o) * o >>> 5) - 1] |= 128, e.sigBytes = 4 * r.length, this._process();
				for (var e = this._state, r = this.cfg.outputLength / 8, n = r / 8, o = [], s = 0; n > s; s++) {
					var c = e[s],
						a = c.high,
						c = c.low,
						a = 16711935 & (a << 8 | a >>> 24) | 4278255360 & (a << 24 | a >>> 8),
						c = 16711935 & (c << 8 | c >>> 24) | 4278255360 & (c << 24 | c >>> 8);
					o.push(c), o.push(a)
				}
				return new i.init(o, r)
			},
			clone: function() {
				for (var t = n.clone.call(this), e = t._state = this._state.slice(0), r = 0; 25 > r; r++) e[r] = e[r].clone();
				return t
			}
		}), e.SHA3 = n._createHelper(r), e.HmacSHA3 = n._createHmacHelper(r)
	}(Math), define(function() {
		return CryptoJS.SHA3
	});

/*!
 * Materialize v0.97.3 (http://materializecss.com)
 * Copyright 2014-2015 Materialize
 * MIT License (https://raw.githubusercontent.com/Dogfalo/materialize/master/LICENSE)
 */
/*
 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 *
 * Uses the built in easing capabilities added In jQuery 1.1
 * to offer multiple easing options
 *
 * TERMS OF USE - jQuery Easing
 *
 * Open source under the BSD License.
 *
 * Copyright © 2008 George McGinley Smith
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice, this list of
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list
 * of conditions and the following disclaimer in the documentation and/or other materials
 * provided with the distribution.
 *
 * Neither the name of the author nor the names of contributors may be used to endorse
 * or promote products derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED
 * OF THE POSSIBILITY OF SUCH DAMAGE.
 *
*/

// t: current time, b: begInnIng value, c: change In value, d: duration
jQuery.easing['jswing'] = jQuery.easing['swing'];

jQuery.extend( jQuery.easing,
{
	def: 'easeOutQuad',
	swing: function (x, t, b, c, d) {
		//alert(jQuery.easing.default);
		return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
	},
	easeInQuad: function (x, t, b, c, d) {
		return c*(t/=d)*t + b;
	},
	easeOutQuad: function (x, t, b, c, d) {
		return -c *(t/=d)*(t-2) + b;
	},
	easeInOutQuad: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t + b;
		return -c/2 * ((--t)*(t-2) - 1) + b;
	},
	easeInCubic: function (x, t, b, c, d) {
		return c*(t/=d)*t*t + b;
	},
	easeOutCubic: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t + 1) + b;
	},
	easeInOutCubic: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t + b;
		return c/2*((t-=2)*t*t + 2) + b;
	},
	easeInQuart: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t + b;
	},
	easeOutQuart: function (x, t, b, c, d) {
		return -c * ((t=t/d-1)*t*t*t - 1) + b;
	},
	easeInOutQuart: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
		return -c/2 * ((t-=2)*t*t*t - 2) + b;
	},
	easeInQuint: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t*t + b;
	},
	easeOutQuint: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t*t*t + 1) + b;
	},
	easeInOutQuint: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
		return c/2*((t-=2)*t*t*t*t + 2) + b;
	},
	easeInSine: function (x, t, b, c, d) {
		return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
	},
	easeOutSine: function (x, t, b, c, d) {
		return c * Math.sin(t/d * (Math.PI/2)) + b;
	},
	easeInOutSine: function (x, t, b, c, d) {
		return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
	},
	easeInExpo: function (x, t, b, c, d) {
		return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
	},
	easeOutExpo: function (x, t, b, c, d) {
		return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
	},
	easeInOutExpo: function (x, t, b, c, d) {
		if (t==0) return b;
		if (t==d) return b+c;
		if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
		return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
	},
	easeInCirc: function (x, t, b, c, d) {
		return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
	},
	easeOutCirc: function (x, t, b, c, d) {
		return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
	},
	easeInOutCirc: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
		return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
	},
	easeInElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	},
	easeOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	},
	easeInOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
	},
	easeInBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*(t/=d)*t*((s+1)*t - s) + b;
	},
	easeOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	},
	easeInOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	},
	easeInBounce: function (x, t, b, c, d) {
		return c - jQuery.easing.easeOutBounce (x, d-t, 0, c, d) + b;
	},
	easeOutBounce: function (x, t, b, c, d) {
		if ((t/=d) < (1/2.75)) {
			return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
			return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
		} else if (t < (2.5/2.75)) {
			return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
		} else {
			return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
		}
	},
	easeInOutBounce: function (x, t, b, c, d) {
		if (t < d/2) return jQuery.easing.easeInBounce (x, t*2, 0, c, d) * .5 + b;
		return jQuery.easing.easeOutBounce (x, t*2-d, 0, c, d) * .5 + c*.5 + b;
	}
});

/*
 *
 * TERMS OF USE - EASING EQUATIONS
 *
 * Open source under the BSD License.
 *
 * Copyright © 2001 Robert Penner
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice, this list of
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list
 * of conditions and the following disclaimer in the documentation and/or other materials
 * provided with the distribution.
 *
 * Neither the name of the author nor the names of contributors may be used to endorse
 * or promote products derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED
 * OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 */;	// Custom Easing
	jQuery.extend( jQuery.easing,
	{
	  easeInOutMaterial: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t + b;
		return c/4*((t-=2)*t*t + 2) + b;
	  }
	});

;/*! VelocityJS.org (1.2.3). (C) 2014 Julian Shapiro. MIT @license: en.wikipedia.org/wiki/MIT_License */
/*! VelocityJS.org jQuery Shim (1.0.1). (C) 2014 The jQuery Foundation. MIT @license: en.wikipedia.org/wiki/MIT_License. */
/*! Note that this has been modified by Materialize to confirm that Velocity is not already being imported. */
jQuery.Velocity?console.log("Velocity is already loaded. You may be needlessly importing Velocity again; note that Materialize includes Velocity."):(!function(e){function t(e){var t=e.length,a=r.type(e);return"function"===a||r.isWindow(e)?!1:1===e.nodeType&&t?!0:"array"===a||0===t||"number"==typeof t&&t>0&&t-1 in e}if(!e.jQuery){var r=function(e,t){return new r.fn.init(e,t)};r.isWindow=function(e){return null!=e&&e==e.window},r.type=function(e){return null==e?e+"":"object"==typeof e||"function"==typeof e?n[i.call(e)]||"object":typeof e},r.isArray=Array.isArray||function(e){return"array"===r.type(e)},r.isPlainObject=function(e){var t;if(!e||"object"!==r.type(e)||e.nodeType||r.isWindow(e))return!1;try{if(e.constructor&&!o.call(e,"constructor")&&!o.call(e.constructor.prototype,"isPrototypeOf"))return!1}catch(a){return!1}for(t in e);return void 0===t||o.call(e,t)},r.each=function(e,r,a){var n,o=0,i=e.length,s=t(e);if(a){if(s)for(;i>o&&(n=r.apply(e[o],a),n!==!1);o++);else for(o in e)if(n=r.apply(e[o],a),n===!1)break}else if(s)for(;i>o&&(n=r.call(e[o],o,e[o]),n!==!1);o++);else for(o in e)if(n=r.call(e[o],o,e[o]),n===!1)break;return e},r.data=function(e,t,n){if(void 0===n){var o=e[r.expando],i=o&&a[o];if(void 0===t)return i;if(i&&t in i)return i[t]}else if(void 0!==t){var o=e[r.expando]||(e[r.expando]=++r.uuid);return a[o]=a[o]||{},a[o][t]=n,n}},r.removeData=function(e,t){var n=e[r.expando],o=n&&a[n];o&&r.each(t,function(e,t){delete o[t]})},r.extend=function(){var e,t,a,n,o,i,s=arguments[0]||{},l=1,u=arguments.length,c=!1;for("boolean"==typeof s&&(c=s,s=arguments[l]||{},l++),"object"!=typeof s&&"function"!==r.type(s)&&(s={}),l===u&&(s=this,l--);u>l;l++)if(null!=(o=arguments[l]))for(n in o)e=s[n],a=o[n],s!==a&&(c&&a&&(r.isPlainObject(a)||(t=r.isArray(a)))?(t?(t=!1,i=e&&r.isArray(e)?e:[]):i=e&&r.isPlainObject(e)?e:{},s[n]=r.extend(c,i,a)):void 0!==a&&(s[n]=a));return s},r.queue=function(e,a,n){function o(e,r){var a=r||[];return null!=e&&(t(Object(e))?!function(e,t){for(var r=+t.length,a=0,n=e.length;r>a;)e[n++]=t[a++];if(r!==r)for(;void 0!==t[a];)e[n++]=t[a++];return e.length=n,e}(a,"string"==typeof e?[e]:e):[].push.call(a,e)),a}if(e){a=(a||"fx")+"queue";var i=r.data(e,a);return n?(!i||r.isArray(n)?i=r.data(e,a,o(n)):i.push(n),i):i||[]}},r.dequeue=function(e,t){r.each(e.nodeType?[e]:e,function(e,a){t=t||"fx";var n=r.queue(a,t),o=n.shift();"inprogress"===o&&(o=n.shift()),o&&("fx"===t&&n.unshift("inprogress"),o.call(a,function(){r.dequeue(a,t)}))})},r.fn=r.prototype={init:function(e){if(e.nodeType)return this[0]=e,this;throw new Error("Not a DOM node.")},offset:function(){var t=this[0].getBoundingClientRect?this[0].getBoundingClientRect():{top:0,left:0};return{top:t.top+(e.pageYOffset||document.scrollTop||0)-(document.clientTop||0),left:t.left+(e.pageXOffset||document.scrollLeft||0)-(document.clientLeft||0)}},position:function(){function e(){for(var e=this.offsetParent||document;e&&"html"===!e.nodeType.toLowerCase&&"static"===e.style.position;)e=e.offsetParent;return e||document}var t=this[0],e=e.apply(t),a=this.offset(),n=/^(?:body|html)$/i.test(e.nodeName)?{top:0,left:0}:r(e).offset();return a.top-=parseFloat(t.style.marginTop)||0,a.left-=parseFloat(t.style.marginLeft)||0,e.style&&(n.top+=parseFloat(e.style.borderTopWidth)||0,n.left+=parseFloat(e.style.borderLeftWidth)||0),{top:a.top-n.top,left:a.left-n.left}}};var a={};r.expando="velocity"+(new Date).getTime(),r.uuid=0;for(var n={},o=n.hasOwnProperty,i=n.toString,s="Boolean Number String Function Array Date RegExp Object Error".split(" "),l=0;l<s.length;l++)n["[object "+s[l]+"]"]=s[l].toLowerCase();r.fn.init.prototype=r.fn,e.Velocity={Utilities:r}}}(window),function(e){"object"==typeof module&&"object"==typeof module.exports?module.exports=e():"function"==typeof dontdefine&&dontdefine.amd?dontdefine(e):e()}(function(){return function(e,t,r,a){function n(e){for(var t=-1,r=e?e.length:0,a=[];++t<r;){var n=e[t];n&&a.push(n)}return a}function o(e){return m.isWrapped(e)?e=[].slice.call(e):m.isNode(e)&&(e=[e]),e}function i(e){var t=f.data(e,"velocity");return null===t?a:t}function s(e){return function(t){return Math.round(t*e)*(1/e)}}function l(e,r,a,n){function o(e,t){return 1-3*t+3*e}function i(e,t){return 3*t-6*e}function s(e){return 3*e}function l(e,t,r){return((o(t,r)*e+i(t,r))*e+s(t))*e}function u(e,t,r){return 3*o(t,r)*e*e+2*i(t,r)*e+s(t)}function c(t,r){for(var n=0;m>n;++n){var o=u(r,e,a);if(0===o)return r;var i=l(r,e,a)-t;r-=i/o}return r}function p(){for(var t=0;b>t;++t)w[t]=l(t*x,e,a)}function f(t,r,n){var o,i,s=0;do i=r+(n-r)/2,o=l(i,e,a)-t,o>0?n=i:r=i;while(Math.abs(o)>h&&++s<v);return i}function d(t){for(var r=0,n=1,o=b-1;n!=o&&w[n]<=t;++n)r+=x;--n;var i=(t-w[n])/(w[n+1]-w[n]),s=r+i*x,l=u(s,e,a);return l>=y?c(t,s):0==l?s:f(t,r,r+x)}function g(){V=!0,(e!=r||a!=n)&&p()}var m=4,y=.001,h=1e-7,v=10,b=11,x=1/(b-1),S="Float32Array"in t;if(4!==arguments.length)return!1;for(var P=0;4>P;++P)if("number"!=typeof arguments[P]||isNaN(arguments[P])||!isFinite(arguments[P]))return!1;e=Math.min(e,1),a=Math.min(a,1),e=Math.max(e,0),a=Math.max(a,0);var w=S?new Float32Array(b):new Array(b),V=!1,C=function(t){return V||g(),e===r&&a===n?t:0===t?0:1===t?1:l(d(t),r,n)};C.getControlPoints=function(){return[{x:e,y:r},{x:a,y:n}]};var T="generateBezier("+[e,r,a,n]+")";return C.toString=function(){return T},C}function u(e,t){var r=e;return m.isString(e)?b.Easings[e]||(r=!1):r=m.isArray(e)&&1===e.length?s.apply(null,e):m.isArray(e)&&2===e.length?x.apply(null,e.concat([t])):m.isArray(e)&&4===e.length?l.apply(null,e):!1,r===!1&&(r=b.Easings[b.defaults.easing]?b.defaults.easing:v),r}function c(e){if(e){var t=(new Date).getTime(),r=b.State.calls.length;r>1e4&&(b.State.calls=n(b.State.calls));for(var o=0;r>o;o++)if(b.State.calls[o]){var s=b.State.calls[o],l=s[0],u=s[2],d=s[3],g=!!d,y=null;d||(d=b.State.calls[o][3]=t-16);for(var h=Math.min((t-d)/u.duration,1),v=0,x=l.length;x>v;v++){var P=l[v],V=P.element;if(i(V)){var C=!1;if(u.display!==a&&null!==u.display&&"none"!==u.display){if("flex"===u.display){var T=["-webkit-box","-moz-box","-ms-flexbox","-webkit-flex"];f.each(T,function(e,t){S.setPropertyValue(V,"display",t)})}S.setPropertyValue(V,"display",u.display)}u.visibility!==a&&"hidden"!==u.visibility&&S.setPropertyValue(V,"visibility",u.visibility);for(var k in P)if("element"!==k){var A,F=P[k],j=m.isString(F.easing)?b.Easings[F.easing]:F.easing;if(1===h)A=F.endValue;else{var E=F.endValue-F.startValue;if(A=F.startValue+E*j(h,u,E),!g&&A===F.currentValue)continue}if(F.currentValue=A,"tween"===k)y=A;else{if(S.Hooks.registered[k]){var H=S.Hooks.getRoot(k),N=i(V).rootPropertyValueCache[H];N&&(F.rootPropertyValue=N)}var L=S.setPropertyValue(V,k,F.currentValue+(0===parseFloat(A)?"":F.unitType),F.rootPropertyValue,F.scrollData);S.Hooks.registered[k]&&(i(V).rootPropertyValueCache[H]=S.Normalizations.registered[H]?S.Normalizations.registered[H]("extract",null,L[1]):L[1]),"transform"===L[0]&&(C=!0)}}u.mobileHA&&i(V).transformCache.translate3d===a&&(i(V).transformCache.translate3d="(0px, 0px, 0px)",C=!0),C&&S.flushTransformCache(V)}}u.display!==a&&"none"!==u.display&&(b.State.calls[o][2].display=!1),u.visibility!==a&&"hidden"!==u.visibility&&(b.State.calls[o][2].visibility=!1),u.progress&&u.progress.call(s[1],s[1],h,Math.max(0,d+u.duration-t),d,y),1===h&&p(o)}}b.State.isTicking&&w(c)}function p(e,t){if(!b.State.calls[e])return!1;for(var r=b.State.calls[e][0],n=b.State.calls[e][1],o=b.State.calls[e][2],s=b.State.calls[e][4],l=!1,u=0,c=r.length;c>u;u++){var p=r[u].element;if(t||o.loop||("none"===o.display&&S.setPropertyValue(p,"display",o.display),"hidden"===o.visibility&&S.setPropertyValue(p,"visibility",o.visibility)),o.loop!==!0&&(f.queue(p)[1]===a||!/\.velocityQueueEntryFlag/i.test(f.queue(p)[1]))&&i(p)){i(p).isAnimating=!1,i(p).rootPropertyValueCache={};var d=!1;f.each(S.Lists.transforms3D,function(e,t){var r=/^scale/.test(t)?1:0,n=i(p).transformCache[t];i(p).transformCache[t]!==a&&new RegExp("^\\("+r+"[^.]").test(n)&&(d=!0,delete i(p).transformCache[t])}),o.mobileHA&&(d=!0,delete i(p).transformCache.translate3d),d&&S.flushTransformCache(p),S.Values.removeClass(p,"velocity-animating")}if(!t&&o.complete&&!o.loop&&u===c-1)try{o.complete.call(n,n)}catch(g){setTimeout(function(){throw g},1)}s&&o.loop!==!0&&s(n),i(p)&&o.loop===!0&&!t&&(f.each(i(p).tweensContainer,function(e,t){/^rotate/.test(e)&&360===parseFloat(t.endValue)&&(t.endValue=0,t.startValue=360),/^backgroundPosition/.test(e)&&100===parseFloat(t.endValue)&&"%"===t.unitType&&(t.endValue=0,t.startValue=100)}),b(p,"reverse",{loop:!0,delay:o.delay})),o.queue!==!1&&f.dequeue(p,o.queue)}b.State.calls[e]=!1;for(var m=0,y=b.State.calls.length;y>m;m++)if(b.State.calls[m]!==!1){l=!0;break}l===!1&&(b.State.isTicking=!1,delete b.State.calls,b.State.calls=[])}var f,d=function(){if(r.documentMode)return r.documentMode;for(var e=7;e>4;e--){var t=r.createElement("div");if(t.innerHTML="<!--[if IE "+e+"]><span></span><![endif]-->",t.getElementsByTagName("span").length)return t=null,e}return a}(),g=function(){var e=0;return t.webkitRequestAnimationFrame||t.mozRequestAnimationFrame||function(t){var r,a=(new Date).getTime();return r=Math.max(0,16-(a-e)),e=a+r,setTimeout(function(){t(a+r)},r)}}(),m={isString:function(e){return"string"==typeof e},isArray:Array.isArray||function(e){return"[object Array]"===Object.prototype.toString.call(e)},isFunction:function(e){return"[object Function]"===Object.prototype.toString.call(e)},isNode:function(e){return e&&e.nodeType},isNodeList:function(e){return"object"==typeof e&&/^\[object (HTMLCollection|NodeList|Object)\]$/.test(Object.prototype.toString.call(e))&&e.length!==a&&(0===e.length||"object"==typeof e[0]&&e[0].nodeType>0)},isWrapped:function(e){return e&&(e.jquery||t.Zepto&&t.Zepto.zepto.isZ(e))},isSVG:function(e){return t.SVGElement&&e instanceof t.SVGElement},isEmptyObject:function(e){for(var t in e)return!1;return!0}},y=!1;if(e.fn&&e.fn.jquery?(f=e,y=!0):f=t.Velocity.Utilities,8>=d&&!y)throw new Error("Velocity: IE8 and below require jQuery to be loaded before Velocity.");if(7>=d)return void(jQuery.fn.velocity=jQuery.fn.animate);var h=400,v="swing",b={State:{isMobile:/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),isAndroid:/Android/i.test(navigator.userAgent),isGingerbread:/Android 2\.3\.[3-7]/i.test(navigator.userAgent),isChrome:t.chrome,isFirefox:/Firefox/i.test(navigator.userAgent),prefixElement:r.createElement("div"),prefixMatches:{},scrollAnchor:null,scrollPropertyLeft:null,scrollPropertyTop:null,isTicking:!1,calls:[]},CSS:{},Utilities:f,Redirects:{},Easings:{},Promise:t.Promise,defaults:{queue:"",duration:h,easing:v,begin:a,complete:a,progress:a,display:a,visibility:a,loop:!1,delay:!1,mobileHA:!0,_cacheValues:!0},init:function(e){f.data(e,"velocity",{isSVG:m.isSVG(e),isAnimating:!1,computedStyle:null,tweensContainer:null,rootPropertyValueCache:{},transformCache:{}})},hook:null,mock:!1,version:{major:1,minor:2,patch:2},debug:!1};t.pageYOffset!==a?(b.State.scrollAnchor=t,b.State.scrollPropertyLeft="pageXOffset",b.State.scrollPropertyTop="pageYOffset"):(b.State.scrollAnchor=r.documentElement||r.body.parentNode||r.body,b.State.scrollPropertyLeft="scrollLeft",b.State.scrollPropertyTop="scrollTop");var x=function(){function e(e){return-e.tension*e.x-e.friction*e.v}function t(t,r,a){var n={x:t.x+a.dx*r,v:t.v+a.dv*r,tension:t.tension,friction:t.friction};return{dx:n.v,dv:e(n)}}function r(r,a){var n={dx:r.v,dv:e(r)},o=t(r,.5*a,n),i=t(r,.5*a,o),s=t(r,a,i),l=1/6*(n.dx+2*(o.dx+i.dx)+s.dx),u=1/6*(n.dv+2*(o.dv+i.dv)+s.dv);return r.x=r.x+l*a,r.v=r.v+u*a,r}return function a(e,t,n){var o,i,s,l={x:-1,v:0,tension:null,friction:null},u=[0],c=0,p=1e-4,f=.016;for(e=parseFloat(e)||500,t=parseFloat(t)||20,n=n||null,l.tension=e,l.friction=t,o=null!==n,o?(c=a(e,t),i=c/n*f):i=f;s=r(s||l,i),u.push(1+s.x),c+=16,Math.abs(s.x)>p&&Math.abs(s.v)>p;);return o?function(e){return u[e*(u.length-1)|0]}:c}}();b.Easings={linear:function(e){return e},swing:function(e){return.5-Math.cos(e*Math.PI)/2},spring:function(e){return 1-Math.cos(4.5*e*Math.PI)*Math.exp(6*-e)}},f.each([["ease",[.25,.1,.25,1]],["ease-in",[.42,0,1,1]],["ease-out",[0,0,.58,1]],["ease-in-out",[.42,0,.58,1]],["easeInSine",[.47,0,.745,.715]],["easeOutSine",[.39,.575,.565,1]],["easeInOutSine",[.445,.05,.55,.95]],["easeInQuad",[.55,.085,.68,.53]],["easeOutQuad",[.25,.46,.45,.94]],["easeInOutQuad",[.455,.03,.515,.955]],["easeInCubic",[.55,.055,.675,.19]],["easeOutCubic",[.215,.61,.355,1]],["easeInOutCubic",[.645,.045,.355,1]],["easeInQuart",[.895,.03,.685,.22]],["easeOutQuart",[.165,.84,.44,1]],["easeInOutQuart",[.77,0,.175,1]],["easeInQuint",[.755,.05,.855,.06]],["easeOutQuint",[.23,1,.32,1]],["easeInOutQuint",[.86,0,.07,1]],["easeInExpo",[.95,.05,.795,.035]],["easeOutExpo",[.19,1,.22,1]],["easeInOutExpo",[1,0,0,1]],["easeInCirc",[.6,.04,.98,.335]],["easeOutCirc",[.075,.82,.165,1]],["easeInOutCirc",[.785,.135,.15,.86]]],function(e,t){b.Easings[t[0]]=l.apply(null,t[1])});var S=b.CSS={RegEx:{isHex:/^#([A-f\d]{3}){1,2}$/i,valueUnwrap:/^[A-z]+\((.*)\)$/i,wrappedValueAlreadyExtracted:/[0-9.]+ [0-9.]+ [0-9.]+( [0-9.]+)?/,valueSplit:/([A-z]+\(.+\))|(([A-z0-9#-.]+?)(?=\s|$))/gi},Lists:{colors:["fill","stroke","stopColor","color","backgroundColor","borderColor","borderTopColor","borderRightColor","borderBottomColor","borderLeftColor","outlineColor"],transformsBase:["translateX","translateY","scale","scaleX","scaleY","skewX","skewY","rotateZ"],transforms3D:["transformPerspective","translateZ","scaleZ","rotateX","rotateY"]},Hooks:{templates:{textShadow:["Color X Y Blur","black 0px 0px 0px"],boxShadow:["Color X Y Blur Spread","black 0px 0px 0px 0px"],clip:["Top Right Bottom Left","0px 0px 0px 0px"],backgroundPosition:["X Y","0% 0%"],transformOrigin:["X Y Z","50% 50% 0px"],perspectiveOrigin:["X Y","50% 50%"]},registered:{},register:function(){for(var e=0;e<S.Lists.colors.length;e++){var t="color"===S.Lists.colors[e]?"0 0 0 1":"255 255 255 1";S.Hooks.templates[S.Lists.colors[e]]=["Red Green Blue Alpha",t]}var r,a,n;if(d)for(r in S.Hooks.templates){a=S.Hooks.templates[r],n=a[0].split(" ");var o=a[1].match(S.RegEx.valueSplit);"Color"===n[0]&&(n.push(n.shift()),o.push(o.shift()),S.Hooks.templates[r]=[n.join(" "),o.join(" ")])}for(r in S.Hooks.templates){a=S.Hooks.templates[r],n=a[0].split(" ");for(var e in n){var i=r+n[e],s=e;S.Hooks.registered[i]=[r,s]}}},getRoot:function(e){var t=S.Hooks.registered[e];return t?t[0]:e},cleanRootPropertyValue:function(e,t){return S.RegEx.valueUnwrap.test(t)&&(t=t.match(S.RegEx.valueUnwrap)[1]),S.Values.isCSSNullValue(t)&&(t=S.Hooks.templates[e][1]),t},extractValue:function(e,t){var r=S.Hooks.registered[e];if(r){var a=r[0],n=r[1];return t=S.Hooks.cleanRootPropertyValue(a,t),t.toString().match(S.RegEx.valueSplit)[n]}return t},injectValue:function(e,t,r){var a=S.Hooks.registered[e];if(a){var n,o,i=a[0],s=a[1];return r=S.Hooks.cleanRootPropertyValue(i,r),n=r.toString().match(S.RegEx.valueSplit),n[s]=t,o=n.join(" ")}return r}},Normalizations:{registered:{clip:function(e,t,r){switch(e){case"name":return"clip";case"extract":var a;return S.RegEx.wrappedValueAlreadyExtracted.test(r)?a=r:(a=r.toString().match(S.RegEx.valueUnwrap),a=a?a[1].replace(/,(\s+)?/g," "):r),a;case"inject":return"rect("+r+")"}},blur:function(e,t,r){switch(e){case"name":return b.State.isFirefox?"filter":"-webkit-filter";case"extract":var a=parseFloat(r);if(!a&&0!==a){var n=r.toString().match(/blur\(([0-9]+[A-z]+)\)/i);a=n?n[1]:0}return a;case"inject":return parseFloat(r)?"blur("+r+")":"none"}},opacity:function(e,t,r){if(8>=d)switch(e){case"name":return"filter";case"extract":var a=r.toString().match(/alpha\(opacity=(.*)\)/i);return r=a?a[1]/100:1;case"inject":return t.style.zoom=1,parseFloat(r)>=1?"":"alpha(opacity="+parseInt(100*parseFloat(r),10)+")"}else switch(e){case"name":return"opacity";case"extract":return r;case"inject":return r}}},register:function(){9>=d||b.State.isGingerbread||(S.Lists.transformsBase=S.Lists.transformsBase.concat(S.Lists.transforms3D));for(var e=0;e<S.Lists.transformsBase.length;e++)!function(){var t=S.Lists.transformsBase[e];S.Normalizations.registered[t]=function(e,r,n){switch(e){case"name":return"transform";case"extract":return i(r)===a||i(r).transformCache[t]===a?/^scale/i.test(t)?1:0:i(r).transformCache[t].replace(/[()]/g,"");case"inject":var o=!1;switch(t.substr(0,t.length-1)){case"translate":o=!/(%|px|em|rem|vw|vh|\d)$/i.test(n);break;case"scal":case"scale":b.State.isAndroid&&i(r).transformCache[t]===a&&1>n&&(n=1),o=!/(\d)$/i.test(n);break;case"skew":o=!/(deg|\d)$/i.test(n);break;case"rotate":o=!/(deg|\d)$/i.test(n)}return o||(i(r).transformCache[t]="("+n+")"),i(r).transformCache[t]}}}();for(var e=0;e<S.Lists.colors.length;e++)!function(){var t=S.Lists.colors[e];S.Normalizations.registered[t]=function(e,r,n){switch(e){case"name":return t;case"extract":var o;if(S.RegEx.wrappedValueAlreadyExtracted.test(n))o=n;else{var i,s={black:"rgb(0, 0, 0)",blue:"rgb(0, 0, 255)",gray:"rgb(128, 128, 128)",green:"rgb(0, 128, 0)",red:"rgb(255, 0, 0)",white:"rgb(255, 255, 255)"};/^[A-z]+$/i.test(n)?i=s[n]!==a?s[n]:s.black:S.RegEx.isHex.test(n)?i="rgb("+S.Values.hexToRgb(n).join(" ")+")":/^rgba?\(/i.test(n)||(i=s.black),o=(i||n).toString().match(S.RegEx.valueUnwrap)[1].replace(/,(\s+)?/g," ")}return 8>=d||3!==o.split(" ").length||(o+=" 1"),o;case"inject":return 8>=d?4===n.split(" ").length&&(n=n.split(/\s+/).slice(0,3).join(" ")):3===n.split(" ").length&&(n+=" 1"),(8>=d?"rgb":"rgba")+"("+n.replace(/\s+/g,",").replace(/\.(\d)+(?=,)/g,"")+")"}}}()}},Names:{camelCase:function(e){return e.replace(/-(\w)/g,function(e,t){return t.toUpperCase()})},SVGAttribute:function(e){var t="width|height|x|y|cx|cy|r|rx|ry|x1|x2|y1|y2";return(d||b.State.isAndroid&&!b.State.isChrome)&&(t+="|transform"),new RegExp("^("+t+")$","i").test(e)},prefixCheck:function(e){if(b.State.prefixMatches[e])return[b.State.prefixMatches[e],!0];for(var t=["","Webkit","Moz","ms","O"],r=0,a=t.length;a>r;r++){var n;if(n=0===r?e:t[r]+e.replace(/^\w/,function(e){return e.toUpperCase()}),m.isString(b.State.prefixElement.style[n]))return b.State.prefixMatches[e]=n,[n,!0]}return[e,!1]}},Values:{hexToRgb:function(e){var t,r=/^#?([a-f\d])([a-f\d])([a-f\d])$/i,a=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;return e=e.replace(r,function(e,t,r,a){return t+t+r+r+a+a}),t=a.exec(e),t?[parseInt(t[1],16),parseInt(t[2],16),parseInt(t[3],16)]:[0,0,0]},isCSSNullValue:function(e){return 0==e||/^(none|auto|transparent|(rgba\(0, ?0, ?0, ?0\)))$/i.test(e)},getUnitType:function(e){return/^(rotate|skew)/i.test(e)?"deg":/(^(scale|scaleX|scaleY|scaleZ|alpha|flexGrow|flexHeight|zIndex|fontWeight)$)|((opacity|red|green|blue|alpha)$)/i.test(e)?"":"px"},getDisplayType:function(e){var t=e&&e.tagName.toString().toLowerCase();return/^(b|big|i|small|tt|abbr|acronym|cite|code|dfn|em|kbd|strong|samp|var|a|bdo|br|img|map|object|q|script|span|sub|sup|button|input|label|select|textarea)$/i.test(t)?"inline":/^(li)$/i.test(t)?"list-item":/^(tr)$/i.test(t)?"table-row":/^(table)$/i.test(t)?"table":/^(tbody)$/i.test(t)?"table-row-group":"block"},addClass:function(e,t){e.classList?e.classList.add(t):e.className+=(e.className.length?" ":"")+t},removeClass:function(e,t){e.classList?e.classList.remove(t):e.className=e.className.toString().replace(new RegExp("(^|\\s)"+t.split(" ").join("|")+"(\\s|$)","gi")," ")}},getPropertyValue:function(e,r,n,o){function s(e,r){function n(){u&&S.setPropertyValue(e,"display","none")}var l=0;if(8>=d)l=f.css(e,r);else{var u=!1;if(/^(width|height)$/.test(r)&&0===S.getPropertyValue(e,"display")&&(u=!0,S.setPropertyValue(e,"display",S.Values.getDisplayType(e))),!o){if("height"===r&&"border-box"!==S.getPropertyValue(e,"boxSizing").toString().toLowerCase()){var c=e.offsetHeight-(parseFloat(S.getPropertyValue(e,"borderTopWidth"))||0)-(parseFloat(S.getPropertyValue(e,"borderBottomWidth"))||0)-(parseFloat(S.getPropertyValue(e,"paddingTop"))||0)-(parseFloat(S.getPropertyValue(e,"paddingBottom"))||0);return n(),c}if("width"===r&&"border-box"!==S.getPropertyValue(e,"boxSizing").toString().toLowerCase()){var p=e.offsetWidth-(parseFloat(S.getPropertyValue(e,"borderLeftWidth"))||0)-(parseFloat(S.getPropertyValue(e,"borderRightWidth"))||0)-(parseFloat(S.getPropertyValue(e,"paddingLeft"))||0)-(parseFloat(S.getPropertyValue(e,"paddingRight"))||0);return n(),p}}var g;g=i(e)===a?t.getComputedStyle(e,null):i(e).computedStyle?i(e).computedStyle:i(e).computedStyle=t.getComputedStyle(e,null),"borderColor"===r&&(r="borderTopColor"),l=9===d&&"filter"===r?g.getPropertyValue(r):g[r],(""===l||null===l)&&(l=e.style[r]),n()}if("auto"===l&&/^(top|right|bottom|left)$/i.test(r)){var m=s(e,"position");("fixed"===m||"absolute"===m&&/top|left/i.test(r))&&(l=f(e).position()[r]+"px")}return l}var l;if(S.Hooks.registered[r]){var u=r,c=S.Hooks.getRoot(u);n===a&&(n=S.getPropertyValue(e,S.Names.prefixCheck(c)[0])),S.Normalizations.registered[c]&&(n=S.Normalizations.registered[c]("extract",e,n)),l=S.Hooks.extractValue(u,n)}else if(S.Normalizations.registered[r]){var p,g;p=S.Normalizations.registered[r]("name",e),"transform"!==p&&(g=s(e,S.Names.prefixCheck(p)[0]),S.Values.isCSSNullValue(g)&&S.Hooks.templates[r]&&(g=S.Hooks.templates[r][1])),l=S.Normalizations.registered[r]("extract",e,g)}if(!/^[\d-]/.test(l))if(i(e)&&i(e).isSVG&&S.Names.SVGAttribute(r))if(/^(height|width)$/i.test(r))try{l=e.getBBox()[r]}catch(m){l=0}else l=e.getAttribute(r);else l=s(e,S.Names.prefixCheck(r)[0]);return S.Values.isCSSNullValue(l)&&(l=0),b.debug>=2&&console.log("Get "+r+": "+l),l},setPropertyValue:function(e,r,a,n,o){var s=r;if("scroll"===r)o.container?o.container["scroll"+o.direction]=a:"Left"===o.direction?t.scrollTo(a,o.alternateValue):t.scrollTo(o.alternateValue,a);else if(S.Normalizations.registered[r]&&"transform"===S.Normalizations.registered[r]("name",e))S.Normalizations.registered[r]("inject",e,a),s="transform",a=i(e).transformCache[r];else{if(S.Hooks.registered[r]){var l=r,u=S.Hooks.getRoot(r);n=n||S.getPropertyValue(e,u),a=S.Hooks.injectValue(l,a,n),r=u}if(S.Normalizations.registered[r]&&(a=S.Normalizations.registered[r]("inject",e,a),r=S.Normalizations.registered[r]("name",e)),s=S.Names.prefixCheck(r)[0],8>=d)try{e.style[s]=a}catch(c){b.debug&&console.log("Browser does not support ["+a+"] for ["+s+"]")}else i(e)&&i(e).isSVG&&S.Names.SVGAttribute(r)?e.setAttribute(r,a):e.style[s]=a;b.debug>=2&&console.log("Set "+r+" ("+s+"): "+a)}return[s,a]},flushTransformCache:function(e){function t(t){return parseFloat(S.getPropertyValue(e,t))}var r="";if((d||b.State.isAndroid&&!b.State.isChrome)&&i(e).isSVG){var a={translate:[t("translateX"),t("translateY")],skewX:[t("skewX")],skewY:[t("skewY")],scale:1!==t("scale")?[t("scale"),t("scale")]:[t("scaleX"),t("scaleY")],rotate:[t("rotateZ"),0,0]};f.each(i(e).transformCache,function(e){/^translate/i.test(e)?e="translate":/^scale/i.test(e)?e="scale":/^rotate/i.test(e)&&(e="rotate"),a[e]&&(r+=e+"("+a[e].join(" ")+") ",delete a[e])})}else{var n,o;f.each(i(e).transformCache,function(t){return n=i(e).transformCache[t],"transformPerspective"===t?(o=n,!0):(9===d&&"rotateZ"===t&&(t="rotate"),void(r+=t+n+" "))}),o&&(r="perspective"+o+" "+r)}S.setPropertyValue(e,"transform",r)}};S.Hooks.register(),S.Normalizations.register(),b.hook=function(e,t,r){var n=a;return e=o(e),f.each(e,function(e,o){if(i(o)===a&&b.init(o),r===a)n===a&&(n=b.CSS.getPropertyValue(o,t));else{var s=b.CSS.setPropertyValue(o,t,r);"transform"===s[0]&&b.CSS.flushTransformCache(o),n=s}}),n};var P=function(){function e(){return s?k.promise||null:l}function n(){function e(e){function p(e,t){var r=a,n=a,i=a;return m.isArray(e)?(r=e[0],!m.isArray(e[1])&&/^[\d-]/.test(e[1])||m.isFunction(e[1])||S.RegEx.isHex.test(e[1])?i=e[1]:(m.isString(e[1])&&!S.RegEx.isHex.test(e[1])||m.isArray(e[1]))&&(n=t?e[1]:u(e[1],s.duration),e[2]!==a&&(i=e[2]))):r=e,t||(n=n||s.easing),m.isFunction(r)&&(r=r.call(o,V,w)),m.isFunction(i)&&(i=i.call(o,V,w)),[r||0,n,i]}function d(e,t){var r,a;return a=(t||"0").toString().toLowerCase().replace(/[%A-z]+$/,function(e){return r=e,""}),r||(r=S.Values.getUnitType(e)),[a,r]}function h(){var e={myParent:o.parentNode||r.body,position:S.getPropertyValue(o,"position"),fontSize:S.getPropertyValue(o,"fontSize")},a=e.position===L.lastPosition&&e.myParent===L.lastParent,n=e.fontSize===L.lastFontSize;L.lastParent=e.myParent,L.lastPosition=e.position,L.lastFontSize=e.fontSize;var s=100,l={};if(n&&a)l.emToPx=L.lastEmToPx,l.percentToPxWidth=L.lastPercentToPxWidth,l.percentToPxHeight=L.lastPercentToPxHeight;else{var u=i(o).isSVG?r.createElementNS("http://www.w3.org/2000/svg","rect"):r.createElement("div");b.init(u),e.myParent.appendChild(u),f.each(["overflow","overflowX","overflowY"],function(e,t){b.CSS.setPropertyValue(u,t,"hidden")}),b.CSS.setPropertyValue(u,"position",e.position),b.CSS.setPropertyValue(u,"fontSize",e.fontSize),b.CSS.setPropertyValue(u,"boxSizing","content-box"),f.each(["minWidth","maxWidth","width","minHeight","maxHeight","height"],function(e,t){b.CSS.setPropertyValue(u,t,s+"%")}),b.CSS.setPropertyValue(u,"paddingLeft",s+"em"),l.percentToPxWidth=L.lastPercentToPxWidth=(parseFloat(S.getPropertyValue(u,"width",null,!0))||1)/s,l.percentToPxHeight=L.lastPercentToPxHeight=(parseFloat(S.getPropertyValue(u,"height",null,!0))||1)/s,l.emToPx=L.lastEmToPx=(parseFloat(S.getPropertyValue(u,"paddingLeft"))||1)/s,e.myParent.removeChild(u)}return null===L.remToPx&&(L.remToPx=parseFloat(S.getPropertyValue(r.body,"fontSize"))||16),null===L.vwToPx&&(L.vwToPx=parseFloat(t.innerWidth)/100,L.vhToPx=parseFloat(t.innerHeight)/100),l.remToPx=L.remToPx,l.vwToPx=L.vwToPx,l.vhToPx=L.vhToPx,b.debug>=1&&console.log("Unit ratios: "+JSON.stringify(l),o),l}if(s.begin&&0===V)try{s.begin.call(g,g)}catch(x){setTimeout(function(){throw x},1)}if("scroll"===A){var P,C,T,F=/^x$/i.test(s.axis)?"Left":"Top",j=parseFloat(s.offset)||0;s.container?m.isWrapped(s.container)||m.isNode(s.container)?(s.container=s.container[0]||s.container,P=s.container["scroll"+F],T=P+f(o).position()[F.toLowerCase()]+j):s.container=null:(P=b.State.scrollAnchor[b.State["scrollProperty"+F]],C=b.State.scrollAnchor[b.State["scrollProperty"+("Left"===F?"Top":"Left")]],T=f(o).offset()[F.toLowerCase()]+j),l={scroll:{rootPropertyValue:!1,startValue:P,currentValue:P,endValue:T,unitType:"",easing:s.easing,scrollData:{container:s.container,direction:F,alternateValue:C}},element:o},b.debug&&console.log("tweensContainer (scroll): ",l.scroll,o)}else if("reverse"===A){if(!i(o).tweensContainer)return void f.dequeue(o,s.queue);"none"===i(o).opts.display&&(i(o).opts.display="auto"),"hidden"===i(o).opts.visibility&&(i(o).opts.visibility="visible"),i(o).opts.loop=!1,i(o).opts.begin=null,i(o).opts.complete=null,v.easing||delete s.easing,v.duration||delete s.duration,s=f.extend({},i(o).opts,s);var E=f.extend(!0,{},i(o).tweensContainer);for(var H in E)if("element"!==H){var N=E[H].startValue;E[H].startValue=E[H].currentValue=E[H].endValue,E[H].endValue=N,m.isEmptyObject(v)||(E[H].easing=s.easing),b.debug&&console.log("reverse tweensContainer ("+H+"): "+JSON.stringify(E[H]),o)}l=E}else if("start"===A){var E;i(o).tweensContainer&&i(o).isAnimating===!0&&(E=i(o).tweensContainer),f.each(y,function(e,t){if(RegExp("^"+S.Lists.colors.join("$|^")+"$").test(e)){var r=p(t,!0),n=r[0],o=r[1],i=r[2];if(S.RegEx.isHex.test(n)){for(var s=["Red","Green","Blue"],l=S.Values.hexToRgb(n),u=i?S.Values.hexToRgb(i):a,c=0;c<s.length;c++){var f=[l[c]];o&&f.push(o),u!==a&&f.push(u[c]),y[e+s[c]]=f}delete y[e]}}});for(var z in y){var O=p(y[z]),q=O[0],$=O[1],M=O[2];z=S.Names.camelCase(z);var I=S.Hooks.getRoot(z),B=!1;if(i(o).isSVG||"tween"===I||S.Names.prefixCheck(I)[1]!==!1||S.Normalizations.registered[I]!==a){(s.display!==a&&null!==s.display&&"none"!==s.display||s.visibility!==a&&"hidden"!==s.visibility)&&/opacity|filter/.test(z)&&!M&&0!==q&&(M=0),s._cacheValues&&E&&E[z]?(M===a&&(M=E[z].endValue+E[z].unitType),B=i(o).rootPropertyValueCache[I]):S.Hooks.registered[z]?M===a?(B=S.getPropertyValue(o,I),M=S.getPropertyValue(o,z,B)):B=S.Hooks.templates[I][1]:M===a&&(M=S.getPropertyValue(o,z));var W,G,Y,D=!1;if(W=d(z,M),M=W[0],Y=W[1],W=d(z,q),q=W[0].replace(/^([+-\/*])=/,function(e,t){return D=t,""}),G=W[1],M=parseFloat(M)||0,q=parseFloat(q)||0,"%"===G&&(/^(fontSize|lineHeight)$/.test(z)?(q/=100,G="em"):/^scale/.test(z)?(q/=100,G=""):/(Red|Green|Blue)$/i.test(z)&&(q=q/100*255,G="")),/[\/*]/.test(D))G=Y;else if(Y!==G&&0!==M)if(0===q)G=Y;else{n=n||h();var Q=/margin|padding|left|right|width|text|word|letter/i.test(z)||/X$/.test(z)||"x"===z?"x":"y";switch(Y){case"%":M*="x"===Q?n.percentToPxWidth:n.percentToPxHeight;break;case"px":break;default:M*=n[Y+"ToPx"]}switch(G){case"%":M*=1/("x"===Q?n.percentToPxWidth:n.percentToPxHeight);break;case"px":break;default:M*=1/n[G+"ToPx"]}}switch(D){case"+":q=M+q;break;case"-":q=M-q;break;case"*":q=M*q;break;case"/":q=M/q}l[z]={rootPropertyValue:B,startValue:M,currentValue:M,endValue:q,unitType:G,easing:$},b.debug&&console.log("tweensContainer ("+z+"): "+JSON.stringify(l[z]),o)}else b.debug&&console.log("Skipping ["+I+"] due to a lack of browser support.")}l.element=o}l.element&&(S.Values.addClass(o,"velocity-animating"),R.push(l),""===s.queue&&(i(o).tweensContainer=l,i(o).opts=s),i(o).isAnimating=!0,V===w-1?(b.State.calls.push([R,g,s,null,k.resolver]),b.State.isTicking===!1&&(b.State.isTicking=!0,c())):V++)}var n,o=this,s=f.extend({},b.defaults,v),l={};switch(i(o)===a&&b.init(o),parseFloat(s.delay)&&s.queue!==!1&&f.queue(o,s.queue,function(e){b.velocityQueueEntryFlag=!0,i(o).delayTimer={setTimeout:setTimeout(e,parseFloat(s.delay)),next:e}}),s.duration.toString().toLowerCase()){case"fast":s.duration=200;break;case"normal":s.duration=h;break;case"slow":s.duration=600;break;default:s.duration=parseFloat(s.duration)||1}b.mock!==!1&&(b.mock===!0?s.duration=s.delay=1:(s.duration*=parseFloat(b.mock)||1,s.delay*=parseFloat(b.mock)||1)),s.easing=u(s.easing,s.duration),s.begin&&!m.isFunction(s.begin)&&(s.begin=null),s.progress&&!m.isFunction(s.progress)&&(s.progress=null),s.complete&&!m.isFunction(s.complete)&&(s.complete=null),s.display!==a&&null!==s.display&&(s.display=s.display.toString().toLowerCase(),"auto"===s.display&&(s.display=b.CSS.Values.getDisplayType(o))),s.visibility!==a&&null!==s.visibility&&(s.visibility=s.visibility.toString().toLowerCase()),s.mobileHA=s.mobileHA&&b.State.isMobile&&!b.State.isGingerbread,s.queue===!1?s.delay?setTimeout(e,s.delay):e():f.queue(o,s.queue,function(t,r){return r===!0?(k.promise&&k.resolver(g),!0):(b.velocityQueueEntryFlag=!0,void e(t))}),""!==s.queue&&"fx"!==s.queue||"inprogress"===f.queue(o)[0]||f.dequeue(o)}var s,l,d,g,y,v,x=arguments[0]&&(arguments[0].p||f.isPlainObject(arguments[0].properties)&&!arguments[0].properties.names||m.isString(arguments[0].properties));if(m.isWrapped(this)?(s=!1,d=0,g=this,l=this):(s=!0,d=1,g=x?arguments[0].elements||arguments[0].e:arguments[0]),g=o(g)){x?(y=arguments[0].properties||arguments[0].p,v=arguments[0].options||arguments[0].o):(y=arguments[d],v=arguments[d+1]);var w=g.length,V=0;if(!/^(stop|finish)$/i.test(y)&&!f.isPlainObject(v)){var C=d+1;v={};for(var T=C;T<arguments.length;T++)m.isArray(arguments[T])||!/^(fast|normal|slow)$/i.test(arguments[T])&&!/^\d/.test(arguments[T])?m.isString(arguments[T])||m.isArray(arguments[T])?v.easing=arguments[T]:m.isFunction(arguments[T])&&(v.complete=arguments[T]):v.duration=arguments[T]}var k={promise:null,resolver:null,rejecter:null};s&&b.Promise&&(k.promise=new b.Promise(function(e,t){k.resolver=e,k.rejecter=t}));var A;switch(y){case"scroll":A="scroll";break;case"reverse":A="reverse";break;case"finish":case"stop":f.each(g,function(e,t){i(t)&&i(t).delayTimer&&(clearTimeout(i(t).delayTimer.setTimeout),i(t).delayTimer.next&&i(t).delayTimer.next(),delete i(t).delayTimer)});var F=[];return f.each(b.State.calls,function(e,t){t&&f.each(t[1],function(r,n){var o=v===a?"":v;return o===!0||t[2].queue===o||v===a&&t[2].queue===!1?void f.each(g,function(r,a){a===n&&((v===!0||m.isString(v))&&(f.each(f.queue(a,m.isString(v)?v:""),function(e,t){
m.isFunction(t)&&t(null,!0)}),f.queue(a,m.isString(v)?v:"",[])),"stop"===y?(i(a)&&i(a).tweensContainer&&o!==!1&&f.each(i(a).tweensContainer,function(e,t){t.endValue=t.currentValue}),F.push(e)):"finish"===y&&(t[2].duration=1))}):!0})}),"stop"===y&&(f.each(F,function(e,t){p(t,!0)}),k.promise&&k.resolver(g)),e();default:if(!f.isPlainObject(y)||m.isEmptyObject(y)){if(m.isString(y)&&b.Redirects[y]){var j=f.extend({},v),E=j.duration,H=j.delay||0;return j.backwards===!0&&(g=f.extend(!0,[],g).reverse()),f.each(g,function(e,t){parseFloat(j.stagger)?j.delay=H+parseFloat(j.stagger)*e:m.isFunction(j.stagger)&&(j.delay=H+j.stagger.call(t,e,w)),j.drag&&(j.duration=parseFloat(E)||(/^(callout|transition)/.test(y)?1e3:h),j.duration=Math.max(j.duration*(j.backwards?1-e/w:(e+1)/w),.75*j.duration,200)),b.Redirects[y].call(t,t,j||{},e,w,g,k.promise?k:a)}),e()}var N="Velocity: First argument ("+y+") was not a property map, a known action, or a registered redirect. Aborting.";return k.promise?k.rejecter(new Error(N)):console.log(N),e()}A="start"}var L={lastParent:null,lastPosition:null,lastFontSize:null,lastPercentToPxWidth:null,lastPercentToPxHeight:null,lastEmToPx:null,remToPx:null,vwToPx:null,vhToPx:null},R=[];f.each(g,function(e,t){m.isNode(t)&&n.call(t)});var z,j=f.extend({},b.defaults,v);if(j.loop=parseInt(j.loop),z=2*j.loop-1,j.loop)for(var O=0;z>O;O++){var q={delay:j.delay,progress:j.progress};O===z-1&&(q.display=j.display,q.visibility=j.visibility,q.complete=j.complete),P(g,"reverse",q)}return e()}};b=f.extend(P,b),b.animate=P;var w=t.requestAnimationFrame||g;return b.State.isMobile||r.hidden===a||r.addEventListener("visibilitychange",function(){r.hidden?(w=function(e){return setTimeout(function(){e(!0)},16)},c()):w=t.requestAnimationFrame||g}),e.Velocity=b,e!==t&&(e.fn.velocity=P,e.fn.velocity.defaults=b.defaults),f.each(["Down","Up"],function(e,t){b.Redirects["slide"+t]=function(e,r,n,o,i,s){var l=f.extend({},r),u=l.begin,c=l.complete,p={height:"",marginTop:"",marginBottom:"",paddingTop:"",paddingBottom:""},d={};l.display===a&&(l.display="Down"===t?"inline"===b.CSS.Values.getDisplayType(e)?"inline-block":"block":"none"),l.begin=function(){u&&u.call(i,i);for(var r in p){d[r]=e.style[r];var a=b.CSS.getPropertyValue(e,r);p[r]="Down"===t?[a,0]:[0,a]}d.overflow=e.style.overflow,e.style.overflow="hidden"},l.complete=function(){for(var t in d)e.style[t]=d[t];c&&c.call(i,i),s&&s.resolver(i)},b(e,p,l)}}),f.each(["In","Out"],function(e,t){b.Redirects["fade"+t]=function(e,r,n,o,i,s){var l=f.extend({},r),u={opacity:"In"===t?1:0},c=l.complete;l.complete=n!==o-1?l.begin=null:function(){c&&c.call(i,i),s&&s.resolver(i)},l.display===a&&(l.display="In"===t?"auto":"none"),b(this,u,l)}}),b}(window.jQuery||window.Zepto||window,window,document)}));
;!function(a,b,c,d){"use strict";function k(a,b,c){return setTimeout(q(a,c),b)}function l(a,b,c){return Array.isArray(a)?(m(a,c[b],c),!0):!1}function m(a,b,c){var e;if(a)if(a.forEach)a.forEach(b,c);else if(a.length!==d)for(e=0;e<a.length;)b.call(c,a[e],e,a),e++;else for(e in a)a.hasOwnProperty(e)&&b.call(c,a[e],e,a)}function n(a,b,c){for(var e=Object.keys(b),f=0;f<e.length;)(!c||c&&a[e[f]]===d)&&(a[e[f]]=b[e[f]]),f++;return a}function o(a,b){return n(a,b,!0)}function p(a,b,c){var e,d=b.prototype;e=a.prototype=Object.create(d),e.constructor=a,e._super=d,c&&n(e,c)}function q(a,b){return function(){return a.apply(b,arguments)}}function r(a,b){return typeof a==g?a.apply(b?b[0]||d:d,b):a}function s(a,b){return a===d?b:a}function t(a,b,c){m(x(b),function(b){a.addEventListener(b,c,!1)})}function u(a,b,c){m(x(b),function(b){a.removeEventListener(b,c,!1)})}function v(a,b){for(;a;){if(a==b)return!0;a=a.parentNode}return!1}function w(a,b){return a.indexOf(b)>-1}function x(a){return a.trim().split(/\s+/g)}function y(a,b,c){if(a.indexOf&&!c)return a.indexOf(b);for(var d=0;d<a.length;){if(c&&a[d][c]==b||!c&&a[d]===b)return d;d++}return-1}function z(a){return Array.prototype.slice.call(a,0)}function A(a,b,c){for(var d=[],e=[],f=0;f<a.length;){var g=b?a[f][b]:a[f];y(e,g)<0&&d.push(a[f]),e[f]=g,f++}return c&&(d=b?d.sort(function(a,c){return a[b]>c[b]}):d.sort()),d}function B(a,b){for(var c,f,g=b[0].toUpperCase()+b.slice(1),h=0;h<e.length;){if(c=e[h],f=c?c+g:b,f in a)return f;h++}return d}function D(){return C++}function E(a){var b=a.ownerDocument;return b.defaultView||b.parentWindow}function ab(a,b){var c=this;this.manager=a,this.callback=b,this.element=a.element,this.target=a.options.inputTarget,this.domHandler=function(b){r(a.options.enable,[a])&&c.handler(b)},this.init()}function bb(a){var b,c=a.options.inputClass;return b=c?c:H?wb:I?Eb:G?Gb:rb,new b(a,cb)}function cb(a,b,c){var d=c.pointers.length,e=c.changedPointers.length,f=b&O&&0===d-e,g=b&(Q|R)&&0===d-e;c.isFirst=!!f,c.isFinal=!!g,f&&(a.session={}),c.eventType=b,db(a,c),a.emit("hammer.input",c),a.recognize(c),a.session.prevInput=c}function db(a,b){var c=a.session,d=b.pointers,e=d.length;c.firstInput||(c.firstInput=gb(b)),e>1&&!c.firstMultiple?c.firstMultiple=gb(b):1===e&&(c.firstMultiple=!1);var f=c.firstInput,g=c.firstMultiple,h=g?g.center:f.center,i=b.center=hb(d);b.timeStamp=j(),b.deltaTime=b.timeStamp-f.timeStamp,b.angle=lb(h,i),b.distance=kb(h,i),eb(c,b),b.offsetDirection=jb(b.deltaX,b.deltaY),b.scale=g?nb(g.pointers,d):1,b.rotation=g?mb(g.pointers,d):0,fb(c,b);var k=a.element;v(b.srcEvent.target,k)&&(k=b.srcEvent.target),b.target=k}function eb(a,b){var c=b.center,d=a.offsetDelta||{},e=a.prevDelta||{},f=a.prevInput||{};(b.eventType===O||f.eventType===Q)&&(e=a.prevDelta={x:f.deltaX||0,y:f.deltaY||0},d=a.offsetDelta={x:c.x,y:c.y}),b.deltaX=e.x+(c.x-d.x),b.deltaY=e.y+(c.y-d.y)}function fb(a,b){var f,g,h,j,c=a.lastInterval||b,e=b.timeStamp-c.timeStamp;if(b.eventType!=R&&(e>N||c.velocity===d)){var k=c.deltaX-b.deltaX,l=c.deltaY-b.deltaY,m=ib(e,k,l);g=m.x,h=m.y,f=i(m.x)>i(m.y)?m.x:m.y,j=jb(k,l),a.lastInterval=b}else f=c.velocity,g=c.velocityX,h=c.velocityY,j=c.direction;b.velocity=f,b.velocityX=g,b.velocityY=h,b.direction=j}function gb(a){for(var b=[],c=0;c<a.pointers.length;)b[c]={clientX:h(a.pointers[c].clientX),clientY:h(a.pointers[c].clientY)},c++;return{timeStamp:j(),pointers:b,center:hb(b),deltaX:a.deltaX,deltaY:a.deltaY}}function hb(a){var b=a.length;if(1===b)return{x:h(a[0].clientX),y:h(a[0].clientY)};for(var c=0,d=0,e=0;b>e;)c+=a[e].clientX,d+=a[e].clientY,e++;return{x:h(c/b),y:h(d/b)}}function ib(a,b,c){return{x:b/a||0,y:c/a||0}}function jb(a,b){return a===b?S:i(a)>=i(b)?a>0?T:U:b>0?V:W}function kb(a,b,c){c||(c=$);var d=b[c[0]]-a[c[0]],e=b[c[1]]-a[c[1]];return Math.sqrt(d*d+e*e)}function lb(a,b,c){c||(c=$);var d=b[c[0]]-a[c[0]],e=b[c[1]]-a[c[1]];return 180*Math.atan2(e,d)/Math.PI}function mb(a,b){return lb(b[1],b[0],_)-lb(a[1],a[0],_)}function nb(a,b){return kb(b[0],b[1],_)/kb(a[0],a[1],_)}function rb(){this.evEl=pb,this.evWin=qb,this.allow=!0,this.pressed=!1,ab.apply(this,arguments)}function wb(){this.evEl=ub,this.evWin=vb,ab.apply(this,arguments),this.store=this.manager.session.pointerEvents=[]}function Ab(){this.evTarget=yb,this.evWin=zb,this.started=!1,ab.apply(this,arguments)}function Bb(a,b){var c=z(a.touches),d=z(a.changedTouches);return b&(Q|R)&&(c=A(c.concat(d),"identifier",!0)),[c,d]}function Eb(){this.evTarget=Db,this.targetIds={},ab.apply(this,arguments)}function Fb(a,b){var c=z(a.touches),d=this.targetIds;if(b&(O|P)&&1===c.length)return d[c[0].identifier]=!0,[c,c];var e,f,g=z(a.changedTouches),h=[],i=this.target;if(f=c.filter(function(a){return v(a.target,i)}),b===O)for(e=0;e<f.length;)d[f[e].identifier]=!0,e++;for(e=0;e<g.length;)d[g[e].identifier]&&h.push(g[e]),b&(Q|R)&&delete d[g[e].identifier],e++;return h.length?[A(f.concat(h),"identifier",!0),h]:void 0}function Gb(){ab.apply(this,arguments);var a=q(this.handler,this);this.touch=new Eb(this.manager,a),this.mouse=new rb(this.manager,a)}function Pb(a,b){this.manager=a,this.set(b)}function Qb(a){if(w(a,Mb))return Mb;var b=w(a,Nb),c=w(a,Ob);return b&&c?Nb+" "+Ob:b||c?b?Nb:Ob:w(a,Lb)?Lb:Kb}function Yb(a){this.id=D(),this.manager=null,this.options=o(a||{},this.defaults),this.options.enable=s(this.options.enable,!0),this.state=Rb,this.simultaneous={},this.requireFail=[]}function Zb(a){return a&Wb?"cancel":a&Ub?"end":a&Tb?"move":a&Sb?"start":""}function $b(a){return a==W?"down":a==V?"up":a==T?"left":a==U?"right":""}function _b(a,b){var c=b.manager;return c?c.get(a):a}function ac(){Yb.apply(this,arguments)}function bc(){ac.apply(this,arguments),this.pX=null,this.pY=null}function cc(){ac.apply(this,arguments)}function dc(){Yb.apply(this,arguments),this._timer=null,this._input=null}function ec(){ac.apply(this,arguments)}function fc(){ac.apply(this,arguments)}function gc(){Yb.apply(this,arguments),this.pTime=!1,this.pCenter=!1,this._timer=null,this._input=null,this.count=0}function hc(a,b){return b=b||{},b.recognizers=s(b.recognizers,hc.defaults.preset),new kc(a,b)}function kc(a,b){b=b||{},this.options=o(b,hc.defaults),this.options.inputTarget=this.options.inputTarget||a,this.handlers={},this.session={},this.recognizers=[],this.element=a,this.input=bb(this),this.touchAction=new Pb(this,this.options.touchAction),lc(this,!0),m(b.recognizers,function(a){var b=this.add(new a[0](a[1]));a[2]&&b.recognizeWith(a[2]),a[3]&&b.requireFailure(a[3])},this)}function lc(a,b){var c=a.element;m(a.options.cssProps,function(a,d){c.style[B(c.style,d)]=b?a:""})}function mc(a,c){var d=b.createEvent("Event");d.initEvent(a,!0,!0),d.gesture=c,c.target.dispatchEvent(d)}var e=["","webkit","moz","MS","ms","o"],f=b.createElement("div"),g="function",h=Math.round,i=Math.abs,j=Date.now,C=1,F=/mobile|tablet|ip(ad|hone|od)|android/i,G="ontouchstart"in a,H=B(a,"PointerEvent")!==d,I=G&&F.test(navigator.userAgent),J="touch",K="pen",L="mouse",M="kinect",N=25,O=1,P=2,Q=4,R=8,S=1,T=2,U=4,V=8,W=16,X=T|U,Y=V|W,Z=X|Y,$=["x","y"],_=["clientX","clientY"];ab.prototype={handler:function(){},init:function(){this.evEl&&t(this.element,this.evEl,this.domHandler),this.evTarget&&t(this.target,this.evTarget,this.domHandler),this.evWin&&t(E(this.element),this.evWin,this.domHandler)},destroy:function(){this.evEl&&u(this.element,this.evEl,this.domHandler),this.evTarget&&u(this.target,this.evTarget,this.domHandler),this.evWin&&u(E(this.element),this.evWin,this.domHandler)}};var ob={mousedown:O,mousemove:P,mouseup:Q},pb="mousedown",qb="mousemove mouseup";p(rb,ab,{handler:function(a){var b=ob[a.type];b&O&&0===a.button&&(this.pressed=!0),b&P&&1!==a.which&&(b=Q),this.pressed&&this.allow&&(b&Q&&(this.pressed=!1),this.callback(this.manager,b,{pointers:[a],changedPointers:[a],pointerType:L,srcEvent:a}))}});var sb={pointerdown:O,pointermove:P,pointerup:Q,pointercancel:R,pointerout:R},tb={2:J,3:K,4:L,5:M},ub="pointerdown",vb="pointermove pointerup pointercancel";a.MSPointerEvent&&(ub="MSPointerDown",vb="MSPointerMove MSPointerUp MSPointerCancel"),p(wb,ab,{handler:function(a){var b=this.store,c=!1,d=a.type.toLowerCase().replace("ms",""),e=sb[d],f=tb[a.pointerType]||a.pointerType,g=f==J,h=y(b,a.pointerId,"pointerId");e&O&&(0===a.button||g)?0>h&&(b.push(a),h=b.length-1):e&(Q|R)&&(c=!0),0>h||(b[h]=a,this.callback(this.manager,e,{pointers:b,changedPointers:[a],pointerType:f,srcEvent:a}),c&&b.splice(h,1))}});var xb={touchstart:O,touchmove:P,touchend:Q,touchcancel:R},yb="touchstart",zb="touchstart touchmove touchend touchcancel";p(Ab,ab,{handler:function(a){var b=xb[a.type];if(b===O&&(this.started=!0),this.started){var c=Bb.call(this,a,b);b&(Q|R)&&0===c[0].length-c[1].length&&(this.started=!1),this.callback(this.manager,b,{pointers:c[0],changedPointers:c[1],pointerType:J,srcEvent:a})}}});var Cb={touchstart:O,touchmove:P,touchend:Q,touchcancel:R},Db="touchstart touchmove touchend touchcancel";p(Eb,ab,{handler:function(a){var b=Cb[a.type],c=Fb.call(this,a,b);c&&this.callback(this.manager,b,{pointers:c[0],changedPointers:c[1],pointerType:J,srcEvent:a})}}),p(Gb,ab,{handler:function(a,b,c){var d=c.pointerType==J,e=c.pointerType==L;if(d)this.mouse.allow=!1;else if(e&&!this.mouse.allow)return;b&(Q|R)&&(this.mouse.allow=!0),this.callback(a,b,c)},destroy:function(){this.touch.destroy(),this.mouse.destroy()}});var Hb=B(f.style,"touchAction"),Ib=Hb!==d,Jb="compute",Kb="auto",Lb="manipulation",Mb="none",Nb="pan-x",Ob="pan-y";Pb.prototype={set:function(a){a==Jb&&(a=this.compute()),Ib&&(this.manager.element.style[Hb]=a),this.actions=a.toLowerCase().trim()},update:function(){this.set(this.manager.options.touchAction)},compute:function(){var a=[];return m(this.manager.recognizers,function(b){r(b.options.enable,[b])&&(a=a.concat(b.getTouchAction()))}),Qb(a.join(" "))},preventDefaults:function(a){if(!Ib){var b=a.srcEvent,c=a.offsetDirection;if(this.manager.session.prevented)return b.preventDefault(),void 0;var d=this.actions,e=w(d,Mb),f=w(d,Ob),g=w(d,Nb);return e||f&&c&X||g&&c&Y?this.preventSrc(b):void 0}},preventSrc:function(a){this.manager.session.prevented=!0,a.preventDefault()}};var Rb=1,Sb=2,Tb=4,Ub=8,Vb=Ub,Wb=16,Xb=32;Yb.prototype={defaults:{},set:function(a){return n(this.options,a),this.manager&&this.manager.touchAction.update(),this},recognizeWith:function(a){if(l(a,"recognizeWith",this))return this;var b=this.simultaneous;return a=_b(a,this),b[a.id]||(b[a.id]=a,a.recognizeWith(this)),this},dropRecognizeWith:function(a){return l(a,"dropRecognizeWith",this)?this:(a=_b(a,this),delete this.simultaneous[a.id],this)},requireFailure:function(a){if(l(a,"requireFailure",this))return this;var b=this.requireFail;return a=_b(a,this),-1===y(b,a)&&(b.push(a),a.requireFailure(this)),this},dropRequireFailure:function(a){if(l(a,"dropRequireFailure",this))return this;a=_b(a,this);var b=y(this.requireFail,a);return b>-1&&this.requireFail.splice(b,1),this},hasRequireFailures:function(){return this.requireFail.length>0},canRecognizeWith:function(a){return!!this.simultaneous[a.id]},emit:function(a){function d(d){b.manager.emit(b.options.event+(d?Zb(c):""),a)}var b=this,c=this.state;Ub>c&&d(!0),d(),c>=Ub&&d(!0)},tryEmit:function(a){return this.canEmit()?this.emit(a):(this.state=Xb,void 0)},canEmit:function(){for(var a=0;a<this.requireFail.length;){if(!(this.requireFail[a].state&(Xb|Rb)))return!1;a++}return!0},recognize:function(a){var b=n({},a);return r(this.options.enable,[this,b])?(this.state&(Vb|Wb|Xb)&&(this.state=Rb),this.state=this.process(b),this.state&(Sb|Tb|Ub|Wb)&&this.tryEmit(b),void 0):(this.reset(),this.state=Xb,void 0)},process:function(){},getTouchAction:function(){},reset:function(){}},p(ac,Yb,{defaults:{pointers:1},attrTest:function(a){var b=this.options.pointers;return 0===b||a.pointers.length===b},process:function(a){var b=this.state,c=a.eventType,d=b&(Sb|Tb),e=this.attrTest(a);return d&&(c&R||!e)?b|Wb:d||e?c&Q?b|Ub:b&Sb?b|Tb:Sb:Xb}}),p(bc,ac,{defaults:{event:"pan",threshold:10,pointers:1,direction:Z},getTouchAction:function(){var a=this.options.direction,b=[];return a&X&&b.push(Ob),a&Y&&b.push(Nb),b},directionTest:function(a){var b=this.options,c=!0,d=a.distance,e=a.direction,f=a.deltaX,g=a.deltaY;return e&b.direction||(b.direction&X?(e=0===f?S:0>f?T:U,c=f!=this.pX,d=Math.abs(a.deltaX)):(e=0===g?S:0>g?V:W,c=g!=this.pY,d=Math.abs(a.deltaY))),a.direction=e,c&&d>b.threshold&&e&b.direction},attrTest:function(a){return ac.prototype.attrTest.call(this,a)&&(this.state&Sb||!(this.state&Sb)&&this.directionTest(a))},emit:function(a){this.pX=a.deltaX,this.pY=a.deltaY;var b=$b(a.direction);b&&this.manager.emit(this.options.event+b,a),this._super.emit.call(this,a)}}),p(cc,ac,{defaults:{event:"pinch",threshold:0,pointers:2},getTouchAction:function(){return[Mb]},attrTest:function(a){return this._super.attrTest.call(this,a)&&(Math.abs(a.scale-1)>this.options.threshold||this.state&Sb)},emit:function(a){if(this._super.emit.call(this,a),1!==a.scale){var b=a.scale<1?"in":"out";this.manager.emit(this.options.event+b,a)}}}),p(dc,Yb,{defaults:{event:"press",pointers:1,time:500,threshold:5},getTouchAction:function(){return[Kb]},process:function(a){var b=this.options,c=a.pointers.length===b.pointers,d=a.distance<b.threshold,e=a.deltaTime>b.time;if(this._input=a,!d||!c||a.eventType&(Q|R)&&!e)this.reset();else if(a.eventType&O)this.reset(),this._timer=k(function(){this.state=Vb,this.tryEmit()},b.time,this);else if(a.eventType&Q)return Vb;return Xb},reset:function(){clearTimeout(this._timer)},emit:function(a){this.state===Vb&&(a&&a.eventType&Q?this.manager.emit(this.options.event+"up",a):(this._input.timeStamp=j(),this.manager.emit(this.options.event,this._input)))}}),p(ec,ac,{defaults:{event:"rotate",threshold:0,pointers:2},getTouchAction:function(){return[Mb]},attrTest:function(a){return this._super.attrTest.call(this,a)&&(Math.abs(a.rotation)>this.options.threshold||this.state&Sb)}}),p(fc,ac,{defaults:{event:"swipe",threshold:10,velocity:.65,direction:X|Y,pointers:1},getTouchAction:function(){return bc.prototype.getTouchAction.call(this)},attrTest:function(a){var c,b=this.options.direction;return b&(X|Y)?c=a.velocity:b&X?c=a.velocityX:b&Y&&(c=a.velocityY),this._super.attrTest.call(this,a)&&b&a.direction&&a.distance>this.options.threshold&&i(c)>this.options.velocity&&a.eventType&Q},emit:function(a){var b=$b(a.direction);b&&this.manager.emit(this.options.event+b,a),this.manager.emit(this.options.event,a)}}),p(gc,Yb,{defaults:{event:"tap",pointers:1,taps:1,interval:300,time:250,threshold:2,posThreshold:10},getTouchAction:function(){return[Lb]},process:function(a){var b=this.options,c=a.pointers.length===b.pointers,d=a.distance<b.threshold,e=a.deltaTime<b.time;if(this.reset(),a.eventType&O&&0===this.count)return this.failTimeout();if(d&&e&&c){if(a.eventType!=Q)return this.failTimeout();var f=this.pTime?a.timeStamp-this.pTime<b.interval:!0,g=!this.pCenter||kb(this.pCenter,a.center)<b.posThreshold;this.pTime=a.timeStamp,this.pCenter=a.center,g&&f?this.count+=1:this.count=1,this._input=a;var h=this.count%b.taps;if(0===h)return this.hasRequireFailures()?(this._timer=k(function(){this.state=Vb,this.tryEmit()},b.interval,this),Sb):Vb}return Xb},failTimeout:function(){return this._timer=k(function(){this.state=Xb},this.options.interval,this),Xb},reset:function(){clearTimeout(this._timer)},emit:function(){this.state==Vb&&(this._input.tapCount=this.count,this.manager.emit(this.options.event,this._input))}}),hc.VERSION="2.0.4",hc.defaults={domEvents:!1,touchAction:Jb,enable:!0,inputTarget:null,inputClass:null,preset:[[ec,{enable:!1}],[cc,{enable:!1},["rotate"]],[fc,{direction:X}],[bc,{direction:X},["swipe"]],[gc],[gc,{event:"doubletap",taps:2},["tap"]],[dc]],cssProps:{userSelect:"default",touchSelect:"none",touchCallout:"none",contentZooming:"none",userDrag:"none",tapHighlightColor:"rgba(0,0,0,0)"}};var ic=1,jc=2;kc.prototype={set:function(a){return n(this.options,a),a.touchAction&&this.touchAction.update(),a.inputTarget&&(this.input.destroy(),this.input.target=a.inputTarget,this.input.init()),this},stop:function(a){this.session.stopped=a?jc:ic},recognize:function(a){var b=this.session;if(!b.stopped){this.touchAction.preventDefaults(a);var c,d=this.recognizers,e=b.curRecognizer;(!e||e&&e.state&Vb)&&(e=b.curRecognizer=null);for(var f=0;f<d.length;)c=d[f],b.stopped===jc||e&&c!=e&&!c.canRecognizeWith(e)?c.reset():c.recognize(a),!e&&c.state&(Sb|Tb|Ub)&&(e=b.curRecognizer=c),f++}},get:function(a){if(a instanceof Yb)return a;for(var b=this.recognizers,c=0;c<b.length;c++)if(b[c].options.event==a)return b[c];return null},add:function(a){if(l(a,"add",this))return this;var b=this.get(a.options.event);return b&&this.remove(b),this.recognizers.push(a),a.manager=this,this.touchAction.update(),a},remove:function(a){if(l(a,"remove",this))return this;var b=this.recognizers;return a=this.get(a),b.splice(y(b,a),1),this.touchAction.update(),this},on:function(a,b){var c=this.handlers;return m(x(a),function(a){c[a]=c[a]||[],c[a].push(b)}),this},off:function(a,b){var c=this.handlers;return m(x(a),function(a){b?c[a].splice(y(c[a],b),1):delete c[a]}),this},emit:function(a,b){this.options.domEvents&&mc(a,b);var c=this.handlers[a]&&this.handlers[a].slice();if(c&&c.length){b.type=a,b.preventDefault=function(){b.srcEvent.preventDefault()};for(var d=0;d<c.length;)c[d](b),d++}},destroy:function(){this.element&&lc(this,!1),this.handlers={},this.session={},this.input.destroy(),this.element=null}},n(hc,{INPUT_START:O,INPUT_MOVE:P,INPUT_END:Q,INPUT_CANCEL:R,STATE_POSSIBLE:Rb,STATE_BEGAN:Sb,STATE_CHANGED:Tb,STATE_ENDED:Ub,STATE_RECOGNIZED:Vb,STATE_CANCELLED:Wb,STATE_FAILED:Xb,DIRECTION_NONE:S,DIRECTION_LEFT:T,DIRECTION_RIGHT:U,DIRECTION_UP:V,DIRECTION_DOWN:W,DIRECTION_HORIZONTAL:X,DIRECTION_VERTICAL:Y,DIRECTION_ALL:Z,Manager:kc,Input:ab,TouchAction:Pb,TouchInput:Eb,MouseInput:rb,PointerEventInput:wb,TouchMouseInput:Gb,SingleTouchInput:Ab,Recognizer:Yb,AttrRecognizer:ac,Tap:gc,Pan:bc,Swipe:fc,Pinch:cc,Rotate:ec,Press:dc,on:t,off:u,each:m,merge:o,extend:n,inherit:p,bindFn:q,prefixed:B}),typeof dontdefine==g&&dontdefine.amd?dontdefine(function(){return hc}):"undefined"!=typeof module&&module.exports?module.exports=hc:a[c]=hc}(window,document,"Hammer");;(function(factory) {
	if (typeof exports === 'object') {
		factory(require('jquery'), require('hammerjs'));
	} else {
		factory(jQuery, Hammer);
	}
}(function($, Hammer) {
	function hammerify(el, options) {
		var $el = $(el);
		if(!$el.data("hammer")) {
			$el.data("hammer", new Hammer($el[0], options));
		}
	}

	$.fn.hammer = function(options) {
		return this.each(function() {
			hammerify(this, options);
		});
	};

	// extend the emit method to also trigger jQuery events
	Hammer.Manager.prototype.emit = (function(originalEmit) {
		return function(type, data) {
			originalEmit.call(this, type, data);
			$(this.element).trigger({
				type: type,
				gesture: data
			});
		};
	})(Hammer.Manager.prototype.emit);
}));
;// Required for Meteor package, the use of window prevents export by Meteor
(function(window){
  if(window.Package){
	Materialize = {};
  } else {
	window.Materialize = {};
  }
})(window);


// Unique ID
Materialize.guid = (function() {
  function s4() {
	return Math.floor((1 + Math.random()) * 0x10000)
	  .toString(16)
	  .substring(1);
  }
  return function() {
	return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
		   s4() + '-' + s4() + s4() + s4();
  };
})();

Materialize.elementOrParentIsFixed = function(element) {
	var $element = $(element);
	var $checkElements = $element.add($element.parents());
	var isFixed = false;
	$checkElements.each(function(){
		if ($(this).css("position") === "fixed") {
			isFixed = true;
			return false;
		}
	});
	return isFixed;
};

// Velocity has conflicts when loaded with jQuery, this will check for it
var Vel;
if ($) {
  Vel = $.Velocity;
}
else {
  Vel = Velocity;
}
;  (function ($) {
  $.fn.collapsible = function(options) {
	var defaults = {
		accordion: undefined
	};

	options = $.extend(defaults, options);


	return this.each(function() {

	  var $this = $(this);

	  var $panel_headers = $(this).find('> li > .collapsible-header');

	  var collapsible_type = $this.data("collapsible");

	  // Turn off any existing event handlers
	   $this.off('click.collapse', '.collapsible-header');
	   $panel_headers.off('click.collapse');


	   /****************
	   Helper Functions
	   ****************/

	  // Accordion Open
	  function accordionOpen(object) {
		$panel_headers = $this.find('> li > .collapsible-header');
		if (object.hasClass('active')) {
			object.parent().addClass('active');
		}
		else {
			object.parent().removeClass('active');
		}
		if (object.parent().hasClass('active')){
		  object.siblings('.collapsible-body').stop(true,false).slideDown({ duration: 350, easing: "easeOutQuart", queue: false, complete: function() {$(this).css('height', '');}});
		}
		else{
		  object.siblings('.collapsible-body').stop(true,false).slideUp({ duration: 350, easing: "easeOutQuart", queue: false, complete: function() {$(this).css('height', '');}});
		}

		$panel_headers.not(object).removeClass('active').parent().removeClass('active');
		$panel_headers.not(object).parent().children('.collapsible-body').stop(true,false).slideUp(
		  {
			duration: 350,
			easing: "easeOutQuart",
			queue: false,
			complete:
			  function() {
				$(this).css('height', '');
			  }
		  });
	  }

	  // Expandable Open
	  function expandableOpen(object) {
		if (object.hasClass('active')) {
			object.parent().addClass('active');
		}
		else {
			object.parent().removeClass('active');
		}
		if (object.parent().hasClass('active')){
		  object.siblings('.collapsible-body').stop(true,false).slideDown({ duration: 350, easing: "easeOutQuart", queue: false, complete: function() {$(this).css('height', '');}});
		}
		else{
		  object.siblings('.collapsible-body').stop(true,false).slideUp({ duration: 350, easing: "easeOutQuart", queue: false, complete: function() {$(this).css('height', '');}});
		}
	  }

	  /**
	   * Check if object is children of panel header
	   * @param  {Object}  object Jquery object
	   * @return {Boolean} true if it is children
	   */
	  function isChildrenOfPanelHeader(object) {

		var panelHeader = getPanelHeader(object);

		return panelHeader.length > 0;
	  }

	  /**
	   * Get panel header from a children element
	   * @param  {Object} object Jquery object
	   * @return {Object} panel header object
	   */
	  function getPanelHeader(object) {

		return object.closest('li > .collapsible-header');
	  }

	  /*****  End Helper Functions  *****/



	  // Add click handler to only direct collapsible header children
	  $this.on('click.collapse', '> li > .collapsible-header', function(e) {
		var $header = $(this),
			element = $(e.target);

		if (isChildrenOfPanelHeader(element)) {
		  element = getPanelHeader(element);
		}

		element.toggleClass('active');

		if (options.accordion || collapsible_type === "accordion" || collapsible_type === undefined) { // Handle Accordion
		  accordionOpen(element);
		} else { // Handle Expandables
		  expandableOpen(element);

		  if ($header.hasClass('active')) {
			expandableOpen($header);
		  }
		}
	  });

	  // Open first active
	  var $panel_headers = $this.find('> li > .collapsible-header');
	  if (options.accordion || collapsible_type === "accordion" || collapsible_type === undefined) { // Handle Accordion
		accordionOpen($panel_headers.filter('.active').first());
	  }
	  else { // Handle Expandables
		$panel_headers.filter('.active').each(function() {
		  expandableOpen($(this));
		});
	  }

	});
  };

  $(document).ready(function(){
	$('.collapsible').collapsible();
  });
}( jQuery ));;(function ($) {

  // Add posibility to scroll to selected option
  // usefull for select for example
  $.fn.scrollTo = function(elem) {
	$(this).scrollTop($(this).scrollTop() - $(this).offset().top + $(elem).offset().top);
	return this;
  };

  $.fn.dropdown = function (option) {
	var defaults = {
	  inDuration: 300,
	  outDuration: 225,
	  constrain_width: true, // Constrains width of dropdown to the activator
	  hover: false,
	  gutter: 0, // Spacing from edge
	  belowOrigin: false,
	  alignment: 'left'
	};

	this.each(function(){
	var origin = $(this);
	var options = $.extend({}, defaults, option);
	var isFocused = false;

	// Dropdown menu
	var activates = $("#"+ origin.attr('data-activates'));

	function updateOptions() {
	  if (origin.data('induration') !== undefined)
		options.inDuration = origin.data('inDuration');
	  if (origin.data('outduration') !== undefined)
		options.outDuration = origin.data('outDuration');
	  if (origin.data('constrainwidth') !== undefined)
		options.constrain_width = origin.data('constrainwidth');
	  if (origin.data('hover') !== undefined)
		options.hover = origin.data('hover');
	  if (origin.data('gutter') !== undefined)
		options.gutter = origin.data('gutter');
	  if (origin.data('beloworigin') !== undefined)
		options.belowOrigin = origin.data('beloworigin');
	  if (origin.data('alignment') !== undefined)
		options.alignment = origin.data('alignment');
	}

	updateOptions();

	// Attach dropdown to its activator
	origin.after(activates);

	/*
	  Helper function to position and resize dropdown.
	  Used in hover and click handler.
	*/
	function placeDropdown(eventType) {
	  // Check for simultaneous focus and click events.
	  if (eventType === 'focus') {
		isFocused = true;
	  }

	  // Check html data attributes
	  updateOptions();

	  // Set Dropdown state
	  activates.addClass('active');
	  origin.addClass('active');

	  // Constrain width
	  if (options.constrain_width === true) {
		activates.css('width', origin.outerWidth());

	  } else {
		activates.css('white-space', 'nowrap');
	  }

	  // Offscreen detection
	  var windowHeight = window.innerHeight;
	  var originHeight = origin.innerHeight();
	  var offsetLeft = origin.offset().left;
	  var offsetTop = origin.offset().top - $(window).scrollTop();
	  var currAlignment = options.alignment;
	  var activatesLeft, gutterSpacing;

	  // Below Origin
	  var verticalOffset = 0;
	  if (options.belowOrigin === true) {
		verticalOffset = originHeight;
	  }

	  if (offsetLeft + activates.innerWidth() > $(window).width()) {
		// Dropdown goes past screen on right, force right alignment
		currAlignment = 'right';

	  } else if (offsetLeft - activates.innerWidth() + origin.innerWidth() < 0) {
		// Dropdown goes past screen on left, force left alignment
		currAlignment = 'left';
	  }
	  // Vertical bottom offscreen detection
	  if (offsetTop + activates.innerHeight() > windowHeight) {
		// If going upwards still goes offscreen, just crop height of dropdown.
		if (offsetTop + originHeight - activates.innerHeight() < 0) {
		  var adjustedHeight = windowHeight - offsetTop - verticalOffset;
		  activates.css('max-height', adjustedHeight);
		} else {
		  // Flow upwards.
		  if (!verticalOffset) {
			verticalOffset += originHeight;
		  }
		  verticalOffset -= activates.innerHeight();
		}
	  }

	  // Handle edge alignment
	  if (currAlignment === 'left') {
		gutterSpacing = options.gutter;
		leftPosition = origin.position().left + gutterSpacing;
	  }
	  else if (currAlignment === 'right') {
		var offsetRight = origin.position().left + origin.outerWidth() - activates.outerWidth();
		gutterSpacing = -options.gutter;
		leftPosition =  offsetRight + gutterSpacing;
	  }

	  // Position dropdown
	  activates.css({
		position: 'absolute',
		top: origin.position().top + verticalOffset,
		left: leftPosition
	  });


	  // Show dropdown
	  activates.stop(true, true).css('opacity', 0)
		.slideDown({
		queue: false,
		duration: options.inDuration,
		easing: 'easeOutCubic',
		complete: function() {
		  $(this).css('height', '');
		}
	  })
		.animate( {opacity: 1}, {queue: false, duration: options.inDuration, easing: 'easeOutSine'});
	}

	function hideDropdown() {
	  // Check for simultaneous focus and click events.
	  isFocused = false;
	  activates.fadeOut(options.outDuration);
	  activates.removeClass('active');
	  activates.css('max-height', '');
	  origin.removeClass('active');
	}

	// Hover
	if (options.hover) {
	  var open = false;
	  origin.unbind('click.' + origin.attr('id'));
	  // Hover handler to show dropdown
	  origin.on('mouseenter', function(e){ // Mouse over
		if (open === false) {
		  placeDropdown();
		  open = true;
		}
	  });
	  origin.on('mouseleave', function(e){
		// If hover on origin then to something other than dropdown content, then close
		var toEl = e.toElement || e.relatedTarget; // added browser compatibility for target element
		if(!$(toEl).closest('.dropdown-content').is(activates)) {
		  activates.stop(true, true);
		  hideDropdown();
		  open = false;
		}
	  });

	  activates.on('mouseleave', function(e){ // Mouse out
		var toEl = e.toElement || e.relatedTarget;
		if(!$(toEl).closest('.dropdown-button').is(origin)) {
		  activates.stop(true, true);
		  hideDropdown();
		  open = false;
		}
	  });

	// Click
	} else {
	  // Click handler to show dropdown
	  origin.unbind('click.' + origin.attr('id'));
	  origin.bind('click.'+origin.attr('id'), function(e){
		if (!isFocused) {
		  if ( origin[0] == e.currentTarget &&
			   !origin.hasClass('active') &&
			   ($(e.target).closest('.dropdown-content').length === 0)) {
			e.preventDefault(); // Prevents button click from moving window
			placeDropdown('click');
		  }
		  // If origin is clicked and menu is open, close menu
		  else if (origin.hasClass('active')) {
			hideDropdown();
			$(document).unbind('click.'+ activates.attr('id') + ' touchstart.' + activates.attr('id'));
		  }
		  // If menu open, add click close handler to document
		  if (activates.hasClass('active')) {
			$(document).bind('click.'+ activates.attr('id') + ' touchstart.' + activates.attr('id'), function (e) {
			  if (!activates.is(e.target) && !origin.is(e.target) && (!origin.find(e.target).length) ) {
				hideDropdown();
				$(document).unbind('click.'+ activates.attr('id') + ' touchstart.' + activates.attr('id'));
			  }
			});
		  }
		}
	  });

	} // End else

	// Listen to open and close event - useful for select component
	origin.on('open', function(e, eventType) {
	  placeDropdown(eventType);
	});
	origin.on('close', hideDropdown);


   });
  }; // End dropdown plugin

  $(document).ready(function(){
	$('.dropdown-button').dropdown();
  });
}( jQuery ));;(function($) {
	var _stack = 0,
	_lastID = 0,
	_generateID = function() {
	  _lastID++;
	  return 'materialize-lean-overlay-' + _lastID;
	};

  $.fn.extend({
	openModal: function(options) {

	  $('body').css('overflow', 'hidden');

	  var defaults = {
		opacity: 0.5,
		in_duration: 350,
		out_duration: 250,
		ready: undefined,
		complete: undefined,
		dismissible: true,
		starting_top: '4%'
	  },
	  overlayID = _generateID(),
	  $modal = $(this),
	  $overlay = $('<div class="lean-overlay"></div>'),
	  lStack = (++_stack);

	  // Store a reference of the overlay
	  $overlay.attr('id', overlayID).css('z-index', 1000 + lStack * 2);
	  $modal.data('overlay-id', overlayID).css('z-index', 1000 + lStack * 2 + 1);

	  $("body").append($overlay);

	  // Override defaults
	  options = $.extend(defaults, options);

	  if (options.dismissible) {
		$overlay.click(function() {
		  $modal.closeModal(options);
		});
		// Return on ESC
		$(document).on('keyup.leanModal' + overlayID, function(e) {
		  if (e.keyCode === 27) {   // ESC key
			$modal.closeModal(options);
		  }
		});
	  }

	  $modal.find(".modal-close").on('click.close', function(e) {
		$modal.closeModal(options);
	  });

	  $overlay.css({ display : "block", opacity : 0 });

	  $modal.css({
		display : "block",
		opacity: 0
	  });

	  $overlay.velocity({opacity: options.opacity}, {duration: options.in_duration, queue: false, ease: "easeOutCubic"});
	  $modal.data('associated-overlay', $overlay[0]);

	  // Define Bottom Sheet animation
	  if ($modal.hasClass('bottom-sheet')) {
		$modal.velocity({bottom: "0", opacity: 1}, {
		  duration: options.in_duration,
		  queue: false,
		  ease: "easeOutCubic",
		  // Handle modal ready callback
		  complete: function() {
			if (typeof(options.ready) === "function") {
			  options.ready();
			}
		  }
		});
	  }
	  else {
		$.Velocity.hook($modal, "scaleX", 0.7);
		$modal.css({ top: options.starting_top });
		$modal.velocity({top: "10%", opacity: 1, scaleX: '1'}, {
		  duration: options.in_duration,
		  queue: false,
		  ease: "easeOutCubic",
		  // Handle modal ready callback
		  complete: function() {
			if (typeof(options.ready) === "function") {
			  options.ready();
			}
		  }
		});
	  }


	}
  });

  $.fn.extend({
	closeModal: function(options) {
	  var defaults = {
		out_duration: 250,
		complete: undefined
	  },
	  $modal = $(this),
	  overlayID = $modal.data('overlay-id'),
	  $overlay = $('#' + overlayID);

	  options = $.extend(defaults, options);

	  // Disable scrolling
	  $('body').css('overflow', '');

	  $modal.find('.modal-close').off('click.close');
	  $(document).off('keyup.leanModal' + overlayID);

	  $overlay.velocity( { opacity: 0}, {duration: options.out_duration, queue: false, ease: "easeOutQuart"});


	  // Define Bottom Sheet animation
	  if ($modal.hasClass('bottom-sheet')) {
		$modal.velocity({bottom: "-100%", opacity: 0}, {
		  duration: options.out_duration,
		  queue: false,
		  ease: "easeOutCubic",
		  // Handle modal ready callback
		  complete: function() {
			$overlay.css({display:"none"});

			// Call complete callback
			if (typeof(options.complete) === "function") {
			  options.complete();
			}
			$overlay.remove();
			_stack--;
		  }
		});
	  }
	  else {
		$modal.velocity(
		  { top: options.starting_top, opacity: 0, scaleX: 0.7}, {
		  duration: options.out_duration,
		  complete:
			function() {

			  $(this).css('display', 'none');
			  // Call complete callback
			  if (typeof(options.complete) === "function") {
				options.complete();
			  }
			  $overlay.remove();
			  _stack--;
			}
		  }
		);
	  }
	}
  });

  $.fn.extend({
	leanModal: function(option) {
	  return this.each(function() {

		var defaults = {
		  starting_top: '4%'
		},
		// Override defaults
		options = $.extend(defaults, option);

		// Close Handlers
		$(this).click(function(e) {
		  options.starting_top = ($(this).offset().top - $(window).scrollTop()) /1.15;
		  var modal_id = $(this).attr("href") || '#' + $(this).data('target');
		  $(modal_id).openModal(options);
		  e.preventDefault();
		}); // done set on click
	  }); // done return
	}
  });
})(jQuery);
;(function ($) {

  $.fn.materialbox = function () {

	return this.each(function() {

	  if ($(this).hasClass('initialized')) {
		return;
	  }

	  $(this).addClass('initialized');

	  var overlayActive = false;
	  var doneAnimating = true;
	  var inDuration = 275;
	  var outDuration = 200;
	  var origin = $(this);
	  var placeholder = $('<div></div>').addClass('material-placeholder');
	  var originalWidth = 0;
	  var originalHeight = 0;
	  var ancestorsChanged;
	  var ancestor;
	  origin.wrap(placeholder);


	  origin.on('click', function(){
		var placeholder = origin.parent('.material-placeholder');
		var windowWidth = window.innerWidth;
		var windowHeight = window.innerHeight;
		var originalWidth = origin.width();
		var originalHeight = origin.height();


		// If already modal, return to original
		if (doneAnimating === false) {
		  returnToOriginal();
		  return false;
		}
		else if (overlayActive && doneAnimating===true) {
		  returnToOriginal();
		  return false;
		}


		// Set states
		doneAnimating = false;
		origin.addClass('active');
		overlayActive = true;

		// Set positioning for placeholder
		placeholder.css({
		  width: placeholder[0].getBoundingClientRect().width,
		  height: placeholder[0].getBoundingClientRect().height,
		  position: 'relative',
		  top: 0,
		  left: 0
		});

		// Find ancestor with overflow: hidden; and remove it
		ancestorsChanged = undefined;
		ancestor = placeholder[0].parentNode;
		var count = 0;
		while (ancestor !== null && !$(ancestor).is(document)) {
		  var curr = $(ancestor);
		  if (curr.css('overflow') === 'hidden') {
			curr.css('overflow', 'visible');
			if (ancestorsChanged === undefined) {
			  ancestorsChanged = curr;
			}
			else {
			  ancestorsChanged = ancestorsChanged.add(curr);
			}
		  }
		  ancestor = ancestor.parentNode;
		}

		// Set css on origin
		origin.css({position: 'absolute', 'z-index': 1000})
		.data('width', originalWidth)
		.data('height', originalHeight);

		// Add overlay
		var overlay = $('<div id="materialbox-overlay"></div>')
		  .css({
			opacity: 0
		  })
		  .click(function(){
			if (doneAnimating === true)
			returnToOriginal();
		  });
		  // Animate Overlay
		  $('body').append(overlay);
		  overlay.velocity({opacity: 1}, {duration: inDuration, queue: false, easing: 'easeOutQuad'}
			);


		// Add and animate caption if it exists
		if (origin.data('caption') !== "") {
		  var $photo_caption = $('<div class="materialbox-caption"></div>');
		  $photo_caption.text(origin.data('caption'));
		  $('body').append($photo_caption);
		  $photo_caption.css({ "display": "inline" });
		  $photo_caption.velocity({opacity: 1}, {duration: inDuration, queue: false, easing: 'easeOutQuad'});
		}



		// Resize Image
		var ratio = 0;
		var widthPercent = originalWidth / windowWidth;
		var heightPercent = originalHeight / windowHeight;
		var newWidth = 0;
		var newHeight = 0;

		if (widthPercent > heightPercent) {
		  ratio = originalHeight / originalWidth;
		  newWidth = windowWidth * 0.9;
		  newHeight = windowWidth * 0.9 * ratio;
		}
		else {
		  ratio = originalWidth / originalHeight;
		  newWidth = (windowHeight * 0.9) * ratio;
		  newHeight = windowHeight * 0.9;
		}

		// Animate image + set z-index
		if(origin.hasClass('responsive-img')) {
		  origin.velocity({'max-width': newWidth, 'width': originalWidth}, {duration: 0, queue: false,
			complete: function(){
			  origin.css({left: 0, top: 0})
			  .velocity(
				{
				  height: newHeight,
				  width: newWidth,
				  left: $(document).scrollLeft() + windowWidth/2 - origin.parent('.material-placeholder').offset().left - newWidth/2,
				  top: $(document).scrollTop() + windowHeight/2 - origin.parent('.material-placeholder').offset().top - newHeight/ 2
				},
				{
				  duration: inDuration,
				  queue: false,
				  easing: 'easeOutQuad',
				  complete: function(){doneAnimating = true;}
				}
			  );
			} // End Complete
		  }); // End Velocity
		}
		else {
		  origin.css('left', 0)
		  .css('top', 0)
		  .velocity(
			{
			  height: newHeight,
			  width: newWidth,
			  left: $(document).scrollLeft() + windowWidth/2 - origin.parent('.material-placeholder').offset().left - newWidth/2,
			  top: $(document).scrollTop() + windowHeight/2 - origin.parent('.material-placeholder').offset().top - newHeight/ 2
			},
			{
			  duration: inDuration,
			  queue: false,
			  easing: 'easeOutQuad',
			  complete: function(){doneAnimating = true;}
			}
			); // End Velocity
		}

	}); // End origin on click


	  // Return on scroll
	  $(window).scroll(function() {
		if (overlayActive ) {
		  returnToOriginal();
		}
	  });

	  // Return on ESC
	  $(document).keyup(function(e) {

		if (e.keyCode === 27 && doneAnimating === true) {   // ESC key
		  if (overlayActive) {
			returnToOriginal();
		  }
		}
	  });


	  // This function returns the modaled image to the original spot
	  function returnToOriginal() {

		  doneAnimating = false;

		  var placeholder = origin.parent('.material-placeholder');
		  var windowWidth = window.innerWidth;
		  var windowHeight = window.innerHeight;
		  var originalWidth = origin.data('width');
		  var originalHeight = origin.data('height');

		  origin.velocity("stop", true);
		  $('#materialbox-overlay').velocity("stop", true);
		  $('.materialbox-caption').velocity("stop", true);


		  $('#materialbox-overlay').velocity({opacity: 0}, {
			duration: outDuration, // Delay prevents animation overlapping
			queue: false, easing: 'easeOutQuad',
			complete: function(){
			  // Remove Overlay
			  overlayActive = false;
			  $(this).remove();
			}
		  });

		  // Resize Image
		  origin.velocity(
			{
			  width: originalWidth,
			  height: originalHeight,
			  left: 0,
			  top: 0
			},
			{
			  duration: outDuration,
			  queue: false, easing: 'easeOutQuad'
			}
		  );

		  // Remove Caption + reset css settings on image
		  $('.materialbox-caption').velocity({opacity: 0}, {
			duration: outDuration, // Delay prevents animation overlapping
			queue: false, easing: 'easeOutQuad',
			complete: function(){
			  placeholder.css({
				height: '',
				width: '',
				position: '',
				top: '',
				left: ''
			  });

			  origin.css({
				height: '',
				top: '',
				left: '',
				width: '',
				'max-width': '',
				position: '',
				'z-index': ''
			  });

			  // Remove class
			  origin.removeClass('active');
			  doneAnimating = true;
			  $(this).remove();

			  // Remove overflow overrides on ancestors
			  ancestorsChanged.css('overflow', '');
			}
		  });

		}
		});
};

$(document).ready(function(){
  $('.materialboxed').materialbox();
});

}( jQuery ));
;(function ($) {

	$.fn.parallax = function () {
	  var window_width = $(window).width();
	  // Parallax Scripts
	  return this.each(function(i) {
		var $this = $(this);
		$this.addClass('parallax');

		function updateParallax(initial) {
		  var container_height;
		  if (window_width < 601) {
			container_height = ($this.height() > 0) ? $this.height() : $this.children("img").height();
		  }
		  else {
			container_height = ($this.height() > 0) ? $this.height() : 500;
		  }
		  var $img = $this.children("img").first();
		  var img_height = $img.height();
		  var parallax_dist = img_height - container_height;
		  var bottom = $this.offset().top + container_height;
		  var top = $this.offset().top;
		  var scrollTop = $(window).scrollTop();
		  var windowHeight = window.innerHeight;
		  var windowBottom = scrollTop + windowHeight;
		  var percentScrolled = (windowBottom - top) / (container_height + windowHeight);
		  var parallax = Math.round((parallax_dist * percentScrolled));

		  if (initial) {
			$img.css('display', 'block');
		  }
		  if ((bottom > scrollTop) && (top < (scrollTop + windowHeight))) {
			$img.css('transform', "translate3D(-50%," + parallax + "px, 0)");
		  }

		}

		// Wait for image load
		$this.children("img").one("load", function() {
		  updateParallax(true);
		}).each(function() {
		  if(this.complete) $(this).load();
		});

		$(window).scroll(function() {
		  window_width = $(window).width();
		  updateParallax(false);
		});

		$(window).resize(function() {
		  window_width = $(window).width();
		  updateParallax(false);
		});

	  });

	};
}( jQuery ));;(function ($) {

  var methods = {
	init : function() {
	  return this.each(function() {

	  // For each set of tabs, we want to keep track of
	  // which tab is active and its associated content
	  var $this = $(this),
		  window_width = $(window).width();

	  $this.width('100%');
	  var $active, $content, $links = $this.find('li.tab a'),
		  $tabs_width = $this.width(),
		  $tab_width = $this.find('li').first().outerWidth(),
		  $tab_min_width = parseInt($this.find('li').first().css('minWidth')),
		  $index = 0;

	  // If the location.hash matches one of the links, use that as the active tab.
	  $active = $($links.filter('[href="'+location.hash+'"]'));

	  // If no match is found, use the first link or any with class 'active' as the initial active tab.
	  if ($active.length === 0) {
		  $active = $(this).find('li.tab a.active').first();
	  }
	  if ($active.length === 0) {
		$active = $(this).find('li.tab a').first();
	  }

	  $active.addClass('active');
	  $index = $links.index($active);
	  if ($index < 0) {
		$index = 0;
	  }

	  $content = $($active[0].hash);

	  // append indicator then set indicator width to tab width
	  $this.append('<div class="indicator"></div>');
	  var $indicator = $this.find('.indicator');
	  if ($this.is(":visible")) {
		$indicator.css({"right": $tabs_width - (($index + 1) * $tab_width)});
		$indicator.css({"left": $index * $tab_width});
	  }
	  $(window).resize(function () {
		$tabs_width = $this.width();
		$tab_width = $this.find('li').first().outerWidth();
		if ($index < 0) {
		  $index = 0;
		}
		if ($tab_width !== 0 && $tabs_width !== 0) {
		  $indicator.css({"right": $tabs_width - (($index + 1) * $tab_width)});
		  $indicator.css({"left": $index * $tab_width});
		}
	  });

	  // Hide the remaining content
	  $links.not($active).each(function () {
		$(this.hash).hide();
	  });


	  // Bind the click event handler
	  $this.on('click', 'a', function(e) {
		if ($(this).parent().hasClass('disabled')) {
		  e.preventDefault();
		  return;
		}

		$tabs_width = $this.width();
		$tab_width = $this.find('li').first().outerWidth();

		// Make the old tab inactive.
		$active.removeClass('active');
		$content.hide();

		// Update the variables with the new link and content
		$active = $(this);
		$content = $(this.hash);
		$links = $this.find('li.tab a');

		// Make the tab active.
		$active.addClass('active');
		var $prev_index = $index;
		$index = $links.index($(this));
		if ($index < 0) {
		  $index = 0;
		}
		// Change url to current tab
		// window.location.hash = $active.attr('href');

		$content.show();

		// Update indicator
		if (($index - $prev_index) >= 0) {
		  $indicator.velocity({"right": $tabs_width - (($index + 1) * $tab_width)}, { duration: 300, queue: false, easing: 'easeOutQuad'});
		  $indicator.velocity({"left": $index * $tab_width}, {duration: 300, queue: false, easing: 'easeOutQuad', delay: 90});

		}
		else {
		  $indicator.velocity({"left": $index * $tab_width}, { duration: 300, queue: false, easing: 'easeOutQuad'});
		  $indicator.velocity({"right": $tabs_width - (($index + 1) * $tab_width)}, {duration: 300, queue: false, easing: 'easeOutQuad', delay: 90});
		}

		// Prevent the anchor's default click action
		e.preventDefault();
	  });

	  // Add scroll for small screens
	  if ($tab_width <= $tab_min_width) {
		$this.wrap('<div class="hide-tab-scrollbar"></div>');

		// Create the measurement node
		var scrollDiv = document.createElement("div");
		scrollDiv.className = "scrollbar-measure";
		document.body.appendChild(scrollDiv);
		var scrollbarHeight = scrollDiv.offsetHeight - scrollDiv.clientHeight;
		document.body.removeChild(scrollDiv);

		if (scrollbarHeight === 0) {
		  scrollbarHeight = 15;
		  $this.find('.indicator').css('bottom', scrollbarHeight);
		}
		$this.height($(this).height() + scrollbarHeight);
	  }
	});

	},
	select_tab : function( id ) {
	  this.find('a[href="#' + id + '"]').trigger('click');
	}
  };

  $.fn.tabs = function(methodOrOptions) {
	if ( methods[methodOrOptions] ) {
	  return methods[ methodOrOptions ].apply( this, Array.prototype.slice.call( arguments, 1 ));
	} else if ( typeof methodOrOptions === 'object' || ! methodOrOptions ) {
	  // Default to "init"
	  return methods.init.apply( this, arguments );
	} else {
	  $.error( 'Method ' +  methodOrOptions + ' does not exist on jQuery.tooltip' );
	}
  };

  $(document).ready(function(){
	$('ul.tabs').tabs();
  });
}( jQuery ));
;(function ($) {
	$.fn.tooltip = function (options) {
		var timeout = null,
		counter = null,
		started = false,
		counterInterval = null,
		margin = 5;

	  // Defaults
	  var defaults = {
		delay: 350
	  };

	  // Remove tooltip from the activator
	  if (options === "remove") {
		this.each(function(){
		  $('#' + $(this).attr('data-tooltip-id')).remove();
		});
		return false;
	  }

	  options = $.extend(defaults, options);


	  return this.each(function(){
		var tooltipId = Materialize.guid();
		var origin = $(this);
		origin.attr('data-tooltip-id', tooltipId);

		// Create Text span
		var tooltip_text = $('<span></span>').text(origin.attr('data-tooltip'));

		// Create tooltip
		var newTooltip = $('<div></div>');
		newTooltip.addClass('material-tooltip').append(tooltip_text)
		  .appendTo($('body'))
		  .attr('id', tooltipId);

		var backdrop = $('<div></div>').addClass('backdrop');
		backdrop.appendTo(newTooltip);
		backdrop.css({ top: 0, left:0 });


	   //Destroy previously binded events
	  origin.off('mouseenter.tooltip mouseleave.tooltip');
		// Mouse In
	  origin.on({
		'mouseenter.tooltip': function(e) {
		  var tooltip_delay = origin.data("delay");
		  tooltip_delay = (tooltip_delay === undefined || tooltip_delay === '') ? options.delay : tooltip_delay;
		  counter = 0;
		  counterInterval = setInterval(function(){
			counter += 10;
			if (counter >= tooltip_delay && started === false) {
			  started = true;
			  newTooltip.css({ display: 'block', left: '0px', top: '0px' });

			  // Set Tooltip text
			  newTooltip.children('span').text(origin.attr('data-tooltip'));

			  // Tooltip positioning
			  var originWidth = origin.outerWidth();
			  var originHeight = origin.outerHeight();
			  var tooltipPosition =  origin.attr('data-position');
			  var tooltipHeight = newTooltip.outerHeight();
			  var tooltipWidth = newTooltip.outerWidth();
			  var tooltipVerticalMovement = '0px';
			  var tooltipHorizontalMovement = '0px';
			  var scale_factor = 8;
			  var targetTop, targetLeft, newCoordinates;

			  if (tooltipPosition === "top") {
				// Top Position
				targetTop = origin.offset().top - tooltipHeight - margin;
				targetLeft = origin.offset().left + originWidth/2 - tooltipWidth/2;
				newCoordinates = repositionWithinScreen(targetLeft, targetTop, tooltipWidth, tooltipHeight);

				tooltipVerticalMovement = '-10px';
				backdrop.css({
				  borderRadius: '14px 14px 0 0',
				  transformOrigin: '50% 90%',
				  marginTop: tooltipHeight,
				  marginLeft: (tooltipWidth/2) - (backdrop.width()/2)
				});
			  }
			  // Left Position
			  else if (tooltipPosition === "left") {
				targetTop = origin.offset().top + originHeight/2 - tooltipHeight/2;
				targetLeft =  origin.offset().left - tooltipWidth - margin;
				newCoordinates = repositionWithinScreen(targetLeft, targetTop, tooltipWidth, tooltipHeight);

				tooltipHorizontalMovement = '-10px';
				backdrop.css({
				  width: '14px',
				  height: '14px',
				  borderRadius: '14px 0 0 14px',
				  transformOrigin: '95% 50%',
				  marginTop: tooltipHeight/2,
				  marginLeft: tooltipWidth
				});
			  }
			  // Right Position
			  else if (tooltipPosition === "right") {
				targetTop = origin.offset().top + originHeight/2 - tooltipHeight/2;
				targetLeft = origin.offset().left + originWidth + margin;
				newCoordinates = repositionWithinScreen(targetLeft, targetTop, tooltipWidth, tooltipHeight);

				tooltipHorizontalMovement = '+10px';
				backdrop.css({
				  width: '14px',
				  height: '14px',
				  borderRadius: '0 14px 14px 0',
				  transformOrigin: '5% 50%',
				  marginTop: tooltipHeight/2,
				  marginLeft: '0px'
				});
			  }
			  else {
				// Bottom Position
				targetTop = origin.offset().top + origin.outerHeight() + margin;
				targetLeft = origin.offset().left + originWidth/2 - tooltipWidth/2;
				newCoordinates = repositionWithinScreen(targetLeft, targetTop, tooltipWidth, tooltipHeight);
				tooltipVerticalMovement = '+10px';
				backdrop.css({
				  marginLeft: (tooltipWidth/2) - (backdrop.width()/2)
				});
			  }

			  // Set tooptip css placement
			  newTooltip.css({
				top: newCoordinates.y,
				left: newCoordinates.x
			  });

			  // Calculate Scale to fill
			  scale_factor = tooltipWidth / 8;
			  if (scale_factor < 8) {
				scale_factor = 8;
			  }
			  if (tooltipPosition === "right" || tooltipPosition === "left") {
				scale_factor = tooltipWidth / 10;
				if (scale_factor < 6)
				  scale_factor = 6;
			  }

			  newTooltip.velocity({ marginTop: tooltipVerticalMovement, marginLeft: tooltipHorizontalMovement}, { duration: 350, queue: false })
				.velocity({opacity: 1}, {duration: 300, delay: 50, queue: false});
			  backdrop.css({ display: 'block' })
			  .velocity({opacity:1},{duration: 55, delay: 0, queue: false})
			  .velocity({scale: scale_factor}, {duration: 300, delay: 0, queue: false, easing: 'easeInOutQuad'});

			}
		  }, 10); // End Interval

		// Mouse Out
		},
		'mouseleave.tooltip': function(){
		  // Reset State
		  clearInterval(counterInterval);
		  counter = 0;

		  // Animate back
		  newTooltip.velocity({
			opacity: 0, marginTop: 0, marginLeft: 0}, { duration: 225, queue: false, delay: 225 }
		  );
		  backdrop.velocity({opacity: 0, scale: 1}, {
			duration:225,
			delay: 275, queue: false,
			complete: function(){
			  backdrop.css('display', 'none');
			  newTooltip.css('display', 'none');
			  started = false;}
		  });
		}
		});
	});
  };

  var repositionWithinScreen = function(x, y, width, height) {
	var newX = x
	var newY = y;

	if (newX < 0) {
	  newX = 4;
	} else if (newX + width > window.innerWidth) {
	  newX -= newX + width - window.innerWidth;
	}

	if (newY < 0) {
	  newY = 4;
	} else if (newY + height > window.innerHeight + $(window).scrollTop) {
	  newY -= newY + height - window.innerHeight;
	}

	return {x: newX, y: newY};
  };

  $(document).ready(function(){
	 $('.tooltipped').tooltip();
   });
}( jQuery ));
;/*!
 * Waves v0.6.4
 * http://fian.my.id/Waves
 *
 * Copyright 2014 Alfiana E. Sibuea and other contributors
 * Released under the MIT license
 * https://github.com/fians/Waves/blob/master/LICENSE
 */

;(function(window) {
	'use strict';

	var Waves = Waves || {};
	var $$ = document.querySelectorAll.bind(document);

	// Find exact position of element
	function isWindow(obj) {
		return obj !== null && obj === obj.window;
	}

	function getWindow(elem) {
		return isWindow(elem) ? elem : elem.nodeType === 9 && elem.defaultView;
	}

	function offset(elem) {
		var docElem, win,
			box = {top: 0, left: 0},
			doc = elem && elem.ownerDocument;

		docElem = doc.documentElement;

		if (typeof elem.getBoundingClientRect !== typeof undefined) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow(doc);
		return {
			top: box.top + win.pageYOffset - docElem.clientTop,
			left: box.left + win.pageXOffset - docElem.clientLeft
		};
	}

	function convertStyle(obj) {
		var style = '';

		for (var a in obj) {
			if (obj.hasOwnProperty(a)) {
				style += (a + ':' + obj[a] + ';');
			}
		}

		return style;
	}

	var Effect = {

		// Effect delay
		duration: 750,

		show: function(e, element) {

			// Disable right click
			if (e.button === 2) {
				return false;
			}

			var el = element || this;

			// Create ripple
			var ripple = document.createElement('div');
			ripple.className = 'waves-ripple';
			el.appendChild(ripple);

			// Get click coordinate and element witdh
			var pos		 = offset(el);
			var relativeY   = (e.pageY - pos.top);
			var relativeX   = (e.pageX - pos.left);
			var scale	   = 'scale('+((el.clientWidth / 100) * 10)+')';

			// Support for touch devices
			if ('touches' in e) {
			  relativeY   = (e.touches[0].pageY - pos.top);
			  relativeX   = (e.touches[0].pageX - pos.left);
			}

			// Attach data to element
			ripple.setAttribute('data-hold', Date.now());
			ripple.setAttribute('data-scale', scale);
			ripple.setAttribute('data-x', relativeX);
			ripple.setAttribute('data-y', relativeY);

			// Set ripple position
			var rippleStyle = {
				'top': relativeY+'px',
				'left': relativeX+'px'
			};

			ripple.className = ripple.className + ' waves-notransition';
			ripple.setAttribute('style', convertStyle(rippleStyle));
			ripple.className = ripple.className.replace('waves-notransition', '');

			// Scale the ripple
			rippleStyle['-webkit-transform'] = scale;
			rippleStyle['-moz-transform'] = scale;
			rippleStyle['-ms-transform'] = scale;
			rippleStyle['-o-transform'] = scale;
			rippleStyle.transform = scale;
			rippleStyle.opacity   = '1';

			rippleStyle['-webkit-transition-duration'] = Effect.duration + 'ms';
			rippleStyle['-moz-transition-duration']	= Effect.duration + 'ms';
			rippleStyle['-o-transition-duration']	  = Effect.duration + 'ms';
			rippleStyle['transition-duration']		 = Effect.duration + 'ms';

			rippleStyle['-webkit-transition-timing-function'] = 'cubic-bezier(0.250, 0.460, 0.450, 0.940)';
			rippleStyle['-moz-transition-timing-function']	= 'cubic-bezier(0.250, 0.460, 0.450, 0.940)';
			rippleStyle['-o-transition-timing-function']	  = 'cubic-bezier(0.250, 0.460, 0.450, 0.940)';
			rippleStyle['transition-timing-function']		 = 'cubic-bezier(0.250, 0.460, 0.450, 0.940)';

			ripple.setAttribute('style', convertStyle(rippleStyle));
		},

		hide: function(e) {
			TouchHandler.touchup(e);

			var el = this;
			var width = el.clientWidth * 1.4;

			// Get first ripple
			var ripple = null;
			var ripples = el.getElementsByClassName('waves-ripple');
			if (ripples.length > 0) {
				ripple = ripples[ripples.length - 1];
			} else {
				return false;
			}

			var relativeX   = ripple.getAttribute('data-x');
			var relativeY   = ripple.getAttribute('data-y');
			var scale	   = ripple.getAttribute('data-scale');

			// Get delay beetween mousedown and mouse leave
			var diff = Date.now() - Number(ripple.getAttribute('data-hold'));
			var delay = 350 - diff;

			if (delay < 0) {
				delay = 0;
			}

			// Fade out ripple after delay
			setTimeout(function() {
				var style = {
					'top': relativeY+'px',
					'left': relativeX+'px',
					'opacity': '0',

					// Duration
					'-webkit-transition-duration': Effect.duration + 'ms',
					'-moz-transition-duration': Effect.duration + 'ms',
					'-o-transition-duration': Effect.duration + 'ms',
					'transition-duration': Effect.duration + 'ms',
					'-webkit-transform': scale,
					'-moz-transform': scale,
					'-ms-transform': scale,
					'-o-transform': scale,
					'transform': scale,
				};

				ripple.setAttribute('style', convertStyle(style));

				setTimeout(function() {
					try {
						el.removeChild(ripple);
					} catch(e) {
						return false;
					}
				}, Effect.duration);
			}, delay);
		},

		// Little hack to make <input> can perform waves effect
		wrapInput: function(elements) {
			for (var a = 0; a < elements.length; a++) {
				var el = elements[a];

				if (el.tagName.toLowerCase() === 'input') {
					var parent = el.parentNode;

					// If input already have parent just pass through
					if (parent.tagName.toLowerCase() === 'i' && parent.className.indexOf('waves-effect') !== -1) {
						continue;
					}

					// Put element class and style to the specified parent
					var wrapper = document.createElement('i');
					wrapper.className = el.className + ' waves-input-wrapper';

					var elementStyle = el.getAttribute('style');

					if (!elementStyle) {
						elementStyle = '';
					}

					wrapper.setAttribute('style', elementStyle);

					el.className = 'waves-button-input';
					el.removeAttribute('style');

					// Put element as child
					parent.replaceChild(wrapper, el);
					wrapper.appendChild(el);
				}
			}
		}
	};


	/**
	 * Disable mousedown event for 500ms during and after touch
	 */
	var TouchHandler = {
		/* uses an integer rather than bool so there's no issues with
		 * needing to clear timeouts if another touch event occurred
		 * within the 500ms. Cannot mouseup between touchstart and
		 * touchend, nor in the 500ms after touchend. */
		touches: 0,
		allowEvent: function(e) {
			var allow = true;

			if (e.type === 'touchstart') {
				TouchHandler.touches += 1; //push
			} else if (e.type === 'touchend' || e.type === 'touchcancel') {
				setTimeout(function() {
					if (TouchHandler.touches > 0) {
						TouchHandler.touches -= 1; //pop after 500ms
					}
				}, 500);
			} else if (e.type === 'mousedown' && TouchHandler.touches > 0) {
				allow = false;
			}

			return allow;
		},
		touchup: function(e) {
			TouchHandler.allowEvent(e);
		}
	};


	/**
	 * Delegated click handler for .waves-effect element.
	 * returns null when .waves-effect element not in "click tree"
	 */
	function getWavesEffectElement(e) {
		if (TouchHandler.allowEvent(e) === false) {
			return null;
		}

		var element = null;
		var target = e.target || e.srcElement;

		while (target.parentElement !== null) {
			if (!(target instanceof SVGElement) && target.className.indexOf('waves-effect') !== -1) {
				element = target;
				break;
			} else if (target.classList.contains('waves-effect')) {
				element = target;
				break;
			}
			target = target.parentElement;
		}

		return element;
	}

	/**
	 * Bubble the click and show effect if .waves-effect elem was found
	 */
	function showEffect(e) {
		var element = getWavesEffectElement(e);

		if (element !== null) {
			Effect.show(e, element);

			if ('ontouchstart' in window) {
				element.addEventListener('touchend', Effect.hide, false);
				element.addEventListener('touchcancel', Effect.hide, false);
			}

			element.addEventListener('mouseup', Effect.hide, false);
			element.addEventListener('mouseleave', Effect.hide, false);
		}
	}

	Waves.displayEffect = function(options) {
		options = options || {};

		if ('duration' in options) {
			Effect.duration = options.duration;
		}

		//Wrap input inside <i> tag
		Effect.wrapInput($$('.waves-effect'));

		if ('ontouchstart' in window) {
			document.body.addEventListener('touchstart', showEffect, false);
		}

		document.body.addEventListener('mousedown', showEffect, false);
	};

	/**
	 * Attach Waves to an input element (or any element which doesn't
	 * bubble mouseup/mousedown events).
	 *   Intended to be used with dynamically loaded forms/inputs, or
	 * where the user doesn't want a delegated click handler.
	 */
	Waves.attach = function(element) {
		//FUTURE: automatically add waves classes and allow users
		// to specify them with an options param? Eg. light/classic/button
		if (element.tagName.toLowerCase() === 'input') {
			Effect.wrapInput([element]);
			element = element.parentElement;
		}

		if ('ontouchstart' in window) {
			element.addEventListener('touchstart', showEffect, false);
		}

		element.addEventListener('mousedown', showEffect, false);
	};

	window.Waves = Waves;

	document.addEventListener('DOMContentLoaded', function() {
		Waves.displayEffect();
	}, false);

})(window);
;Materialize.toast = function (message, displayLength, className, completeCallback) {
	className = className || "";

	var container = document.getElementById('toast-container');

	// Create toast container if it does not exist
	if (container === null) {
		// create notification container
		container = document.createElement('div');
		container.id = 'toast-container';
		document.body.appendChild(container);
	}

	// Select and append toast
	var newToast = createToast(message);

	// only append toast if message is not undefined
	if(message){
		container.appendChild(newToast);
	}

	newToast.style.top = '35px';
	newToast.style.opacity = 0;

	// Animate toast in
	Vel(newToast, { "top" : "0px", opacity: 1 }, {duration: 300,
	  easing: 'easeOutCubic',
	  queue: false});

	// Allows timer to be pause while being panned
	var timeLeft = displayLength;
	var counterInterval = setInterval (function(){


	  if (newToast.parentNode === null)
		window.clearInterval(counterInterval);

	  // If toast is not being dragged, decrease its time remaining
	  if (!newToast.classList.contains('panning')) {
		timeLeft -= 20;
	  }

	  if (timeLeft <= 0) {
		// Animate toast out
		Vel(newToast, {"opacity": 0, marginTop: '-40px'}, { duration: 375,
			easing: 'easeOutExpo',
			queue: false,
			complete: function(){
			  // Call the optional callback
			  if(typeof(completeCallback) === "function")
				completeCallback();
			  // Remove toast after it times out
			  this[0].parentNode.removeChild(this[0]);
			}
		  });
		window.clearInterval(counterInterval);
	  }
	}, 20);



	function createToast(html) {

		// Create toast
		var toast = document.createElement('div');
		toast.classList.add('toast');
		if (className) {
			var classes = className.split(' ');

			for (var i = 0, count = classes.length; i < count; i++) {
				toast.classList.add(classes[i]);
			}
		}
		// If type of parameter is HTML Element
		if ( typeof HTMLElement === "object" ? html instanceof HTMLElement : html && typeof html === "object" && html !== null && html.nodeType === 1 && typeof html.nodeName==="string"
) {
		  toast.appendChild(html);
		}
		else if (html instanceof jQuery) {
		  // Check if it is jQuery object
		  toast.appendChild(html[0]);
		}
		else {
		  // Insert as text;
		  toast.innerHTML = html; 
		}
		// Bind hammer
		var hammerHandler = new Hammer(toast, {prevent_default: false});
		hammerHandler.on('pan', function(e) {
		  var deltaX = e.deltaX;
		  var activationDistance = 80;

		  // Change toast state
		  if (!toast.classList.contains('panning')){
			toast.classList.add('panning');
		  }

		  var opacityPercent = 1-Math.abs(deltaX / activationDistance);
		  if (opacityPercent < 0)
			opacityPercent = 0;

		  Vel(toast, {left: deltaX, opacity: opacityPercent }, {duration: 50, queue: false, easing: 'easeOutQuad'});

		});

		hammerHandler.on('panend', function(e) {
		  var deltaX = e.deltaX;
		  var activationDistance = 80;

		  // If toast dragged past activation point
		  if (Math.abs(deltaX) > activationDistance) {
			Vel(toast, {marginTop: '-40px'}, { duration: 375,
				easing: 'easeOutExpo',
				queue: false,
				complete: function(){
				  if(typeof(completeCallback) === "function") {
					completeCallback();
				  }
				  toast.parentNode.removeChild(toast);
				}
			});

		  } else {
			toast.classList.remove('panning');
			// Put toast back into original position
			Vel(toast, { left: 0, opacity: 1 }, { duration: 300,
			  easing: 'easeOutExpo',
			  queue: false
			});

		  }
		});

		return toast;
	}
};
;(function ($) {

  var methods = {
	init : function(options) {
	  var defaults = {
		menuWidth: 240,
		edge: 'left',
		closeOnClick: false
	  };
	  options = $.extend(defaults, options);

	  $(this).each(function(){
		var $this = $(this);
		var menu_id = $("#"+ $this.attr('data-activates'));

		// Set to width
		if (options.menuWidth != 240) {
		  menu_id.css('width', options.menuWidth);
		}

		// Add Touch Area
		var dragTarget = $('<div class="drag-target"></div>');
		$('body').append(dragTarget);

		if (options.edge == 'left') {
		  menu_id.css('left', -1 * (options.menuWidth + 10));
		  dragTarget.css({'left': 0}); // Add Touch Area
		}
		else {
		  menu_id.addClass('right-aligned') // Change text-alignment to right
			.css('right', -1 * (options.menuWidth + 10))
			.css('left', '');
		  dragTarget.css({'right': 0}); // Add Touch Area
		}

		// If fixed sidenav, bring menu out
		if (menu_id.hasClass('fixed')) {
			if (window.innerWidth > 992) {
			  menu_id.css('left', 0);
			}
		  }

		// Window resize to reset on large screens fixed
		if (menu_id.hasClass('fixed')) {
		  $(window).resize( function() {
			if (window.innerWidth > 992) {
			  // Close menu if window is resized bigger than 992 and user has fixed sidenav
			  if ($('#sidenav-overlay').css('opacity') !== 0 && menuOut) {
				removeMenu(true);
			  }
			  else {
				menu_id.removeAttr('style');
				menu_id.css('width', options.menuWidth);
			  }
			}
			else if (menuOut === false){
			  if (options.edge === 'left')
				menu_id.css('left', -1 * (options.menuWidth + 10));
			  else
				menu_id.css('right', -1 * (options.menuWidth + 10));
			}

		  });
		}

		// if closeOnClick, then add close event for all a tags in side sideNav
		if (options.closeOnClick === true) {
		  menu_id.on("click.itemclick", "a:not(.collapsible-header)", function(){
			removeMenu();
		  });
		}

		function removeMenu(restoreNav) {
		  panning = false;
		  menuOut = false;

		  // Reenable scrolling
		  $('body').css('overflow', '');

		  $('#sidenav-overlay').velocity({opacity: 0}, {duration: 200, queue: false, easing: 'easeOutQuad',
			complete: function() {
			  $(this).remove();
			} });
		  if (options.edge === 'left') {
			// Reset phantom div
			dragTarget.css({width: '', right: '', left: '0'});
			menu_id.velocity(
			  {left: -1 * (options.menuWidth + 10)},
			  { duration: 200,
				queue: false,
				easing: 'easeOutCubic',
				complete: function() {
				  if (restoreNav === true) {
					// Restore Fixed sidenav
					menu_id.removeAttr('style');
					menu_id.css('width', options.menuWidth);
				  }
				}

			});
		  }
		  else {
			// Reset phantom div
			dragTarget.css({width: '', right: '0', left: ''});
			menu_id.velocity(
			  {right: -1 * (options.menuWidth + 10)},
			  { duration: 200,
				queue: false,
				easing: 'easeOutCubic',
				complete: function() {
				  if (restoreNav === true) {
					// Restore Fixed sidenav
					menu_id.removeAttr('style');
					menu_id.css('width', options.menuWidth);
				  }
				}
			  });
		  }
		}



		// Touch Event
		var panning = false;
		var menuOut = false;

		dragTarget.on('click', function(){
		  removeMenu();
		});

		dragTarget.hammer({
		  prevent_default: false
		}).bind('pan', function(e) {

		  if (e.gesture.pointerType == "touch") {

			var direction = e.gesture.direction;
			var x = e.gesture.center.x;
			var y = e.gesture.center.y;
			var velocityX = e.gesture.velocityX;

			// Disable Scrolling
			$('body').css('overflow', 'hidden');

			// If overlay does not exist, create one and if it is clicked, close menu
			if ($('#sidenav-overlay').length === 0) {
			  var overlay = $('<div id="sidenav-overlay"></div>');
			  overlay.css('opacity', 0).click( function(){
				removeMenu();
			  });
			  $('body').append(overlay);
			}

			// Keep within boundaries
			if (options.edge === 'left') {
			  if (x > options.menuWidth) { x = options.menuWidth; }
			  else if (x < 0) { x = 0; }
			}

			if (options.edge === 'left') {
			  // Left Direction
			  if (x < (options.menuWidth / 2)) { menuOut = false; }
			  // Right Direction
			  else if (x >= (options.menuWidth / 2)) { menuOut = true; }

			  menu_id.css('left', (x - options.menuWidth));
			}
			else {
			  // Left Direction
			  if (x < (window.innerWidth - options.menuWidth / 2)) {
				menuOut = true;
			  }
			  // Right Direction
			  else if (x >= (window.innerWidth - options.menuWidth / 2)) {
			   menuOut = false;
			 }
			  var rightPos = -1 *(x - options.menuWidth / 2);
			  if (rightPos > 0) {
				rightPos = 0;
			  }

			  menu_id.css('right', rightPos);
			}




			// Percentage overlay
			var overlayPerc;
			if (options.edge === 'left') {
			  overlayPerc = x / options.menuWidth;
			  $('#sidenav-overlay').velocity({opacity: overlayPerc }, {duration: 50, queue: false, easing: 'easeOutQuad'});
			}
			else {
			  overlayPerc = Math.abs((x - window.innerWidth) / options.menuWidth);
			  $('#sidenav-overlay').velocity({opacity: overlayPerc }, {duration: 50, queue: false, easing: 'easeOutQuad'});
			}
		  }

		}).bind('panend', function(e) {

		  if (e.gesture.pointerType == "touch") {
			var velocityX = e.gesture.velocityX;
			panning = false;
			if (options.edge === 'left') {
			  // If velocityX <= 0.3 then the user is flinging the menu closed so ignore menuOut
			  if ((menuOut && velocityX <= 0.3) || velocityX < -0.5) {
				menu_id.velocity({left: 0}, {duration: 300, queue: false, easing: 'easeOutQuad'});
				$('#sidenav-overlay').velocity({opacity: 1 }, {duration: 50, queue: false, easing: 'easeOutQuad'});
				dragTarget.css({width: '50%', right: 0, left: ''});
			  }
			  else if (!menuOut || velocityX > 0.3) {
				// Enable Scrolling
				$('body').css('overflow', '');
				// Slide menu closed
				menu_id.velocity({left: -1 * (options.menuWidth + 10)}, {duration: 200, queue: false, easing: 'easeOutQuad'});
				$('#sidenav-overlay').velocity({opacity: 0 }, {duration: 200, queue: false, easing: 'easeOutQuad',
				  complete: function () {
					$(this).remove();
				  }});
				dragTarget.css({width: '10px', right: '', left: 0});
			  }
			}
			else {
			  if ((menuOut && velocityX >= -0.3) || velocityX > 0.5) {
				menu_id.velocity({right: 0}, {duration: 300, queue: false, easing: 'easeOutQuad'});
				$('#sidenav-overlay').velocity({opacity: 1 }, {duration: 50, queue: false, easing: 'easeOutQuad'});
				dragTarget.css({width: '50%', right: '', left: 0});
			  }
			  else if (!menuOut || velocityX < -0.3) {
				// Enable Scrolling
				$('body').css('overflow', '');
				// Slide menu closed
				menu_id.velocity({right: -1 * (options.menuWidth + 10)}, {duration: 200, queue: false, easing: 'easeOutQuad'});
				$('#sidenav-overlay').velocity({opacity: 0 }, {duration: 200, queue: false, easing: 'easeOutQuad',
				  complete: function () {
					$(this).remove();
				  }});
				dragTarget.css({width: '10px', right: 0, left: ''});
			  }
			}

		  }
		});

		  $this.click(function() {
			if (menuOut === true) {
			  menuOut = false;
			  panning = false;
			  removeMenu();
			}
			else {

			  // Disable Scrolling
			  $('body').css('overflow', 'hidden');
			  // Push current drag target on top of DOM tree
			  $('body').append(dragTarget);
			  
			  if (options.edge === 'left') {
				dragTarget.css({width: '50%', right: 0, left: ''});
				menu_id.velocity({left: 0}, {duration: 300, queue: false, easing: 'easeOutQuad'});
			  }
			  else {
				dragTarget.css({width: '50%', right: '', left: 0});
				menu_id.velocity({right: 0}, {duration: 300, queue: false, easing: 'easeOutQuad'});
				menu_id.css('left','');
			  }

			  var overlay = $('<div id="sidenav-overlay"></div>');
			  overlay.css('opacity', 0)
			  .click(function(){
				menuOut = false;
				panning = false;
				removeMenu();
				overlay.velocity({opacity: 0}, {duration: 300, queue: false, easing: 'easeOutQuad',
				  complete: function() {
					$(this).remove();
				  } });

			  });
			  $('body').append(overlay);
			  overlay.velocity({opacity: 1}, {duration: 300, queue: false, easing: 'easeOutQuad',
				complete: function () {
				  menuOut = true;
				  panning = false;
				}
			  });
			}

			return false;
		  });
	  });


	},
	show : function() {
	  this.trigger('click');
	},
	hide : function() {
	  $('#sidenav-overlay').trigger('click');
	}
  };


	$.fn.sideNav = function(methodOrOptions) {
	  if ( methods[methodOrOptions] ) {
		return methods[ methodOrOptions ].apply( this, Array.prototype.slice.call( arguments, 1 ));
	  } else if ( typeof methodOrOptions === 'object' || ! methodOrOptions ) {
		// Default to "init"
		return methods.init.apply( this, arguments );
	  } else {
		$.error( 'Method ' +  methodOrOptions + ' does not exist on jQuery.sideNav' );
	  }
	}; // Plugin end
}( jQuery ));
;/**
 * Extend jquery with a scrollspy plugin.
 * This watches the window scroll and fires events when elements are scrolled into viewport.
 *
 * throttle() and getTime() taken from Underscore.js
 * https://github.com/jashkenas/underscore
 *
 * @author Copyright 2013 John Smart
 * @license https://raw.github.com/thesmart/jquery-scrollspy/master/LICENSE
 * @see https://github.com/thesmart
 * @version 0.1.2
 */
(function($) {

	var jWindow = $(window);
	var elements = [];
	var elementsInView = [];
	var isSpying = false;
	var ticks = 0;
	var unique_id = 1;
	var offset = {
		top : 0,
		right : 0,
		bottom : 0,
		left : 0,
	}

	/**
	 * Find elements that are within the boundary
	 * @param {number} top
	 * @param {number} right
	 * @param {number} bottom
	 * @param {number} left
	 * @return {jQuery}		A collection of elements
	 */
	function findElements(top, right, bottom, left) {
		var hits = $();
		$.each(elements, function(i, element) {
			if (element.height() > 0) {
				var elTop = element.offset().top,
					elLeft = element.offset().left,
					elRight = elLeft + element.width(),
					elBottom = elTop + element.height();

				var isIntersect = !(elLeft > right ||
					elRight < left ||
					elTop > bottom ||
					elBottom < top);

				if (isIntersect) {
					hits.push(element);
				}
			}
		});

		return hits;
	}


	/**
	 * Called when the user scrolls the window
	 */
	function onScroll() {
		// unique tick id
		++ticks;

		// viewport rectangle
		var top = jWindow.scrollTop(),
			left = jWindow.scrollLeft(),
			right = left + jWindow.width(),
			bottom = top + jWindow.height();

		// determine which elements are in view
//		+ 60 accounts for fixed nav
		var intersections = findElements(top+offset.top + 200, right+offset.right, bottom+offset.bottom, left+offset.left);
		$.each(intersections, function(i, element) {

			var lastTick = element.data('scrollSpy:ticks');
			if (typeof lastTick != 'number') {
				// entered into view
				element.triggerHandler('scrollSpy:enter');
			}

			// update tick id
			element.data('scrollSpy:ticks', ticks);
		});

		// determine which elements are no longer in view
		$.each(elementsInView, function(i, element) {
			var lastTick = element.data('scrollSpy:ticks');
			if (typeof lastTick == 'number' && lastTick !== ticks) {
				// exited from view
				element.triggerHandler('scrollSpy:exit');
				element.data('scrollSpy:ticks', null);
			}
		});

		// remember elements in view for next tick
		elementsInView = intersections;
	}

	/**
	 * Called when window is resized
	*/
	function onWinSize() {
		jWindow.trigger('scrollSpy:winSize');
	}

	/**
	 * Get time in ms
   * @license https://raw.github.com/jashkenas/underscore/master/LICENSE
	 * @type {function}
	 * @return {number}
	 */
	var getTime = (Date.now || function () {
		return new Date().getTime();
	});

	/**
	 * Returns a function, that, when invoked, will only be triggered at most once
	 * during a given window of time. Normally, the throttled function will run
	 * as much as it can, without ever going more than once per `wait` duration;
	 * but if you'd like to disable the execution on the leading edge, pass
	 * `{leading: false}`. To disable execution on the trailing edge, ditto.
	 * @license https://raw.github.com/jashkenas/underscore/master/LICENSE
	 * @param {function} func
	 * @param {number} wait
	 * @param {Object=} options
	 * @returns {Function}
	 */
	function throttle(func, wait, options) {
		var context, args, result;
		var timeout = null;
		var previous = 0;
		options || (options = {});
		var later = function () {
			previous = options.leading === false ? 0 : getTime();
			timeout = null;
			result = func.apply(context, args);
			context = args = null;
		};
		return function () {
			var now = getTime();
			if (!previous && options.leading === false) previous = now;
			var remaining = wait - (now - previous);
			context = this;
			args = arguments;
			if (remaining <= 0) {
				clearTimeout(timeout);
				timeout = null;
				previous = now;
				result = func.apply(context, args);
				context = args = null;
			} else if (!timeout && options.trailing !== false) {
				timeout = setTimeout(later, remaining);
			}
			return result;
		};
	};

	/**
	 * Enables ScrollSpy using a selector
	 * @param {jQuery|string} selector  The elements collection, or a selector
	 * @param {Object=} options	Optional.
		throttle : number -> scrollspy throttling. Default: 100 ms
		offsetTop : number -> offset from top. Default: 0
		offsetRight : number -> offset from right. Default: 0
		offsetBottom : number -> offset from bottom. Default: 0
		offsetLeft : number -> offset from left. Default: 0
	 * @returns {jQuery}
	 */
	$.scrollSpy = function(selector, options) {
		var visible = [];
		selector = $(selector);
		selector.each(function(i, element) {
			elements.push($(element));
			$(element).data("scrollSpy:id", i);
			// Smooth scroll to section
		  $('a[href=#' + $(element).attr('id') + ']').click(function(e) {
			e.preventDefault();
			var offset = $(this.hash).offset().top + 1;

//		  offset - 200 allows elements near bottom of page to scroll
			
			$('html, body').animate({ scrollTop: offset - 200 }, {duration: 400, queue: false, easing: 'easeOutCubic'});
			
		  });
		});
		options = options || {
			throttle: 100
		};

		offset.top = options.offsetTop || 0;
		offset.right = options.offsetRight || 0;
		offset.bottom = options.offsetBottom || 0;
		offset.left = options.offsetLeft || 0;

		var throttledScroll = throttle(onScroll, options.throttle || 100);
		var readyScroll = function(){
			$(document).ready(throttledScroll);
		};

		if (!isSpying) {
			jWindow.on('scroll', readyScroll);
			jWindow.on('resize', readyScroll);
			isSpying = true;
		}

		// perform a scan once, after current execution context, and after dom is ready
		setTimeout(readyScroll, 0);


		selector.on('scrollSpy:enter', function() {
			visible = $.grep(visible, function(value) {
		  return value.height() != 0;
		});

			var $this = $(this);

			if (visible[0]) {
				$('a[href=#' + visible[0].attr('id') + ']').removeClass('active');
				if ($this.data('scrollSpy:id') < visible[0].data('scrollSpy:id')) {
					visible.unshift($(this));
				}
				else {
					visible.push($(this));
				}
			}
			else {
				visible.push($(this));
			}


			$('a[href=#' + visible[0].attr('id') + ']').addClass('active');
		});
		selector.on('scrollSpy:exit', function() {
			visible = $.grep(visible, function(value) {
		  return value.height() != 0;
		});

			if (visible[0]) {
				$('a[href=#' + visible[0].attr('id') + ']').removeClass('active');
				var $this = $(this);
				visible = $.grep(visible, function(value) {
			return value.attr('id') != $this.attr('id');
		  });
		  if (visible[0]) { // Check if empty
					$('a[href=#' + visible[0].attr('id') + ']').addClass('active');
		  }
			}
		});

		return selector;
	};

	/**
	 * Listen for window resize events
	 * @param {Object=} options						Optional. Set { throttle: number } to change throttling. Default: 100 ms
	 * @returns {jQuery}		$(window)
	 */
	$.winSizeSpy = function(options) {
		$.winSizeSpy = function() { return jWindow; }; // lock from multiple calls
		options = options || {
			throttle: 100
		};
		return jWindow.on('resize', throttle(onWinSize, options.throttle || 100));
	};

	/**
	 * Enables ScrollSpy on a collection of elements
	 * e.g. $('.scrollSpy').scrollSpy()
	 * @param {Object=} options	Optional.
											throttle : number -> scrollspy throttling. Default: 100 ms
											offsetTop : number -> offset from top. Default: 0
											offsetRight : number -> offset from right. Default: 0
											offsetBottom : number -> offset from bottom. Default: 0
											offsetLeft : number -> offset from left. Default: 0
	 * @returns {jQuery}
	 */
	$.fn.scrollSpy = function(options) {
		return $.scrollSpy($(this), options);
	};

})(jQuery);;(function ($) {
  $(document).ready(function() {

	// Function to update labels of text fields
	Materialize.updateTextFields = function() {
	  var input_selector = 'input[type=text], input[type=password], input[type=email], input[type=url], input[type=tel], input[type=number], input[type=search], textarea';
	  $(input_selector).each(function(index, element) {
		if ($(element).val().length > 0 || $(this).attr('placeholder') !== undefined || $(element)[0].validity.badInput === true) {
		  $(this).siblings('label').addClass('active');
		}
		else {
		  $(this).siblings('label, i').removeClass('active');
		}
	  });
	};

	// Text based inputs
	var input_selector = 'input[type=text], input[type=password], input[type=email], input[type=url], input[type=tel], input[type=number], input[type=search], textarea';

	// Handle HTML5 autofocus
	$('input[autofocus]').siblings('label, i').addClass('active');

	// Add active if form auto complete
	$(document).on('change', input_selector, function () {
	  if($(this).val().length !== 0 || $(this).attr('placeholder') !== undefined) {
		$(this).siblings('label').addClass('active');
	  }
	  validate_field($(this));
	});

	// Add active if input element has been pre-populated on document ready
	$(document).ready(function() {
	  Materialize.updateTextFields();
	});

	// HTML DOM FORM RESET handling
	$(document).on('reset', function(e) {
	  var formReset = $(e.target);
	  if (formReset.is('form')) {
		formReset.find(input_selector).removeClass('valid').removeClass('invalid');
		formReset.find(input_selector).each(function () {
		  if ($(this).attr('value') === '') {
			$(this).siblings('label, i').removeClass('active');
		  }
		});

		// Reset select
		formReset.find('select.initialized').each(function () {
		  var reset_text = formReset.find('option[selected]').text();
		  formReset.siblings('input.select-dropdown').val(reset_text);
		});
	  }
	});

	// Add active when element has focus
	$(document).on('focus', input_selector, function () {
	  $(this).siblings('label, i').addClass('active');
	});

	$(document).on('blur', input_selector, function () {
	  var $inputElement = $(this);
	  if ($inputElement.val().length === 0 && $inputElement[0].validity.badInput !== true && $inputElement.attr('placeholder') === undefined) {
		$inputElement.siblings('label, i').removeClass('active');
	  }

	  if ($inputElement.val().length === 0 && $inputElement[0].validity.badInput !== true && $inputElement.attr('placeholder') !== undefined) {
		$inputElement.siblings('i').removeClass('active');
	  }
	  validate_field($inputElement);
	});

	window.validate_field = function(object) {
	  var hasLength = object.attr('length') !== undefined;
	  var lenAttr = parseInt(object.attr('length'));
	  var len = object.val().length;

	  if (object.val().length === 0 && object[0].validity.badInput === false) {
		if (object.hasClass('validate')) {
		  object.removeClass('valid');
		  object.removeClass('invalid');
		}
	  }
	  else {
		if (object.hasClass('validate')) {
		  // Check for character counter attributes
		  if ((object.is(':valid') && hasLength && (len <= lenAttr)) || (object.is(':valid') && !hasLength)) {
			object.removeClass('invalid');
			object.addClass('valid');
		  }
		  else {
			object.removeClass('valid');
			object.addClass('invalid');
		  }
		}
	  }
	};


	// Textarea Auto Resize
	var hiddenDiv = $('.hiddendiv').first();
	if (!hiddenDiv.length) {
	  hiddenDiv = $('<div class="hiddendiv common"></div>');
	  $('body').append(hiddenDiv);
	}
	var text_area_selector = '.materialize-textarea';

	function textareaAutoResize($textarea) {
	  // Set font properties of hiddenDiv

	  var fontFamily = $textarea.css('font-family');
	  var fontSize = $textarea.css('font-size');

	  if (fontSize) { hiddenDiv.css('font-size', fontSize); }
	  if (fontFamily) { hiddenDiv.css('font-family', fontFamily); }

	  if ($textarea.attr('wrap') === "off") {
		hiddenDiv.css('overflow-wrap', "normal")
				 .css('white-space', "pre");
	  }

	  hiddenDiv.text($textarea.val() + '\n');
	  var content = hiddenDiv.html().replace(/\n/g, '<br>');
	  hiddenDiv.html(content);


	  // When textarea is hidden, width goes crazy.
	  // Approximate with half of window size

	  if ($textarea.is(':visible')) {
		hiddenDiv.css('width', $textarea.width());
	  }
	  else {
		hiddenDiv.css('width', $(window).width()/2);
	  }

	  $textarea.css('height', hiddenDiv.height());
	}

	$(text_area_selector).each(function () {
	  var $textarea = $(this);
	  if ($textarea.val().length) {
		textareaAutoResize($textarea);
	  }
	});

	$('body').on('keyup keydown autoresize', text_area_selector, function () {
	  textareaAutoResize($(this));
	});

	// File Input Path
	$(document).on('change', '.file-field input[type="file"]', function () {
	  var file_field = $(this).closest('.file-field');
	  var path_input = file_field.find('input.file-path');
	  var files	  = $(this)[0].files;
	  var file_names = [];
	  for (var i = 0; i < files.length; i++) {
		file_names.push(files[i].name);
	  }
	  path_input.val(file_names.join(", "));
	  path_input.trigger('change');
	});

	/****************
	*  Range Input  *
	****************/

	var range_type = 'input[type=range]';
	var range_mousedown = false;
	var left;

	$(range_type).each(function () {
	  var thumb = $('<span class="thumb"><span class="value"></span></span>');
	  $(this).after(thumb);
	});

	var range_wrapper = '.range-field';
	$(document).on('change', range_type, function(e) {
	  var thumb = $(this).siblings('.thumb');
	  thumb.find('.value').html($(this).val());
	});

	$(document).on('input mousedown touchstart', range_type, function(e) {
	  var thumb = $(this).siblings('.thumb');
	  var width = $(this).outerWidth();

	  // If thumb indicator does not exist yet, create it
	  if (thumb.length <= 0) {
		thumb = $('<span class="thumb"><span class="value"></span></span>');
		$(this).append(thumb);
	  }

	  // Set indicator value
	  thumb.find('.value').html($(this).val());

	  range_mousedown = true;
	  $(this).addClass('active');

	  if (!thumb.hasClass('active')) {
		thumb.velocity({ height: "30px", width: "30px", top: "-20px", marginLeft: "-15px"}, { duration: 300, easing: 'easeOutExpo' });
	  }

	  if (e.type !== 'input') {
		if(e.pageX === undefined || e.pageX === null){//mobile
		   left = e.originalEvent.touches[0].pageX - $(this).offset().left;
		}
		else{ // desktop
		   left = e.pageX - $(this).offset().left;
		}
		if (left < 0) {
		  left = 0;
		}
		else if (left > width) {
		  left = width;
		}
		thumb.addClass('active').css('left', left);
	  }

	  thumb.find('.value').html($(this).val());
	});

	$(document).on('mouseup touchend', range_wrapper, function() {
	  range_mousedown = false;
	  $(this).removeClass('active');
	});

	$(document).on('mousemove touchmove', range_wrapper, function(e) {
	  var thumb = $(this).children('.thumb');
	  var left;
	  if (range_mousedown) {
		if (!thumb.hasClass('active')) {
		  thumb.velocity({ height: '30px', width: '30px', top: '-20px', marginLeft: '-15px'}, { duration: 300, easing: 'easeOutExpo' });
		}
		if (e.pageX === undefined || e.pageX === null) { //mobile
		  left = e.originalEvent.touches[0].pageX - $(this).offset().left;
		}
		else{ // desktop
		  left = e.pageX - $(this).offset().left;
		}
		var width = $(this).outerWidth();

		if (left < 0) {
		  left = 0;
		}
		else if (left > width) {
		  left = width;
		}
		thumb.addClass('active').css('left', left);
		thumb.find('.value').html(thumb.siblings(range_type).val());
	  }
	});

	$(document).on('mouseout touchleave', range_wrapper, function() {
	  if (!range_mousedown) {

		var thumb = $(this).children('.thumb');

		if (thumb.hasClass('active')) {
		  thumb.velocity({ height: '0', width: '0', top: '10px', marginLeft: '-6px'}, { duration: 100 });
		}
		thumb.removeClass('active');
	  }
	});
  }); // End of $(document).ready

  /*******************
   *  Select Plugin  *
   ******************/
  $.fn.material_select = function (callback) {
	$(this).each(function(){
	  var $select = $(this);

	  if ($select.hasClass('browser-default')) {
		return; // Continue to next (return false breaks out of entire loop)
	  }

	  var multiple = $select.attr('multiple') ? true : false,
		  lastID = $select.data('select-id'); // Tear down structure if Select needs to be rebuilt

	  if (lastID) {
		$select.parent().find('span.caret').remove();
		$select.parent().find('input').remove();

		$select.unwrap();
		$('ul#select-options-'+lastID).remove();
	  }

	  // If destroying the select, remove the selelct-id and reset it to it's uninitialized state.
	  if(callback === 'destroy') {
		$select.data('select-id', null).removeClass('initialized');
		return;
	  }

	  var uniqueID = Materialize.guid();
	  $select.data('select-id', uniqueID);
	  var wrapper = $('<div class="select-wrapper"></div>');
	  wrapper.addClass($select.attr('class'));
	  var options = $('<ul id="select-options-' + uniqueID +'" class="dropdown-content select-dropdown ' + (multiple ? 'multiple-select-dropdown' : '') + '"></ul>');
	  var selectOptions = $select.children('option');
	  var selectOptGroups = $select.children('optgroup');

	  var valuesSelected = [],
		  optionsHover = false;

	  if ($select.find('option:selected').length > 0) {
		label = $select.find('option:selected');
	  } else {
		label = selectOptions.first();
	  }

	  // Function that renders and appends the option taking into
	  // account type and possible image icon.
	  var appendOptionWithIcon = function(select, option, type) {
		// Add disabled attr if disabled
		var disabledClass = (option.is(':disabled')) ? 'disabled ' : '';

		// add icons
		var icon_url = option.data('icon');
		var classes = option.attr('class');
		if (!!icon_url) {
		  var classString = '';
		  if (!!classes) classString = ' class="' + classes + '"';

		  // Check for multiple type.
		  if (type === 'multiple') {
			options.append($('<li class="' + disabledClass + '"><img src="' + icon_url + '"' + classString + '><span><input type="checkbox"' + disabledClass + '/><label></label>' + option.html() + '</span></li>'));
		  } else {
			options.append($('<li class="' + disabledClass + '"><img src="' + icon_url + '"' + classString + '><span>' + option.html() + '</span></li>'));
		  }
		  return true;
		}

		// Check for multiple type.
		if (type === 'multiple') {
		  options.append($('<li class="' + disabledClass + '"><span><input type="checkbox"' + disabledClass + '/><label></label>' + option.html() + '</span></li>'));
		} else {
		  options.append($('<li class="' + disabledClass + '"><span>' + option.html() + '</span></li>'));
		}
	  };

	  /* Create dropdown structure. */
	  if (selectOptGroups.length) {
		// Check for optgroup
		selectOptGroups.each(function() {
		  selectOptions = $(this).children('option');
		  options.append($('<li class="optgroup"><span>' + $(this).attr('label') + '</span></li>'));

		  selectOptions.each(function() {
			appendOptionWithIcon($select, $(this));
		  });
		});
	  } else {
		selectOptions.each(function () {
		  var disabledClass = ($(this).is(':disabled')) ? 'disabled ' : '';
		  if (multiple) {
			appendOptionWithIcon($select, $(this), 'multiple');

		  } else {
			appendOptionWithIcon($select, $(this));
		  }
		});
	  }


	  options.find('li:not(.optgroup)').each(function (i) {
		var $curr_select = $select;
		$(this).click(function (e) {
		  // Check if option element is disabled
		  if (!$(this).hasClass('disabled') && !$(this).hasClass('optgroup')) {
			if (multiple) {
			  $('input[type="checkbox"]', this).prop('checked', function(i, v) { return !v; });
			  toggleEntryFromArray(valuesSelected, $(this).index(), $curr_select);
			  $newSelect.trigger('focus');

			} else {
			  options.find('li').removeClass('active');
			  $(this).toggleClass('active');
			  $curr_select.siblings('input.select-dropdown').val($(this).text());
			}

			activateOption(options, $(this));
			$curr_select.find('option').eq(i).prop('selected', true);
			// Trigger onchange() event
			$curr_select.trigger('change');
			if (typeof callback !== 'undefined') callback();
		  }

		  e.stopPropagation();
		});
	  });

	  // Wrap Elements
	  $select.wrap(wrapper);
	  // Add Select Display Element
	  var dropdownIcon = $('<span class="caret">&#9660;</span>');
	  if ($select.is(':disabled'))
		dropdownIcon.addClass('disabled');

	  // escape double quotes
	  var sanitizedLabelHtml = label.html() && label.html().replace(/"/g, '&quot;');

	  var $newSelect = $('<input type="text" class="select-dropdown" readonly="true" ' + (($select.is(':disabled')) ? 'disabled' : '') + ' data-activates="select-options-' + uniqueID +'" value="'+ sanitizedLabelHtml +'"/>');
	  $select.before($newSelect);
	  $newSelect.before(dropdownIcon);

	  $newSelect.after(options);
	  // Check if section element is disabled
	  if (!$select.is(':disabled')) {
		$newSelect.dropdown({'hover': false, 'closeOnClick': false});
	  }

	  // Copy tabindex
	  if ($select.attr('tabindex')) {
		$($newSelect[0]).attr('tabindex', $select.attr('tabindex'));
	  }

	  $select.addClass('initialized');

	  $newSelect.on({
		'focus': function (){
		  if ($('ul.select-dropdown').not(options[0]).is(':visible')) {
			$('input.select-dropdown').trigger('close');
		  }
		  if (!options.is(':visible')) {
			$(this).trigger('open', ['focus']);
			var label = $(this).val();
			var selectedOption = options.find('li').filter(function() {
			  return $(this).text().toLowerCase() === label.toLowerCase();
			})[0];
			activateOption(options, selectedOption);
		  }
		},
		'click': function (e){
		  e.stopPropagation();
		}
	  });

	  $newSelect.on('blur', function() {
		if (!multiple) {
		  $(this).trigger('close');
		}
		options.find('li.selected').removeClass('selected');
	  });

	  options.hover(function() {
		optionsHover = true;
	  }, function () {
		optionsHover = false;
	  });

	  $(window).on({
		'click': function (e){
		  multiple && (optionsHover || $newSelect.trigger('close'));
		}
	  });

	  // Make option as selected and scroll to selected position
	  activateOption = function(collection, newOption) {
		collection.find('li.selected').removeClass('selected');
		$(newOption).addClass('selected');
	  };

	  // Allow user to search by typing
	  // this array is cleared after 1 second
	  var filterQuery = [],
		  onKeyDown = function(e){
			// TAB - switch to another input
			if(e.which == 9){
			  $newSelect.trigger('close');
			  return;
			}

			// ARROW DOWN WHEN SELECT IS CLOSED - open select options
			if(e.which == 40 && !options.is(':visible')){
			  $newSelect.trigger('open');
			  return;
			}

			// ENTER WHEN SELECT IS CLOSED - submit form
			if(e.which == 13 && !options.is(':visible')){
			  return;
			}

			e.preventDefault();

			// CASE WHEN USER TYPE LETTERS
			var letter = String.fromCharCode(e.which).toLowerCase(),
				nonLetters = [9,13,27,38,40];
			if (letter && (nonLetters.indexOf(e.which) === -1)) {
			  filterQuery.push(letter);

			  var string = filterQuery.join(''),
				  newOption = options.find('li').filter(function() {
					return $(this).text().toLowerCase().indexOf(string) === 0;
				  })[0];

			  if (newOption) {
				activateOption(options, newOption);
			  }
			}

			// ENTER - select option and close when select options are opened
			if (e.which == 13) {
			  var activeOption = options.find('li.selected:not(.disabled)')[0];
			  if(activeOption){
				$(activeOption).trigger('click');
				if (!multiple) {
				  $newSelect.trigger('close');
				}
			  }
			}

			// ARROW DOWN - move to next not disabled option
			if (e.which == 40) {
			  if (options.find('li.selected').length) {
				newOption = options.find('li.selected').next('li:not(.disabled)')[0];
			  } else {
				newOption = options.find('li:not(.disabled)')[0];
			  }
			  activateOption(options, newOption);
			}

			// ESC - close options
			if (e.which == 27) {
			  $newSelect.trigger('close');
			}

			// ARROW UP - move to previous not disabled option
			if (e.which == 38) {
			  newOption = options.find('li.selected').prev('li:not(.disabled)')[0];
			  if(newOption)
				activateOption(options, newOption);
			}

			// Automaticaly clean filter query so user can search again by starting letters
			setTimeout(function(){ filterQuery = []; }, 1000);
		  };

	  $newSelect.on('keydown', onKeyDown);
	});

	function toggleEntryFromArray(entriesArray, entryIndex, select) {
	  var index = entriesArray.indexOf(entryIndex);

	  if (index === -1) {
		entriesArray.push(entryIndex);
	  } else {
		entriesArray.splice(index, 1);
	  }

	  select.siblings('ul.dropdown-content').find('li').eq(entryIndex).toggleClass('active');
	  select.find('option').eq(entryIndex).prop('selected', true);
	  setValueToInput(entriesArray, select);
	}

	function setValueToInput(entriesArray, select) {
	  var value = '';

	  for (var i = 0, count = entriesArray.length; i < count; i++) {
		var text = select.find('option').eq(entriesArray[i]).text();

		i === 0 ? value += text : value += ', ' + text;
	  }

	  if (value === '') {
		value = select.find('option:disabled').eq(0).text();
	  }

	  select.siblings('input.select-dropdown').val(value);
	}
  };

}( jQuery ));
;(function ($) {

  var methods = {

	init : function(options) {
	  var defaults = {
		indicators: true,
		height: 400,
		transition: 500,
		interval: 6000
	  };
	  options = $.extend(defaults, options);

	  return this.each(function() {

		// For each slider, we want to keep track of
		// which slide is active and its associated content
		var $this = $(this);
		var $slider = $this.find('ul.slides').first();
		var $slides = $slider.find('li');
		var $active_index = $slider.find('.active').index();
		var $active, $indicators, $interval;
		if ($active_index != -1) { $active = $slides.eq($active_index); }

		// Transitions the caption depending on alignment
		function captionTransition(caption, duration) {
		  if (caption.hasClass("center-align")) {
			caption.velocity({opacity: 0, translateY: -100}, {duration: duration, queue: false});
		  }
		  else if (caption.hasClass("right-align")) {
			caption.velocity({opacity: 0, translateX: 100}, {duration: duration, queue: false});
		  }
		  else if (caption.hasClass("left-align")) {
			caption.velocity({opacity: 0, translateX: -100}, {duration: duration, queue: false});
		  }
		}

		// This function will transition the slide to any index of the next slide
		function moveToSlide(index) {
		  // Wrap around indices.
		  if (index >= $slides.length) index = 0;
		  else if (index < 0) index = $slides.length -1;

		  $active_index = $slider.find('.active').index();

		  // Only do if index changes
		  if ($active_index != index) {
			$active = $slides.eq($active_index);
			$caption = $active.find('.caption');

			$active.removeClass('active');
			$active.velocity({opacity: 0}, {duration: options.transition, queue: false, easing: 'easeOutQuad',
							  complete: function() {
								$slides.not('.active').velocity({opacity: 0, translateX: 0, translateY: 0}, {duration: 0, queue: false});
							  } });
			captionTransition($caption, options.transition);


			// Update indicators
			if (options.indicators) {
			  $indicators.eq($active_index).removeClass('active');
			}

			$slides.eq(index).velocity({opacity: 1}, {duration: options.transition, queue: false, easing: 'easeOutQuad'});
			$slides.eq(index).find('.caption').velocity({opacity: 1, translateX: 0, translateY: 0}, {duration: options.transition, delay: options.transition, queue: false, easing: 'easeOutQuad'});
			$slides.eq(index).addClass('active');


			// Update indicators
			if (options.indicators) {
			  $indicators.eq(index).addClass('active');
			}
		  }
		}

		// Set height of slider
		// If fullscreen, do nothing
		if (!$this.hasClass('fullscreen')) {
		  if (options.indicators) {
			// Add height if indicators are present
			$this.height(options.height + 40);
		  }
		  else {
			$this.height(options.height);
		  }
		  $slider.height(options.height);
		}


		// Set initial positions of captions
		$slides.find('.caption').each(function () {
		  captionTransition($(this), 0);
		});

		// Move img src into background-image
		$slides.find('img').each(function () {
		  var placeholderBase64 = 'data:image/gif;base64,R0lGODlhAQABAIABAP///wAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
		  if ($(this).attr('src') !== placeholderBase64) {
			$(this).css('background-image', 'url(' + $(this).attr('src') + ')' );
			$(this).attr('src', placeholderBase64);
		  }
		});

		// dynamically add indicators
		if (options.indicators) {
		  $indicators = $('<ul class="indicators"></ul>');
		  $slides.each(function( index ) {
			var $indicator = $('<li class="indicator-item"></li>');

			// Handle clicks on indicators
			$indicator.click(function () {
			  var $parent = $slider.parent();
			  var curr_index = $parent.find($(this)).index();
			  moveToSlide(curr_index);

			  // reset interval
			  clearInterval($interval);
			  $interval = setInterval(
				function(){
				  $active_index = $slider.find('.active').index();
				  if ($slides.length == $active_index + 1) $active_index = 0; // loop to start
				  else $active_index += 1;

				  moveToSlide($active_index);

				}, options.transition + options.interval
			  );
			});
			$indicators.append($indicator);
		  });
		  $this.append($indicators);
		  $indicators = $this.find('ul.indicators').find('li.indicator-item');
		}

		if ($active) {
		  $active.show();
		}
		else {
		  $slides.first().addClass('active').velocity({opacity: 1}, {duration: options.transition, queue: false, easing: 'easeOutQuad'});

		  $active_index = 0;
		  $active = $slides.eq($active_index);

		  // Update indicators
		  if (options.indicators) {
			$indicators.eq($active_index).addClass('active');
		  }
		}

		// Adjust height to current slide
		$active.find('img').each(function() {
		  $active.find('.caption').velocity({opacity: 1, translateX: 0, translateY: 0}, {duration: options.transition, queue: false, easing: 'easeOutQuad'});
		});

		// auto scroll
		$interval = setInterval(
		  function(){
			$active_index = $slider.find('.active').index();
			moveToSlide($active_index + 1);

		  }, options.transition + options.interval
		);


		// HammerJS, Swipe navigation

		// Touch Event
		var panning = false;
		var swipeLeft = false;
		var swipeRight = false;

		$this.hammer({
			prevent_default: false
		}).bind('pan', function(e) {
		  if (e.gesture.pointerType === "touch") {

			// reset interval
			clearInterval($interval);

			var direction = e.gesture.direction;
			var x = e.gesture.deltaX;
			var velocityX = e.gesture.velocityX;

			$curr_slide = $slider.find('.active');
			$curr_slide.velocity({ translateX: x
				}, {duration: 50, queue: false, easing: 'easeOutQuad'});

			// Swipe Left
			if (direction === 4 && (x > ($this.innerWidth() / 2) || velocityX < -0.65)) {
			  swipeRight = true;
			}
			// Swipe Right
			else if (direction === 2 && (x < (-1 * $this.innerWidth() / 2) || velocityX > 0.65)) {
			  swipeLeft = true;
			}

			// Make Slide Behind active slide visible
			var next_slide;
			if (swipeLeft) {
			  next_slide = $curr_slide.next();
			  if (next_slide.length === 0) {
				next_slide = $slides.first();
			  }
			  next_slide.velocity({ opacity: 1
				  }, {duration: 300, queue: false, easing: 'easeOutQuad'});
			}
			if (swipeRight) {
			  next_slide = $curr_slide.prev();
			  if (next_slide.length === 0) {
				next_slide = $slides.last();
			  }
			  next_slide.velocity({ opacity: 1
				  }, {duration: 300, queue: false, easing: 'easeOutQuad'});
			}


		  }

		}).bind('panend', function(e) {
		  if (e.gesture.pointerType === "touch") {

			$curr_slide = $slider.find('.active');
			panning = false;
			curr_index = $slider.find('.active').index();

			if (!swipeRight && !swipeLeft) {
			  // Return to original spot
			  $curr_slide.velocity({ translateX: 0
				  }, {duration: 300, queue: false, easing: 'easeOutQuad'});
			}
			else if (swipeLeft) {
			  moveToSlide(curr_index + 1);
			  $curr_slide.velocity({translateX: -1 * $this.innerWidth() }, {duration: 300, queue: false, easing: 'easeOutQuad',
									complete: function() {
									  $curr_slide.velocity({opacity: 0, translateX: 0}, {duration: 0, queue: false});
									} });
			}
			else if (swipeRight) {
			  moveToSlide(curr_index - 1);
			  $curr_slide.velocity({translateX: $this.innerWidth() }, {duration: 300, queue: false, easing: 'easeOutQuad',
									complete: function() {
									  $curr_slide.velocity({opacity: 0, translateX: 0}, {duration: 0, queue: false});
									} });
			}
			swipeLeft = false;
			swipeRight = false;

			// Restart interval
			clearInterval($interval);
			$interval = setInterval(
			  function(){
				$active_index = $slider.find('.active').index();
				if ($slides.length == $active_index + 1) $active_index = 0; // loop to start
				else $active_index += 1;

				moveToSlide($active_index);

			  }, options.transition + options.interval
			);
		  }
		});

		$this.on('sliderPause', function() {
		  clearInterval($interval);
		});

		$this.on('sliderStart', function() {
		  clearInterval($interval);
		  $interval = setInterval(
			function(){
			  $active_index = $slider.find('.active').index();
			  if ($slides.length == $active_index + 1) $active_index = 0; // loop to start
			  else $active_index += 1;

			  moveToSlide($active_index);

			}, options.transition + options.interval
		  );
		});

		$this.on('sliderNext', function() {
		  $active_index = $slider.find('.active').index();
		  moveToSlide($active_index + 1);
		});

		$this.on('sliderPrev', function() {
		  $active_index = $slider.find('.active').index();
		  moveToSlide($active_index - 1);
		});

	  });



	},
	pause : function() {
	  $(this).trigger('sliderPause');
	},
	start : function() {
	  $(this).trigger('sliderStart');
	},
	next : function() {
	  $(this).trigger('sliderNext');
	},
	prev : function() {
	  $(this).trigger('sliderPrev');
	}
  };


	$.fn.slider = function(methodOrOptions) {
	  if ( methods[methodOrOptions] ) {
		return methods[ methodOrOptions ].apply( this, Array.prototype.slice.call( arguments, 1 ));
	  } else if ( typeof methodOrOptions === 'object' || ! methodOrOptions ) {
		// Default to "init"
		return methods.init.apply( this, arguments );
	  } else {
		$.error( 'Method ' +  methodOrOptions + ' does not exist on jQuery.tooltip' );
	  }
	}; // Plugin end
}( jQuery ));;(function ($) {
  $(document).ready(function() {

	$(document).on('click.card', '.card', function (e) {
	  if ($(this).find('> .card-reveal').length) {
		if ($(e.target).is($('.card-reveal .card-title')) || $(e.target).is($('.card-reveal .card-title i'))) {
		  // Make Reveal animate down and display none
		  $(this).find('.card-reveal').velocity(
			{translateY: 0}, {
			  duration: 225,
			  queue: false,
			  easing: 'easeInOutQuad',
			  complete: function() { $(this).css({ display: 'none'}); }
			}
		  );
		}
		else if ($(e.target).is($('.card .activator')) ||
				 $(e.target).is($('.card .activator i')) ) {
		  $(e.target).closest('.card').css('overflow', 'hidden');
		  $(this).find('.card-reveal').css({ display: 'block'}).velocity("stop", false).velocity({translateY: '-100%'}, {duration: 300, queue: false, easing: 'easeInOutQuad'});
		}
	  }

	  $('.card-reveal').closest('.card').css('overflow', 'hidden');

	});

  });
}( jQuery ));;(function ($) {
  $(document).ready(function() {

	$(document).on('click.chip', '.chip .material-icons', function (e) {
	  $(this).parent().remove();
	});

  });
}( jQuery ));;(function ($) {
  $(document).ready(function() {

	$.fn.pushpin = function (options) {

	  var defaults = {
		top: 0,
		bottom: Infinity,
		offset: 0
	  }
	  options = $.extend(defaults, options);

	  $index = 0;
	  return this.each(function() {
		var $uniqueId = Materialize.guid(),
			$this = $(this),
			$original_offset = $(this).offset().top;

		function removePinClasses(object) {
		  object.removeClass('pin-top');
		  object.removeClass('pinned');
		  object.removeClass('pin-bottom');
		}

		function updateElements(objects, scrolled) {
		  objects.each(function () {
			// Add position fixed (because its between top and bottom)
			if (options.top <= scrolled && options.bottom >= scrolled && !$(this).hasClass('pinned')) {
			  removePinClasses($(this));
			  $(this).css('top', options.offset);
			  $(this).addClass('pinned');
			}

			// Add pin-top (when scrolled position is above top)
			if (scrolled < options.top && !$(this).hasClass('pin-top')) {
			  removePinClasses($(this));
			  $(this).css('top', 0);
			  $(this).addClass('pin-top');
			}

			// Add pin-bottom (when scrolled position is below bottom)
			if (scrolled > options.bottom && !$(this).hasClass('pin-bottom')) {
			  removePinClasses($(this));
			  $(this).addClass('pin-bottom');
			  $(this).css('top', options.bottom - $original_offset);
			}
		  });
		}

		updateElements($this, $(window).scrollTop());
		$(window).on('scroll.' + $uniqueId, function () {
		  var $scrolled = $(window).scrollTop() + options.offset;
		  updateElements($this, $scrolled);
		});

	  });

	};


  });
}( jQuery ));;(function ($) {
  $(document).ready(function() {

	// jQuery reverse
	$.fn.reverse = [].reverse;

	// Hover behaviour: make sure this doesn't work on .click-to-toggle FABs!
	$(document).on('mouseenter.fixedActionBtn', '.fixed-action-btn:not(.click-to-toggle)', function(e) {
	  var $this = $(this);
	  openFABMenu($this);
	});
	$(document).on('mouseleave.fixedActionBtn', '.fixed-action-btn:not(.click-to-toggle)', function(e) {
	  var $this = $(this);
	  closeFABMenu($this);
	});

	// Toggle-on-click behaviour.
	$(document).on('click.fixedActionBtn', '.fixed-action-btn.click-to-toggle > a', function(e) {
	  var $this = $(this);
	  var $menu = $this.parent();
	  if ($menu.hasClass('active')) {
		closeFABMenu($menu);
	  } else {
		openFABMenu($menu);
	  }
	});

  });

  $.fn.extend({
	openFAB: function() {
	  var $this = $(this);
	  openFABMenu($this);
	},
	closeFAB: function() {
	  closeFABMenu($this);
	}
  });


  var openFABMenu = function (btn) {
	$this = btn;
	if ($this.hasClass('active') === false) {

	  // Get direction option
	  var horizontal = $this.hasClass('horizontal');
	  var offsetY, offsetX;

	  if (horizontal === true) {
		offsetX = 40;
	  } else {
		offsetY = 40;
	  }

	  $this.addClass('active');
	  $this.find('ul .btn-floating').velocity(
		{ scaleY: ".4", scaleX: ".4", translateY: offsetY + 'px', translateX: offsetX + 'px'},
		{ duration: 0 });

	  var time = 0;
	  $this.find('ul .btn-floating').reverse().each( function () {
		$(this).velocity(
		  { opacity: "1", scaleX: "1", scaleY: "1", translateY: "0", translateX: '0'},
		  { duration: 80, delay: time });
		time += 40;
	  });
	}
  };

  var closeFABMenu = function (btn) {
	$this = btn;
	// Get direction option
	var horizontal = $this.hasClass('horizontal');
	var offsetY, offsetX;

	if (horizontal === true) {
	  offsetX = 40;
	} else {
	  offsetY = 40;
	}

	$this.removeClass('active');
	var time = 0;
	$this.find('ul .btn-floating').velocity("stop", true);
	$this.find('ul .btn-floating').velocity(
	  { opacity: "0", scaleX: ".4", scaleY: ".4", translateY: offsetY + 'px', translateX: offsetX + 'px'},
	  { duration: 80 }
	);
  };


}( jQuery ));
;(function ($) {
  // Image transition function
  Materialize.fadeInImage =  function(selector){
	var element = $(selector);
	element.css({opacity: 0});
	$(element).velocity({opacity: 1}, {
		duration: 650,
		queue: false,
		easing: 'easeOutSine'
	  });
	$(element).velocity({opacity: 1}, {
		  duration: 1300,
		  queue: false,
		  easing: 'swing',
		  step: function(now, fx) {
			  fx.start = 100;
			  var grayscale_setting = now/100;
			  var brightness_setting = 150 - (100 - now)/1.75;

			  if (brightness_setting < 100) {
				brightness_setting = 100;
			  }
			  if (now >= 0) {
				$(this).css({
					"-webkit-filter": "grayscale("+grayscale_setting+")" + "brightness("+brightness_setting+"%)",
					"filter": "grayscale("+grayscale_setting+")" + "brightness("+brightness_setting+"%)"
				});
			  }
		  }
	  });
  };

  // Horizontal staggered list
  Materialize.showStaggeredList = function(selector) {
	var time = 0;
	$(selector).find('li').velocity(
		{ translateX: "-100px"},
		{ duration: 0 });

	$(selector).find('li').each(function() {
	  $(this).velocity(
		{ opacity: "1", translateX: "0"},
		{ duration: 800, delay: time, easing: [60, 10] });
	  time += 120;
	});
  };


  $(document).ready(function() {
	// Hardcoded .staggered-list scrollFire
	// var staggeredListOptions = [];
	// $('ul.staggered-list').each(function (i) {

	//   var label = 'scrollFire-' + i;
	//   $(this).addClass(label);
	//   staggeredListOptions.push(
	//	 {selector: 'ul.staggered-list.' + label,
	//	  offset: 200,
	//	  callback: 'showStaggeredList("ul.staggered-list.' + label + '")'});
	// });
	// scrollFire(staggeredListOptions);

	// HammerJS, Swipe navigation

	// Touch Event
	var swipeLeft = false;
	var swipeRight = false;


	// Dismissible Collections
	$('.dismissable').each(function() {
	  $(this).hammer({
		prevent_default: false
	  }).bind('pan', function(e) {
		if (e.gesture.pointerType === "touch") {
		  var $this = $(this);
		  var direction = e.gesture.direction;
		  var x = e.gesture.deltaX;
		  var velocityX = e.gesture.velocityX;

		  $this.velocity({ translateX: x
			  }, {duration: 50, queue: false, easing: 'easeOutQuad'});

		  // Swipe Left
		  if (direction === 4 && (x > ($this.innerWidth() / 2) || velocityX < -0.75)) {
			swipeLeft = true;
		  }

		  // Swipe Right
		  if (direction === 2 && (x < (-1 * $this.innerWidth() / 2) || velocityX > 0.75)) {
			swipeRight = true;
		  }
		}
	  }).bind('panend', function(e) {
		// Reset if collection is moved back into original position
		if (Math.abs(e.gesture.deltaX) < ($(this).innerWidth() / 2)) {
		  swipeRight = false;
		  swipeLeft = false;
		}

		if (e.gesture.pointerType === "touch") {
		  var $this = $(this);
		  if (swipeLeft || swipeRight) {
			var fullWidth;
			if (swipeLeft) { fullWidth = $this.innerWidth(); }
			else { fullWidth = -1 * $this.innerWidth(); }

			$this.velocity({ translateX: fullWidth,
			  }, {duration: 100, queue: false, easing: 'easeOutQuad', complete:
			  function() {
				$this.css('border', 'none');
				$this.velocity({ height: 0, padding: 0,
				  }, {duration: 200, queue: false, easing: 'easeOutQuad', complete:
					function() { $this.remove(); }
				  });
			  }
			});
		  }
		  else {
			$this.velocity({ translateX: 0,
			  }, {duration: 100, queue: false, easing: 'easeOutQuad'});
		  }
		  swipeLeft = false;
		  swipeRight = false;
		}
	  });

	});


	// time = 0
	// // Vertical Staggered list
	// $('ul.staggered-list.vertical li').velocity(
	//	 { translateY: "100px"},
	//	 { duration: 0 });

	// $('ul.staggered-list.vertical li').each(function() {
	//   $(this).velocity(
	//	 { opacity: "1", translateY: "0"},
	//	 { duration: 800, delay: time, easing: [60, 25] });
	//   time += 120;
	// });

	// // Fade in and Scale
	// $('.fade-in.scale').velocity(
	//	 { scaleX: .4, scaleY: .4, translateX: -600},
	//	 { duration: 0});
	// $('.fade-in').each(function() {
	//   $(this).velocity(
	//	 { opacity: "1", scaleX: 1, scaleY: 1, translateX: 0},
	//	 { duration: 800, easing: [60, 10] });
	// });
  });
}( jQuery ));
;(function($) {

  // Input: Array of JSON objects {selector, offset, callback}

  Materialize.scrollFire = function(options) {

	var didScroll = false;

	window.addEventListener("scroll", function() {
	  didScroll = true;
	});

	// Rate limit to 100ms
	setInterval(function() {
	  if(didScroll) {
		  didScroll = false;

		  var windowScroll = window.pageYOffset + window.innerHeight;

		  for (var i = 0 ; i < options.length; i++) {
			// Get options from each line
			var value = options[i];
			var selector = value.selector,
				offset = value.offset,
				callback = value.callback;

			var currentElement = document.querySelector(selector);
			if ( currentElement !== null) {
			  var elementOffset = currentElement.getBoundingClientRect().top + window.pageYOffset;

			  if (windowScroll > (elementOffset + offset)) {
				if (value.done !== true) {
				  var callbackFunc = new Function(callback);
				  callbackFunc();
				  value.done = true;
				}
			  }
			}
		  }
	  }
	}, 100);
  };

})(jQuery);;/*!
 * pickadate.js v3.5.0, 2014/04/13
 * By Amsul, http://amsul.ca
 * Hosted on http://amsul.github.io/pickadate.js
 * Licensed under MIT
 */

(function ( factory ) {

	// AMD.
	if ( typeof dontdefine == 'function' && dontdefine.amd )
		dontdefine( 'picker', ['jquery'], factory )

	// Node.js/browserify.
	else if ( typeof exports == 'object' )
		module.exports = factory( require('jquery') )

	// Browser globals.
	else this.Picker = factory( jQuery )

}(function( $ ) {

var $window = $( window )
var $document = $( document )
var $html = $( document.documentElement )


/**
 * The picker constructor that creates a blank picker.
 */
function PickerConstructor( ELEMENT, NAME, COMPONENT, OPTIONS ) {

	// If there’s no element, return the picker constructor.
	if ( !ELEMENT ) return PickerConstructor


	var
		IS_DEFAULT_THEME = false,


		// The state of the picker.
		STATE = {
			id: ELEMENT.id || 'P' + Math.abs( ~~(Math.random() * new Date()) )
		},


		// Merge the defaults and options passed.
		SETTINGS = COMPONENT ? $.extend( true, {}, COMPONENT.defaults, OPTIONS ) : OPTIONS || {},


		// Merge the default classes with the settings classes.
		CLASSES = $.extend( {}, PickerConstructor.klasses(), SETTINGS.klass ),


		// The element node wrapper into a jQuery object.
		$ELEMENT = $( ELEMENT ),


		// Pseudo picker constructor.
		PickerInstance = function() {
			return this.start()
		},


		// The picker prototype.
		P = PickerInstance.prototype = {

			constructor: PickerInstance,

			$node: $ELEMENT,


			/**
			 * Initialize everything
			 */
			start: function() {

				// If it’s already started, do nothing.
				if ( STATE && STATE.start ) return P


				// Update the picker states.
				STATE.methods = {}
				STATE.start = true
				STATE.open = false
				STATE.type = ELEMENT.type


				// Confirm focus state, convert into text input to remove UA stylings,
				// and set as readonly to prevent keyboard popup.
				ELEMENT.autofocus = ELEMENT == getActiveElement()
				ELEMENT.readOnly = !SETTINGS.editable
				ELEMENT.id = ELEMENT.id || STATE.id
				if ( ELEMENT.type != 'text' ) {
					ELEMENT.type = 'text'
				}


				// Create a new picker component with the settings.
				P.component = new COMPONENT(P, SETTINGS)


				// Create the picker root with a holder and then prepare it.
				P.$root = $( PickerConstructor._.node('div', createWrappedComponent(), CLASSES.picker, 'id="' + ELEMENT.id + '_root" tabindex="0"') )
				prepareElementRoot()


				// If there’s a format for the hidden input element, create the element.
				if ( SETTINGS.formatSubmit ) {
					prepareElementHidden()
				}


				// Prepare the input element.
				prepareElement()


				// Insert the root as specified in the settings.
				if ( SETTINGS.container ) $( SETTINGS.container ).append( P.$root )
				else $ELEMENT.after( P.$root )


				// Bind the default component and settings events.
				P.on({
					start: P.component.onStart,
					render: P.component.onRender,
					stop: P.component.onStop,
					open: P.component.onOpen,
					close: P.component.onClose,
					set: P.component.onSet
				}).on({
					start: SETTINGS.onStart,
					render: SETTINGS.onRender,
					stop: SETTINGS.onStop,
					open: SETTINGS.onOpen,
					close: SETTINGS.onClose,
					set: SETTINGS.onSet
				})


				// Once we’re all set, check the theme in use.
				IS_DEFAULT_THEME = isUsingDefaultTheme( P.$root.children()[ 0 ] )


				// If the element has autofocus, open the picker.
				if ( ELEMENT.autofocus ) {
					P.open()
				}


				// Trigger queued the “start” and “render” events.
				return P.trigger( 'start' ).trigger( 'render' )
			}, //start


			/**
			 * Render a new picker
			 */
			render: function( entireComponent ) {

				// Insert a new component holder in the root or box.
				if ( entireComponent ) P.$root.html( createWrappedComponent() )
				else P.$root.find( '.' + CLASSES.box ).html( P.component.nodes( STATE.open ) )

				// Trigger the queued “render” events.
				return P.trigger( 'render' )
			}, //render


			/**
			 * Destroy everything
			 */
			stop: function() {

				// If it’s already stopped, do nothing.
				if ( !STATE.start ) return P

				// Then close the picker.
				P.close()

				// Remove the hidden field.
				if ( P._hidden ) {
					P._hidden.parentNode.removeChild( P._hidden )
				}

				// Remove the root.
				P.$root.remove()

				// Remove the input class, remove the stored data, and unbind
				// the events (after a tick for IE - see `P.close`).
				$ELEMENT.removeClass( CLASSES.input ).removeData( NAME )
				setTimeout( function() {
					$ELEMENT.off( '.' + STATE.id )
				}, 0)

				// Restore the element state
				ELEMENT.type = STATE.type
				ELEMENT.readOnly = false

				// Trigger the queued “stop” events.
				P.trigger( 'stop' )

				// Reset the picker states.
				STATE.methods = {}
				STATE.start = false

				return P
			}, //stop


			/**
			 * Open up the picker
			 */
			open: function( dontGiveFocus ) {

				// If it’s already open, do nothing.
				if ( STATE.open ) return P

				// Add the “active” class.
				$ELEMENT.addClass( CLASSES.active )
				aria( ELEMENT, 'expanded', true )

				// * A Firefox bug, when `html` has `overflow:hidden`, results in
				//   killing transitions :(. So add the “opened” state on the next tick.
				//   Bug: https://bugzilla.mozilla.org/show_bug.cgi?id=625289
				setTimeout( function() {

					// Add the “opened” class to the picker root.
					P.$root.addClass( CLASSES.opened )
					aria( P.$root[0], 'hidden', false )

				}, 0 )

				// If we have to give focus, bind the element and doc events.
				if ( dontGiveFocus !== false ) {

					// Set it as open.
					STATE.open = true

					// Prevent the page from scrolling.
					if ( IS_DEFAULT_THEME ) {
						$html.
							css( 'overflow', 'hidden' ).
							css( 'padding-right', '+=' + getScrollbarWidth() )
					}

					// Pass focus to the root element’s jQuery object.
					// * Workaround for iOS8 to bring the picker’s root into view.
					P.$root[0].focus()

					// Bind the document events.
					$document.on( 'click.' + STATE.id + ' focusin.' + STATE.id, function( event ) {

						var target = event.target

						// If the target of the event is not the element, close the picker picker.
						// * Don’t worry about clicks or focusins on the root because those don’t bubble up.
						//   Also, for Firefox, a click on an `option` element bubbles up directly
						//   to the doc. So make sure the target wasn't the doc.
						// * In Firefox stopPropagation() doesn’t prevent right-click events from bubbling,
						//   which causes the picker to unexpectedly close when right-clicking it. So make
						//   sure the event wasn’t a right-click.
						if ( target != ELEMENT && target != document && event.which != 3 ) {

							// If the target was the holder that covers the screen,
							// keep the element focused to maintain tabindex.
							P.close( target === P.$root.children()[0] )
						}

					}).on( 'keydown.' + STATE.id, function( event ) {

						var
							// Get the keycode.
							keycode = event.keyCode,

							// Translate that to a selection change.
							keycodeToMove = P.component.key[ keycode ],

							// Grab the target.
							target = event.target


						// On escape, close the picker and give focus.
						if ( keycode == 27 ) {
							P.close( true )
						}


						// Check if there is a key movement or “enter” keypress on the element.
						else if ( target == P.$root[0] && ( keycodeToMove || keycode == 13 ) ) {

							// Prevent the default action to stop page movement.
							event.preventDefault()

							// Trigger the key movement action.
							if ( keycodeToMove ) {
								PickerConstructor._.trigger( P.component.key.go, P, [ PickerConstructor._.trigger( keycodeToMove ) ] )
							}

							// On “enter”, if the highlighted item isn’t disabled, set the value and close.
							else if ( !P.$root.find( '.' + CLASSES.highlighted ).hasClass( CLASSES.disabled ) ) {
								P.set( 'select', P.component.item.highlight ).close()
							}
						}


						// If the target is within the root and “enter” is pressed,
						// prevent the default action and trigger a click on the target instead.
						else if ( $.contains( P.$root[0], target ) && keycode == 13 ) {
							event.preventDefault()
							target.click()
						}
					})
				}

				// Trigger the queued “open” events.
				return P.trigger( 'open' )
			}, //open


			/**
			 * Close the picker
			 */
			close: function( giveFocus ) {

				// If we need to give focus, do it before changing states.
				if ( giveFocus ) {
					// ....ah yes! It would’ve been incomplete without a crazy workaround for IE :|
					// The focus is triggered *after* the close has completed - causing it
					// to open again. So unbind and rebind the event at the next tick.
					P.$root.off( 'focus.toOpen' )[0].focus()
					setTimeout( function() {
						P.$root.on( 'focus.toOpen', handleFocusToOpenEvent )
					}, 0 )
				}

				// Remove the “active” class.
				$ELEMENT.removeClass( CLASSES.active )
				aria( ELEMENT, 'expanded', false )

				// * A Firefox bug, when `html` has `overflow:hidden`, results in
				//   killing transitions :(. So remove the “opened” state on the next tick.
				//   Bug: https://bugzilla.mozilla.org/show_bug.cgi?id=625289
				setTimeout( function() {

					// Remove the “opened” and “focused” class from the picker root.
					P.$root.removeClass( CLASSES.opened + ' ' + CLASSES.focused )
					aria( P.$root[0], 'hidden', true )

				}, 0 )

				// If it’s already closed, do nothing more.
				if ( !STATE.open ) return P

				// Set it as closed.
				STATE.open = false

				// Allow the page to scroll.
				if ( IS_DEFAULT_THEME ) {
					$html.
						css( 'overflow', '' ).
						css( 'padding-right', '-=' + getScrollbarWidth() )
				}

				// Unbind the document events.
				$document.off( '.' + STATE.id )

				// Trigger the queued “close” events.
				return P.trigger( 'close' )
			}, //close


			/**
			 * Clear the values
			 */
			clear: function( options ) {
				return P.set( 'clear', null, options )
			}, //clear


			/**
			 * Set something
			 */
			set: function( thing, value, options ) {

				var thingItem, thingValue,
					thingIsObject = $.isPlainObject( thing ),
					thingObject = thingIsObject ? thing : {}

				// Make sure we have usable options.
				options = thingIsObject && $.isPlainObject( value ) ? value : options || {}

				if ( thing ) {

					// If the thing isn’t an object, make it one.
					if ( !thingIsObject ) {
						thingObject[ thing ] = value
					}

					// Go through the things of items to set.
					for ( thingItem in thingObject ) {

						// Grab the value of the thing.
						thingValue = thingObject[ thingItem ]

						// First, if the item exists and there’s a value, set it.
						if ( thingItem in P.component.item ) {
							if ( thingValue === undefined ) thingValue = null
							P.component.set( thingItem, thingValue, options )
						}

						// Then, check to update the element value and broadcast a change.
						if ( thingItem == 'select' || thingItem == 'clear' ) {
							$ELEMENT.
								val( thingItem == 'clear' ? '' : P.get( thingItem, SETTINGS.format ) ).
								trigger( 'change' )
						}
					}

					// Render a new picker.
					P.render()
				}

				// When the method isn’t muted, trigger queued “set” events and pass the `thingObject`.
				return options.muted ? P : P.trigger( 'set', thingObject )
			}, //set


			/**
			 * Get something
			 */
			get: function( thing, format ) {

				// Make sure there’s something to get.
				thing = thing || 'value'

				// If a picker state exists, return that.
				if ( STATE[ thing ] != null ) {
					return STATE[ thing ]
				}

				// Return the submission value, if that.
				if ( thing == 'valueSubmit' ) {
					if ( P._hidden ) {
						return P._hidden.value
					}
					thing = 'value'
				}

				// Return the value, if that.
				if ( thing == 'value' ) {
					return ELEMENT.value
				}

				// Check if a component item exists, return that.
				if ( thing in P.component.item ) {
					if ( typeof format == 'string' ) {
						var thingValue = P.component.get( thing )
						return thingValue ?
							PickerConstructor._.trigger(
								P.component.formats.toString,
								P.component,
								[ format, thingValue ]
							) : ''
					}
					return P.component.get( thing )
				}
			}, //get



			/**
			 * Bind events on the things.
			 */
			on: function( thing, method, internal ) {

				var thingName, thingMethod,
					thingIsObject = $.isPlainObject( thing ),
					thingObject = thingIsObject ? thing : {}

				if ( thing ) {

					// If the thing isn’t an object, make it one.
					if ( !thingIsObject ) {
						thingObject[ thing ] = method
					}

					// Go through the things to bind to.
					for ( thingName in thingObject ) {

						// Grab the method of the thing.
						thingMethod = thingObject[ thingName ]

						// If it was an internal binding, prefix it.
						if ( internal ) {
							thingName = '_' + thingName
						}

						// Make sure the thing methods collection exists.
						STATE.methods[ thingName ] = STATE.methods[ thingName ] || []

						// Add the method to the relative method collection.
						STATE.methods[ thingName ].push( thingMethod )
					}
				}

				return P
			}, //on



			/**
			 * Unbind events on the things.
			 */
			off: function() {
				var i, thingName,
					names = arguments;
				for ( i = 0, namesCount = names.length; i < namesCount; i += 1 ) {
					thingName = names[i]
					if ( thingName in STATE.methods ) {
						delete STATE.methods[thingName]
					}
				}
				return P
			},


			/**
			 * Fire off method events.
			 */
			trigger: function( name, data ) {
				var _trigger = function( name ) {
					var methodList = STATE.methods[ name ]
					if ( methodList ) {
						methodList.map( function( method ) {
							PickerConstructor._.trigger( method, P, [ data ] )
						})
					}
				}
				_trigger( '_' + name )
				_trigger( name )
				return P
			} //trigger
		} //PickerInstance.prototype


	/**
	 * Wrap the picker holder components together.
	 */
	function createWrappedComponent() {

		// Create a picker wrapper holder
		return PickerConstructor._.node( 'div',

			// Create a picker wrapper node
			PickerConstructor._.node( 'div',

				// Create a picker frame
				PickerConstructor._.node( 'div',

					// Create a picker box node
					PickerConstructor._.node( 'div',

						// Create the components nodes.
						P.component.nodes( STATE.open ),

						// The picker box class
						CLASSES.box
					),

					// Picker wrap class
					CLASSES.wrap
				),

				// Picker frame class
				CLASSES.frame
			),

			// Picker holder class
			CLASSES.holder
		) //endreturn
	} //createWrappedComponent



	/**
	 * Prepare the input element with all bindings.
	 */
	function prepareElement() {

		$ELEMENT.

			// Store the picker data by component name.
			data(NAME, P).

			// Add the “input” class name.
			addClass(CLASSES.input).

			// Remove the tabindex.
			attr('tabindex', -1).

			// If there’s a `data-value`, update the value of the element.
			val( $ELEMENT.data('value') ?
				P.get('select', SETTINGS.format) :
				ELEMENT.value
			)


		// Only bind keydown events if the element isn’t editable.
		if ( !SETTINGS.editable ) {

			$ELEMENT.

				// On focus/click, focus onto the root to open it up.
				on( 'focus.' + STATE.id + ' click.' + STATE.id, function( event ) {
					event.preventDefault()
					P.$root[0].focus()
				}).

				// Handle keyboard event based on the picker being opened or not.
				on( 'keydown.' + STATE.id, handleKeydownEvent )
		}


		// Update the aria attributes.
		aria(ELEMENT, {
			haspopup: true,
			expanded: false,
			readonly: false,
			owns: ELEMENT.id + '_root'
		})
	}


	/**
	 * Prepare the root picker element with all bindings.
	 */
	function prepareElementRoot() {

		P.$root.

			on({

				// For iOS8.
				keydown: handleKeydownEvent,

				// When something within the root is focused, stop from bubbling
				// to the doc and remove the “focused” state from the root.
				focusin: function( event ) {
					P.$root.removeClass( CLASSES.focused )
					event.stopPropagation()
				},

				// When something within the root holder is clicked, stop it
				// from bubbling to the doc.
				'mousedown click': function( event ) {

					var target = event.target

					// Make sure the target isn’t the root holder so it can bubble up.
					if ( target != P.$root.children()[ 0 ] ) {

						event.stopPropagation()

						// * For mousedown events, cancel the default action in order to
						//   prevent cases where focus is shifted onto external elements
						//   when using things like jQuery mobile or MagnificPopup (ref: #249 & #120).
						//   Also, for Firefox, don’t prevent action on the `option` element.
						if ( event.type == 'mousedown' && !$( target ).is( 'input, select, textarea, button, option' )) {

							event.preventDefault()

							// Re-focus onto the root so that users can click away
							// from elements focused within the picker.
							P.$root[0].focus()
						}
					}
				}
			}).

			// Add/remove the “target” class on focus and blur.
			on({
				focus: function() {
					$ELEMENT.addClass( CLASSES.target )
				},
				blur: function() {
					$ELEMENT.removeClass( CLASSES.target )
				}
			}).

			// Open the picker and adjust the root “focused” state
			on( 'focus.toOpen', handleFocusToOpenEvent ).

			// If there’s a click on an actionable element, carry out the actions.
			on( 'click', '[data-pick], [data-nav], [data-clear], [data-close]', function() {

				var $target = $( this ),
					targetData = $target.data(),
					targetDisabled = $target.hasClass( CLASSES.navDisabled ) || $target.hasClass( CLASSES.disabled ),

					// * For IE, non-focusable elements can be active elements as well
					//   (http://stackoverflow.com/a/2684561).
					activeElement = getActiveElement()
					activeElement = activeElement && ( activeElement.type || activeElement.href )

				// If it’s disabled or nothing inside is actively focused, re-focus the element.
				if ( targetDisabled || activeElement && !$.contains( P.$root[0], activeElement ) ) {
					P.$root[0].focus()
				}

				// If something is superficially changed, update the `highlight` based on the `nav`.
				if ( !targetDisabled && targetData.nav ) {
					P.set( 'highlight', P.component.item.highlight, { nav: targetData.nav } )
				}

				// If something is picked, set `select` then close with focus.
				else if ( !targetDisabled && 'pick' in targetData ) {
					P.set( 'select', targetData.pick )
				}

				// If a “clear” button is pressed, empty the values and close with focus.
				else if ( targetData.clear ) {
					P.clear().close( true )
				}

				else if ( targetData.close ) {
					P.close( true )
				}

			}) //P.$root

		aria( P.$root[0], 'hidden', true )
	}


	 /**
	  * Prepare the hidden input element along with all bindings.
	  */
	function prepareElementHidden() {

		var name

		if ( SETTINGS.hiddenName === true ) {
			name = ELEMENT.name
			ELEMENT.name = ''
		}
		else {
			name = [
				typeof SETTINGS.hiddenPrefix == 'string' ? SETTINGS.hiddenPrefix : '',
				typeof SETTINGS.hiddenSuffix == 'string' ? SETTINGS.hiddenSuffix : '_submit'
			]
			name = name[0] + ELEMENT.name + name[1]
		}

		P._hidden = $(
			'<input ' +
			'type=hidden ' +

			// Create the name using the original input’s with a prefix and suffix.
			'name="' + name + '"' +

			// If the element has a value, set the hidden value as well.
			(
				$ELEMENT.data('value') || ELEMENT.value ?
					' value="' + P.get('select', SETTINGS.formatSubmit) + '"' :
					''
			) +
			'>'
		)[0]

		$ELEMENT.

			// If the value changes, update the hidden input with the correct format.
			on('change.' + STATE.id, function() {
				P._hidden.value = ELEMENT.value ?
					P.get('select', SETTINGS.formatSubmit) :
					''
			})


		// Insert the hidden input as specified in the settings.
		if ( SETTINGS.container ) $( SETTINGS.container ).append( P._hidden )
		else $ELEMENT.after( P._hidden )
	}


	// For iOS8.
	function handleKeydownEvent( event ) {

		var keycode = event.keyCode,

			// Check if one of the delete keys was pressed.
			isKeycodeDelete = /^(8|46)$/.test(keycode)

		// For some reason IE clears the input value on “escape”.
		if ( keycode == 27 ) {
			P.close()
			return false
		}

		// Check if `space` or `delete` was pressed or the picker is closed with a key movement.
		if ( keycode == 32 || isKeycodeDelete || !STATE.open && P.component.key[keycode] ) {

			// Prevent it from moving the page and bubbling to doc.
			event.preventDefault()
			event.stopPropagation()

			// If `delete` was pressed, clear the values and close the picker.
			// Otherwise open the picker.
			if ( isKeycodeDelete ) { P.clear().close() }
			else { P.open() }
		}
	}


	// Separated for IE
	function handleFocusToOpenEvent( event ) {

		// Stop the event from propagating to the doc.
		event.stopPropagation()

		// If it’s a focus event, add the “focused” class to the root.
		if ( event.type == 'focus' ) {
			P.$root.addClass( CLASSES.focused )
		}

		// And then finally open the picker.
		P.open()
	}


	// Return a new picker instance.
	return new PickerInstance()
} //PickerConstructor



/**
 * The default classes and prefix to use for the HTML classes.
 */
PickerConstructor.klasses = function( prefix ) {
	prefix = prefix || 'picker'
	return {

		picker: prefix,
		opened: prefix + '--opened',
		focused: prefix + '--focused',

		input: prefix + '__input',
		active: prefix + '__input--active',
		target: prefix + '__input--target',

		holder: prefix + '__holder',

		frame: prefix + '__frame',
		wrap: prefix + '__wrap',

		box: prefix + '__box'
	}
} //PickerConstructor.klasses



/**
 * Check if the default theme is being used.
 */
function isUsingDefaultTheme( element ) {

	var theme,
		prop = 'position'

	// For IE.
	if ( element.currentStyle ) {
		theme = element.currentStyle[prop]
	}

	// For normal browsers.
	else if ( window.getComputedStyle ) {
		theme = getComputedStyle( element )[prop]
	}

	return theme == 'fixed'
}



/**
 * Get the width of the browser’s scrollbar.
 * Taken from: https://github.com/VodkaBears/Remodal/blob/master/src/jquery.remodal.js
 */
function getScrollbarWidth() {

	if ( $html.height() <= $window.height() ) {
		return 0
	}

	var $outer = $( '<div style="visibility:hidden;width:100px" />' ).
		appendTo( 'body' )

	// Get the width without scrollbars.
	var widthWithoutScroll = $outer[0].offsetWidth

	// Force adding scrollbars.
	$outer.css( 'overflow', 'scroll' )

	// Add the inner div.
	var $inner = $( '<div style="width:100%" />' ).appendTo( $outer )

	// Get the width with scrollbars.
	var widthWithScroll = $inner[0].offsetWidth

	// Remove the divs.
	$outer.remove()

	// Return the difference between the widths.
	return widthWithoutScroll - widthWithScroll
}



/**
 * PickerConstructor helper methods.
 */
PickerConstructor._ = {

	/**
	 * Create a group of nodes. Expects:
	 * `
		{
			min:	{Integer},
			max:	{Integer},
			i:	  {Integer},
			node:   {String},
			item:   {Function}
		}
	 * `
	 */
	group: function( groupObject ) {

		var
			// Scope for the looped object
			loopObjectScope,

			// Create the nodes list
			nodesList = '',

			// The counter starts from the `min`
			counter = PickerConstructor._.trigger( groupObject.min, groupObject )


		// Loop from the `min` to `max`, incrementing by `i`
		for ( ; counter <= PickerConstructor._.trigger( groupObject.max, groupObject, [ counter ] ); counter += groupObject.i ) {

			// Trigger the `item` function within scope of the object
			loopObjectScope = PickerConstructor._.trigger( groupObject.item, groupObject, [ counter ] )

			// Splice the subgroup and create nodes out of the sub nodes
			nodesList += PickerConstructor._.node(
				groupObject.node,
				loopObjectScope[ 0 ],   // the node
				loopObjectScope[ 1 ],   // the classes
				loopObjectScope[ 2 ]	// the attributes
			)
		}

		// Return the list of nodes
		return nodesList
	}, //group


	/**
	 * Create a dom node string
	 */
	node: function( wrapper, item, klass, attribute ) {

		// If the item is false-y, just return an empty string
		if ( !item ) return ''

		// If the item is an array, do a join
		item = $.isArray( item ) ? item.join( '' ) : item

		// Check for the class
		klass = klass ? ' class="' + klass + '"' : ''

		// Check for any attributes
		attribute = attribute ? ' ' + attribute : ''

		// Return the wrapped item
		return '<' + wrapper + klass + attribute + '>' + item + '</' + wrapper + '>'
	}, //node


	/**
	 * Lead numbers below 10 with a zero.
	 */
	lead: function( number ) {
		return ( number < 10 ? '0': '' ) + number
	},


	/**
	 * Trigger a function otherwise return the value.
	 */
	trigger: function( callback, scope, args ) {
		return typeof callback == 'function' ? callback.apply( scope, args || [] ) : callback
	},


	/**
	 * If the second character is a digit, length is 2 otherwise 1.
	 */
	digits: function( string ) {
		return ( /\d/ ).test( string[ 1 ] ) ? 2 : 1
	},


	/**
	 * Tell if something is a date object.
	 */
	isDate: function( value ) {
		return {}.toString.call( value ).indexOf( 'Date' ) > -1 && this.isInteger( value.getDate() )
	},


	/**
	 * Tell if something is an integer.
	 */
	isInteger: function( value ) {
		return {}.toString.call( value ).indexOf( 'Number' ) > -1 && value % 1 === 0
	},


	/**
	 * Create ARIA attribute strings.
	 */
	ariaAttr: ariaAttr
} //PickerConstructor._



/**
 * Extend the picker with a component and defaults.
 */
PickerConstructor.extend = function( name, Component ) {

	// Extend jQuery.
	$.fn[ name ] = function( options, action ) {

		// Grab the component data.
		var componentData = this.data( name )

		// If the picker is requested, return the data object.
		if ( options == 'picker' ) {
			return componentData
		}

		// If the component data exists and `options` is a string, carry out the action.
		if ( componentData && typeof options == 'string' ) {
			return PickerConstructor._.trigger( componentData[ options ], componentData, [ action ] )
		}

		// Otherwise go through each matched element and if the component
		// doesn’t exist, create a new picker using `this` element
		// and merging the defaults and options with a deep copy.
		return this.each( function() {
			var $this = $( this )
			if ( !$this.data( name ) ) {
				new PickerConstructor( this, name, Component, options )
			}
		})
	}

	// Set the defaults.
	$.fn[ name ].defaults = Component.defaults
} //PickerConstructor.extend



function aria(element, attribute, value) {
	if ( $.isPlainObject(attribute) ) {
		for ( var key in attribute ) {
			ariaSet(element, key, attribute[key])
		}
	}
	else {
		ariaSet(element, attribute, value)
	}
}
function ariaSet(element, attribute, value) {
	element.setAttribute(
		(attribute == 'role' ? '' : 'aria-') + attribute,
		value
	)
}
function ariaAttr(attribute, data) {
	if ( !$.isPlainObject(attribute) ) {
		attribute = { attribute: data }
	}
	data = ''
	for ( var key in attribute ) {
		var attr = (key == 'role' ? '' : 'aria-') + key,
			attrVal = attribute[key]
		data += attrVal == null ? '' : attr + '="' + attribute[key] + '"'
	}
	return data
}

// IE8 bug throws an error for activeElements within iframes.
function getActiveElement() {
	try {
		return document.activeElement
	} catch ( err ) { }
}



// Expose the picker constructor.
return PickerConstructor


}));


;/*!
 * Date picker for pickadate.js v3.5.0
 * http://amsul.github.io/pickadate.js/date.htm
 */

(function ( factory ) {

	// AMD.
	if ( typeof dontdefine == 'function' && dontdefine.amd )
		dontdefine( ['picker', 'jquery'], factory )

	// Node.js/browserify.
	else if ( typeof exports == 'object' )
		module.exports = factory( require('./picker.js'), require('jquery') )

	// Browser globals.
	else factory( Picker, jQuery )

}(function( Picker, $ ) {


/**
 * Globals and constants
 */
var DAYS_IN_WEEK = 7,
	WEEKS_IN_CALENDAR = 6,
	_ = Picker._



/**
 * The date picker constructor
 */
function DatePicker( picker, settings ) {

	var calendar = this,
		element = picker.$node[ 0 ],
		elementValue = element.value,
		elementDataValue = picker.$node.data( 'value' ),
		valueString = elementDataValue || elementValue,
		formatString = elementDataValue ? settings.formatSubmit : settings.format,
		isRTL = function() {

			return element.currentStyle ?

				// For IE.
				element.currentStyle.direction == 'rtl' :

				// For normal browsers.
				getComputedStyle( picker.$root[0] ).direction == 'rtl'
		}

	calendar.settings = settings
	calendar.$node = picker.$node

	// The queue of methods that will be used to build item objects.
	calendar.queue = {
		min: 'measure create',
		max: 'measure create',
		now: 'now create',
		select: 'parse create validate',
		highlight: 'parse navigate create validate',
		view: 'parse create validate viewset',
		disable: 'deactivate',
		enable: 'activate'
	}

	// The component's item object.
	calendar.item = {}

	calendar.item.clear = null
	calendar.item.disable = ( settings.disable || [] ).slice( 0 )
	calendar.item.enable = -(function( collectionDisabled ) {
		return collectionDisabled[ 0 ] === true ? collectionDisabled.shift() : -1
	})( calendar.item.disable )

	calendar.
		set( 'min', settings.min ).
		set( 'max', settings.max ).
		set( 'now' )

	// When there’s a value, set the `select`, which in turn
	// also sets the `highlight` and `view`.
	if ( valueString ) {
		calendar.set( 'select', valueString, { format: formatString })
	}

	// If there’s no value, default to highlighting “today”.
	else {
		calendar.
			set( 'select', null ).
			set( 'highlight', calendar.item.now )
	}


	// The keycode to movement mapping.
	calendar.key = {
		40: 7, // Down
		38: -7, // Up
		39: function() { return isRTL() ? -1 : 1 }, // Right
		37: function() { return isRTL() ? 1 : -1 }, // Left
		go: function( timeChange ) {
			var highlightedObject = calendar.item.highlight,
				targetDate = new Date( highlightedObject.year, highlightedObject.month, highlightedObject.date + timeChange )
			calendar.set(
				'highlight',
				targetDate,
				{ interval: timeChange }
			)
			this.render()
		}
	}


	// Bind some picker events.
	picker.
		on( 'render', function() {
			picker.$root.find( '.' + settings.klass.selectMonth ).on( 'change', function() {
				var value = this.value
				if ( value ) {
					picker.set( 'highlight', [ picker.get( 'view' ).year, value, picker.get( 'highlight' ).date ] )
					picker.$root.find( '.' + settings.klass.selectMonth ).trigger( 'focus' )
				}
			})
			picker.$root.find( '.' + settings.klass.selectYear ).on( 'change', function() {
				var value = this.value
				if ( value ) {
					picker.set( 'highlight', [ value, picker.get( 'view' ).month, picker.get( 'highlight' ).date ] )
					picker.$root.find( '.' + settings.klass.selectYear ).trigger( 'focus' )
				}
			})
		}, 1 ).
		on( 'open', function() {
			var includeToday = ''
			if ( calendar.disabled( calendar.get('now') ) ) {
				includeToday = ':not(.' + settings.klass.buttonToday + ')'
			}
			picker.$root.find( 'button' + includeToday + ', select' ).attr( 'disabled', false )
		}, 1 ).
		on( 'close', function() {
			picker.$root.find( 'button, select' ).attr( 'disabled', true )
		}, 1 )

} //DatePicker


/**
 * Set a datepicker item object.
 */
DatePicker.prototype.set = function( type, value, options ) {

	var calendar = this,
		calendarItem = calendar.item

	// If the value is `null` just set it immediately.
	if ( value === null ) {
		if ( type == 'clear' ) type = 'select'
		calendarItem[ type ] = value
		return calendar
	}

	// Otherwise go through the queue of methods, and invoke the functions.
	// Update this as the time unit, and set the final value as this item.
	// * In the case of `enable`, keep the queue but set `disable` instead.
	//   And in the case of `flip`, keep the queue but set `enable` instead.
	calendarItem[ ( type == 'enable' ? 'disable' : type == 'flip' ? 'enable' : type ) ] = calendar.queue[ type ].split( ' ' ).map( function( method ) {
		value = calendar[ method ]( type, value, options )
		return value
	}).pop()

	// Check if we need to cascade through more updates.
	if ( type == 'select' ) {
		calendar.set( 'highlight', calendarItem.select, options )
	}
	else if ( type == 'highlight' ) {
		calendar.set( 'view', calendarItem.highlight, options )
	}
	else if ( type.match( /^(flip|min|max|disable|enable)$/ ) ) {
		if ( calendarItem.select && calendar.disabled( calendarItem.select ) ) {
			calendar.set( 'select', calendarItem.select, options )
		}
		if ( calendarItem.highlight && calendar.disabled( calendarItem.highlight ) ) {
			calendar.set( 'highlight', calendarItem.highlight, options )
		}
	}

	return calendar
} //DatePicker.prototype.set


/**
 * Get a datepicker item object.
 */
DatePicker.prototype.get = function( type ) {
	return this.item[ type ]
} //DatePicker.prototype.get


/**
 * Create a picker date object.
 */
DatePicker.prototype.create = function( type, value, options ) {

	var isInfiniteValue,
		calendar = this

	// If there’s no value, use the type as the value.
	value = value === undefined ? type : value


	// If it’s infinity, update the value.
	if ( value == -Infinity || value == Infinity ) {
		isInfiniteValue = value
	}

	// If it’s an object, use the native date object.
	else if ( $.isPlainObject( value ) && _.isInteger( value.pick ) ) {
		value = value.obj
	}

	// If it’s an array, convert it into a date and make sure
	// that it’s a valid date – otherwise default to today.
	else if ( $.isArray( value ) ) {
		value = new Date( value[ 0 ], value[ 1 ], value[ 2 ] )
		value = _.isDate( value ) ? value : calendar.create().obj
	}

	// If it’s a number or date object, make a normalized date.
	else if ( _.isInteger( value ) || _.isDate( value ) ) {
		value = calendar.normalize( new Date( value ), options )
	}

	// If it’s a literal true or any other case, set it to now.
	else /*if ( value === true )*/ {
		value = calendar.now( type, value, options )
	}

	// Return the compiled object.
	return {
		year: isInfiniteValue || value.getFullYear(),
		month: isInfiniteValue || value.getMonth(),
		date: isInfiniteValue || value.getDate(),
		day: isInfiniteValue || value.getDay(),
		obj: isInfiniteValue || value,
		pick: isInfiniteValue || value.getTime()
	}
} //DatePicker.prototype.create


/**
 * Create a range limit object using an array, date object,
 * literal “true”, or integer relative to another time.
 */
DatePicker.prototype.createRange = function( from, to ) {

	var calendar = this,
		createDate = function( date ) {
			if ( date === true || $.isArray( date ) || _.isDate( date ) ) {
				return calendar.create( date )
			}
			return date
		}

	// Create objects if possible.
	if ( !_.isInteger( from ) ) {
		from = createDate( from )
	}
	if ( !_.isInteger( to ) ) {
		to = createDate( to )
	}

	// Create relative dates.
	if ( _.isInteger( from ) && $.isPlainObject( to ) ) {
		from = [ to.year, to.month, to.date + from ];
	}
	else if ( _.isInteger( to ) && $.isPlainObject( from ) ) {
		to = [ from.year, from.month, from.date + to ];
	}

	return {
		from: createDate( from ),
		to: createDate( to )
	}
} //DatePicker.prototype.createRange


/**
 * Check if a date unit falls within a date range object.
 */
DatePicker.prototype.withinRange = function( range, dateUnit ) {
	range = this.createRange(range.from, range.to)
	return dateUnit.pick >= range.from.pick && dateUnit.pick <= range.to.pick
}


/**
 * Check if two date range objects overlap.
 */
DatePicker.prototype.overlapRanges = function( one, two ) {

	var calendar = this

	// Convert the ranges into comparable dates.
	one = calendar.createRange( one.from, one.to )
	two = calendar.createRange( two.from, two.to )

	return calendar.withinRange( one, two.from ) || calendar.withinRange( one, two.to ) ||
		calendar.withinRange( two, one.from ) || calendar.withinRange( two, one.to )
}


/**
 * Get the date today.
 */
DatePicker.prototype.now = function( type, value, options ) {
	value = new Date()
	if ( options && options.rel ) {
		value.setDate( value.getDate() + options.rel )
	}
	return this.normalize( value, options )
}


/**
 * Navigate to next/prev month.
 */
DatePicker.prototype.navigate = function( type, value, options ) {

	var targetDateObject,
		targetYear,
		targetMonth,
		targetDate,
		isTargetArray = $.isArray( value ),
		isTargetObject = $.isPlainObject( value ),
		viewsetObject = this.item.view/*,
		safety = 100*/


	if ( isTargetArray || isTargetObject ) {

		if ( isTargetObject ) {
			targetYear = value.year
			targetMonth = value.month
			targetDate = value.date
		}
		else {
			targetYear = +value[0]
			targetMonth = +value[1]
			targetDate = +value[2]
		}

		// If we’re navigating months but the view is in a different
		// month, navigate to the view’s year and month.
		if ( options && options.nav && viewsetObject && viewsetObject.month !== targetMonth ) {
			targetYear = viewsetObject.year
			targetMonth = viewsetObject.month
		}

		// Figure out the expected target year and month.
		targetDateObject = new Date( targetYear, targetMonth + ( options && options.nav ? options.nav : 0 ), 1 )
		targetYear = targetDateObject.getFullYear()
		targetMonth = targetDateObject.getMonth()

		// If the month we’re going to doesn’t have enough days,
		// keep decreasing the date until we reach the month’s last date.
		while ( /*safety &&*/ new Date( targetYear, targetMonth, targetDate ).getMonth() !== targetMonth ) {
			targetDate -= 1
			/*safety -= 1
			if ( !safety ) {
				throw 'Fell into an infinite loop while navigating to ' + new Date( targetYear, targetMonth, targetDate ) + '.'
			}*/
		}

		value = [ targetYear, targetMonth, targetDate ]
	}

	return value
} //DatePicker.prototype.navigate


/**
 * Normalize a date by setting the hours to midnight.
 */
DatePicker.prototype.normalize = function( value/*, options*/ ) {
	value.setHours( 0, 0, 0, 0 )
	return value
}


/**
 * Measure the range of dates.
 */
DatePicker.prototype.measure = function( type, value/*, options*/ ) {

	var calendar = this

	// If it’s anything false-y, remove the limits.
	if ( !value ) {
		value = type == 'min' ? -Infinity : Infinity
	}

	// If it’s a string, parse it.
	else if ( typeof value == 'string' ) {
		value = calendar.parse( type, value )
	}

	// If it's an integer, get a date relative to today.
	else if ( _.isInteger( value ) ) {
		value = calendar.now( type, value, { rel: value } )
	}

	return value
} ///DatePicker.prototype.measure


/**
 * Create a viewset object based on navigation.
 */
DatePicker.prototype.viewset = function( type, dateObject/*, options*/ ) {
	return this.create([ dateObject.year, dateObject.month, 1 ])
}


/**
 * Validate a date as enabled and shift if needed.
 */
DatePicker.prototype.validate = function( type, dateObject, options ) {

	var calendar = this,

		// Keep a reference to the original date.
		originalDateObject = dateObject,

		// Make sure we have an interval.
		interval = options && options.interval ? options.interval : 1,

		// Check if the calendar enabled dates are inverted.
		isFlippedBase = calendar.item.enable === -1,

		// Check if we have any enabled dates after/before now.
		hasEnabledBeforeTarget, hasEnabledAfterTarget,

		// The min & max limits.
		minLimitObject = calendar.item.min,
		maxLimitObject = calendar.item.max,

		// Check if we’ve reached the limit during shifting.
		reachedMin, reachedMax,

		// Check if the calendar is inverted and at least one weekday is enabled.
		hasEnabledWeekdays = isFlippedBase && calendar.item.disable.filter( function( value ) {

			// If there’s a date, check where it is relative to the target.
			if ( $.isArray( value ) ) {
				var dateTime = calendar.create( value ).pick
				if ( dateTime < dateObject.pick ) hasEnabledBeforeTarget = true
				else if ( dateTime > dateObject.pick ) hasEnabledAfterTarget = true
			}

			// Return only integers for enabled weekdays.
			return _.isInteger( value )
		}).length/*,

		safety = 100*/



	// Cases to validate for:
	// [1] Not inverted and date disabled.
	// [2] Inverted and some dates enabled.
	// [3] Not inverted and out of range.
	//
	// Cases to **not** validate for:
	// • Navigating months.
	// • Not inverted and date enabled.
	// • Inverted and all dates disabled.
	// • ..and anything else.
	if ( !options || !options.nav ) if (
		/* 1 */ ( !isFlippedBase && calendar.disabled( dateObject ) ) ||
		/* 2 */ ( isFlippedBase && calendar.disabled( dateObject ) && ( hasEnabledWeekdays || hasEnabledBeforeTarget || hasEnabledAfterTarget ) ) ||
		/* 3 */ ( !isFlippedBase && (dateObject.pick <= minLimitObject.pick || dateObject.pick >= maxLimitObject.pick) )
	) {


		// When inverted, flip the direction if there aren’t any enabled weekdays
		// and there are no enabled dates in the direction of the interval.
		if ( isFlippedBase && !hasEnabledWeekdays && ( ( !hasEnabledAfterTarget && interval > 0 ) || ( !hasEnabledBeforeTarget && interval < 0 ) ) ) {
			interval *= -1
		}


		// Keep looping until we reach an enabled date.
		while ( /*safety &&*/ calendar.disabled( dateObject ) ) {

			/*safety -= 1
			if ( !safety ) {
				throw 'Fell into an infinite loop while validating ' + dateObject.obj + '.'
			}*/


			// If we’ve looped into the next/prev month with a large interval, return to the original date and flatten the interval.
			if ( Math.abs( interval ) > 1 && ( dateObject.month < originalDateObject.month || dateObject.month > originalDateObject.month ) ) {
				dateObject = originalDateObject
				interval = interval > 0 ? 1 : -1
			}


			// If we’ve reached the min/max limit, reverse the direction, flatten the interval and set it to the limit.
			if ( dateObject.pick <= minLimitObject.pick ) {
				reachedMin = true
				interval = 1
				dateObject = calendar.create([
					minLimitObject.year,
					minLimitObject.month,
					minLimitObject.date + (dateObject.pick === minLimitObject.pick ? 0 : -1)
				])
			}
			else if ( dateObject.pick >= maxLimitObject.pick ) {
				reachedMax = true
				interval = -1
				dateObject = calendar.create([
					maxLimitObject.year,
					maxLimitObject.month,
					maxLimitObject.date + (dateObject.pick === maxLimitObject.pick ? 0 : 1)
				])
			}


			// If we’ve reached both limits, just break out of the loop.
			if ( reachedMin && reachedMax ) {
				break
			}


			// Finally, create the shifted date using the interval and keep looping.
			dateObject = calendar.create([ dateObject.year, dateObject.month, dateObject.date + interval ])
		}

	} //endif


	// Return the date object settled on.
	return dateObject
} //DatePicker.prototype.validate


/**
 * Check if a date is disabled.
 */
DatePicker.prototype.disabled = function( dateToVerify ) {

	var
		calendar = this,

		// Filter through the disabled dates to check if this is one.
		isDisabledMatch = calendar.item.disable.filter( function( dateToDisable ) {

			// If the date is a number, match the weekday with 0index and `firstDay` check.
			if ( _.isInteger( dateToDisable ) ) {
				return dateToVerify.day === ( calendar.settings.firstDay ? dateToDisable : dateToDisable - 1 ) % 7
			}

			// If it’s an array or a native JS date, create and match the exact date.
			if ( $.isArray( dateToDisable ) || _.isDate( dateToDisable ) ) {
				return dateToVerify.pick === calendar.create( dateToDisable ).pick
			}

			// If it’s an object, match a date within the “from” and “to” range.
			if ( $.isPlainObject( dateToDisable ) ) {
				return calendar.withinRange( dateToDisable, dateToVerify )
			}
		})

	// If this date matches a disabled date, confirm it’s not inverted.
	isDisabledMatch = isDisabledMatch.length && !isDisabledMatch.filter(function( dateToDisable ) {
		return $.isArray( dateToDisable ) && dateToDisable[3] == 'inverted' ||
			$.isPlainObject( dateToDisable ) && dateToDisable.inverted
	}).length

	// Check the calendar “enabled” flag and respectively flip the
	// disabled state. Then also check if it’s beyond the min/max limits.
	return calendar.item.enable === -1 ? !isDisabledMatch : isDisabledMatch ||
		dateToVerify.pick < calendar.item.min.pick ||
		dateToVerify.pick > calendar.item.max.pick

} //DatePicker.prototype.disabled


/**
 * Parse a string into a usable type.
 */
DatePicker.prototype.parse = function( type, value, options ) {

	var calendar = this,
		parsingObject = {}

	// If it’s already parsed, we’re good.
	if ( !value || typeof value != 'string' ) {
		return value
	}

	// We need a `.format` to parse the value with.
	if ( !( options && options.format ) ) {
		options = options || {}
		options.format = calendar.settings.format
	}

	// Convert the format into an array and then map through it.
	calendar.formats.toArray( options.format ).map( function( label ) {

		var
			// Grab the formatting label.
			formattingLabel = calendar.formats[ label ],

			// The format length is from the formatting label function or the
			// label length without the escaping exclamation (!) mark.
			formatLength = formattingLabel ? _.trigger( formattingLabel, calendar, [ value, parsingObject ] ) : label.replace( /^!/, '' ).length

		// If there's a format label, split the value up to the format length.
		// Then add it to the parsing object with appropriate label.
		if ( formattingLabel ) {
			parsingObject[ label ] = value.substr( 0, formatLength )
		}

		// Update the value as the substring from format length to end.
		value = value.substr( formatLength )
	})

	// Compensate for month 0index.
	return [
		parsingObject.yyyy || parsingObject.yy,
		+( parsingObject.mm || parsingObject.m ) - 1,
		parsingObject.dd || parsingObject.d
	]
} //DatePicker.prototype.parse


/**
 * Various formats to display the object in.
 */
DatePicker.prototype.formats = (function() {

	// Return the length of the first word in a collection.
	function getWordLengthFromCollection( string, collection, dateObject ) {

		// Grab the first word from the string.
		var word = string.match( /\w+/ )[ 0 ]

		// If there's no month index, add it to the date object
		if ( !dateObject.mm && !dateObject.m ) {
			dateObject.m = collection.indexOf( word ) + 1
		}

		// Return the length of the word.
		return word.length
	}

	// Get the length of the first word in a string.
	function getFirstWordLength( string ) {
		return string.match( /\w+/ )[ 0 ].length
	}

	return {

		d: function( string, dateObject ) {

			// If there's string, then get the digits length.
			// Otherwise return the selected date.
			return string ? _.digits( string ) : dateObject.date
		},
		dd: function( string, dateObject ) {

			// If there's a string, then the length is always 2.
			// Otherwise return the selected date with a leading zero.
			return string ? 2 : _.lead( dateObject.date )
		},
		ddd: function( string, dateObject ) {

			// If there's a string, then get the length of the first word.
			// Otherwise return the short selected weekday.
			return string ? getFirstWordLength( string ) : this.settings.weekdaysShort[ dateObject.day ]
		},
		dddd: function( string, dateObject ) {

			// If there's a string, then get the length of the first word.
			// Otherwise return the full selected weekday.
			return string ? getFirstWordLength( string ) : this.settings.weekdaysFull[ dateObject.day ]
		},
		m: function( string, dateObject ) {

			// If there's a string, then get the length of the digits
			// Otherwise return the selected month with 0index compensation.
			return string ? _.digits( string ) : dateObject.month + 1
		},
		mm: function( string, dateObject ) {

			// If there's a string, then the length is always 2.
			// Otherwise return the selected month with 0index and leading zero.
			return string ? 2 : _.lead( dateObject.month + 1 )
		},
		mmm: function( string, dateObject ) {

			var collection = this.settings.monthsShort

			// If there's a string, get length of the relevant month from the short
			// months collection. Otherwise return the selected month from that collection.
			return string ? getWordLengthFromCollection( string, collection, dateObject ) : collection[ dateObject.month ]
		},
		mmmm: function( string, dateObject ) {

			var collection = this.settings.monthsFull

			// If there's a string, get length of the relevant month from the full
			// months collection. Otherwise return the selected month from that collection.
			return string ? getWordLengthFromCollection( string, collection, dateObject ) : collection[ dateObject.month ]
		},
		yy: function( string, dateObject ) {

			// If there's a string, then the length is always 2.
			// Otherwise return the selected year by slicing out the first 2 digits.
			return string ? 2 : ( '' + dateObject.year ).slice( 2 )
		},
		yyyy: function( string, dateObject ) {

			// If there's a string, then the length is always 4.
			// Otherwise return the selected year.
			return string ? 4 : dateObject.year
		},

		// Create an array by splitting the formatting string passed.
		toArray: function( formatString ) { return formatString.split( /(d{1,4}|m{1,4}|y{4}|yy|!.)/g ) },

		// Format an object into a string using the formatting options.
		toString: function ( formatString, itemObject ) {
			var calendar = this
			return calendar.formats.toArray( formatString ).map( function( label ) {
				return _.trigger( calendar.formats[ label ], calendar, [ 0, itemObject ] ) || label.replace( /^!/, '' )
			}).join( '' )
		}
	}
})() //DatePicker.prototype.formats




/**
 * Check if two date units are the exact.
 */
DatePicker.prototype.isDateExact = function( one, two ) {

	var calendar = this

	// When we’re working with weekdays, do a direct comparison.
	if (
		( _.isInteger( one ) && _.isInteger( two ) ) ||
		( typeof one == 'boolean' && typeof two == 'boolean' )
	 ) {
		return one === two
	}

	// When we’re working with date representations, compare the “pick” value.
	if (
		( _.isDate( one ) || $.isArray( one ) ) &&
		( _.isDate( two ) || $.isArray( two ) )
	) {
		return calendar.create( one ).pick === calendar.create( two ).pick
	}

	// When we’re working with range objects, compare the “from” and “to”.
	if ( $.isPlainObject( one ) && $.isPlainObject( two ) ) {
		return calendar.isDateExact( one.from, two.from ) && calendar.isDateExact( one.to, two.to )
	}

	return false
}


/**
 * Check if two date units overlap.
 */
DatePicker.prototype.isDateOverlap = function( one, two ) {

	var calendar = this,
		firstDay = calendar.settings.firstDay ? 1 : 0

	// When we’re working with a weekday index, compare the days.
	if ( _.isInteger( one ) && ( _.isDate( two ) || $.isArray( two ) ) ) {
		one = one % 7 + firstDay
		return one === calendar.create( two ).day + 1
	}
	if ( _.isInteger( two ) && ( _.isDate( one ) || $.isArray( one ) ) ) {
		two = two % 7 + firstDay
		return two === calendar.create( one ).day + 1
	}

	// When we’re working with range objects, check if the ranges overlap.
	if ( $.isPlainObject( one ) && $.isPlainObject( two ) ) {
		return calendar.overlapRanges( one, two )
	}

	return false
}


/**
 * Flip the “enabled” state.
 */
DatePicker.prototype.flipEnable = function(val) {
	var itemObject = this.item
	itemObject.enable = val || (itemObject.enable == -1 ? 1 : -1)
}


/**
 * Mark a collection of dates as “disabled”.
 */
DatePicker.prototype.deactivate = function( type, datesToDisable ) {

	var calendar = this,
		disabledItems = calendar.item.disable.slice(0)


	// If we’re flipping, that’s all we need to do.
	if ( datesToDisable == 'flip' ) {
		calendar.flipEnable()
	}

	else if ( datesToDisable === false ) {
		calendar.flipEnable(1)
		disabledItems = []
	}

	else if ( datesToDisable === true ) {
		calendar.flipEnable(-1)
		disabledItems = []
	}

	// Otherwise go through the dates to disable.
	else {

		datesToDisable.map(function( unitToDisable ) {

			var matchFound

			// When we have disabled items, check for matches.
			// If something is matched, immediately break out.
			for ( var index = 0; index < disabledItems.length; index += 1 ) {
				if ( calendar.isDateExact( unitToDisable, disabledItems[index] ) ) {
					matchFound = true
					break
				}
			}

			// If nothing was found, add the validated unit to the collection.
			if ( !matchFound ) {
				if (
					_.isInteger( unitToDisable ) ||
					_.isDate( unitToDisable ) ||
					$.isArray( unitToDisable ) ||
					( $.isPlainObject( unitToDisable ) && unitToDisable.from && unitToDisable.to )
				) {
					disabledItems.push( unitToDisable )
				}
			}
		})
	}

	// Return the updated collection.
	return disabledItems
} //DatePicker.prototype.deactivate


/**
 * Mark a collection of dates as “enabled”.
 */
DatePicker.prototype.activate = function( type, datesToEnable ) {

	var calendar = this,
		disabledItems = calendar.item.disable,
		disabledItemsCount = disabledItems.length

	// If we’re flipping, that’s all we need to do.
	if ( datesToEnable == 'flip' ) {
		calendar.flipEnable()
	}

	else if ( datesToEnable === true ) {
		calendar.flipEnable(1)
		disabledItems = []
	}

	else if ( datesToEnable === false ) {
		calendar.flipEnable(-1)
		disabledItems = []
	}

	// Otherwise go through the disabled dates.
	else {

		datesToEnable.map(function( unitToEnable ) {

			var matchFound,
				disabledUnit,
				index,
				isExactRange

			// Go through the disabled items and try to find a match.
			for ( index = 0; index < disabledItemsCount; index += 1 ) {

				disabledUnit = disabledItems[index]

				// When an exact match is found, remove it from the collection.
				if ( calendar.isDateExact( disabledUnit, unitToEnable ) ) {
					matchFound = disabledItems[index] = null
					isExactRange = true
					break
				}

				// When an overlapped match is found, add the “inverted” state to it.
				else if ( calendar.isDateOverlap( disabledUnit, unitToEnable ) ) {
					if ( $.isPlainObject( unitToEnable ) ) {
						unitToEnable.inverted = true
						matchFound = unitToEnable
					}
					else if ( $.isArray( unitToEnable ) ) {
						matchFound = unitToEnable
						if ( !matchFound[3] ) matchFound.push( 'inverted' )
					}
					else if ( _.isDate( unitToEnable ) ) {
						matchFound = [ unitToEnable.getFullYear(), unitToEnable.getMonth(), unitToEnable.getDate(), 'inverted' ]
					}
					break
				}
			}

			// If a match was found, remove a previous duplicate entry.
			if ( matchFound ) for ( index = 0; index < disabledItemsCount; index += 1 ) {
				if ( calendar.isDateExact( disabledItems[index], unitToEnable ) ) {
					disabledItems[index] = null
					break
				}
			}

			// In the event that we’re dealing with an exact range of dates,
			// make sure there are no “inverted” dates because of it.
			if ( isExactRange ) for ( index = 0; index < disabledItemsCount; index += 1 ) {
				if ( calendar.isDateOverlap( disabledItems[index], unitToEnable ) ) {
					disabledItems[index] = null
					break
				}
			}

			// If something is still matched, add it into the collection.
			if ( matchFound ) {
				disabledItems.push( matchFound )
			}
		})
	}

	// Return the updated collection.
	return disabledItems.filter(function( val ) { return val != null })
} //DatePicker.prototype.activate


/**
 * Create a string for the nodes in the picker.
 */
DatePicker.prototype.nodes = function( isOpen ) {

	var
		calendar = this,
		settings = calendar.settings,
		calendarItem = calendar.item,
		nowObject = calendarItem.now,
		selectedObject = calendarItem.select,
		highlightedObject = calendarItem.highlight,
		viewsetObject = calendarItem.view,
		disabledCollection = calendarItem.disable,
		minLimitObject = calendarItem.min,
		maxLimitObject = calendarItem.max,


		// Create the calendar table head using a copy of weekday labels collection.
		// * We do a copy so we don't mutate the original array.
		tableHead = (function( collection, fullCollection ) {

			// If the first day should be Monday, move Sunday to the end.
			if ( settings.firstDay ) {
				collection.push( collection.shift() )
				fullCollection.push( fullCollection.shift() )
			}

			// Create and return the table head group.
			return _.node(
				'thead',
				_.node(
					'tr',
					_.group({
						min: 0,
						max: DAYS_IN_WEEK - 1,
						i: 1,
						node: 'th',
						item: function( counter ) {
							return [
								collection[ counter ],
								settings.klass.weekdays,
								'scope=col title="' + fullCollection[ counter ] + '"'
							]
						}
					})
				)
			) //endreturn

		// Materialize modified
		})( ( settings.showWeekdaysFull ? settings.weekdaysFull : settings.weekdaysLetter ).slice( 0 ), settings.weekdaysFull.slice( 0 ) ), //tableHead


		// Create the nav for next/prev month.
		createMonthNav = function( next ) {

			// Otherwise, return the created month tag.
			return _.node(
				'div',
				' ',
				settings.klass[ 'nav' + ( next ? 'Next' : 'Prev' ) ] + (

					// If the focused month is outside the range, disabled the button.
					( next && viewsetObject.year >= maxLimitObject.year && viewsetObject.month >= maxLimitObject.month ) ||
					( !next && viewsetObject.year <= minLimitObject.year && viewsetObject.month <= minLimitObject.month ) ?
					' ' + settings.klass.navDisabled : ''
				),
				'data-nav=' + ( next || -1 ) + ' ' +
				_.ariaAttr({
					role: 'button',
					controls: calendar.$node[0].id + '_table'
				}) + ' ' +
				'title="' + (next ? settings.labelMonthNext : settings.labelMonthPrev ) + '"'
			) //endreturn
		}, //createMonthNav


		// Create the month label.
		//Materialize modified
		createMonthLabel = function(override) {

			var monthsCollection = settings.showMonthsShort ? settings.monthsShort : settings.monthsFull

			 // Materialize modified
			if (override == "short_months") {
			  monthsCollection = settings.monthsShort;
			}

			// If there are months to select, add a dropdown menu.
			if ( settings.selectMonths  && override == undefined) {

				return _.node( 'select',
					_.group({
						min: 0,
						max: 11,
						i: 1,
						node: 'option',
						item: function( loopedMonth ) {

							return [

								// The looped month and no classes.
								monthsCollection[ loopedMonth ], 0,

								// Set the value and selected index.
								'value=' + loopedMonth +
								( viewsetObject.month == loopedMonth ? ' selected' : '' ) +
								(
									(
										( viewsetObject.year == minLimitObject.year && loopedMonth < minLimitObject.month ) ||
										( viewsetObject.year == maxLimitObject.year && loopedMonth > maxLimitObject.month )
									) ?
									' disabled' : ''
								)
							]
						}
					}),
					settings.klass.selectMonth + ' browser-default',
					( isOpen ? '' : 'disabled' ) + ' ' +
					_.ariaAttr({ controls: calendar.$node[0].id + '_table' }) + ' ' +
					'title="' + settings.labelMonthSelect + '"'
				)
			}

			// Materialize modified
			if (override == "short_months")
				if (selectedObject != null)
				return _.node( 'div', monthsCollection[ selectedObject.month ] );
				else return _.node( 'div', monthsCollection[ viewsetObject.month ] );

			// If there's a need for a month selector
			return _.node( 'div', monthsCollection[ viewsetObject.month ], settings.klass.month )
		}, //createMonthLabel


		// Create the year label.
		// Materialize modified
		createYearLabel = function(override) {

			var focusedYear = viewsetObject.year,

			// If years selector is set to a literal "true", set it to 5. Otherwise
			// divide in half to get half before and half after focused year.
			numberYears = settings.selectYears === true ? 5 : ~~( settings.selectYears / 2 )

			// If there are years to select, add a dropdown menu.
			if ( numberYears ) {

				var
					minYear = minLimitObject.year,
					maxYear = maxLimitObject.year,
					lowestYear = focusedYear - numberYears,
					highestYear = focusedYear + numberYears

				// If the min year is greater than the lowest year, increase the highest year
				// by the difference and set the lowest year to the min year.
				if ( minYear > lowestYear ) {
					highestYear += minYear - lowestYear
					lowestYear = minYear
				}

				// If the max year is less than the highest year, decrease the lowest year
				// by the lower of the two: available and needed years. Then set the
				// highest year to the max year.
				if ( maxYear < highestYear ) {

					var availableYears = lowestYear - minYear,
						neededYears = highestYear - maxYear

					lowestYear -= availableYears > neededYears ? neededYears : availableYears
					highestYear = maxYear
				}

				if ( settings.selectYears  && override == undefined ) {
					return _.node( 'select',
						_.group({
							min: lowestYear,
							max: highestYear,
							i: 1,
							node: 'option',
							item: function( loopedYear ) {
								return [

									// The looped year and no classes.
									loopedYear, 0,

									// Set the value and selected index.
									'value=' + loopedYear + ( focusedYear == loopedYear ? ' selected' : '' )
								]
							}
						}),
						settings.klass.selectYear + ' browser-default',
						( isOpen ? '' : 'disabled' ) + ' ' + _.ariaAttr({ controls: calendar.$node[0].id + '_table' }) + ' ' +
						'title="' + settings.labelYearSelect + '"'
					)
				}
			}

			// Materialize modified
			if (override == "raw")
				return _.node( 'div', focusedYear )

			// Otherwise just return the year focused
			return _.node( 'div', focusedYear, settings.klass.year )
		} //createYearLabel


		// Materialize modified
		createDayLabel = function() {
				if (selectedObject != null)
					return _.node( 'div', selectedObject.date)
				else return _.node( 'div', nowObject.date)
			}
		createWeekdayLabel = function() {
			var display_day;

			if (selectedObject != null)
				display_day = selectedObject.day;
			else
				display_day = nowObject.day;
			var weekday = settings.weekdaysFull[ display_day ]
			return weekday
		}


	// Create and return the entire calendar.
return _.node(
		// Date presentation View
		'div',
			_.node(
				'div',
				createWeekdayLabel(),
				"picker__weekday-display"
			)+
			_.node(
				// Div for short Month
				'div',
				createMonthLabel("short_months"),
				settings.klass.month_display
			)+
			_.node(
				// Div for Day
				'div',
				createDayLabel() ,
				settings.klass.day_display
			)+
			_.node(
				// Div for Year
				'div',
				createYearLabel("raw") ,
				settings.klass.year_display
			),
		settings.klass.date_display
	)+
	// Calendar container
	_.node('div',
		_.node('div',
		( settings.selectYears ?  createMonthLabel() + createYearLabel() : createMonthLabel() + createYearLabel() ) +
		createMonthNav() + createMonthNav( 1 ),
		settings.klass.header
	) + _.node(
		'table',
		tableHead +
		_.node(
			'tbody',
			_.group({
				min: 0,
				max: WEEKS_IN_CALENDAR - 1,
				i: 1,
				node: 'tr',
				item: function( rowCounter ) {

					// If Monday is the first day and the month starts on Sunday, shift the date back a week.
					var shiftDateBy = settings.firstDay && calendar.create([ viewsetObject.year, viewsetObject.month, 1 ]).day === 0 ? -7 : 0

					return [
						_.group({
							min: DAYS_IN_WEEK * rowCounter - viewsetObject.day + shiftDateBy + 1, // Add 1 for weekday 0index
							max: function() {
								return this.min + DAYS_IN_WEEK - 1
							},
							i: 1,
							node: 'td',
							item: function( targetDate ) {

								// Convert the time date from a relative date to a target date.
								targetDate = calendar.create([ viewsetObject.year, viewsetObject.month, targetDate + ( settings.firstDay ? 1 : 0 ) ])

								var isSelected = selectedObject && selectedObject.pick == targetDate.pick,
									isHighlighted = highlightedObject && highlightedObject.pick == targetDate.pick,
									isDisabled = disabledCollection && calendar.disabled( targetDate ) || targetDate.pick < minLimitObject.pick || targetDate.pick > maxLimitObject.pick,
									formattedDate = _.trigger( calendar.formats.toString, calendar, [ settings.format, targetDate ] )

								return [
									_.node(
										'div',
										targetDate.date,
										(function( klasses ) {

											// Add the `infocus` or `outfocus` classes based on month in view.
											klasses.push( viewsetObject.month == targetDate.month ? settings.klass.infocus : settings.klass.outfocus )

											// Add the `today` class if needed.
											if ( nowObject.pick == targetDate.pick ) {
												klasses.push( settings.klass.now )
											}

											// Add the `selected` class if something's selected and the time matches.
											if ( isSelected ) {
												klasses.push( settings.klass.selected )
											}

											// Add the `highlighted` class if something's highlighted and the time matches.
											if ( isHighlighted ) {
												klasses.push( settings.klass.highlighted )
											}

											// Add the `disabled` class if something's disabled and the object matches.
											if ( isDisabled ) {
												klasses.push( settings.klass.disabled )
											}

											return klasses.join( ' ' )
										})([ settings.klass.day ]),
										'data-pick=' + targetDate.pick + ' ' + _.ariaAttr({
											role: 'gridcell',
											label: formattedDate,
											selected: isSelected && calendar.$node.val() === formattedDate ? true : null,
											activedescendant: isHighlighted ? true : null,
											disabled: isDisabled ? true : null
										})
									),
									'',
									_.ariaAttr({ role: 'presentation' })
								] //endreturn
							}
						})
					] //endreturn
				}
			})
		),
		settings.klass.table,
		'id="' + calendar.$node[0].id + '_table' + '" ' + _.ariaAttr({
			role: 'grid',
			controls: calendar.$node[0].id,
			readonly: true
		})
	)
	, settings.klass.calendar_container) // end calendar

	 +

	// * For Firefox forms to submit, make sure to set the buttons’ `type` attributes as “button”.
	_.node(
		'div',
		_.node( 'button', settings.today, "btn-flat picker__today",
			'type=button data-pick=' + nowObject.pick +
			( isOpen && !calendar.disabled(nowObject) ? '' : ' disabled' ) + ' ' +
			_.ariaAttr({ controls: calendar.$node[0].id }) ) +
		_.node( 'button', settings.clear, "btn-flat picker__clear",
			'type=button data-clear=1' +
			( isOpen ? '' : ' disabled' ) + ' ' +
			_.ariaAttr({ controls: calendar.$node[0].id }) ) +
		_.node('button', settings.close, "btn-flat picker__close",
			'type=button data-close=true ' +
			( isOpen ? '' : ' disabled' ) + ' ' +
			_.ariaAttr({ controls: calendar.$node[0].id }) ),
		settings.klass.footer
	) //endreturn
} //DatePicker.prototype.nodes




/**
 * The date picker defaults.
 */
DatePicker.defaults = (function( prefix ) {

	return {

		// The title label to use for the month nav buttons
		labelMonthNext: 'Next month',
		labelMonthPrev: 'Previous month',

		// The title label to use for the dropdown selectors
		labelMonthSelect: 'Select a month',
		labelYearSelect: 'Select a year',

		// Months and weekdays
		monthsFull: [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ],
		monthsShort: [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ],
		weekdaysFull: [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ],
		weekdaysShort: [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' ],

		// Materialize modified
		weekdaysLetter: [ 'S', 'M', 'T', 'W', 'T', 'F', 'S' ],

		// Today and clear
		today: 'Today',
		clear: 'Clear',
		close: 'Close',

		// The format to show on the `input` element
		format: 'd mmmm, yyyy',

		// Classes
		klass: {

			table: prefix + 'table',

			header: prefix + 'header',


			// Materialize Added klasses
			date_display: prefix + 'date-display',
			day_display: prefix + 'day-display',
			month_display: prefix + 'month-display',
			year_display: prefix + 'year-display',
			calendar_container: prefix + 'calendar-container',
			// end



			navPrev: prefix + 'nav--prev',
			navNext: prefix + 'nav--next',
			navDisabled: prefix + 'nav--disabled',

			month: prefix + 'month',
			year: prefix + 'year',

			selectMonth: prefix + 'select--month',
			selectYear: prefix + 'select--year',

			weekdays: prefix + 'weekday',

			day: prefix + 'day',
			disabled: prefix + 'day--disabled',
			selected: prefix + 'day--selected',
			highlighted: prefix + 'day--highlighted',
			now: prefix + 'day--today',
			infocus: prefix + 'day--infocus',
			outfocus: prefix + 'day--outfocus',

			footer: prefix + 'footer',

			buttonClear: prefix + 'button--clear',
			buttonToday: prefix + 'button--today',
			buttonClose: prefix + 'button--close'
		}
	}
})( Picker.klasses().picker + '__' )





/**
 * Extend the picker to add the date picker.
 */
Picker.extend( 'pickadate', DatePicker )


}));


;(function ($) {

  $.fn.characterCounter = function(){
	return this.each(function(){

	  var itHasLengthAttribute = $(this).attr('length') !== undefined;

	  if(itHasLengthAttribute){
		$(this).on('input', updateCounter);
		$(this).on('focus', updateCounter);
		$(this).on('blur', removeCounterElement);

		addCounterElement($(this));
	  }

	});
  };

  function updateCounter(){
	var maxLength	 = +$(this).attr('length'),
	actualLength	  = +$(this).val().length,
	isValidLength	 = actualLength <= maxLength;

	$(this).parent().find('span[class="character-counter"]')
					.html( actualLength + '/' + maxLength);

	addInputStyle(isValidLength, $(this));
  }

  function addCounterElement($input){
	var $counterElement = $('<span/>')
						.addClass('character-counter')
						.css('float','right')
						.css('font-size','12px')
						.css('height', 1);

	$input.parent().append($counterElement);
  }

  function removeCounterElement(){
	$(this).parent().find('span[class="character-counter"]').html('');
  }

  function addInputStyle(isValidLength, $input){
	var inputHasInvalidClass = $input.hasClass('invalid');
	if (isValidLength && inputHasInvalidClass) {
	  $input.removeClass('invalid');
	}
	else if(!isValidLength && !inputHasInvalidClass){
	  $input.removeClass('valid');
	  $input.addClass('invalid');
	}
  }

  $(document).ready(function(){
	$('input, textarea').characterCounter();
  });

}( jQuery ));

/*! Hammer.JS - v2.0.4 - 2014-09-28
 * http://hammerjs.github.io/
 *
 * Copyright (c) 2014 Jorik Tangelder;
 * Licensed under the MIT license */
(function(window, document, exportName, undefined) {
  'use strict';

var VENDOR_PREFIXES = ['', 'webkit', 'moz', 'MS', 'ms', 'o'];
var TEST_ELEMENT = document.createElement('div');

var TYPE_FUNCTION = 'function';

var round = Math.round;
var abs = Math.abs;
var now = Date.now;

/**
 * set a timeout with a given scope
 * @param {Function} fn
 * @param {Number} timeout
 * @param {Object} context
 * @returns {number}
 */
function setTimeoutContext(fn, timeout, context) {
	return setTimeout(bindFn(fn, context), timeout);
}

/**
 * if the argument is an array, we want to execute the fn on each entry
 * if it aint an array we don't want to do a thing.
 * this is used by all the methods that accept a single and array argument.
 * @param {*|Array} arg
 * @param {String} fn
 * @param {Object} [context]
 * @returns {Boolean}
 */
function invokeArrayArg(arg, fn, context) {
	if (Array.isArray(arg)) {
		each(arg, context[fn], context);
		return true;
	}
	return false;
}

/**
 * walk objects and arrays
 * @param {Object} obj
 * @param {Function} iterator
 * @param {Object} context
 */
function each(obj, iterator, context) {
	var i;

	if (!obj) {
		return;
	}

	if (obj.forEach) {
		obj.forEach(iterator, context);
	} else if (obj.length !== undefined) {
		i = 0;
		while (i < obj.length) {
			iterator.call(context, obj[i], i, obj);
			i++;
		}
	} else {
		for (i in obj) {
			obj.hasOwnProperty(i) && iterator.call(context, obj[i], i, obj);
		}
	}
}

/**
 * extend object.
 * means that properties in dest will be overwritten by the ones in src.
 * @param {Object} dest
 * @param {Object} src
 * @param {Boolean} [merge]
 * @returns {Object} dest
 */
function extend(dest, src, merge) {
	var keys = Object.keys(src);
	var i = 0;
	while (i < keys.length) {
		if (!merge || (merge && dest[keys[i]] === undefined)) {
			dest[keys[i]] = src[keys[i]];
		}
		i++;
	}
	return dest;
}

/**
 * merge the values from src in the dest.
 * means that properties that exist in dest will not be overwritten by src
 * @param {Object} dest
 * @param {Object} src
 * @returns {Object} dest
 */
function merge(dest, src) {
	return extend(dest, src, true);
}

/**
 * simple class inheritance
 * @param {Function} child
 * @param {Function} base
 * @param {Object} [properties]
 */
function inherit(child, base, properties) {
	var baseP = base.prototype,
		childP;

	childP = child.prototype = Object.create(baseP);
	childP.constructor = child;
	childP._super = baseP;

	if (properties) {
		extend(childP, properties);
	}
}

/**
 * simple function bind
 * @param {Function} fn
 * @param {Object} context
 * @returns {Function}
 */
function bindFn(fn, context) {
	return function boundFn() {
		return fn.apply(context, arguments);
	};
}

/**
 * let a boolean value also be a function that must return a boolean
 * this first item in args will be used as the context
 * @param {Boolean|Function} val
 * @param {Array} [args]
 * @returns {Boolean}
 */
function boolOrFn(val, args) {
	if (typeof val == TYPE_FUNCTION) {
		return val.apply(args ? args[0] || undefined : undefined, args);
	}
	return val;
}

/**
 * use the val2 when val1 is undefined
 * @param {*} val1
 * @param {*} val2
 * @returns {*}
 */
function ifUndefined(val1, val2) {
	return (val1 === undefined) ? val2 : val1;
}

/**
 * addEventListener with multiple events at once
 * @param {EventTarget} target
 * @param {String} types
 * @param {Function} handler
 */
function addEventListeners(target, types, handler) {
	each(splitStr(types), function(type) {
		target.addEventListener(type, handler, false);
	});
}

/**
 * removeEventListener with multiple events at once
 * @param {EventTarget} target
 * @param {String} types
 * @param {Function} handler
 */
function removeEventListeners(target, types, handler) {
	each(splitStr(types), function(type) {
		target.removeEventListener(type, handler, false);
	});
}

/**
 * find if a node is in the given parent
 * @method hasParent
 * @param {HTMLElement} node
 * @param {HTMLElement} parent
 * @return {Boolean} found
 */
function hasParent(node, parent) {
	while (node) {
		if (node == parent) {
			return true;
		}
		node = node.parentNode;
	}
	return false;
}

/**
 * small indexOf wrapper
 * @param {String} str
 * @param {String} find
 * @returns {Boolean} found
 */
function inStr(str, find) {
	return str.indexOf(find) > -1;
}

/**
 * split string on whitespace
 * @param {String} str
 * @returns {Array} words
 */
function splitStr(str) {
	return str.trim().split(/\s+/g);
}

/**
 * find if a array contains the object using indexOf or a simple polyFill
 * @param {Array} src
 * @param {String} find
 * @param {String} [findByKey]
 * @return {Boolean|Number} false when not found, or the index
 */
function inArray(src, find, findByKey) {
	if (src.indexOf && !findByKey) {
		return src.indexOf(find);
	} else {
		var i = 0;
		while (i < src.length) {
			if ((findByKey && src[i][findByKey] == find) || (!findByKey && src[i] === find)) {
				return i;
			}
			i++;
		}
		return -1;
	}
}

/**
 * convert array-like objects to real arrays
 * @param {Object} obj
 * @returns {Array}
 */
function toArray(obj) {
	return Array.prototype.slice.call(obj, 0);
}

/**
 * unique array with objects based on a key (like 'id') or just by the array's value
 * @param {Array} src [{id:1},{id:2},{id:1}]
 * @param {String} [key]
 * @param {Boolean} [sort=False]
 * @returns {Array} [{id:1},{id:2}]
 */
function uniqueArray(src, key, sort) {
	var results = [];
	var values = [];
	var i = 0;

	while (i < src.length) {
		var val = key ? src[i][key] : src[i];
		if (inArray(values, val) < 0) {
			results.push(src[i]);
		}
		values[i] = val;
		i++;
	}

	if (sort) {
		if (!key) {
			results = results.sort();
		} else {
			results = results.sort(function sortUniqueArray(a, b) {
				return a[key] > b[key];
			});
		}
	}

	return results;
}

/**
 * get the prefixed property
 * @param {Object} obj
 * @param {String} property
 * @returns {String|Undefined} prefixed
 */
function prefixed(obj, property) {
	var prefix, prop;
	var camelProp = property[0].toUpperCase() + property.slice(1);

	var i = 0;
	while (i < VENDOR_PREFIXES.length) {
		prefix = VENDOR_PREFIXES[i];
		prop = (prefix) ? prefix + camelProp : property;

		if (prop in obj) {
			return prop;
		}
		i++;
	}
	return undefined;
}

/**
 * get a unique id
 * @returns {number} uniqueId
 */
var _uniqueId = 1;
function uniqueId() {
	return _uniqueId++;
}

/**
 * get the window object of an element
 * @param {HTMLElement} element
 * @returns {DocumentView|Window}
 */
function getWindowForElement(element) {
	var doc = element.ownerDocument;
	return (doc.defaultView || doc.parentWindow);
}

var MOBILE_REGEX = /mobile|tablet|ip(ad|hone|od)|android/i;

var SUPPORT_TOUCH = ('ontouchstart' in window);
var SUPPORT_POINTER_EVENTS = prefixed(window, 'PointerEvent') !== undefined;
var SUPPORT_ONLY_TOUCH = SUPPORT_TOUCH && MOBILE_REGEX.test(navigator.userAgent);

var INPUT_TYPE_TOUCH = 'touch';
var INPUT_TYPE_PEN = 'pen';
var INPUT_TYPE_MOUSE = 'mouse';
var INPUT_TYPE_KINECT = 'kinect';

var COMPUTE_INTERVAL = 25;

var INPUT_START = 1;
var INPUT_MOVE = 2;
var INPUT_END = 4;
var INPUT_CANCEL = 8;

var DIRECTION_NONE = 1;
var DIRECTION_LEFT = 2;
var DIRECTION_RIGHT = 4;
var DIRECTION_UP = 8;
var DIRECTION_DOWN = 16;

var DIRECTION_HORIZONTAL = DIRECTION_LEFT | DIRECTION_RIGHT;
var DIRECTION_VERTICAL = DIRECTION_UP | DIRECTION_DOWN;
var DIRECTION_ALL = DIRECTION_HORIZONTAL | DIRECTION_VERTICAL;

var PROPS_XY = ['x', 'y'];
var PROPS_CLIENT_XY = ['clientX', 'clientY'];

/**
 * create new input type manager
 * @param {Manager} manager
 * @param {Function} callback
 * @returns {Input}
 * @constructor
 */
function Input(manager, callback) {
	var self = this;
	this.manager = manager;
	this.callback = callback;
	this.element = manager.element;
	this.target = manager.options.inputTarget;

	// smaller wrapper around the handler, for the scope and the enabled state of the manager,
	// so when disabled the input events are completely bypassed.
	this.domHandler = function(ev) {
		if (boolOrFn(manager.options.enable, [manager])) {
			self.handler(ev);
		}
	};

	this.init();

}

Input.prototype = {
	/**
	 * should handle the inputEvent data and trigger the callback
	 * @virtual
	 */
	handler: function() { },

	/**
	 * bind the events
	 */
	init: function() {
		this.evEl && addEventListeners(this.element, this.evEl, this.domHandler);
		this.evTarget && addEventListeners(this.target, this.evTarget, this.domHandler);
		this.evWin && addEventListeners(getWindowForElement(this.element), this.evWin, this.domHandler);
	},

	/**
	 * unbind the events
	 */
	destroy: function() {
		this.evEl && removeEventListeners(this.element, this.evEl, this.domHandler);
		this.evTarget && removeEventListeners(this.target, this.evTarget, this.domHandler);
		this.evWin && removeEventListeners(getWindowForElement(this.element), this.evWin, this.domHandler);
	}
};

/**
 * create new input type manager
 * called by the Manager constructor
 * @param {Hammer} manager
 * @returns {Input}
 */
function createInputInstance(manager) {
	var Type;
	var inputClass = manager.options.inputClass;

	if (inputClass) {
		Type = inputClass;
	} else if (SUPPORT_POINTER_EVENTS) {
		Type = PointerEventInput;
	} else if (SUPPORT_ONLY_TOUCH) {
		Type = TouchInput;
	} else if (!SUPPORT_TOUCH) {
		Type = MouseInput;
	} else {
		Type = TouchMouseInput;
	}
	return new (Type)(manager, inputHandler);
}

/**
 * handle input events
 * @param {Manager} manager
 * @param {String} eventType
 * @param {Object} input
 */
function inputHandler(manager, eventType, input) {
	var pointersLen = input.pointers.length;
	var changedPointersLen = input.changedPointers.length;
	var isFirst = (eventType & INPUT_START && (pointersLen - changedPointersLen === 0));
	var isFinal = (eventType & (INPUT_END | INPUT_CANCEL) && (pointersLen - changedPointersLen === 0));

	input.isFirst = !!isFirst;
	input.isFinal = !!isFinal;

	if (isFirst) {
		manager.session = {};
	}

	// source event is the normalized value of the domEvents
	// like 'touchstart, mouseup, pointerdown'
	input.eventType = eventType;

	// compute scale, rotation etc
	computeInputData(manager, input);

	// emit secret event
	manager.emit('hammer.input', input);

	manager.recognize(input);
	manager.session.prevInput = input;
}

/**
 * extend the data with some usable properties like scale, rotate, velocity etc
 * @param {Object} manager
 * @param {Object} input
 */
function computeInputData(manager, input) {
	var session = manager.session;
	var pointers = input.pointers;
	var pointersLength = pointers.length;

	// store the first input to calculate the distance and direction
	if (!session.firstInput) {
		session.firstInput = simpleCloneInputData(input);
	}

	// to compute scale and rotation we need to store the multiple touches
	if (pointersLength > 1 && !session.firstMultiple) {
		session.firstMultiple = simpleCloneInputData(input);
	} else if (pointersLength === 1) {
		session.firstMultiple = false;
	}

	var firstInput = session.firstInput;
	var firstMultiple = session.firstMultiple;
	var offsetCenter = firstMultiple ? firstMultiple.center : firstInput.center;

	var center = input.center = getCenter(pointers);
	input.timeStamp = now();
	input.deltaTime = input.timeStamp - firstInput.timeStamp;

	input.angle = getAngle(offsetCenter, center);
	input.distance = getDistance(offsetCenter, center);

	computeDeltaXY(session, input);
	input.offsetDirection = getDirection(input.deltaX, input.deltaY);

	input.scale = firstMultiple ? getScale(firstMultiple.pointers, pointers) : 1;
	input.rotation = firstMultiple ? getRotation(firstMultiple.pointers, pointers) : 0;

	computeIntervalInputData(session, input);

	// find the correct target
	var target = manager.element;
	if (hasParent(input.srcEvent.target, target)) {
		target = input.srcEvent.target;
	}
	input.target = target;
}

function computeDeltaXY(session, input) {
	var center = input.center;
	var offset = session.offsetDelta || {};
	var prevDelta = session.prevDelta || {};
	var prevInput = session.prevInput || {};

	if (input.eventType === INPUT_START || prevInput.eventType === INPUT_END) {
		prevDelta = session.prevDelta = {
			x: prevInput.deltaX || 0,
			y: prevInput.deltaY || 0
		};

		offset = session.offsetDelta = {
			x: center.x,
			y: center.y
		};
	}

	input.deltaX = prevDelta.x + (center.x - offset.x);
	input.deltaY = prevDelta.y + (center.y - offset.y);
}

/**
 * velocity is calculated every x ms
 * @param {Object} session
 * @param {Object} input
 */
function computeIntervalInputData(session, input) {
	var last = session.lastInterval || input,
		deltaTime = input.timeStamp - last.timeStamp,
		velocity, velocityX, velocityY, direction;

	if (input.eventType != INPUT_CANCEL && (deltaTime > COMPUTE_INTERVAL || last.velocity === undefined)) {
		var deltaX = last.deltaX - input.deltaX;
		var deltaY = last.deltaY - input.deltaY;

		var v = getVelocity(deltaTime, deltaX, deltaY);
		velocityX = v.x;
		velocityY = v.y;
		velocity = (abs(v.x) > abs(v.y)) ? v.x : v.y;
		direction = getDirection(deltaX, deltaY);

		session.lastInterval = input;
	} else {
		// use latest velocity info if it doesn't overtake a minimum period
		velocity = last.velocity;
		velocityX = last.velocityX;
		velocityY = last.velocityY;
		direction = last.direction;
	}

	input.velocity = velocity;
	input.velocityX = velocityX;
	input.velocityY = velocityY;
	input.direction = direction;
}

/**
 * create a simple clone from the input used for storage of firstInput and firstMultiple
 * @param {Object} input
 * @returns {Object} clonedInputData
 */
function simpleCloneInputData(input) {
	// make a simple copy of the pointers because we will get a reference if we don't
	// we only need clientXY for the calculations
	var pointers = [];
	var i = 0;
	while (i < input.pointers.length) {
		pointers[i] = {
			clientX: round(input.pointers[i].clientX),
			clientY: round(input.pointers[i].clientY)
		};
		i++;
	}

	return {
		timeStamp: now(),
		pointers: pointers,
		center: getCenter(pointers),
		deltaX: input.deltaX,
		deltaY: input.deltaY
	};
}

/**
 * get the center of all the pointers
 * @param {Array} pointers
 * @return {Object} center contains `x` and `y` properties
 */
function getCenter(pointers) {
	var pointersLength = pointers.length;

	// no need to loop when only one touch
	if (pointersLength === 1) {
		return {
			x: round(pointers[0].clientX),
			y: round(pointers[0].clientY)
		};
	}

	var x = 0, y = 0, i = 0;
	while (i < pointersLength) {
		x += pointers[i].clientX;
		y += pointers[i].clientY;
		i++;
	}

	return {
		x: round(x / pointersLength),
		y: round(y / pointersLength)
	};
}

/**
 * calculate the velocity between two points. unit is in px per ms.
 * @param {Number} deltaTime
 * @param {Number} x
 * @param {Number} y
 * @return {Object} velocity `x` and `y`
 */
function getVelocity(deltaTime, x, y) {
	return {
		x: x / deltaTime || 0,
		y: y / deltaTime || 0
	};
}

/**
 * get the direction between two points
 * @param {Number} x
 * @param {Number} y
 * @return {Number} direction
 */
function getDirection(x, y) {
	if (x === y) {
		return DIRECTION_NONE;
	}

	if (abs(x) >= abs(y)) {
		return x > 0 ? DIRECTION_LEFT : DIRECTION_RIGHT;
	}
	return y > 0 ? DIRECTION_UP : DIRECTION_DOWN;
}

/**
 * calculate the absolute distance between two points
 * @param {Object} p1 {x, y}
 * @param {Object} p2 {x, y}
 * @param {Array} [props] containing x and y keys
 * @return {Number} distance
 */
function getDistance(p1, p2, props) {
	if (!props) {
		props = PROPS_XY;
	}
	var x = p2[props[0]] - p1[props[0]],
		y = p2[props[1]] - p1[props[1]];

	return Math.sqrt((x * x) + (y * y));
}

/**
 * calculate the angle between two coordinates
 * @param {Object} p1
 * @param {Object} p2
 * @param {Array} [props] containing x and y keys
 * @return {Number} angle
 */
function getAngle(p1, p2, props) {
	if (!props) {
		props = PROPS_XY;
	}
	var x = p2[props[0]] - p1[props[0]],
		y = p2[props[1]] - p1[props[1]];
	return Math.atan2(y, x) * 180 / Math.PI;
}

/**
 * calculate the rotation degrees between two pointersets
 * @param {Array} start array of pointers
 * @param {Array} end array of pointers
 * @return {Number} rotation
 */
function getRotation(start, end) {
	return getAngle(end[1], end[0], PROPS_CLIENT_XY) - getAngle(start[1], start[0], PROPS_CLIENT_XY);
}

/**
 * calculate the scale factor between two pointersets
 * no scale is 1, and goes down to 0 when pinched together, and bigger when pinched out
 * @param {Array} start array of pointers
 * @param {Array} end array of pointers
 * @return {Number} scale
 */
function getScale(start, end) {
	return getDistance(end[0], end[1], PROPS_CLIENT_XY) / getDistance(start[0], start[1], PROPS_CLIENT_XY);
}

var MOUSE_INPUT_MAP = {
	mousedown: INPUT_START,
	mousemove: INPUT_MOVE,
	mouseup: INPUT_END
};

var MOUSE_ELEMENT_EVENTS = 'mousedown';
var MOUSE_WINDOW_EVENTS = 'mousemove mouseup';

/**
 * Mouse events input
 * @constructor
 * @extends Input
 */
function MouseInput() {
	this.evEl = MOUSE_ELEMENT_EVENTS;
	this.evWin = MOUSE_WINDOW_EVENTS;

	this.allow = true; // used by Input.TouchMouse to disable mouse events
	this.pressed = false; // mousedown state

	Input.apply(this, arguments);
}

inherit(MouseInput, Input, {
	/**
	 * handle mouse events
	 * @param {Object} ev
	 */
	handler: function MEhandler(ev) {
		var eventType = MOUSE_INPUT_MAP[ev.type];

		// on start we want to have the left mouse button down
		if (eventType & INPUT_START && ev.button === 0) {
			this.pressed = true;
		}

		if (eventType & INPUT_MOVE && ev.which !== 1) {
			eventType = INPUT_END;
		}

		// mouse must be down, and mouse events are allowed (see the TouchMouse input)
		if (!this.pressed || !this.allow) {
			return;
		}

		if (eventType & INPUT_END) {
			this.pressed = false;
		}

		this.callback(this.manager, eventType, {
			pointers: [ev],
			changedPointers: [ev],
			pointerType: INPUT_TYPE_MOUSE,
			srcEvent: ev
		});
	}
});

var POINTER_INPUT_MAP = {
	pointerdown: INPUT_START,
	pointermove: INPUT_MOVE,
	pointerup: INPUT_END,
	pointercancel: INPUT_CANCEL,
	pointerout: INPUT_CANCEL
};

// in IE10 the pointer types is defined as an enum
var IE10_POINTER_TYPE_ENUM = {
	2: INPUT_TYPE_TOUCH,
	3: INPUT_TYPE_PEN,
	4: INPUT_TYPE_MOUSE,
	5: INPUT_TYPE_KINECT // see https://twitter.com/jacobrossi/status/480596438489890816
};

var POINTER_ELEMENT_EVENTS = 'pointerdown';
var POINTER_WINDOW_EVENTS = 'pointermove pointerup pointercancel';

// IE10 has prefixed support, and case-sensitive
if (window.MSPointerEvent) {
	POINTER_ELEMENT_EVENTS = 'MSPointerDown';
	POINTER_WINDOW_EVENTS = 'MSPointerMove MSPointerUp MSPointerCancel';
}

/**
 * Pointer events input
 * @constructor
 * @extends Input
 */
function PointerEventInput() {
	this.evEl = POINTER_ELEMENT_EVENTS;
	this.evWin = POINTER_WINDOW_EVENTS;

	Input.apply(this, arguments);

	this.store = (this.manager.session.pointerEvents = []);
}

inherit(PointerEventInput, Input, {
	/**
	 * handle mouse events
	 * @param {Object} ev
	 */
	handler: function PEhandler(ev) {
		var store = this.store;
		var removePointer = false;

		var eventTypeNormalized = ev.type.toLowerCase().replace('ms', '');
		var eventType = POINTER_INPUT_MAP[eventTypeNormalized];
		var pointerType = IE10_POINTER_TYPE_ENUM[ev.pointerType] || ev.pointerType;

		var isTouch = (pointerType == INPUT_TYPE_TOUCH);

		// get index of the event in the store
		var storeIndex = inArray(store, ev.pointerId, 'pointerId');

		// start and mouse must be down
		if (eventType & INPUT_START && (ev.button === 0 || isTouch)) {
			if (storeIndex < 0) {
				store.push(ev);
				storeIndex = store.length - 1;
			}
		} else if (eventType & (INPUT_END | INPUT_CANCEL)) {
			removePointer = true;
		}

		// it not found, so the pointer hasn't been down (so it's probably a hover)
		if (storeIndex < 0) {
			return;
		}

		// update the event in the store
		store[storeIndex] = ev;

		this.callback(this.manager, eventType, {
			pointers: store,
			changedPointers: [ev],
			pointerType: pointerType,
			srcEvent: ev
		});

		if (removePointer) {
			// remove from the store
			store.splice(storeIndex, 1);
		}
	}
});

var SINGLE_TOUCH_INPUT_MAP = {
	touchstart: INPUT_START,
	touchmove: INPUT_MOVE,
	touchend: INPUT_END,
	touchcancel: INPUT_CANCEL
};

var SINGLE_TOUCH_TARGET_EVENTS = 'touchstart';
var SINGLE_TOUCH_WINDOW_EVENTS = 'touchstart touchmove touchend touchcancel';

/**
 * Touch events input
 * @constructor
 * @extends Input
 */
function SingleTouchInput() {
	this.evTarget = SINGLE_TOUCH_TARGET_EVENTS;
	this.evWin = SINGLE_TOUCH_WINDOW_EVENTS;
	this.started = false;

	Input.apply(this, arguments);
}

inherit(SingleTouchInput, Input, {
	handler: function TEhandler(ev) {
		var type = SINGLE_TOUCH_INPUT_MAP[ev.type];

		// should we handle the touch events?
		if (type === INPUT_START) {
			this.started = true;
		}

		if (!this.started) {
			return;
		}

		var touches = normalizeSingleTouches.call(this, ev, type);

		// when done, reset the started state
		if (type & (INPUT_END | INPUT_CANCEL) && touches[0].length - touches[1].length === 0) {
			this.started = false;
		}

		this.callback(this.manager, type, {
			pointers: touches[0],
			changedPointers: touches[1],
			pointerType: INPUT_TYPE_TOUCH,
			srcEvent: ev
		});
	}
});

/**
 * @this {TouchInput}
 * @param {Object} ev
 * @param {Number} type flag
 * @returns {undefined|Array} [all, changed]
 */
function normalizeSingleTouches(ev, type) {
	var all = toArray(ev.touches);
	var changed = toArray(ev.changedTouches);

	if (type & (INPUT_END | INPUT_CANCEL)) {
		all = uniqueArray(all.concat(changed), 'identifier', true);
	}

	return [all, changed];
}

var TOUCH_INPUT_MAP = {
	touchstart: INPUT_START,
	touchmove: INPUT_MOVE,
	touchend: INPUT_END,
	touchcancel: INPUT_CANCEL
};

var TOUCH_TARGET_EVENTS = 'touchstart touchmove touchend touchcancel';

/**
 * Multi-user touch events input
 * @constructor
 * @extends Input
 */
function TouchInput() {
	this.evTarget = TOUCH_TARGET_EVENTS;
	this.targetIds = {};

	Input.apply(this, arguments);
}

inherit(TouchInput, Input, {
	handler: function MTEhandler(ev) {
		var type = TOUCH_INPUT_MAP[ev.type];
		var touches = getTouches.call(this, ev, type);
		if (!touches) {
			return;
		}

		this.callback(this.manager, type, {
			pointers: touches[0],
			changedPointers: touches[1],
			pointerType: INPUT_TYPE_TOUCH,
			srcEvent: ev
		});
	}
});

/**
 * @this {TouchInput}
 * @param {Object} ev
 * @param {Number} type flag
 * @returns {undefined|Array} [all, changed]
 */
function getTouches(ev, type) {
	var allTouches = toArray(ev.touches);
	var targetIds = this.targetIds;

	// when there is only one touch, the process can be simplified
	if (type & (INPUT_START | INPUT_MOVE) && allTouches.length === 1) {
		targetIds[allTouches[0].identifier] = true;
		return [allTouches, allTouches];
	}

	var i,
		targetTouches,
		changedTouches = toArray(ev.changedTouches),
		changedTargetTouches = [],
		target = this.target;

	// get target touches from touches
	targetTouches = allTouches.filter(function(touch) {
		return hasParent(touch.target, target);
	});

	// collect touches
	if (type === INPUT_START) {
		i = 0;
		while (i < targetTouches.length) {
			targetIds[targetTouches[i].identifier] = true;
			i++;
		}
	}

	// filter changed touches to only contain touches that exist in the collected target ids
	i = 0;
	while (i < changedTouches.length) {
		if (targetIds[changedTouches[i].identifier]) {
			changedTargetTouches.push(changedTouches[i]);
		}

		// cleanup removed touches
		if (type & (INPUT_END | INPUT_CANCEL)) {
			delete targetIds[changedTouches[i].identifier];
		}
		i++;
	}

	if (!changedTargetTouches.length) {
		return;
	}

	return [
		// merge targetTouches with changedTargetTouches so it contains ALL touches, including 'end' and 'cancel'
		uniqueArray(targetTouches.concat(changedTargetTouches), 'identifier', true),
		changedTargetTouches
	];
}

/**
 * Combined touch and mouse input
 *
 * Touch has a higher priority then mouse, and while touching no mouse events are allowed.
 * This because touch devices also emit mouse events while doing a touch.
 *
 * @constructor
 * @extends Input
 */
function TouchMouseInput() {
	Input.apply(this, arguments);

	var handler = bindFn(this.handler, this);
	this.touch = new TouchInput(this.manager, handler);
	this.mouse = new MouseInput(this.manager, handler);
}

inherit(TouchMouseInput, Input, {
	/**
	 * handle mouse and touch events
	 * @param {Hammer} manager
	 * @param {String} inputEvent
	 * @param {Object} inputData
	 */
	handler: function TMEhandler(manager, inputEvent, inputData) {
		var isTouch = (inputData.pointerType == INPUT_TYPE_TOUCH),
			isMouse = (inputData.pointerType == INPUT_TYPE_MOUSE);

		// when we're in a touch event, so  block all upcoming mouse events
		// most mobile browser also emit mouseevents, right after touchstart
		if (isTouch) {
			this.mouse.allow = false;
		} else if (isMouse && !this.mouse.allow) {
			return;
		}

		// reset the allowMouse when we're done
		if (inputEvent & (INPUT_END | INPUT_CANCEL)) {
			this.mouse.allow = true;
		}

		this.callback(manager, inputEvent, inputData);
	},

	/**
	 * remove the event listeners
	 */
	destroy: function destroy() {
		this.touch.destroy();
		this.mouse.destroy();
	}
});

var PREFIXED_TOUCH_ACTION = prefixed(TEST_ELEMENT.style, 'touchAction');
var NATIVE_TOUCH_ACTION = PREFIXED_TOUCH_ACTION !== undefined;

// magical touchAction value
var TOUCH_ACTION_COMPUTE = 'compute';
var TOUCH_ACTION_AUTO = 'auto';
var TOUCH_ACTION_MANIPULATION = 'manipulation'; // not implemented
var TOUCH_ACTION_NONE = 'none';
var TOUCH_ACTION_PAN_X = 'pan-x';
var TOUCH_ACTION_PAN_Y = 'pan-y';

/**
 * Touch Action
 * sets the touchAction property or uses the js alternative
 * @param {Manager} manager
 * @param {String} value
 * @constructor
 */
function TouchAction(manager, value) {
	this.manager = manager;
	this.set(value);
}

TouchAction.prototype = {
	/**
	 * set the touchAction value on the element or enable the polyfill
	 * @param {String} value
	 */
	set: function(value) {
		// find out the touch-action by the event handlers
		if (value == TOUCH_ACTION_COMPUTE) {
			value = this.compute();
		}

		if (NATIVE_TOUCH_ACTION) {
			this.manager.element.style[PREFIXED_TOUCH_ACTION] = value;
		}
		this.actions = value.toLowerCase().trim();
	},

	/**
	 * just re-set the touchAction value
	 */
	update: function() {
		this.set(this.manager.options.touchAction);
	},

	/**
	 * compute the value for the touchAction property based on the recognizer's settings
	 * @returns {String} value
	 */
	compute: function() {
		var actions = [];
		each(this.manager.recognizers, function(recognizer) {
			if (boolOrFn(recognizer.options.enable, [recognizer])) {
				actions = actions.concat(recognizer.getTouchAction());
			}
		});
		return cleanTouchActions(actions.join(' '));
	},

	/**
	 * this method is called on each input cycle and provides the preventing of the browser behavior
	 * @param {Object} input
	 */
	preventDefaults: function(input) {
		// not needed with native support for the touchAction property
		if (NATIVE_TOUCH_ACTION) {
			return;
		}

		var srcEvent = input.srcEvent;
		var direction = input.offsetDirection;

		// if the touch action did prevented once this session
		if (this.manager.session.prevented) {
			srcEvent.preventDefault();
			return;
		}

		var actions = this.actions;
		var hasNone = inStr(actions, TOUCH_ACTION_NONE);
		var hasPanY = inStr(actions, TOUCH_ACTION_PAN_Y);
		var hasPanX = inStr(actions, TOUCH_ACTION_PAN_X);

		if (hasNone ||
			(hasPanY && direction & DIRECTION_HORIZONTAL) ||
			(hasPanX && direction & DIRECTION_VERTICAL)) {
			return this.preventSrc(srcEvent);
		}
	},

	/**
	 * call preventDefault to prevent the browser's default behavior (scrolling in most cases)
	 * @param {Object} srcEvent
	 */
	preventSrc: function(srcEvent) {
		this.manager.session.prevented = true;
		srcEvent.preventDefault();
	}
};

/**
 * when the touchActions are collected they are not a valid value, so we need to clean things up. *
 * @param {String} actions
 * @returns {*}
 */
function cleanTouchActions(actions) {
	// none
	if (inStr(actions, TOUCH_ACTION_NONE)) {
		return TOUCH_ACTION_NONE;
	}

	var hasPanX = inStr(actions, TOUCH_ACTION_PAN_X);
	var hasPanY = inStr(actions, TOUCH_ACTION_PAN_Y);

	// pan-x and pan-y can be combined
	if (hasPanX && hasPanY) {
		return TOUCH_ACTION_PAN_X + ' ' + TOUCH_ACTION_PAN_Y;
	}

	// pan-x OR pan-y
	if (hasPanX || hasPanY) {
		return hasPanX ? TOUCH_ACTION_PAN_X : TOUCH_ACTION_PAN_Y;
	}

	// manipulation
	if (inStr(actions, TOUCH_ACTION_MANIPULATION)) {
		return TOUCH_ACTION_MANIPULATION;
	}

	return TOUCH_ACTION_AUTO;
}

/**
 * Recognizer flow explained; *
 * All recognizers have the initial state of POSSIBLE when a input session starts.
 * The definition of a input session is from the first input until the last input, with all it's movement in it. *
 * Example session for mouse-input: mousedown -> mousemove -> mouseup
 *
 * On each recognizing cycle (see Manager.recognize) the .recognize() method is executed
 * which determines with state it should be.
 *
 * If the recognizer has the state FAILED, CANCELLED or RECOGNIZED (equals ENDED), it is reset to
 * POSSIBLE to give it another change on the next cycle.
 *
 *			   Possible
 *				  |
 *			+-----+---------------+
 *			|					 |
 *	  +-----+-----+			   |
 *	  |		   |			   |
 *   Failed	  Cancelled		  |
 *						  +-------+------+
 *						  |			  |
 *					  Recognized	   Began
 *										 |
 *									  Changed
 *										 |
 *								  Ended/Recognized
 */
var STATE_POSSIBLE = 1;
var STATE_BEGAN = 2;
var STATE_CHANGED = 4;
var STATE_ENDED = 8;
var STATE_RECOGNIZED = STATE_ENDED;
var STATE_CANCELLED = 16;
var STATE_FAILED = 32;

/**
 * Recognizer
 * Every recognizer needs to extend from this class.
 * @constructor
 * @param {Object} options
 */
function Recognizer(options) {
	this.id = uniqueId();

	this.manager = null;
	this.options = merge(options || {}, this.defaults);

	// default is enable true
	this.options.enable = ifUndefined(this.options.enable, true);

	this.state = STATE_POSSIBLE;

	this.simultaneous = {};
	this.requireFail = [];
}

Recognizer.prototype = {
	/**
	 * @virtual
	 * @type {Object}
	 */
	defaults: {},

	/**
	 * set options
	 * @param {Object} options
	 * @return {Recognizer}
	 */
	set: function(options) {
		extend(this.options, options);

		// also update the touchAction, in case something changed about the directions/enabled state
		this.manager && this.manager.touchAction.update();
		return this;
	},

	/**
	 * recognize simultaneous with an other recognizer.
	 * @param {Recognizer} otherRecognizer
	 * @returns {Recognizer} this
	 */
	recognizeWith: function(otherRecognizer) {
		if (invokeArrayArg(otherRecognizer, 'recognizeWith', this)) {
			return this;
		}

		var simultaneous = this.simultaneous;
		otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
		if (!simultaneous[otherRecognizer.id]) {
			simultaneous[otherRecognizer.id] = otherRecognizer;
			otherRecognizer.recognizeWith(this);
		}
		return this;
	},

	/**
	 * drop the simultaneous link. it doesnt remove the link on the other recognizer.
	 * @param {Recognizer} otherRecognizer
	 * @returns {Recognizer} this
	 */
	dropRecognizeWith: function(otherRecognizer) {
		if (invokeArrayArg(otherRecognizer, 'dropRecognizeWith', this)) {
			return this;
		}

		otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
		delete this.simultaneous[otherRecognizer.id];
		return this;
	},

	/**
	 * recognizer can only run when an other is failing
	 * @param {Recognizer} otherRecognizer
	 * @returns {Recognizer} this
	 */
	requireFailure: function(otherRecognizer) {
		if (invokeArrayArg(otherRecognizer, 'requireFailure', this)) {
			return this;
		}

		var requireFail = this.requireFail;
		otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
		if (inArray(requireFail, otherRecognizer) === -1) {
			requireFail.push(otherRecognizer);
			otherRecognizer.requireFailure(this);
		}
		return this;
	},

	/**
	 * drop the requireFailure link. it does not remove the link on the other recognizer.
	 * @param {Recognizer} otherRecognizer
	 * @returns {Recognizer} this
	 */
	dropRequireFailure: function(otherRecognizer) {
		if (invokeArrayArg(otherRecognizer, 'dropRequireFailure', this)) {
			return this;
		}

		otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
		var index = inArray(this.requireFail, otherRecognizer);
		if (index > -1) {
			this.requireFail.splice(index, 1);
		}
		return this;
	},

	/**
	 * has require failures boolean
	 * @returns {boolean}
	 */
	hasRequireFailures: function() {
		return this.requireFail.length > 0;
	},

	/**
	 * if the recognizer can recognize simultaneous with an other recognizer
	 * @param {Recognizer} otherRecognizer
	 * @returns {Boolean}
	 */
	canRecognizeWith: function(otherRecognizer) {
		return !!this.simultaneous[otherRecognizer.id];
	},

	/**
	 * You should use `tryEmit` instead of `emit` directly to check
	 * that all the needed recognizers has failed before emitting.
	 * @param {Object} input
	 */
	emit: function(input) {
		var self = this;
		var state = this.state;

		function emit(withState) {
			self.manager.emit(self.options.event + (withState ? stateStr(state) : ''), input);
		}

		// 'panstart' and 'panmove'
		if (state < STATE_ENDED) {
			emit(true);
		}

		emit(); // simple 'eventName' events

		// panend and pancancel
		if (state >= STATE_ENDED) {
			emit(true);
		}
	},

	/**
	 * Check that all the require failure recognizers has failed,
	 * if true, it emits a gesture event,
	 * otherwise, setup the state to FAILED.
	 * @param {Object} input
	 */
	tryEmit: function(input) {
		if (this.canEmit()) {
			return this.emit(input);
		}
		// it's failing anyway
		this.state = STATE_FAILED;
	},

	/**
	 * can we emit?
	 * @returns {boolean}
	 */
	canEmit: function() {
		var i = 0;
		while (i < this.requireFail.length) {
			if (!(this.requireFail[i].state & (STATE_FAILED | STATE_POSSIBLE))) {
				return false;
			}
			i++;
		}
		return true;
	},

	/**
	 * update the recognizer
	 * @param {Object} inputData
	 */
	recognize: function(inputData) {
		// make a new copy of the inputData
		// so we can change the inputData without messing up the other recognizers
		var inputDataClone = extend({}, inputData);

		// is is enabled and allow recognizing?
		if (!boolOrFn(this.options.enable, [this, inputDataClone])) {
			this.reset();
			this.state = STATE_FAILED;
			return;
		}

		// reset when we've reached the end
		if (this.state & (STATE_RECOGNIZED | STATE_CANCELLED | STATE_FAILED)) {
			this.state = STATE_POSSIBLE;
		}

		this.state = this.process(inputDataClone);

		// the recognizer has recognized a gesture
		// so trigger an event
		if (this.state & (STATE_BEGAN | STATE_CHANGED | STATE_ENDED | STATE_CANCELLED)) {
			this.tryEmit(inputDataClone);
		}
	},

	/**
	 * return the state of the recognizer
	 * the actual recognizing happens in this method
	 * @virtual
	 * @param {Object} inputData
	 * @returns {Const} STATE
	 */
	process: function(inputData) { }, // jshint ignore:line

	/**
	 * return the preferred touch-action
	 * @virtual
	 * @returns {Array}
	 */
	getTouchAction: function() { },

	/**
	 * called when the gesture isn't allowed to recognize
	 * like when another is being recognized or it is disabled
	 * @virtual
	 */
	reset: function() { }
};

/**
 * get a usable string, used as event postfix
 * @param {Const} state
 * @returns {String} state
 */
function stateStr(state) {
	if (state & STATE_CANCELLED) {
		return 'cancel';
	} else if (state & STATE_ENDED) {
		return 'end';
	} else if (state & STATE_CHANGED) {
		return 'move';
	} else if (state & STATE_BEGAN) {
		return 'start';
	}
	return '';
}

/**
 * direction cons to string
 * @param {Const} direction
 * @returns {String}
 */
function directionStr(direction) {
	if (direction == DIRECTION_DOWN) {
		return 'down';
	} else if (direction == DIRECTION_UP) {
		return 'up';
	} else if (direction == DIRECTION_LEFT) {
		return 'left';
	} else if (direction == DIRECTION_RIGHT) {
		return 'right';
	}
	return '';
}

/**
 * get a recognizer by name if it is bound to a manager
 * @param {Recognizer|String} otherRecognizer
 * @param {Recognizer} recognizer
 * @returns {Recognizer}
 */
function getRecognizerByNameIfManager(otherRecognizer, recognizer) {
	var manager = recognizer.manager;
	if (manager) {
		return manager.get(otherRecognizer);
	}
	return otherRecognizer;
}

/**
 * This recognizer is just used as a base for the simple attribute recognizers.
 * @constructor
 * @extends Recognizer
 */
function AttrRecognizer() {
	Recognizer.apply(this, arguments);
}

inherit(AttrRecognizer, Recognizer, {
	/**
	 * @namespace
	 * @memberof AttrRecognizer
	 */
	defaults: {
		/**
		 * @type {Number}
		 * @default 1
		 */
		pointers: 1
	},

	/**
	 * Used to check if it the recognizer receives valid input, like input.distance > 10.
	 * @memberof AttrRecognizer
	 * @param {Object} input
	 * @returns {Boolean} recognized
	 */
	attrTest: function(input) {
		var optionPointers = this.options.pointers;
		return optionPointers === 0 || input.pointers.length === optionPointers;
	},

	/**
	 * Process the input and return the state for the recognizer
	 * @memberof AttrRecognizer
	 * @param {Object} input
	 * @returns {*} State
	 */
	process: function(input) {
		var state = this.state;
		var eventType = input.eventType;

		var isRecognized = state & (STATE_BEGAN | STATE_CHANGED);
		var isValid = this.attrTest(input);

		// on cancel input and we've recognized before, return STATE_CANCELLED
		if (isRecognized && (eventType & INPUT_CANCEL || !isValid)) {
			return state | STATE_CANCELLED;
		} else if (isRecognized || isValid) {
			if (eventType & INPUT_END) {
				return state | STATE_ENDED;
			} else if (!(state & STATE_BEGAN)) {
				return STATE_BEGAN;
			}
			return state | STATE_CHANGED;
		}
		return STATE_FAILED;
	}
});

/**
 * Pan
 * Recognized when the pointer is down and moved in the allowed direction.
 * @constructor
 * @extends AttrRecognizer
 */
function PanRecognizer() {
	AttrRecognizer.apply(this, arguments);

	this.pX = null;
	this.pY = null;
}

inherit(PanRecognizer, AttrRecognizer, {
	/**
	 * @namespace
	 * @memberof PanRecognizer
	 */
	defaults: {
		event: 'pan',
		threshold: 10,
		pointers: 1,
		direction: DIRECTION_ALL
	},

	getTouchAction: function() {
		var direction = this.options.direction;
		var actions = [];
		if (direction & DIRECTION_HORIZONTAL) {
			actions.push(TOUCH_ACTION_PAN_Y);
		}
		if (direction & DIRECTION_VERTICAL) {
			actions.push(TOUCH_ACTION_PAN_X);
		}
		return actions;
	},

	directionTest: function(input) {
		var options = this.options;
		var hasMoved = true;
		var distance = input.distance;
		var direction = input.direction;
		var x = input.deltaX;
		var y = input.deltaY;

		// lock to axis?
		if (!(direction & options.direction)) {
			if (options.direction & DIRECTION_HORIZONTAL) {
				direction = (x === 0) ? DIRECTION_NONE : (x < 0) ? DIRECTION_LEFT : DIRECTION_RIGHT;
				hasMoved = x != this.pX;
				distance = Math.abs(input.deltaX);
			} else {
				direction = (y === 0) ? DIRECTION_NONE : (y < 0) ? DIRECTION_UP : DIRECTION_DOWN;
				hasMoved = y != this.pY;
				distance = Math.abs(input.deltaY);
			}
		}
		input.direction = direction;
		return hasMoved && distance > options.threshold && direction & options.direction;
	},

	attrTest: function(input) {
		return AttrRecognizer.prototype.attrTest.call(this, input) &&
			(this.state & STATE_BEGAN || (!(this.state & STATE_BEGAN) && this.directionTest(input)));
	},

	emit: function(input) {
		this.pX = input.deltaX;
		this.pY = input.deltaY;

		var direction = directionStr(input.direction);
		if (direction) {
			this.manager.emit(this.options.event + direction, input);
		}

		this._super.emit.call(this, input);
	}
});

/**
 * Pinch
 * Recognized when two or more pointers are moving toward (zoom-in) or away from each other (zoom-out).
 * @constructor
 * @extends AttrRecognizer
 */
function PinchRecognizer() {
	AttrRecognizer.apply(this, arguments);
}

inherit(PinchRecognizer, AttrRecognizer, {
	/**
	 * @namespace
	 * @memberof PinchRecognizer
	 */
	defaults: {
		event: 'pinch',
		threshold: 0,
		pointers: 2
	},

	getTouchAction: function() {
		return [TOUCH_ACTION_NONE];
	},

	attrTest: function(input) {
		return this._super.attrTest.call(this, input) &&
			(Math.abs(input.scale - 1) > this.options.threshold || this.state & STATE_BEGAN);
	},

	emit: function(input) {
		this._super.emit.call(this, input);
		if (input.scale !== 1) {
			var inOut = input.scale < 1 ? 'in' : 'out';
			this.manager.emit(this.options.event + inOut, input);
		}
	}
});

/**
 * Press
 * Recognized when the pointer is down for x ms without any movement.
 * @constructor
 * @extends Recognizer
 */
function PressRecognizer() {
	Recognizer.apply(this, arguments);

	this._timer = null;
	this._input = null;
}

inherit(PressRecognizer, Recognizer, {
	/**
	 * @namespace
	 * @memberof PressRecognizer
	 */
	defaults: {
		event: 'press',
		pointers: 1,
		time: 500, // minimal time of the pointer to be pressed
		threshold: 5 // a minimal movement is ok, but keep it low
	},

	getTouchAction: function() {
		return [TOUCH_ACTION_AUTO];
	},

	process: function(input) {
		var options = this.options;
		var validPointers = input.pointers.length === options.pointers;
		var validMovement = input.distance < options.threshold;
		var validTime = input.deltaTime > options.time;

		this._input = input;

		// we only allow little movement
		// and we've reached an end event, so a tap is possible
		if (!validMovement || !validPointers || (input.eventType & (INPUT_END | INPUT_CANCEL) && !validTime)) {
			this.reset();
		} else if (input.eventType & INPUT_START) {
			this.reset();
			this._timer = setTimeoutContext(function() {
				this.state = STATE_RECOGNIZED;
				this.tryEmit();
			}, options.time, this);
		} else if (input.eventType & INPUT_END) {
			return STATE_RECOGNIZED;
		}
		return STATE_FAILED;
	},

	reset: function() {
		clearTimeout(this._timer);
	},

	emit: function(input) {
		if (this.state !== STATE_RECOGNIZED) {
			return;
		}

		if (input && (input.eventType & INPUT_END)) {
			this.manager.emit(this.options.event + 'up', input);
		} else {
			this._input.timeStamp = now();
			this.manager.emit(this.options.event, this._input);
		}
	}
});

/**
 * Rotate
 * Recognized when two or more pointer are moving in a circular motion.
 * @constructor
 * @extends AttrRecognizer
 */
function RotateRecognizer() {
	AttrRecognizer.apply(this, arguments);
}

inherit(RotateRecognizer, AttrRecognizer, {
	/**
	 * @namespace
	 * @memberof RotateRecognizer
	 */
	defaults: {
		event: 'rotate',
		threshold: 0,
		pointers: 2
	},

	getTouchAction: function() {
		return [TOUCH_ACTION_NONE];
	},

	attrTest: function(input) {
		return this._super.attrTest.call(this, input) &&
			(Math.abs(input.rotation) > this.options.threshold || this.state & STATE_BEGAN);
	}
});

/**
 * Swipe
 * Recognized when the pointer is moving fast (velocity), with enough distance in the allowed direction.
 * @constructor
 * @extends AttrRecognizer
 */
function SwipeRecognizer() {
	AttrRecognizer.apply(this, arguments);
}

inherit(SwipeRecognizer, AttrRecognizer, {
	/**
	 * @namespace
	 * @memberof SwipeRecognizer
	 */
	defaults: {
		event: 'swipe',
		threshold: 10,
		velocity: 0.65,
		direction: DIRECTION_HORIZONTAL | DIRECTION_VERTICAL,
		pointers: 1
	},

	getTouchAction: function() {
		return PanRecognizer.prototype.getTouchAction.call(this);
	},

	attrTest: function(input) {
		var direction = this.options.direction;
		var velocity;

		if (direction & (DIRECTION_HORIZONTAL | DIRECTION_VERTICAL)) {
			velocity = input.velocity;
		} else if (direction & DIRECTION_HORIZONTAL) {
			velocity = input.velocityX;
		} else if (direction & DIRECTION_VERTICAL) {
			velocity = input.velocityY;
		}

		return this._super.attrTest.call(this, input) &&
			direction & input.direction &&
			input.distance > this.options.threshold &&
			abs(velocity) > this.options.velocity && input.eventType & INPUT_END;
	},

	emit: function(input) {
		var direction = directionStr(input.direction);
		if (direction) {
			this.manager.emit(this.options.event + direction, input);
		}

		this.manager.emit(this.options.event, input);
	}
});

/**
 * A tap is ecognized when the pointer is doing a small tap/click. Multiple taps are recognized if they occur
 * between the given interval and position. The delay option can be used to recognize multi-taps without firing
 * a single tap.
 *
 * The eventData from the emitted event contains the property `tapCount`, which contains the amount of
 * multi-taps being recognized.
 * @constructor
 * @extends Recognizer
 */
function TapRecognizer() {
	Recognizer.apply(this, arguments);

	// previous time and center,
	// used for tap counting
	this.pTime = false;
	this.pCenter = false;

	this._timer = null;
	this._input = null;
	this.count = 0;
}

inherit(TapRecognizer, Recognizer, {
	/**
	 * @namespace
	 * @memberof PinchRecognizer
	 */
	defaults: {
		event: 'tap',
		pointers: 1,
		taps: 1,
		interval: 300, // max time between the multi-tap taps
		time: 250, // max time of the pointer to be down (like finger on the screen)
		threshold: 2, // a minimal movement is ok, but keep it low
		posThreshold: 10 // a multi-tap can be a bit off the initial position
	},

	getTouchAction: function() {
		return [TOUCH_ACTION_MANIPULATION];
	},

	process: function(input) {
		var options = this.options;

		var validPointers = input.pointers.length === options.pointers;
		var validMovement = input.distance < options.threshold;
		var validTouchTime = input.deltaTime < options.time;

		this.reset();

		if ((input.eventType & INPUT_START) && (this.count === 0)) {
			return this.failTimeout();
		}

		// we only allow little movement
		// and we've reached an end event, so a tap is possible
		if (validMovement && validTouchTime && validPointers) {
			if (input.eventType != INPUT_END) {
				return this.failTimeout();
			}

			var validInterval = this.pTime ? (input.timeStamp - this.pTime < options.interval) : true;
			var validMultiTap = !this.pCenter || getDistance(this.pCenter, input.center) < options.posThreshold;

			this.pTime = input.timeStamp;
			this.pCenter = input.center;

			if (!validMultiTap || !validInterval) {
				this.count = 1;
			} else {
				this.count += 1;
			}

			this._input = input;

			// if tap count matches we have recognized it,
			// else it has began recognizing...
			var tapCount = this.count % options.taps;
			if (tapCount === 0) {
				// no failing requirements, immediately trigger the tap event
				// or wait as long as the multitap interval to trigger
				if (!this.hasRequireFailures()) {
					return STATE_RECOGNIZED;
				} else {
					this._timer = setTimeoutContext(function() {
						this.state = STATE_RECOGNIZED;
						this.tryEmit();
					}, options.interval, this);
					return STATE_BEGAN;
				}
			}
		}
		return STATE_FAILED;
	},

	failTimeout: function() {
		this._timer = setTimeoutContext(function() {
			this.state = STATE_FAILED;
		}, this.options.interval, this);
		return STATE_FAILED;
	},

	reset: function() {
		clearTimeout(this._timer);
	},

	emit: function() {
		if (this.state == STATE_RECOGNIZED ) {
			this._input.tapCount = this.count;
			this.manager.emit(this.options.event, this._input);
		}
	}
});

/**
 * Simple way to create an manager with a default set of recognizers.
 * @param {HTMLElement} element
 * @param {Object} [options]
 * @constructor
 */
function Hammer(element, options) {
	options = options || {};
	options.recognizers = ifUndefined(options.recognizers, Hammer.defaults.preset);
	return new Manager(element, options);
}

/**
 * @const {string}
 */
Hammer.VERSION = '2.0.4';

/**
 * default settings
 * @namespace
 */
Hammer.defaults = {
	/**
	 * set if DOM events are being triggered.
	 * But this is slower and unused by simple implementations, so disabled by default.
	 * @type {Boolean}
	 * @default false
	 */
	domEvents: false,

	/**
	 * The value for the touchAction property/fallback.
	 * When set to `compute` it will magically set the correct value based on the added recognizers.
	 * @type {String}
	 * @default compute
	 */
	touchAction: TOUCH_ACTION_COMPUTE,

	/**
	 * @type {Boolean}
	 * @default true
	 */
	enable: true,

	/**
	 * EXPERIMENTAL FEATURE -- can be removed/changed
	 * Change the parent input target element.
	 * If Null, then it is being set the to main element.
	 * @type {Null|EventTarget}
	 * @default null
	 */
	inputTarget: null,

	/**
	 * force an input class
	 * @type {Null|Function}
	 * @default null
	 */
	inputClass: null,

	/**
	 * Default recognizer setup when calling `Hammer()`
	 * When creating a new Manager these will be skipped.
	 * @type {Array}
	 */
	preset: [
		// RecognizerClass, options, [recognizeWith, ...], [requireFailure, ...]
		[RotateRecognizer, { enable: false }],
		[PinchRecognizer, { enable: false }, ['rotate']],
		[SwipeRecognizer,{ direction: DIRECTION_HORIZONTAL }],
		[PanRecognizer, { direction: DIRECTION_HORIZONTAL }, ['swipe']],
		[TapRecognizer],
		[TapRecognizer, { event: 'doubletap', taps: 2 }, ['tap']],
		[PressRecognizer]
	],

	/**
	 * Some CSS properties can be used to improve the working of Hammer.
	 * Add them to this method and they will be set when creating a new Manager.
	 * @namespace
	 */
	cssProps: {
		/**
		 * Disables text selection to improve the dragging gesture. Mainly for desktop browsers.
		 * @type {String}
		 * @default 'none'
		 */
		userSelect: 'none',

		/**
		 * Disable the Windows Phone grippers when pressing an element.
		 * @type {String}
		 * @default 'none'
		 */
		touchSelect: 'none',

		/**
		 * Disables the default callout shown when you touch and hold a touch target.
		 * On iOS, when you touch and hold a touch target such as a link, Safari displays
		 * a callout containing information about the link. This property allows you to disable that callout.
		 * @type {String}
		 * @default 'none'
		 */
		touchCallout: 'none',

		/**
		 * Specifies whether zooming is enabled. Used by IE10>
		 * @type {String}
		 * @default 'none'
		 */
		contentZooming: 'none',

		/**
		 * Specifies that an entire element should be draggable instead of its contents. Mainly for desktop browsers.
		 * @type {String}
		 * @default 'none'
		 */
		userDrag: 'none',

		/**
		 * Overrides the highlight color shown when the user taps a link or a JavaScript
		 * clickable element in iOS. This property obeys the alpha value, if specified.
		 * @type {String}
		 * @default 'rgba(0,0,0,0)'
		 */
		tapHighlightColor: 'rgba(0,0,0,0)'
	}
};

var STOP = 1;
var FORCED_STOP = 2;

/**
 * Manager
 * @param {HTMLElement} element
 * @param {Object} [options]
 * @constructor
 */
function Manager(element, options) {
	options = options || {};

	this.options = merge(options, Hammer.defaults);
	this.options.inputTarget = this.options.inputTarget || element;

	this.handlers = {};
	this.session = {};
	this.recognizers = [];

	this.element = element;
	this.input = createInputInstance(this);
	this.touchAction = new TouchAction(this, this.options.touchAction);

	toggleCssProps(this, true);

	each(options.recognizers, function(item) {
		var recognizer = this.add(new (item[0])(item[1]));
		item[2] && recognizer.recognizeWith(item[2]);
		item[3] && recognizer.requireFailure(item[3]);
	}, this);
}

Manager.prototype = {
	/**
	 * set options
	 * @param {Object} options
	 * @returns {Manager}
	 */
	set: function(options) {
		extend(this.options, options);

		// Options that need a little more setup
		if (options.touchAction) {
			this.touchAction.update();
		}
		if (options.inputTarget) {
			// Clean up existing event listeners and reinitialize
			this.input.destroy();
			this.input.target = options.inputTarget;
			this.input.init();
		}
		return this;
	},

	/**
	 * stop recognizing for this session.
	 * This session will be discarded, when a new [input]start event is fired.
	 * When forced, the recognizer cycle is stopped immediately.
	 * @param {Boolean} [force]
	 */
	stop: function(force) {
		this.session.stopped = force ? FORCED_STOP : STOP;
	},

	/**
	 * run the recognizers!
	 * called by the inputHandler function on every movement of the pointers (touches)
	 * it walks through all the recognizers and tries to detect the gesture that is being made
	 * @param {Object} inputData
	 */
	recognize: function(inputData) {
		var session = this.session;
		if (session.stopped) {
			return;
		}

		// run the touch-action polyfill
		this.touchAction.preventDefaults(inputData);

		var recognizer;
		var recognizers = this.recognizers;

		// this holds the recognizer that is being recognized.
		// so the recognizer's state needs to be BEGAN, CHANGED, ENDED or RECOGNIZED
		// if no recognizer is detecting a thing, it is set to `null`
		var curRecognizer = session.curRecognizer;

		// reset when the last recognizer is recognized
		// or when we're in a new session
		if (!curRecognizer || (curRecognizer && curRecognizer.state & STATE_RECOGNIZED)) {
			curRecognizer = session.curRecognizer = null;
		}

		var i = 0;
		while (i < recognizers.length) {
			recognizer = recognizers[i];

			// find out if we are allowed try to recognize the input for this one.
			// 1.   allow if the session is NOT forced stopped (see the .stop() method)
			// 2.   allow if we still haven't recognized a gesture in this session, or the this recognizer is the one
			//	  that is being recognized.
			// 3.   allow if the recognizer is allowed to run simultaneous with the current recognized recognizer.
			//	  this can be setup with the `recognizeWith()` method on the recognizer.
			if (session.stopped !== FORCED_STOP && ( // 1
					!curRecognizer || recognizer == curRecognizer || // 2
					recognizer.canRecognizeWith(curRecognizer))) { // 3
				recognizer.recognize(inputData);
			} else {
				recognizer.reset();
			}

			// if the recognizer has been recognizing the input as a valid gesture, we want to store this one as the
			// current active recognizer. but only if we don't already have an active recognizer
			if (!curRecognizer && recognizer.state & (STATE_BEGAN | STATE_CHANGED | STATE_ENDED)) {
				curRecognizer = session.curRecognizer = recognizer;
			}
			i++;
		}
	},

	/**
	 * get a recognizer by its event name.
	 * @param {Recognizer|String} recognizer
	 * @returns {Recognizer|Null}
	 */
	get: function(recognizer) {
		if (recognizer instanceof Recognizer) {
			return recognizer;
		}

		var recognizers = this.recognizers;
		for (var i = 0; i < recognizers.length; i++) {
			if (recognizers[i].options.event == recognizer) {
				return recognizers[i];
			}
		}
		return null;
	},

	/**
	 * add a recognizer to the manager
	 * existing recognizers with the same event name will be removed
	 * @param {Recognizer} recognizer
	 * @returns {Recognizer|Manager}
	 */
	add: function(recognizer) {
		if (invokeArrayArg(recognizer, 'add', this)) {
			return this;
		}

		// remove existing
		var existing = this.get(recognizer.options.event);
		if (existing) {
			this.remove(existing);
		}

		this.recognizers.push(recognizer);
		recognizer.manager = this;

		this.touchAction.update();
		return recognizer;
	},

	/**
	 * remove a recognizer by name or instance
	 * @param {Recognizer|String} recognizer
	 * @returns {Manager}
	 */
	remove: function(recognizer) {
		if (invokeArrayArg(recognizer, 'remove', this)) {
			return this;
		}

		var recognizers = this.recognizers;
		recognizer = this.get(recognizer);
		recognizers.splice(inArray(recognizers, recognizer), 1);

		this.touchAction.update();
		return this;
	},

	/**
	 * bind event
	 * @param {String} events
	 * @param {Function} handler
	 * @returns {EventEmitter} this
	 */
	on: function(events, handler) {
		var handlers = this.handlers;
		each(splitStr(events), function(event) {
			handlers[event] = handlers[event] || [];
			handlers[event].push(handler);
		});
		return this;
	},

	/**
	 * unbind event, leave emit blank to remove all handlers
	 * @param {String} events
	 * @param {Function} [handler]
	 * @returns {EventEmitter} this
	 */
	off: function(events, handler) {
		var handlers = this.handlers;
		each(splitStr(events), function(event) {
			if (!handler) {
				delete handlers[event];
			} else {
				handlers[event].splice(inArray(handlers[event], handler), 1);
			}
		});
		return this;
	},

	/**
	 * emit event to the listeners
	 * @param {String} event
	 * @param {Object} data
	 */
	emit: function(event, data) {
		// we also want to trigger dom events
		if (this.options.domEvents) {
			triggerDomEvent(event, data);
		}

		// no handlers, so skip it all
		var handlers = this.handlers[event] && this.handlers[event].slice();
		if (!handlers || !handlers.length) {
			return;
		}

		data.type = event;
		data.preventDefault = function() {
			data.srcEvent.preventDefault();
		};

		var i = 0;
		while (i < handlers.length) {
			handlers[i](data);
			i++;
		}
	},

	/**
	 * destroy the manager and unbinds all events
	 * it doesn't unbind dom events, that is the user own responsibility
	 */
	destroy: function() {
		this.element && toggleCssProps(this, false);

		this.handlers = {};
		this.session = {};
		this.input.destroy();
		this.element = null;
	}
};

/**
 * add/remove the css properties as defined in manager.options.cssProps
 * @param {Manager} manager
 * @param {Boolean} add
 */
function toggleCssProps(manager, add) {
	var element = manager.element;
	each(manager.options.cssProps, function(value, name) {
		element.style[prefixed(element.style, name)] = add ? value : '';
	});
}

/**
 * trigger dom event
 * @param {String} event
 * @param {Object} data
 */
function triggerDomEvent(event, data) {
	var gestureEvent = document.createEvent('Event');
	gestureEvent.initEvent(event, true, true);
	gestureEvent.gesture = data;
	data.target.dispatchEvent(gestureEvent);
}

extend(Hammer, {
	INPUT_START: INPUT_START,
	INPUT_MOVE: INPUT_MOVE,
	INPUT_END: INPUT_END,
	INPUT_CANCEL: INPUT_CANCEL,

	STATE_POSSIBLE: STATE_POSSIBLE,
	STATE_BEGAN: STATE_BEGAN,
	STATE_CHANGED: STATE_CHANGED,
	STATE_ENDED: STATE_ENDED,
	STATE_RECOGNIZED: STATE_RECOGNIZED,
	STATE_CANCELLED: STATE_CANCELLED,
	STATE_FAILED: STATE_FAILED,

	DIRECTION_NONE: DIRECTION_NONE,
	DIRECTION_LEFT: DIRECTION_LEFT,
	DIRECTION_RIGHT: DIRECTION_RIGHT,
	DIRECTION_UP: DIRECTION_UP,
	DIRECTION_DOWN: DIRECTION_DOWN,
	DIRECTION_HORIZONTAL: DIRECTION_HORIZONTAL,
	DIRECTION_VERTICAL: DIRECTION_VERTICAL,
	DIRECTION_ALL: DIRECTION_ALL,

	Manager: Manager,
	Input: Input,
	TouchAction: TouchAction,

	TouchInput: TouchInput,
	MouseInput: MouseInput,
	PointerEventInput: PointerEventInput,
	TouchMouseInput: TouchMouseInput,
	SingleTouchInput: SingleTouchInput,

	Recognizer: Recognizer,
	AttrRecognizer: AttrRecognizer,
	Tap: TapRecognizer,
	Pan: PanRecognizer,
	Swipe: SwipeRecognizer,
	Pinch: PinchRecognizer,
	Rotate: RotateRecognizer,
	Press: PressRecognizer,

	on: addEventListeners,
	off: removeEventListeners,
	each: each,
	merge: merge,
	extend: extend,
	inherit: inherit,
	bindFn: bindFn,
	prefixed: prefixed
})})(window, document, 'Hammer');

os.hash = CryptoJS.SHA3;