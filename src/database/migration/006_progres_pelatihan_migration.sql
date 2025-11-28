DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'progres_status_enum') THEN
        CREATE TYPE progres_status_enum AS ENUM ('belum_mulai','sedang_belajar','selesai','lulus');
    END IF;
END$$;

-- Create table progres_pelatihan (if not exists)
CREATE TABLE IF NOT EXISTS progres_pelatihan (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    pelatihan_id INT NOT NULL,
    materi_terakhir_id INT,
    persentase_selesai INT DEFAULT 0,
    status progres_status_enum DEFAULT 'belum_mulai',
    waktu_mulai TIMESTAMP,
    waktu_selesai TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_progres_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_progres_pelatihan FOREIGN KEY (pelatihan_id) REFERENCES pelatihan(id) ON DELETE CASCADE,
    CONSTRAINT fk_progres_materi FOREIGN KEY (materi_terakhir_id) REFERENCES materi_pelatihan(id) ON DELETE SET NULL
);
