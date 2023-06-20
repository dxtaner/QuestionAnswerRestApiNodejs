const sendTokenToClient = (user, res, status) => {

    // Get Token From User Model
    const token = user.getTokenFromUserModel();

    const { JWT_COOKIE_EXPIRE, NODE_ENV } = process.env;

    // Send To Client With Res
    return res
        .status(status)
        .cookie("access_token", token, {
            httpOnly: true,
            expires: new Date(Date.now() + parseInt(JWT_COOKIE_EXPIRE) * 1000 * 60),
            secure: NODE_ENV === "development" ? false : true
        })
        .json({
            success: true,
            access_token: token,
            data: {
                name: user.name,
                email: user.email,
                role: user.role
            }
        });


}

module.exports=sendTokenToClient;