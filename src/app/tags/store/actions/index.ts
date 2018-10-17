import { SyncTagsAddAction } from './sync-tags-add.action';
import { SyncTagsUpdateAction } from './sync-tags-update.action';
import { SyncTagsRemoveAction } from './sync-tags-remove.action';
import { AddTagRequestAction } from './add-tag-request.action';
import { AddTagSuccessAction } from './add-tag-success.action';
import { AddTagFailAction } from './add-tag-fail.action';
import { UpdateTagRequestAction } from './update-tag-request.action';
import { UpdateTagSuccessAction } from './update-tag-success.action';
import { UpdateTagFailAction } from './update-tag-fail.action';
import { RemoveTagRequestAction } from './remove-tag-request.action';
import { RemoveTagSuccessAction } from './remove-tag-success.action';
import { RemoveTagFailAction } from './remove-tag-fail.action';
import { StartEditingTagAction } from './start-editing.action';
import { StopEditingTagAction } from './stop-editing.action';



export enum TagActionTypes {
  SyncTags           = '[Tag] SyncTags',
  SyncTagsAdd        = '[Tag] SyncTagsAdd',
  SyncTagsUpdate     = '[Tag] SyncTagsUpdate',
  SyncTagsRemove     = '[Tag] SyncTagsRemove',

  AddTagRequest      = '[Tag] AddTagRequest',
  AddTagSuccess      = '[Tag] AddTagSuccess',
  AddTagFail         = '[Tag] AddTagFail',
  UpdateTagRequest   = '[Tag] UpdateTagRequest',
  UpdateTagSuccess   = '[Tag] UpdateTagSuccess',
  UpdateTagFail      = '[Tag] UpdateTagFail',
  RemoveTagRequest   = '[Tag] RemoveTagRequest',
  RemoveTagSuccess   = '[Tag] RemoveTagSuccess',
  RemoveTagFail      = '[Tag] RemoveTagFail',

  StartEditingTag    = '[Tag] StartEditingTag',
  StopEditingTag     = '[Tag] StopEditingTag',
}

export type TagAction =
  SyncTagsAddAction |
  SyncTagsUpdateAction |
  SyncTagsRemoveAction |

  AddTagRequestAction |
  AddTagSuccessAction |
  AddTagFailAction |
  UpdateTagRequestAction |
  UpdateTagSuccessAction |
  UpdateTagFailAction |
  RemoveTagRequestAction |
  RemoveTagSuccessAction |
  RemoveTagFailAction |

  StartEditingTagAction |
  StopEditingTagAction
;
