module.exports = {
    //...
    devServer: {
      client: {
        overlay: {
          runtimeErrors: (error) => {
            if(error?.message === "ResizeObserver loop completed with undelivered notifications.")
            {
               console.error(error)
               return false;
            }
            return true;
          },
        },
      },
    },
  };