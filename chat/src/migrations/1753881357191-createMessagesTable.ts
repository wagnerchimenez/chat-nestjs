import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateMessagesTable1753881357191 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'messages',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'message',
            type: 'varchar',
          },
          {
            name: 'sender_id',
            type: 'uuid',
          },
          {
            name: 'receiver_id',
            type: 'uuid',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'messages',
      new TableForeignKey({
        columnNames: ['sender_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
      }),
    );

    await queryRunner.createForeignKey(
      'messages',
      new TableForeignKey({
        columnNames: ['receiver_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('messages');

    const foreignKeyReceiverId = table?.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('receiver_id') !== -1,
    );

    if (foreignKeyReceiverId) {
      await queryRunner.dropForeignKey('messages', foreignKeyReceiverId);
    }

    const foreignKeySenderId = table?.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('sender_id') !== -1,
    );

    if (foreignKeySenderId) {
      await queryRunner.dropForeignKey('messages', foreignKeySenderId);
    }

    await queryRunner.dropTable('messages');
  }
}
