import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Svg, { Circle, Path, Polygon } from 'react-native-svg';
import { colors, typography } from '../constants/theme';

export function EagleMark({ size = 96, showWordmark = false }: { size?: number; showWordmark?: boolean }) {
  return (
    <View style={styles.wrap}>
      <Svg width={size} height={size * 0.82} viewBox="0 0 120 98">
        <Path d="M60 13C46 8 31 9 17 18c11 3 19 8 25 14-12-2-24 0-35 6 13 3 23 9 31 18-8 1-15 4-22 9 12 1 25-2 36-9l8-6v27l-8 12h16l-8 8h20l-8-8h16l-8-12V50l8 6c11 7 24 10 36 9-7-5-14-8-22-9 8-9 18-15 31-18-11-6-23-8-35-6 6-6 14-11 25-14-14-9-29-10-43-5Z" fill={colors.gold} />
        <Path d="M60 24c-6 4-10 10-12 18 4 2 8 3 12 3s8-1 12-3c-2-8-6-14-12-18Z" fill={colors.red} />
        <Path d="M54 39h12v13H54z" fill={colors.white} />
        <Circle cx="60" cy="43" r="3" fill={colors.background} />
        <Path d="M41 72c7-5 13-7 19-7s12 2 19 7c-7 5-13 8-19 8s-12-3-19-8Z" fill={colors.white} opacity={0.92} />
        <Polygon points="60,65 65,72 60,79 55,72" fill={colors.red} />
      </Svg>
      {showWordmark && <Text style={styles.wordmark}>DEUTSCH MASTER</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: 'center', justifyContent: 'center' },
  wordmark: { ...typography.caption, color: colors.text, marginTop: -4, letterSpacing: 2.2 },
});
