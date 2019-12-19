const uppercase = (): any => {
  return async function uppercase(ctx, next) {
    ctx.params.id = ctx.params.id && ctx.params.id.toUpperCase();
    await next();
  };
};

export default uppercase;
