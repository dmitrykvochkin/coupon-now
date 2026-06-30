"""Create coupon read tables."""

from __future__ import annotations

from alembic import op
import sqlalchemy as sa

revision: str = "0001_create_coupon_read_tables"
down_revision: str | None = None
branch_labels: str | tuple[str, ...] | None = None
depends_on: str | tuple[str, ...] | None = None


def upgrade() -> None:
    op.create_table(
        "merchants",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("name", sa.String(length=255), nullable=False),
        sa.Column("slug", sa.String(length=255), nullable=False),
        sa.Column("website_url", sa.String(length=2048), nullable=True),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), nullable=False),
        sa.PrimaryKeyConstraint("id"),
        sa.UniqueConstraint("slug"),
    )
    op.create_index(op.f("ix_merchants_name"), "merchants", ["name"], unique=False)
    op.create_index(op.f("ix_merchants_slug"), "merchants", ["slug"], unique=False)

    op.create_table(
        "offers",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("merchant_id", sa.Integer(), nullable=False),
        sa.Column("title", sa.String(length=500), nullable=False),
        sa.Column("code", sa.String(length=100), nullable=True),
        sa.Column("discount_summary", sa.String(length=500), nullable=True),
        sa.Column("category", sa.String(length=100), nullable=True),
        sa.Column("affiliate_url", sa.String(length=2048), nullable=True),
        sa.Column("terms", sa.Text(), nullable=True),
        sa.Column("expires_at", sa.DateTime(timezone=True), nullable=True),
        sa.Column("is_active", sa.Boolean(), nullable=False),
        sa.Column("freshness_note", sa.String(length=500), nullable=True),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), nullable=False),
        sa.ForeignKeyConstraint(["merchant_id"], ["merchants.id"]),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(op.f("ix_offers_category"), "offers", ["category"], unique=False)
    op.create_index(op.f("ix_offers_expires_at"), "offers", ["expires_at"], unique=False)
    op.create_index(op.f("ix_offers_is_active"), "offers", ["is_active"], unique=False)
    op.create_index(op.f("ix_offers_merchant_id"), "offers", ["merchant_id"], unique=False)


def downgrade() -> None:
    op.drop_index(op.f("ix_offers_merchant_id"), table_name="offers")
    op.drop_index(op.f("ix_offers_is_active"), table_name="offers")
    op.drop_index(op.f("ix_offers_expires_at"), table_name="offers")
    op.drop_index(op.f("ix_offers_category"), table_name="offers")
    op.drop_table("offers")
    op.drop_index(op.f("ix_merchants_slug"), table_name="merchants")
    op.drop_index(op.f("ix_merchants_name"), table_name="merchants")
    op.drop_table("merchants")
