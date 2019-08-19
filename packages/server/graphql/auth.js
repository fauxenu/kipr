import userRoles from '../enums/userRoles';
import User from '../models/User';
import AuthError from '../errors/AuthError';
import PermissionError from '../errors/PermissionError';

export const isOwner = async (ctx, targetId) => {
  if (targetId !== ctx.id) {
    throw new PermissionError();
  }
  return targetId;
};

export const isAdmin = async (ctx) => {
  const user = await User.findById(ctx.id).exec();
  if (user.role !== userRoles.ADMIN) {
    throw new PermissionError();
  }
  return user;
};

export const hasAuth = async (ctx) => {
  if (!ctx) {
    throw new AuthError();
  }
  return ctx;
};

export const canEdit = async (ctx, targetId, ModelCls) => {
  // check if user owns the object
  const model = await ModelCls.findById(targetId).exec();
  if (model.ownerId === ctx.id) {
    return model;
  }

  // check if user is an admin (admin owns everything)
  const user = await User.findById(ctx.id).exec();
  if (user.role === userRoles.ADMIN) {
    return model;
  }
  throw new PermissionError();
};

/* eslint-disable no-restricted-syntax */
export const canEditAny = async (ctx, objects = []) => {
  // check if user is an admin (admin belongs to everything)
  const user = await User.findById(ctx.id).exec();
  if (user.role === userRoles.ADMIN) {
    return true;
  }

  // check if user owns any of the objects
  for (const { id, model } of objects) {
    const object = await model.findById(id).exec(); // eslint-disable-line no-await-in-loop
    if (object.ownerId === ctx.id) {
      return true;
    }
  }

  throw new PermissionError();
};
/* eslint-disable no-restricted-syntax */
