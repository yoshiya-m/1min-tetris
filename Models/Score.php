<?php

namespace Models;
use Database\DataAccess\ORM;
use Database\DatabaseManager;
class Score extends ORM
{
    protected static ?array $columnTypes = null;

    public static function getRowsCount(): int {
        $db = DatabaseManager::getMysqliConnection();
        $tablename = static::getTableName();
        $stmt = $db->prepare("SELECT COUNT(*) AS total_rows FROM $tablename");
        $stmt->execute();
        $result = $stmt->get_result();
        $data = $result->fetch_assoc();
        return $data['total_rows'];
    }

    public static function getRankByScore($score): int {
        $db = DatabaseManager::getMysqliConnection();
        $tablename = static::getTableName();
        $stmt = $db->prepare("SELECT COUNT(*) + 1 AS ranking FROM $tablename WHERE score > ?");
        $stmt->bind_param('i', $score);
        $stmt->execute();
        $result = $stmt->get_result();
        $data = $result->fetch_assoc();
        return $data['ranking'];
    }

    public static function getRanking(): array {
        $db = DatabaseManager::getMysqliConnection();
        $tablename = static::getTableName();
        $stmt = $db->prepare("SELECT * from $tablename ORDER BY score DESC LIMIT 100");
        $stmt->execute();
        $result = $stmt->get_result();
        $data = $result->fetch_all(MYSQLI_ASSOC);
        return $data;
    }
}