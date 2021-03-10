import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient('https://ajngdwdjfuufflnnbwfm.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYxMjMyODQ3MiwiZXhwIjoxOTI3OTA0NDcyfQ.Jsc8OS9TcjOzPQnfDjVXnjw45Wy8_MTNsLnaaa0kC1U', {
	localStorage: AsyncStorage as any,
});
