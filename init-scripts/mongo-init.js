db = db.getSiblingDB('meandb');  // Switch to or create the specified database, if this is not here the user will created on test db

db.createUser({
  user: "mean",
  pwd: "mean",
  roles: [
    {
      role: "readWrite",
      db: "meandb"
    }
  ]
});
