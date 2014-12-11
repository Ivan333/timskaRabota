//factory e singlelton.
FirstApp.factory("subjectsFactory",
                [function() {
                  var content = ['Math','OOP','Web Programming'];

                  return {
                    getSubjects: function() {
                      return content;
                    }
                  };
                }]);