import React from "react";
import { X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import {
  Label,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "./ui/form-elements";
import { ALARM_TONES } from "../constants/app";

export const SettingsTab = ({
  onThemeChange,
  onTimeFormatChange,
  onAlarmToneChange,
  currentSettings,
  onClose,
}) => {
  return (
    <Card className="rounded-2xl space-y-4">
      <CardHeader>
        <CardTitle>Settings</CardTitle>
        <Button
          size="sm"
          variant="outline"
          onClick={onClose}
          className="rounded-full"
        >
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="theme">Theme</Label>
          <Select
            value={currentSettings.theme}
            onValueChange={(value) => onThemeChange(value)}
          >
            <SelectContent>
              <SelectItem value="light" onSelect={(value) => onThemeChange(value)}>Light</SelectItem>
              <SelectItem value="dark" onSelect={(value) => onThemeChange(value)}>Dark</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="time-format">Time Format</Label>
          <Select
            value={currentSettings.timeFormat}
            onValueChange={(value) => onTimeFormatChange(value)}
          >
            <SelectContent>
              <SelectItem value="12-hour" onSelect={(value) => onTimeFormatChange(value)}>12-hour (AM/PM)</SelectItem>
              <SelectItem value="24-hour" onSelect={(value) => onTimeFormatChange(value)}>24-hour</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="alarm-tone">Alarm Tone</Label>
          <Select
            value={currentSettings.alarmTone}
            onValueChange={(value) => onAlarmToneChange(value)}
          >
            <SelectContent>
              {ALARM_TONES.map((tone) => (
                <SelectItem 
                  key={tone.name} 
                  value={tone.url}
                  onSelect={(value) => onAlarmToneChange(value)}
                >
                  {tone.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};
