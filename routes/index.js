
function isMobile(req) {
    var useragent = /mobile/i.test(req.header('user-agent'));
    var domain = req.headers.host.indexOf('m.') == 0;
    var queryparam = req.query.mobile == 1;
    return useragent || domain || queryparam;
}

function render(req, res, path, options) {
    options = options || {};

    // Turn off mobile for now and try "responsive" design
    /*
    if (isMobile(req)) {
        if (options.layout === true || typeof options.layout == 'undefined') {
            options.layout = 'layouts/mobile';
        }
        path = 'mobile/' + path;
    }
    else {
        if (options.layout === true || typeof options.layout == 'undefined') {
            options.layout = 'layouts/main';
        }
        path = 'main/' + path;
    }
    */
    if (options.layout === true || typeof options.layout == 'undefined') {
        options.layout = 'layouts/main';
    }
    path = 'main/' + path;

    //options.vars = options;   // convenience
    res.render(path, options);
}

exports.landing = function(req, res) {
    render(req, res, 'landing');
};

exports.pad = function(req, res) {
    render(req, res, 'pad', {layout: false});
};

exports.alt = function(req, res) {
    render(req, res, 'pad-alt', {layout: false});
};

exports.about = function(req, res) {
    render(req, res, 'about');
};

exports.partials = function(req, res) {
    var path = req.params.path || 'index';
    render(req, res, 'partials/' + path, {layout: false});
};

exports.sandbox = function(req, res) {
    var path = req.params.path || 'index';
    res.render('sandbox/' + path, {layout: false});
};



// Errors ======================================================================

function NotFound(msg) {
    this.name = 'NotFound';
    Error.call(this, msg);
    Error.captureStackTrace(this, arguments.callee);
}

NotFound.prototype.__proto__ = Error.prototype;

exports.error = function(err, req, res, next) {
    if (err instanceof NotFound) {
        render(req, res, '404', {status: 404});
    }
    else {
        render(req, res, '500', {status: 500});
    }
};

exports.error_500 = function(req, res) {
    throw new Error('Error 500.  Why?');
};

exports.error_404 = function(req, res) {
    throw new NotFound;
};












