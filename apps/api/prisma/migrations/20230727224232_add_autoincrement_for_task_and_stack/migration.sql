-- AlterTable
CREATE SEQUENCE stack_id_seq;
ALTER TABLE "Stack" ALTER COLUMN "id" SET DEFAULT nextval('stack_id_seq');
ALTER SEQUENCE stack_id_seq OWNED BY "Stack"."id";

-- AlterTable
CREATE SEQUENCE task_id_seq;
ALTER TABLE "Task" ALTER COLUMN "id" SET DEFAULT nextval('task_id_seq');
ALTER SEQUENCE task_id_seq OWNED BY "Task"."id";
