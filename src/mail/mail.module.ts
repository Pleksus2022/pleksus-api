import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { join } from 'path';

@Module({
  imports: [
    MailerModule.forRoot({
        transport: {
            host: 'smtp.mailtrap.io',
            secure: false,
            auth: {
              user: "5c254693173580",
              pass: "f72b3bbddeb7be"
            }
        },
        defaults: {
            from: '"No Reply" <noreply@example.com>',
        },
        template: {
            dir: join(__dirname, 'templates'),
            adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
            options: {
              strict: true,
            },
        },
    })
  ],
  providers: [MailService],
  exports: [MailService]
})
export class MailModule {}
