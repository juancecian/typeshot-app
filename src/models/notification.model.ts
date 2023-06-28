import { NotificationEnum } from '../enums/notification.enum';

export class NotificationModel {
  id: string = '';
  type: NotificationEnum = NotificationEnum.INITIALIZE_VALUE;
  receptorId: string = '';
  read: boolean = false;
}
