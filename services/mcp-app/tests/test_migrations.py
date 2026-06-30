from pathlib import Path

from alembic.config import Config
from alembic.script import ScriptDirectory


def test_alembic_loads_initial_revision() -> None:
    service_root = Path(__file__).resolve().parents[1]
    config = Config(str(service_root / "alembic.ini"))
    script = ScriptDirectory.from_config(config)

    assert script.get_heads() == ["0001_create_coupon_read_tables"]
