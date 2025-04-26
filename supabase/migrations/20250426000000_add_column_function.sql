
-- Function to add a column if it doesn't exist
CREATE OR REPLACE FUNCTION add_column_if_not_exists(
    p_table_name text,
    p_column_name text,
    p_data_type text,
    p_default_value text DEFAULT NULL
)
RETURNS void AS $$
DECLARE
    column_exists boolean;
BEGIN
    -- Check if the column already exists
    SELECT EXISTS (
        SELECT 1
        FROM information_schema.columns
        WHERE table_name = p_table_name
        AND column_name = p_column_name
    ) INTO column_exists;

    -- Add the column if it doesn't exist
    IF NOT column_exists THEN
        EXECUTE format(
            'ALTER TABLE %I ADD COLUMN %I %s DEFAULT %s',
            p_table_name,
            p_column_name,
            p_data_type,
            p_default_value
        );
    END IF;
END;
$$ LANGUAGE plpgsql;
