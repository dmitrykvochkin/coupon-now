from pathlib import Path

from coupon_now_mcp.config import (
    DATABASE_URL_ENV_VAR,
    DEFAULT_DATABASE_URL,
    Settings,
    get_settings,
    normalize_database_url,
)


def clear_settings_cache() -> None:
    get_settings.cache_clear()


def test_normalize_database_url_adds_psycopg_driver() -> None:
    assert (
        normalize_database_url("postgresql://coupon_now:coupon_now@localhost:5432/coupon_now")
        == DEFAULT_DATABASE_URL
    )


def test_settings_use_default_database_url(monkeypatch) -> None:
    monkeypatch.delenv(DATABASE_URL_ENV_VAR, raising=False)
    clear_settings_cache()

    settings = get_settings()

    assert settings.database_url == DEFAULT_DATABASE_URL


def test_settings_read_database_url_from_env(monkeypatch) -> None:
    monkeypatch.setenv(
        DATABASE_URL_ENV_VAR,
        "postgresql://coupon_now:coupon_now@db:5432/coupon_now",
    )
    clear_settings_cache()

    settings = get_settings()

    assert settings.database_url == "postgresql+psycopg://coupon_now:coupon_now@db:5432/coupon_now"


def test_settings_read_database_url_from_env_file(tmp_path: Path, monkeypatch) -> None:
    env_file = tmp_path / ".env"
    env_file.write_text(
        "COUPON_NOW_MCP_DATABASE_URL=postgresql://coupon_now:coupon_now@env-file:5432/coupon_now\n",
        encoding="utf-8",
    )
    monkeypatch.delenv(DATABASE_URL_ENV_VAR, raising=False)
    clear_settings_cache()

    settings = Settings(_env_file=env_file)

    assert (
        settings.database_url
        == "postgresql+psycopg://coupon_now:coupon_now@env-file:5432/coupon_now"
    )
