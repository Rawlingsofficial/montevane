ALTER TABLE "store_settings" ADD COLUMN "whatsapp_numbers" jsonb DEFAULT '[]'::jsonb NOT NULL;--> statement-breakpoint
UPDATE "store_settings" SET "whatsapp_numbers" = jsonb_build_array(jsonb_build_object('label', 'WhatsApp', 'number', "whatsapp_number")) WHERE "whatsapp_number" IS NOT NULL AND "whatsapp_numbers" = '[]'::jsonb;
