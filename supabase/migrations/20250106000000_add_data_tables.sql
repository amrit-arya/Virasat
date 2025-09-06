-- Create tables for banking data
CREATE TABLE IF NOT EXISTS bank_accounts (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  bank TEXT NOT NULL,
  account_number TEXT NOT NULL,
  balance TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'Active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS investments (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  scheme TEXT,
  company TEXT,
  units TEXT,
  shares TEXT,
  current_value TEXT NOT NULL,
  gain_loss TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create tables for medical data
CREATE TABLE IF NOT EXISTS health_records (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  provider TEXT NOT NULL,
  date DATE NOT NULL,
  status TEXT NOT NULL DEFAULT 'Completed',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS medications (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  dosage TEXT NOT NULL,
  frequency TEXT NOT NULL,
  prescribed_by TEXT NOT NULL,
  start_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create tables for pins/passwords data
CREATE TABLE IF NOT EXISTS passwords (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  service TEXT NOT NULL,
  username TEXT NOT NULL,
  password TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'Personal',
  last_updated DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS security_questions (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  service TEXT NOT NULL,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'Banking',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create tables for properties data
CREATE TABLE IF NOT EXISTS properties (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  address TEXT NOT NULL,
  area TEXT NOT NULL,
  value TEXT NOT NULL,
  registration_number TEXT,
  purchase_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS vehicles (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  model TEXT NOT NULL,
  registration_number TEXT NOT NULL,
  purchase_value TEXT,
  current_value TEXT,
  insurance_expiry DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create tables for insurance data
CREATE TABLE IF NOT EXISTS insurance_policies (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  provider TEXT NOT NULL,
  policy_number TEXT NOT NULL,
  premium_amount TEXT NOT NULL,
  coverage_amount TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  status TEXT NOT NULL DEFAULT 'Active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create tables for nominees data
CREATE TABLE IF NOT EXISTS nominees (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  relationship TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  address TEXT,
  percentage TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE bank_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE investments ENABLE ROW LEVEL SECURITY;
ALTER TABLE health_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE medications ENABLE ROW LEVEL SECURITY;
ALTER TABLE passwords ENABLE ROW LEVEL SECURITY;
ALTER TABLE security_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE insurance_policies ENABLE ROW LEVEL SECURITY;
ALTER TABLE nominees ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for all tables
CREATE POLICY "Users can view their own data" ON bank_accounts FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own data" ON bank_accounts FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own data" ON bank_accounts FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own data" ON bank_accounts FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own data" ON investments FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own data" ON investments FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own data" ON investments FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own data" ON investments FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own data" ON health_records FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own data" ON health_records FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own data" ON health_records FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own data" ON health_records FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own data" ON medications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own data" ON medications FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own data" ON medications FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own data" ON medications FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own data" ON passwords FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own data" ON passwords FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own data" ON passwords FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own data" ON passwords FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own data" ON security_questions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own data" ON security_questions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own data" ON security_questions FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own data" ON security_questions FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own data" ON properties FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own data" ON properties FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own data" ON properties FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own data" ON properties FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own data" ON vehicles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own data" ON vehicles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own data" ON vehicles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own data" ON vehicles FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own data" ON insurance_policies FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own data" ON insurance_policies FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own data" ON insurance_policies FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own data" ON insurance_policies FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own data" ON nominees FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own data" ON nominees FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own data" ON nominees FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own data" ON nominees FOR DELETE USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_bank_accounts_user_id ON bank_accounts(user_id);
CREATE INDEX IF NOT EXISTS idx_investments_user_id ON investments(user_id);
CREATE INDEX IF NOT EXISTS idx_health_records_user_id ON health_records(user_id);
CREATE INDEX IF NOT EXISTS idx_medications_user_id ON medications(user_id);
CREATE INDEX IF NOT EXISTS idx_passwords_user_id ON passwords(user_id);
CREATE INDEX IF NOT EXISTS idx_security_questions_user_id ON security_questions(user_id);
CREATE INDEX IF NOT EXISTS idx_properties_user_id ON properties(user_id);
CREATE INDEX IF NOT EXISTS idx_vehicles_user_id ON vehicles(user_id);
CREATE INDEX IF NOT EXISTS idx_insurance_policies_user_id ON insurance_policies(user_id);
CREATE INDEX IF NOT EXISTS idx_nominees_user_id ON nominees(user_id);
