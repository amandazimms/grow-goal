const rejectUnauthenticated = (req, res, next) => {
  // check if logged in
  if (req.isAuthenticated()) {
    // They were authenticated! User may do the next thing
    // Note! They may not be Authorized to do all things
    next(); //next is a callback function! In user.router (for example),  router.get runs rejectUnauthenticated, then ___ (the anon function in router.get.  more info here https://vimeo.com/453297212)
  } else {
    // failure best handled on the server. do redirect here.
    res.sendStatus(403);
  }
};

module.exports = { rejectUnauthenticated };
