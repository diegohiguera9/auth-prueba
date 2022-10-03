const Project = require("../api/projects/projects.model");
const User = require("../api/user/user.model");
const ErrroResponse = require("./errorResponse");

module.exports = {
  authRole(role) {
    return async function (req, res, next) {
      try {
        const userId = req.userId;
        const user = await User.findById(userId);
        if (user.role !== role) {
          return next(new ErrroResponse("Role not allowed to this page", 401));
        }
        next();
      } catch (err) {
        next(err);
      }
    };
  },

  authProject(role) {
    return async function (req, res, next) {
      try {
        const userId = req.userId;
        const user = await User.findById(userId);

        const { projectId } = req.params;
        const porject = await Project.findById(projectId);

        if (user.role === role || userId === porject.user) {
          return next();
        }

        return next(new ErrroResponse("User not allowed to this project", 401));
      } catch (err) {
        next(err);
      }
    };
  },
};
