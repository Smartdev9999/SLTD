-- Insert default contact settings
INSERT INTO public.site_settings (setting_key, value_en, value_la, value_th, value_zh) VALUES
  ('contact_address', 'NNN Building (5th Floor), Phonsinuan RD. Ban Phonsinuan, Sisattanak District Vientiane, Laos', 'ອາຄານ NNN (ຊັ້ນ 5), ຖະໜົນໂພນສີນວນ ບ້ານໂພນສີນວນ, ເມືອງສີສັດຕະນາກ ນະຄອນຫຼວງວຽງຈັນ, ລາວ', 'อาคาร NNN (ชั้น 5) ถนนโพนสินวน บ้านโพนสินวน เขตสีสัตตนาก เวียงจันทน์ ลาว', 'NNN大楼（5楼），Phonsinuan路，Ban Phonsinuan，Sisattanak区，万象，老挝'),
  ('contact_phone', '020 5717 1631', '020 5717 1631', '020 5717 1631', '020 5717 1631'),
  ('contact_email', 'info@lstd.com', 'info@lstd.com', 'info@lstd.com', 'info@lstd.com'),
  ('contact_office_hours', 'Mon - Fri: 8:00 AM - 5:00 PM', 'ຈັນ - ສຸກ: 8:00 - 17:00', 'จันทร์ - ศุกร์: 8:00 - 17:00', '周一至周五：8:00 - 17:00'),
  ('google_maps_url', 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.889!2d102.6!3d17.97!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTfCsDU4JzEyLjAiTiAxMDLCsDM2JzAwLjAiRQ!5e0!3m2!1sen!2s!4v1234567890', '', '', ''),
  ('facebook_url', 'https://facebook.com/lstd', '', '', ''),
  ('linkedin_url', 'https://linkedin.com/company/lstd', '', '', ''),
  ('tiktok_url', 'https://tiktok.com/@lstd', '', '', '')
ON CONFLICT (setting_key) DO NOTHING;