const role = (req, res, next) => {
    if(req.user.role === "admin") {
        next();
    } else if(req.user._id.toString() === req.params.id || req.user.orders.includes(req.params.id)) {
        next();
    } else {
        res.status(401).json({success: false, message: "You are not authorized."});
    };
};

export {role};